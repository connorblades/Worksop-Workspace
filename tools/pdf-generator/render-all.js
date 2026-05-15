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
  // Operating manual
  'knowledge-base/operations/operating-manual.md',

  // SOPs
  'knowledge-base/operations/sops/sop-001-opening-the-space.md',
  'knowledge-base/operations/sops/sop-002-closing-the-space.md',
  'knowledge-base/operations/sops/sop-003-member-onboarding-tour.md',
  'knowledge-base/operations/sops/sop-004-meeting-room-booking.md',
  'knowledge-base/operations/sops/sop-005-day-pass-walk-in.md',
  'knowledge-base/operations/sops/sop-006-new-member-sign-up.md',
  'knowledge-base/operations/sops/sop-007-member-cancellation.md',
  'knowledge-base/operations/sops/sop-008-deliveries-and-post.md',
  'knowledge-base/operations/sops/sop-009-lost-and-found.md',
  'knowledge-base/operations/sops/sop-010-emergency-evacuation.md',
  'knowledge-base/operations/sops/sop-011-first-aid-and-injury.md',
  'knowledge-base/operations/sops/sop-012-lockouts-and-keys.md',
  'knowledge-base/operations/sops/sop-013-wifi-or-network-outage.md',
  'knowledge-base/operations/sops/sop-018-complaints-handling.md',

  // Checklists
  'knowledge-base/operations/checklists/01-daily-opening.md',
  'knowledge-base/operations/checklists/02-daily-closing.md',
  'knowledge-base/operations/checklists/03-weekly-deep-clean.md',
  'knowledge-base/operations/checklists/04-monthly-business-review.md',
  'knowledge-base/operations/checklists/05-quarterly-fire-safety-check.md',

  // Training and sales-conversion scripts
  'knowledge-base/sales/conversion/tour-script.md',
  'knowledge-base/sales/conversion/phone-and-enquiry-handling.md',
  'knowledge-base/operations/training/coffee-and-refreshments.md',
  'knowledge-base/operations/training/member-conflict-handling.md',
  'knowledge-base/operations/training/app-and-booking-walkthrough.md',
  'knowledge-base/operations/training/new-staff-induction.md',

  // Health, safety & compliance
  'knowledge-base/operations/health-and-safety/health-and-safety-policy.md',
  'knowledge-base/operations/health-and-safety/fire-safety-policy.md',
  'knowledge-base/operations/health-and-safety/first-aid-policy.md',
  'knowledge-base/operations/health-and-safety/accident-and-incident-report.md',
  'knowledge-base/operations/health-and-safety/risk-assessment-framework.md',

  // Legal & data protection
  'knowledge-base/operations/legal-and-compliance/terms-of-business.md',
  'knowledge-base/operations/legal-and-compliance/privacy-policy.md',
  'knowledge-base/operations/legal-and-compliance/data-protection-and-gdpr.md',
  'knowledge-base/operations/legal-and-compliance/cctv-policy.md',
  'knowledge-base/operations/legal-and-compliance/data-breach-response.md',
  'knowledge-base/operations/legal-and-compliance/complaints-policy.md',

  // HR — staff
  'knowledge-base/operations/hr/staff-handbook.md',
  'knowledge-base/operations/hr/holiday-and-leave-policy.md',
  'knowledge-base/operations/hr/sickness-and-absence-policy.md',
  'knowledge-base/operations/hr/conduct-and-disciplinary.md',

  // Facilities reference templates
  'knowledge-base/operations/facilities/equipment-inventory.md',
  'knowledge-base/operations/facilities/suppliers-and-contractors.md',
  'knowledge-base/operations/facilities/cleaning-schedule.md',
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
