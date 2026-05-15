#!/usr/bin/env node
/**
 * Render a single Worksop Workspace knowledge-base markdown file to a
 * branded PDF.
 *
 * Usage:  node generate.js <path/to/source.md> [--out <path/to/out.pdf>]
 *
 * Brand reference: knowledge-base/marketing/brand/brand-guidelines.md
 * Naming: kebab-case slug derived from source filename.
 */

'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { marked } = require('marked');
const puppeteer = require('puppeteer');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const PDF_DIR = path.join(REPO_ROOT, 'pdfs');
const TEMPLATE_PATH = path.join(__dirname, 'template.html');
const STYLES_PATH = path.join(__dirname, 'styles.css');

marked.setOptions({ gfm: true, breaks: false });

/**
 * Pull cover-page metadata from the top of a knowledge-base markdown file.
 * Conventional shape:
 *   # Title
 *
 *   **Worksop Workspace** · Section · *Phase X reference*
 *
 *   Status: Draft v1 — needs Connor review · Last updated: 14 May 2026
 *
 *   ---
 *   ...body...
 */
function extractMetadata(md, sourcePath) {
  const lines = md.split('\n');
  let title = path.basename(sourcePath, '.md');
  let eyebrow = '';
  let subtitle = '';
  let status = '';
  let lastUpdated = '';

  // Title — first H1
  for (const line of lines) {
    const m = line.match(/^#\s+(.+?)\s*$/);
    if (m) { title = m[1].trim(); break; }
  }

  // Eyebrow — line beginning **Worksop Workspace**
  for (const line of lines) {
    if (/^\*\*Worksop Workspace\*\*/.test(line)) {
      eyebrow = line
        .replace(/\*\*/g, '')
        .replace(/\*/g, '')
        .replace(/\s+·\s+/g, ' · ')
        .trim();
      break;
    }
  }
  if (!eyebrow) {
    // Fall back: derive from path, e.g. operations/sops -> Operations · SOPs
    const rel = path.relative(path.join(REPO_ROOT, 'knowledge-base'), sourcePath);
    const segments = rel.split(path.sep).slice(0, -1);
    eyebrow = 'Worksop Workspace · ' +
      segments.map(s => s.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())).join(' · ');
  }

  // Status — line beginning with "Status:" (possibly inside markdown bold).
  // Some docs end the status sentence with " Last updated: <date>." inline
  // (no " · " separator); peel that off so it doesn't bleed into the status
  // marker or duplicate the last-updated row on the cover.
  for (const line of lines) {
    const stripped = line.replace(/\*\*/g, '').trim();
    if (/^Status:/i.test(stripped)) {
      let raw = stripped.replace(/^Status:\s*/i, '').trim();
      const lu = raw.match(/(?:\s+·\s+|\.?\s+)Last updated:\s*([^·]+?)\.?$/i);
      if (lu) {
        lastUpdated = lu[1].trim().replace(/\.$/, '');
        raw = raw.slice(0, lu.index).trim();
      }
      status = raw.replace(/\.$/, '').trim();
      break;
    }
  }
  if (!status) status = 'Working draft';

  // Last-updated fallback: scan for "Last updated:" anywhere near the top
  if (!lastUpdated) {
    for (const line of lines.slice(0, 30)) {
      const m = line.match(/Last updated:\s*([^·\*]+?)(?:\s*\*?\s*$|·)/i);
      if (m) { lastUpdated = m[1].trim(); break; }
    }
  }
  if (!lastUpdated) lastUpdated = '—';

  // Subtitle — first non-metadata sentence after the first `---`
  const firstRuleIdx = lines.findIndex(l => /^---\s*$/.test(l));
  if (firstRuleIdx !== -1) {
    for (let i = firstRuleIdx + 1; i < Math.min(firstRuleIdx + 12, lines.length); i++) {
      const l = lines[i].trim();
      if (!l) continue;
      if (/^---/.test(l)) break;
      if (/^#/.test(l)) break;
      if (/^\*Worksop Workspace/.test(l)) break;
      // Strip basic markdown emphasis for the subtitle preview
      subtitle = l.replace(/[*_`]/g, '').slice(0, 220);
      break;
    }
  }

  // Categorise status for colour selection
  let statusClass = 'status-neutral';
  if (/draft|tbc|todo|unreviewed|not\s+reviewed|do\s+not\s+publish/i.test(status)) {
    statusClass = '';  // default = clay
  } else if (/approved|signed[- ]off|live|published/i.test(status)) {
    statusClass = 'status-approved';
  }

  return { title, eyebrow, subtitle, status, statusClass, lastUpdated };
}

/**
 * Strip the metadata header block (title, eyebrow, status, first ---) and
 * the trailing wordmark/footer block from the markdown body. The cover page
 * and running header/footer carry that information instead.
 */
function stripCoverMetadata(md) {
  const lines = md.split('\n');
  const out = [];
  let dropping = true;
  let seenFirstRule = false;

  for (const line of lines) {
    if (dropping) {
      if (/^---\s*$/.test(line)) {
        if (!seenFirstRule) { seenFirstRule = true; dropping = false; continue; }
      }
      continue;
    }
    out.push(line);
  }

  // Strip trailing footer block (the "*Worksop Workspace · A space to drop...*"
  // paragraph that every doc ends with). We look for the last `---` and discard
  // anything after it that mentions the address.
  const joined = out.join('\n');
  const footerRe = /\n---\s*\n\s*\*Worksop Workspace[\s\S]*$/;
  return joined.replace(footerRe, '').trim() + '\n';
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderHtml(md, meta) {
  const template = fs.readFileSync(TEMPLATE_PATH, 'utf8');
  const inlineCss = fs.readFileSync(STYLES_PATH, 'utf8');
  const stripped = stripCoverMetadata(md);
  const bodyHtml = marked.parse(stripped);

  const subtitleBlock = meta.subtitle
    ? `<p class="subtitle">${escapeHtml(meta.subtitle)}</p>`
    : '';

  // Use function-form replacement so `$` characters in body or metadata don't
  // get interpreted as special replacement patterns.
  return template
    .replace(/\{\{TITLE\}\}/g, () => escapeHtml(meta.title))
    .replace(/\{\{EYEBROW\}\}/g, () => escapeHtml(meta.eyebrow))
    .replace(/\{\{SUBTITLE_BLOCK\}\}/g, () => subtitleBlock)
    .replace(/\{\{STATUS\}\}/g, () => escapeHtml(meta.status))
    .replace(/\{\{STATUS_CLASS\}\}/g, () => meta.statusClass)
    .replace(/\{\{LAST_UPDATED\}\}/g, () => escapeHtml(meta.lastUpdated))
    .replace(/\{\{INLINE_CSS\}\}/g, () => inlineCss)
    .replace(/\{\{BODY_HTML\}\}/g, () => bodyHtml);
}

function shortStatus(status) {
  // Running headers are narrow — keep the first clause only so the badge fits
  // on one line. The full status still appears on the cover.
  const first = status.split(/[.—:]/)[0].trim();
  if (first.length <= 40) return first;
  return first.slice(0, 38).trim() + '…';
}

function headerTemplate(meta) {
  const statusColour =
    meta.statusClass === 'status-approved' ? '#8E9775'
    : meta.statusClass === 'status-neutral' ? '#5C5C58'
    : '#C57B57';
  return `
    <style>
      .ww-header {
        font-family: "Outfit", system-ui, -apple-system, "Segoe UI", sans-serif;
        font-size: 8pt;
        color: #5C5C58;
        width: 100%;
        padding: 0 22mm;
        display: flex;
        justify-content: space-between;
        align-items: center;
        -webkit-print-color-adjust: exact;
      }
      .ww-header .left { font-weight: 600; color: #2B2B2B; letter-spacing: -0.01em; flex: 0 0 auto; }
      .ww-header .center { color: #5C5C58; flex: 1 1 auto; text-align: center; padding: 0 6mm; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .ww-header .right { color: ${statusColour}; font-weight: 600; flex: 0 0 auto; white-space: nowrap; }
    </style>
    <div class="ww-header">
      <div class="left">Worksop Workspace</div>
      <div class="center">${escapeHtml(meta.title)}</div>
      <div class="right">${escapeHtml(shortStatus(meta.status))}</div>
    </div>
  `;
}

function footerTemplate() {
  return `
    <style>
      .ww-footer {
        font-family: "Outfit", system-ui, -apple-system, "Segoe UI", sans-serif;
        font-size: 8pt;
        color: #8a8a86;
        width: 100%;
        padding: 0 22mm;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .ww-footer .center { color: #5C5C58; font-weight: 500; }
      .ww-footer .right { font-size: 7.5pt; }
    </style>
    <div class="ww-footer">
      <div class="left"></div>
      <div class="center"><span class="pageNumber"></span> / <span class="totalPages"></span></div>
      <div class="right">30 Carlton Road, Worksop S80 1PH · hello@worksopworkspace.co.uk</div>
    </div>
  `;
}

async function renderToPdf(sourcePath, outPath) {
  const md = fs.readFileSync(sourcePath, 'utf8');
  const meta = extractMetadata(md, sourcePath);
  const html = renderHtml(md, meta);

  const htmlPath = outPath.replace(/\.pdf$/i, '.html');
  fs.writeFileSync(htmlPath, html);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  try {
    const page = await browser.newPage();
    await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'networkidle0' });
    // Belt and braces — wait for the Outfit weights to actually load before printing.
    await page.evaluate(async () => {
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }
    });
    await page.pdf({
      path: outPath,
      format: 'A4',
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: headerTemplate(meta),
      footerTemplate: footerTemplate(),
      margin: { top: '25mm', bottom: '25mm', left: '22mm', right: '22mm' },
    });
  } finally {
    await browser.close();
  }

  return { outPath, htmlPath, meta };
}

function deriveOutPath(sourcePath, override) {
  if (override) return path.resolve(override);
  const slug = path.basename(sourcePath, '.md');
  return path.join(PDF_DIR, `${slug}.pdf`);
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error('Usage: node generate.js <path/to/source.md> [--out <path>]');
    process.exit(1);
  }
  const sourcePath = path.resolve(args[0]);
  const outIdx = args.indexOf('--out');
  const outOverride = outIdx !== -1 ? args[outIdx + 1] : null;

  if (!fs.existsSync(sourcePath)) {
    console.error(`Source not found: ${sourcePath}`);
    process.exit(1);
  }
  if (!fs.existsSync(PDF_DIR)) fs.mkdirSync(PDF_DIR, { recursive: true });

  const outPath = deriveOutPath(sourcePath, outOverride);
  console.log(`→ ${path.relative(REPO_ROOT, sourcePath)}`);
  const result = await renderToPdf(sourcePath, outPath);
  console.log(`  PDF: ${path.relative(REPO_ROOT, result.outPath)}`);
  console.log(`  HTML: ${path.relative(REPO_ROOT, result.htmlPath)}`);
}

if (require.main === module) {
  main().catch(err => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = { renderToPdf, extractMetadata, deriveOutPath, PDF_DIR };
