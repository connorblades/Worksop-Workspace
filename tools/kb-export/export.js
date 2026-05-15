#!/usr/bin/env node
/**
 * Point-in-time local export of the `Worksop Workspace HQ` knowledge base in
 * Google Drive.
 *
 *   - Walks the folder tree recursively from the HQ root
 *   - Downloads every file, preserving folder structure
 *   - Converts Google Docs/Sheets/Slides into PDF + DOCX/XLSX/PPTX side-by-side
 *     so they survive outside Drive
 *   - Skips Google Forms (no useful export) and shortcuts
 *   - Writes to /kb-exports/YYYY-MM-DD-worksop-workspace-hq/
 *   - Optionally zips it (pass --zip)
 *
 * Run monthly, or whenever the structure changes materially. Combined with
 * Drive's own version history and your local Drive Desktop sync (if enabled),
 * this is your third independent copy.
 *
 * Setup once:
 *   1. https://console.cloud.google.com/apis/credentials → Create OAuth client
 *      ID, type "Desktop app".
 *   2. Save the JSON as `credentials.json` here.
 *   3. `npm install && npm run export`
 */

'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { pipeline } = require('node:stream/promises');
const { authenticate } = require('@google-cloud/local-auth');
const { google } = require('googleapis');
const archiver = require('archiver');

const SCRIPT_DIR = __dirname;
const REPO_ROOT = path.resolve(SCRIPT_DIR, '..', '..');
const EXPORTS_ROOT = path.join(REPO_ROOT, 'kb-exports');

const CREDENTIALS_PATH = path.join(SCRIPT_DIR, 'credentials.json');
const TOKEN_PATH = path.join(SCRIPT_DIR, 'token.json');

const HQ_FOLDER_NAME = 'Worksop Workspace HQ';

const SCOPES = ['https://www.googleapis.com/auth/drive.readonly'];

// Google-native types → a sensible binary export. Drive exports these on the fly.
const NATIVE_EXPORTS = {
  'application/vnd.google-apps.document':     { mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', ext: 'docx' },
  'application/vnd.google-apps.spreadsheet':  { mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', ext: 'xlsx' },
  'application/vnd.google-apps.presentation': { mime: 'application/vnd.openxmlformats-officedocument.presentationml.presentation', ext: 'pptx' },
  'application/vnd.google-apps.drawing':      { mime: 'image/png', ext: 'png' },
  'application/vnd.google-apps.script':       { mime: 'application/vnd.google-apps.script+json', ext: 'json' },
};

const SKIP_MIMES = new Set([
  'application/vnd.google-apps.shortcut',
  'application/vnd.google-apps.form',
  'application/vnd.google-apps.site',
  'application/vnd.google-apps.fusiontable',
]);

async function loadSavedCredentialsIfExist() {
  if (!fs.existsSync(TOKEN_PATH)) return null;
  return google.auth.fromJSON(JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf8')));
}

async function saveCredentials(client) {
  const keys = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));
  const key = keys.installed || keys.web;
  fs.writeFileSync(TOKEN_PATH, JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  }));
}

async function authorise() {
  let client = await loadSavedCredentialsIfExist();
  if (client) return client;
  if (!fs.existsSync(CREDENTIALS_PATH)) {
    console.error(`
Missing ${path.relative(REPO_ROOT, CREDENTIALS_PATH)}.

To create one:
  1. https://console.cloud.google.com/apis/credentials → Create OAuth client ID,
     type "Desktop app".
  2. Download and save as: ${CREDENTIALS_PATH}
  3. Re-run.
`);
    process.exit(1);
  }
  client = await authenticate({ scopes: SCOPES, keyfilePath: CREDENTIALS_PATH });
  if (client.credentials) await saveCredentials(client);
  return client;
}

async function findRoot(drive) {
  const res = await drive.files.list({
    q: `name = '${HQ_FOLDER_NAME}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
    fields: 'files(id, name, parents)',
    supportsAllDrives: true,
    includeItemsFromAllDrives: true,
  });
  if (res.data.files.length === 0) throw new Error(`Drive folder "${HQ_FOLDER_NAME}" not found.`);
  if (res.data.files.length > 1) {
    console.warn(`Multiple folders named "${HQ_FOLDER_NAME}" found — using the first one.`);
  }
  return res.data.files[0];
}

async function listChildren(drive, folderId) {
  const all = [];
  let pageToken = null;
  do {
    const res = await drive.files.list({
      q: `'${folderId}' in parents and trashed = false`,
      fields: 'nextPageToken, files(id, name, mimeType, modifiedTime, size)',
      pageSize: 1000,
      pageToken,
      supportsAllDrives: true,
      includeItemsFromAllDrives: true,
    });
    all.push(...(res.data.files || []));
    pageToken = res.data.nextPageToken;
  } while (pageToken);
  return all;
}

// Strip path separators and ASCII control chars from a Drive name. Spaces,
// hyphens, and most punctuation are valid filenames on macOS/Linux and we
// want the local copy to mirror Drive.
function sanitise(name) {
  let out = name.replace(/[\\\/]/g, '-');
  let stripped = '';
  for (const ch of out) {
    const code = ch.codePointAt(0);
    if (code >= 0x20 && code !== 0x7f) stripped += ch;
  }
  return stripped;
}

async function downloadBinary(drive, fileId, destPath) {
  const res = await drive.files.get(
    { fileId, alt: 'media', supportsAllDrives: true },
    { responseType: 'stream' }
  );
  await pipeline(res.data, fs.createWriteStream(destPath));
}

async function exportNative(drive, fileId, mimeType, destPath) {
  const res = await drive.files.export(
    { fileId, mimeType },
    { responseType: 'stream' }
  );
  await pipeline(res.data, fs.createWriteStream(destPath));
}

async function walk(drive, folderId, localDir, stats) {
  fs.mkdirSync(localDir, { recursive: true });
  const items = await listChildren(drive, folderId);

  for (const item of items) {
    const safeName = sanitise(item.name);
    if (item.mimeType === 'application/vnd.google-apps.folder') {
      await walk(drive, item.id, path.join(localDir, safeName), stats);
      continue;
    }
    if (SKIP_MIMES.has(item.mimeType)) {
      stats.skipped.push(`${localDir}/${safeName} (${item.mimeType})`);
      continue;
    }

    try {
      const native = NATIVE_EXPORTS[item.mimeType];
      if (native) {
        const dest = path.join(localDir, `${safeName}.${native.ext}`);
        await exportNative(drive, item.id, native.mime, dest);
        const pdfDest = path.join(localDir, `${safeName}.pdf`);
        await exportNative(drive, item.id, 'application/pdf', pdfDest);
        stats.exported.push(dest);
      } else {
        const dest = path.join(localDir, safeName);
        await downloadBinary(drive, item.id, dest);
        stats.downloaded.push(dest);
      }
    } catch (err) {
      stats.failed.push(`${localDir}/${safeName}: ${err.message}`);
    }
  }
}

function ymd() {
  const d = new Date();
  const pad = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

async function zipDir(dir, zipPath) {
  return new Promise((resolve, reject) => {
    const out = fs.createWriteStream(zipPath);
    const arch = archiver('zip', { zlib: { level: 9 } });
    out.on('close', () => resolve(arch.pointer()));
    arch.on('error', reject);
    arch.pipe(out);
    arch.directory(dir, path.basename(dir));
    arch.finalize();
  });
}

async function main() {
  const wantZip = process.argv.includes('--zip');

  const auth = await authorise();
  const drive = google.drive({ version: 'v3', auth });

  const root = await findRoot(drive);
  const stamp = ymd();
  const outDir = path.join(EXPORTS_ROOT, `${stamp}-worksop-workspace-hq`);
  if (fs.existsSync(outDir)) {
    console.error(`Already exists: ${outDir}\nRefusing to overwrite. Move or delete first.`);
    process.exit(1);
  }

  console.log(`Exporting "${root.name}" → ${path.relative(REPO_ROOT, outDir)}\n`);

  const stats = { downloaded: [], exported: [], skipped: [], failed: [] };
  await walk(drive, root.id, outDir, stats);

  const manifestPath = path.join(outDir, '_export-manifest.txt');
  const manifest = [
    `Worksop Workspace HQ — Drive export`,
    `Exported: ${new Date().toISOString()}`,
    `Source folder ID: ${root.id}`,
    ``,
    `Native files downloaded: ${stats.downloaded.length}`,
    `Google-native exported (with PDF copies): ${stats.exported.length}`,
    `Skipped (no useful export): ${stats.skipped.length}`,
    `Failed: ${stats.failed.length}`,
    ``,
    ...(stats.failed.length ? [`Failures:`, ...stats.failed.map(s => `  - ${s}`), ``] : []),
    ...(stats.skipped.length ? [`Skipped:`, ...stats.skipped.map(s => `  - ${s}`), ``] : []),
  ].join('\n');
  fs.writeFileSync(manifestPath, manifest);

  console.log(manifest);

  if (wantZip) {
    const zipPath = `${outDir}.zip`;
    console.log(`\nZipping → ${path.relative(REPO_ROOT, zipPath)}`);
    const bytes = await zipDir(outDir, zipPath);
    console.log(`Wrote ${(bytes / 1024 / 1024).toFixed(1)} MB`);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
