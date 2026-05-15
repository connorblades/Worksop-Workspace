#!/usr/bin/env node
/**
 * Upload every PDF in /pdfs/ to the Drive folder
 *   Worksop Workspace HQ > 02-operations > _pdfs
 *
 * Authenticates the first time via Google's OAuth desktop flow — your browser
 * opens, you sign in to the account that owns the Drive folder, and a
 * `token.json` is cached in this directory so subsequent runs are silent.
 *
 * On every run, if a PDF with the same name already exists in the target
 * folder, its content is REPLACED (so the canonical Drive copy stays in sync
 * with your local renders).
 *
 * Setup once:
 *   1. https://console.cloud.google.com/apis/credentials → Create OAuth client
 *      ID, type "Desktop app".
 *   2. Download the JSON, save it here as `credentials.json` (this file is
 *      gitignored).
 *   3. `npm run upload:drive`
 *
 * Manual fallback: open the folder URL printed below and drag the contents
 * of /pdfs/ into it. Done in 30 seconds — no auth setup needed.
 */

'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { authenticate } = require('@google-cloud/local-auth');
const { google } = require('googleapis');

const SCRIPT_DIR = __dirname;
const REPO_ROOT = path.resolve(SCRIPT_DIR, '..', '..');
const PDF_DIR = path.join(REPO_ROOT, 'pdfs');

const CREDENTIALS_PATH = path.join(SCRIPT_DIR, 'credentials.json');
const TOKEN_PATH = path.join(SCRIPT_DIR, 'token.json');

const TARGET_FOLDER_ID = '1MNZmUqCy3_GdJhoJceRHe5w4uVpC3NyN';
const TARGET_FOLDER_URL = `https://drive.google.com/drive/folders/${TARGET_FOLDER_ID}`;

const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

async function loadSavedCredentialsIfExist() {
  if (!fs.existsSync(TOKEN_PATH)) return null;
  const content = fs.readFileSync(TOKEN_PATH, 'utf8');
  const credentials = JSON.parse(content);
  return google.auth.fromJSON(credentials);
}

async function saveCredentials(client) {
  const content = fs.readFileSync(CREDENTIALS_PATH, 'utf8');
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  fs.writeFileSync(TOKEN_PATH, payload);
}

async function authorise() {
  let client = await loadSavedCredentialsIfExist();
  if (client) return client;

  if (!fs.existsSync(CREDENTIALS_PATH)) {
    console.error(`
Missing ${path.relative(REPO_ROOT, CREDENTIALS_PATH)}.

To create one:
  1. Go to https://console.cloud.google.com/apis/credentials
  2. Create OAuth client ID, type "Desktop app".
  3. Download the JSON, save it as:
       ${CREDENTIALS_PATH}

Or skip this entirely — open the target folder and drag /pdfs/*.pdf in:
  ${TARGET_FOLDER_URL}
`);
    process.exit(1);
  }

  client = await authenticate({ scopes: SCOPES, keyfilePath: CREDENTIALS_PATH });
  if (client.credentials) await saveCredentials(client);
  return client;
}

async function findExisting(drive, name, folderId) {
  const res = await drive.files.list({
    q: `'${folderId}' in parents and name = '${name.replace(/'/g, "\\'")}' and trashed = false`,
    fields: 'files(id, name)',
    spaces: 'drive',
  });
  return res.data.files[0] || null;
}

async function uploadOne(drive, pdfPath) {
  const name = path.basename(pdfPath);
  const stream = fs.createReadStream(pdfPath);
  const existing = await findExisting(drive, name, TARGET_FOLDER_ID);

  if (existing) {
    const res = await drive.files.update({
      fileId: existing.id,
      media: { mimeType: 'application/pdf', body: stream },
      fields: 'id, name, webViewLink',
    });
    return { action: 'updated', ...res.data };
  } else {
    const res = await drive.files.create({
      requestBody: { name, parents: [TARGET_FOLDER_ID], mimeType: 'application/pdf' },
      media: { mimeType: 'application/pdf', body: stream },
      fields: 'id, name, webViewLink',
    });
    return { action: 'created', ...res.data };
  }
}

async function main() {
  if (!fs.existsSync(PDF_DIR)) {
    console.error(`No PDFs to upload — ${path.relative(REPO_ROOT, PDF_DIR)}/ doesn't exist yet.`);
    console.error(`Run \`npm run render:all\` first.`);
    process.exit(1);
  }

  const pdfs = fs.readdirSync(PDF_DIR).filter(f => f.endsWith('.pdf')).sort();
  if (pdfs.length === 0) {
    console.error(`No PDFs to upload in ${path.relative(REPO_ROOT, PDF_DIR)}/.`);
    process.exit(1);
  }

  const auth = await authorise();
  const drive = google.drive({ version: 'v3', auth });

  console.log(`Uploading ${pdfs.length} PDF(s) to:\n  ${TARGET_FOLDER_URL}\n`);

  for (const file of pdfs) {
    const src = path.join(PDF_DIR, file);
    try {
      const r = await uploadOne(drive, src);
      console.log(`  ${r.action === 'updated' ? '↻' : '+'} ${r.name}  →  ${r.webViewLink}`);
    } catch (err) {
      console.error(`  ✗ ${file}: ${err.message}`);
    }
  }
  console.log(`\nDone. Folder: ${TARGET_FOLDER_URL}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
