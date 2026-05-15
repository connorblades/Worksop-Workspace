#!/usr/bin/env node
/**
 * Render every staff-facing knowledge-base doc to a branded PDF.
 *
 * The list is curated — see the conversion brief. Reference / strategy /
 * member-facing docs are intentionally excluded.
 *
 * Usage:  node render-all.js
 */

'use strict';

const path = require('node:path');
const fs = require('node:fs');
const { renderToPdf, deriveOutPath, PDF_DIR } = require('./generate');

const REPO_ROOT = path.resolve(__dirname, '..', '..');

const DOCS = [
  'knowledge-base/operations/operating-manual.md',
  'knowledge-base/operations/sops/sop-001-opening-the-space.md',
  'knowledge-base/operations/sops/sop-002-closing-the-space.md',
  'knowledge-base/operations/sops/sop-003-member-onboarding-tour.md',
  'knowledge-base/operations/sops/sop-010-emergency-evacuation.md',
  'knowledge-base/operations/checklists/01-daily-opening.md',
  'knowledge-base/operations/checklists/02-daily-closing.md',
  'knowledge-base/sales/conversion/tour-script.md',
  'knowledge-base/operations/training/coffee-and-refreshments.md',
  'knowledge-base/operations/training/member-conflict-handling.md',
  'knowledge-base/operations/training/app-and-booking-walkthrough.md',
  'knowledge-base/sales/conversion/phone-and-enquiry-handling.md',
  'knowledge-base/operations/training/new-staff-induction.md',
  'knowledge-base/operations/legal-and-compliance/terms-of-business.md',
];

async function main() {
  if (!fs.existsSync(PDF_DIR)) fs.mkdirSync(PDF_DIR, { recursive: true });

  const results = [];
  const failures = [];
  for (const rel of DOCS) {
    const src = path.join(REPO_ROOT, rel);
    if (!fs.existsSync(src)) {
      console.error(`MISSING: ${rel}`);
      failures.push({ rel, error: 'file not found' });
      continue;
    }
    const out = deriveOutPath(src);
    console.log(`→ ${rel}`);
    try {
      const r = await renderToPdf(src, out);
      console.log(`  ✓ ${path.relative(REPO_ROOT, r.outPath)}`);
      results.push(r);
    } catch (err) {
      console.error(`  ✗ ${err.message}`);
      failures.push({ rel, error: err.message });
    }
  }

  console.log(`\nRendered ${results.length}/${DOCS.length} docs to ${path.relative(REPO_ROOT, PDF_DIR)}/`);
  if (failures.length) {
    console.log(`Failures:`);
    for (const f of failures) console.log(`  - ${f.rel}: ${f.error}`);
    process.exit(1);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
