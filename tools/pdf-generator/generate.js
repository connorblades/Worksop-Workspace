#!/usr/bin/env node
/**
 * Render a single Worksop Workspace knowledge-base markdown file to a
 * branded PDF.
 *
 * Cover and body are rendered as two separate PDFs and merged with pdf-lib,
 * so the cover sits clean (no running header / footer) while the body pages
 * carry the per-page status marker, title, mark, and page numbers.
 *
 * Usage:  node generate.js <path/to/source.md> [--out <path/to/out.pdf>]
 *
 * Brand reference: knowledge-base/marketing/brand/brand-guidelines.md
 */

'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { marked } = require('marked');
const puppeteer = require('puppeteer');
const { PDFDocument } = require('pdf-lib');

const SCRIPT_DIR = __dirname;
const REPO_ROOT = path.resolve(SCRIPT_DIR, '..', '..');
const PDF_DIR = path.join(REPO_ROOT, 'pdfs');
const TEMPLATE_PATH = path.join(SCRIPT_DIR, 'template.html');
const STYLES_PATH = path.join(SCRIPT_DIR, 'styles.css');

const LOGO_LOCKUP_PATH = path.join(REPO_ROOT, 'website', 'logo.png');
const LOGO_MARK_PATH   = path.join(REPO_ROOT, 'website', 'icon.png');

marked.setOptions({ gfm: true, breaks: false });

// ---------------------------------------------------------------------------
// Metadata extraction
// ---------------------------------------------------------------------------

function extractMetadata(md, sourcePath) {
  const lines = md.split('\n');
  let title = path.basename(sourcePath, '.md');
  let eyebrow = '';
  let subtitle = '';
  let status = '';
  let lastUpdated = '';

  for (const line of lines) {
    const m = line.match(/^#\s+(.+?)\s*$/);
    if (m) { title = m[1].trim(); break; }
  }

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
    const rel = path.relative(path.join(REPO_ROOT, 'knowledge-base'), sourcePath);
    const segments = rel.split(path.sep).slice(0, -1);
    eyebrow = 'Worksop Workspace · ' +
      segments.map(s => s.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())).join(' · ');
  }

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

  if (!lastUpdated) {
    for (const line of lines.slice(0, 30)) {
      const m = line.match(/Last updated:\s*([^·\*]+?)(?:\s*\*?\s*$|·)/i);
      if (m) { lastUpdated = m[1].trim(); break; }
    }
  }
  if (!lastUpdated) lastUpdated = '—';

  const firstRuleIdx = lines.findIndex(l => /^---\s*$/.test(l));
  if (firstRuleIdx !== -1) {
    for (let i = firstRuleIdx + 1; i < Math.min(firstRuleIdx + 12, lines.length); i++) {
      const l = lines[i].trim();
      if (!l) continue;
      if (/^---/.test(l)) break;
      if (/^#/.test(l)) break;
      if (/^\*Worksop Workspace/.test(l)) break;
      subtitle = l.replace(/[*_`]/g, '').slice(0, 220);
      break;
    }
  }

  let statusClass = 'status-neutral';
  if (/draft|tbc|todo|unreviewed|not\s+reviewed|do\s+not\s+publish/i.test(status)) {
    statusClass = '';
  } else if (/approved|signed[- ]off|live|published/i.test(status)) {
    statusClass = 'status-approved';
  }

  const ref = deriveRef(sourcePath);

  return { title, eyebrow, subtitle, status, statusClass, lastUpdated, ref };
}

/**
 * Document reference code based on source path. Short, predictable, useful
 * for indexing in Drive / referring to docs by code in conversation.
 */
function deriveRef(sourcePath) {
  const base = path.basename(sourcePath, '.md');
  const rel = path.relative(REPO_ROOT, sourcePath).replace(/\\/g, '/');

  let m = base.match(/^sop-(\d+)/i);
  if (m) return `SOP-${m[1]}`;

  m = base.match(/^(\d+)-/);
  if (m && rel.includes('/checklists/')) return `CHK-${m[1]}`;

  // Acronym helper: `terms-of-business` → `TOB`, `data-protection-and-gdpr` → `DPAG`.
  const acronym = s => s.split('-').map(w => w[0]).join('').toUpperCase();

  if (rel.includes('/legal-and-compliance/')) return `LEG-${acronym(base)}`;
  if (rel.includes('/health-and-safety/'))    return `HS-${acronym(base)}`;
  if (rel.includes('/hr/'))                   return `HR-${acronym(base)}`;
  if (rel.includes('/facilities/'))           return `FAC-${acronym(base)}`;
  if (rel.includes('/training/')) {
    const tag = base.split('-')[0].toUpperCase().slice(0, 6);
    return `TRN-${tag}`;
  }
  if (rel.includes('/conversion/')) {
    const tag = base.split('-')[0].toUpperCase().slice(0, 6);
    return `SAL-${tag}`;
  }
  if (base === 'operating-manual') return 'OPS-MAN';

  return base.toUpperCase().slice(0, 24);
}

// ---------------------------------------------------------------------------
// Markdown post-processing
// ---------------------------------------------------------------------------

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
  const joined = out.join('\n');
  const footerRe = /\n---\s*\n\s*\*Worksop Workspace[\s\S]*$/;
  return joined.replace(footerRe, '').trim() + '\n';
}

// ---------------------------------------------------------------------------
// Template rendering
// ---------------------------------------------------------------------------

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

let _cachedAssets = null;
function loadAssets() {
  if (_cachedAssets) return _cachedAssets;
  _cachedAssets = {
    css: fs.readFileSync(STYLES_PATH, 'utf8'),
    template: fs.readFileSync(TEMPLATE_PATH, 'utf8'),
    logoLockupDataUri: 'data:image/png;base64,' + fs.readFileSync(LOGO_LOCKUP_PATH).toString('base64'),
    logoMarkDataUri:   'data:image/png;base64,' + fs.readFileSync(LOGO_MARK_PATH).toString('base64'),
  };
  return _cachedAssets;
}

/**
 * Build the full HTML doc. `mode` is "cover" or "body" — controls which of
 * the two sections is rendered. Both modes share the same template and CSS,
 * with the irrelevant section hidden via a body-level class.
 */
function renderHtml(md, meta, mode) {
  const { css, template, logoLockupDataUri } = loadAssets();
  const stripped = stripCoverMetadata(md);
  const bodyHtml = marked.parse(stripped);

  const subtitleBlock = meta.subtitle
    ? `<p class="subtitle">${escapeHtml(meta.subtitle)}</p>`
    : '';

  const bodyMode = mode === 'body' ? 'ww-mode-body' : 'ww-mode-cover';

  return template
    .replace(/\{\{TITLE\}\}/g, () => escapeHtml(meta.title))
    .replace(/\{\{EYEBROW\}\}/g, () => escapeHtml(meta.eyebrow))
    .replace(/\{\{REF\}\}/g, () => escapeHtml(meta.ref))
    .replace(/\{\{SUBTITLE_BLOCK\}\}/g, () => subtitleBlock)
    .replace(/\{\{STATUS\}\}/g, () => escapeHtml(meta.status))
    .replace(/\{\{STATUS_CLASS\}\}/g, () => meta.statusClass)
    .replace(/\{\{LAST_UPDATED\}\}/g, () => escapeHtml(meta.lastUpdated))
    .replace(/\{\{LOGO_LOCKUP\}\}/g, () => logoLockupDataUri)
    .replace(/\{\{BODY_CLASS\}\}/g, () => bodyMode)
    .replace(/\{\{INLINE_CSS\}\}/g, () => css)
    .replace(/\{\{BODY_HTML\}\}/g, () => bodyHtml);
}

// ---------------------------------------------------------------------------
// Per-page running header / footer (body pages only)
// ---------------------------------------------------------------------------

function shortStatus(status) {
  const first = status.split(/[.—:]/)[0].trim();
  if (first.length <= 40) return first;
  return first.slice(0, 38).trim() + '…';
}

function headerTemplate(meta) {
  const { logoMarkDataUri } = loadAssets();
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
        align-items: center;
        justify-content: space-between;
        -webkit-print-color-adjust: exact;
      }
      .ww-header .left { display: flex; align-items: center; gap: 2.5mm; flex: 0 0 auto; }
      .ww-header .left img { height: 5mm; width: auto; }
      .ww-header .left span { font-weight: 600; color: #2B2B2B; letter-spacing: -0.01em; }
      .ww-header .center { color: #5C5C58; flex: 1 1 auto; text-align: center; padding: 0 6mm; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .ww-header .right { color: ${statusColour}; font-weight: 600; flex: 0 0 auto; white-space: nowrap; letter-spacing: 0.04em; text-transform: uppercase; font-size: 7.5pt; }
    </style>
    <div class="ww-header">
      <div class="left"><img src="${logoMarkDataUri}" /><span>Worksop Workspace</span></div>
      <div class="center">${escapeHtml(meta.title)} · ${escapeHtml(meta.ref)}</div>
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
      .ww-footer .left { width: 60mm; }
      .ww-footer .center { color: #5C5C58; font-weight: 500; }
      .ww-footer .right { width: 60mm; text-align: right; font-size: 7.5pt; }
    </style>
    <div class="ww-footer">
      <div class="left"></div>
      <div class="center"><span class="pageNumber"></span> / <span class="totalPages"></span></div>
      <div class="right">30 Carlton Road, Worksop S80 1PH · hello@worksopworkspace.co.uk</div>
    </div>
  `;
}

// ---------------------------------------------------------------------------
// PDF rendering
// ---------------------------------------------------------------------------

async function renderOnePdf({ html, htmlPath, displayHeaderFooter, headerHtml, footerHtml, browser }) {
  fs.writeFileSync(htmlPath, html);
  const page = await browser.newPage();
  try {
    await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'networkidle0' });
    await page.evaluate(async () => {
      if (document.fonts && document.fonts.ready) await document.fonts.ready;
    });
    // Body pages need a slightly taller top/bottom margin to leave clean room
    // for the running header (logo mark + title + status) and footer (page
    // number + address). The cover has no chrome so 25mm matches the brand
    // spec exactly.
    const margin = displayHeaderFooter
      ? { top: '28mm', bottom: '26mm', left: '22mm', right: '22mm' }
      : { top: '25mm', bottom: '25mm', left: '22mm', right: '22mm' };
    const buf = await page.pdf({
      format: 'A4',
      printBackground: true,
      displayHeaderFooter,
      headerTemplate: headerHtml || '<div></div>',
      footerTemplate: footerHtml || '<div></div>',
      margin,
    });
    return buf;
  } finally {
    await page.close();
  }
}

async function renderToPdf(sourcePath, outPath) {
  const md = fs.readFileSync(sourcePath, 'utf8');
  const meta = extractMetadata(md, sourcePath);

  const coverHtmlPath = outPath.replace(/\.pdf$/i, '.cover.html');
  const bodyHtmlPath  = outPath.replace(/\.pdf$/i, '.body.html');
  const debugHtmlPath = outPath.replace(/\.pdf$/i, '.html');

  const coverHtml = renderHtml(md, meta, 'cover');
  const bodyHtml  = renderHtml(md, meta, 'body');

  // For debugging — single HTML that shows both sections.
  fs.writeFileSync(debugHtmlPath, coverHtml);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  try {
    const coverBuf = await renderOnePdf({
      html: coverHtml,
      htmlPath: coverHtmlPath,
      displayHeaderFooter: false,
      browser,
    });
    const bodyBuf = await renderOnePdf({
      html: bodyHtml,
      htmlPath: bodyHtmlPath,
      displayHeaderFooter: true,
      headerHtml: headerTemplate(meta),
      footerHtml: footerTemplate(),
      browser,
    });

    // Merge: cover page first, then body pages.
    const out = await PDFDocument.create();
    const coverDoc = await PDFDocument.load(coverBuf);
    const bodyDoc  = await PDFDocument.load(bodyBuf);
    const coverPages = await out.copyPages(coverDoc, coverDoc.getPageIndices());
    const bodyPages  = await out.copyPages(bodyDoc,  bodyDoc.getPageIndices());
    for (const p of coverPages) out.addPage(p);
    for (const p of bodyPages)  out.addPage(p);

    // PDF metadata — shows in macOS Preview, browser tabs, etc.
    out.setTitle(meta.title);
    out.setAuthor('Worksop Workspace');
    out.setSubject(`${meta.ref} — ${meta.eyebrow}`);
    out.setKeywords([meta.ref, 'Worksop Workspace', meta.status]);
    out.setProducer('Worksop Workspace PDF generator');
    out.setCreator('Worksop Workspace PDF generator');

    const bytes = await out.save();
    fs.writeFileSync(outPath, bytes);
  } finally {
    await browser.close();
  }

  return { outPath, meta };
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
}

if (require.main === module) {
  main().catch(err => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = { renderToPdf, extractMetadata, deriveOutPath, PDF_DIR };
