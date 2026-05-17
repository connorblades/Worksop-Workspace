# Per-Page Audit Summary (Phase C)

*Worksop Workspace · Design Audit · 17 May 2026*

Walked all 58 HTML pages and grouped findings by page type and severity. Rather than producing 58 individual notes, this summary captures the patterns and lists which pages need which fixes. Page-by-page polish in Phase E applies the fixes.

---

## Page taxonomy and overall scores

Out of 10, where 10 is state-of-the-art polish. Subjective.

| Page type | Pages | Avg score |
|---|---|---|
| Core landing (/, /space, /community, /membership) | 4 | 8.5 |
| New product (/private-offices, /meeting-room, /hot-desks, /dedicated-desks, /podcast-studio) | 5 | 8.0 |
| Audience (/for-* and /working-from-home-alternative, /private-room-for-1-to-1s) | 6 | 7.5 |
| Location (/near-* and /bassetlaw) | 9 | 7.0 |
| Blog (index and 23 posts) | 24 | 6.5 |
| Sponsors / support / legal | 4 | 7.0 |
| Contact / thank-you | 2 | 8.0 |

Best examples of the brand: `/private-offices`, `/membership`, `/space`, `/`. Weakest: older blog posts pre-May 2026, `/sponsors` (sparse), `/scroll-scene-preview` (developer page, ship it but no audit needed).

---

## What every page passes already

After the Phase A+B+D foundation work:

- All 57 user-facing pages have a working dropdown nav.
- All 57 pages have the correct 2:1 logo aspect ratio (Phase B fix).
- All 57 pages have a `<main id="site-main">` element and a skip-to-main link (Phase C wrap pass).
- Body text is 17px / line-height 1.7 (decent baseline).
- All blog posts use `.blog-post-wrap` with the 720px prose width (good).
- All FAQs use the `<details>` accordion pattern.
- Page-banners are consistent (espresso bg, oak kicker, white h1).
- WCAG AA contrast passes on body and headings.

---

## What still needs page-by-page work

### Group 1. Subtitle and lead contrast (every page)

The Phase D bump from rgba(255,255,255,0.55) to 0.78 fixed the global subtitle contrast on dark sections. No per-page action needed.

### Group 2. Body text reading width (some pages)

Pages where body paragraphs span the full 1100px container are hard to read. Affected:

- `/space` (line 110 lead paragraph: full-width)
- `/membership` (line 108 lead pricing paragraph: full-width)
- `/community` (intro paragraph: full-width)
- `/bassetlaw` (lead text)
- All older audience pages
- All older location pages

**Fix:** wrap long-form prose in a `<div class="prose">` or apply `max-width: var(--max-prose); margin-inline: auto;` inline. Phase E applies this to the worst offenders.

### Group 3. Heading hierarchy slips

A handful of pages skip from h1 to h3 (no h2). Affected:

- `/sponsors` (h1 to h3 directly)
- A few older blog posts

**Fix:** rename h3 to h2 where appropriate. Phase E for blog posts. /sponsors is sparse anyway.

### Group 4. Older blog posts pre-May 2026 readability

Pre-May 2026 blog posts (12 posts) have:
- Less tight typography
- Often no `.blog-post-callout` highlight
- Sometimes no FAQ section
- Some lack a featured image

The post-May 2026 batch (where-to-work-when-the-builders-are-in, alternatives-to-coffee-shops, coworking-options-in-worksop, where-to-work-during-school-holidays, coworking-stops-on-the-a1, bassetlaw-broadband-2026, cost-of-working-in-worksop-2026) are template-clean and readable.

**Fix:** the Phase D blog-post-body bump (17px to 18px, h2 22px to 24px, h3 18px to 19px) helps every post automatically. No per-post action needed for typography. Refresh content of the worst-performing old posts is a separate "blog refresh" workstream, out of scope for design.

### Group 5. CTA button hierarchy

Some pages have 3+ competing CTAs in close proximity. Worst offenders:

- `/` (homepage has CTA in hero, pricing, audience, journal teaser, sponsors, contact, footer)
- `/membership` (pricing cards each have their own CTA, then a final CTA section)

This is by design for conversion. Don't change.

### Group 6. Image alt text

Spot-checked 20 pages. Most images have meaningful alt text. Exceptions:

- A few Pexels images in older blog posts have generic alts ("Person working")
- Logo refs are all good ("Worksop Workspace" or "Bullseye Properties Ltd")
- Decorative images (background patterns) correctly have `alt=""`

**Fix:** sweep older blog posts to improve alt specificity. Phase E batch.

### Group 7. Image lazy loading

Most images use `loading="lazy"`. The hero/above-fold images on each page use `fetchpriority="high"` and no lazy (correct).

Spot-checked: clean. No fix needed.

### Group 8. CSS shorthand `.d1` vs `.delay-1` legacy

Phase D documented this as a cleanup item. Defer to Phase F.

---

## Phase E target list (page-by-page polish)

Priority order. One commit per batch.

### Batch E1. Core landing pages (4 pages)
- `/` (homepage)
- `/space`
- `/membership`
- `/community`

Apply:
- Prose max-width on lead paragraphs (already inline in places, normalise)
- Verify heading hierarchy
- Check button hierarchy

### Batch E2. Product pages (5 pages)
- `/private-offices`
- `/meeting-room`
- `/hot-desks`
- `/dedicated-desks`
- `/podcast-studio`

Apply:
- Already strong, verify Phase D foundation changes render correctly
- Check pricing card spacing in light of new shadow tokens

### Batch E3. Audience pages (6 pages)
- `/for-tradespeople`, `/for-parents`, `/for-freelancers`, `/for-remote-workers`
- `/working-from-home-alternative`
- `/private-room-for-1-to-1s`

Apply:
- Prose max-width on long-form intro paragraphs
- Verify all use the dropdown nav (they do)

### Batch E4. Location pages (9 pages)
- `/near-*` (8 of them) + `/bassetlaw`

Apply:
- Template is identical across these 8; one fix sweeps all
- Verify breadcrumb spacing
- Verify intro paragraph reading width

### Batch E5. Blog and posts (24 pages)
- `/blog` index
- 23 individual posts

Apply:
- The Phase D blog-post-body type ramp handles most of this automatically
- Spot-fix alt text on older posts
- Verify featured image aspect ratio

### Batch E6. Legal / support pages (4 pages)
- `/sponsors`, `/support`, `/privacy-policy`, `/terms-of-business`

Apply:
- Lighter touch. These are reference pages
- Prose max-width on long-form legal copy

### Batch E7. Contact / Thank-you (2 pages)
- `/contact`, `/thank-you`

Apply:
- Quick consistency check, minimal changes expected

---

## What we're not doing

Out of scope for this design audit:

- Content rewrites (a separate workstream)
- New components or sections (sticking to polish)
- Backend/form changes (GHL stays untouched)
- Performance changes that risk SEO assets (sitemap, llms.txt, JSON-LD)
- Em-dash reintroduction (locked constraint)
- Adding cookie banners or other intrusive UI

---

## Next phase recommendations

- Phase E: apply page-level fixes per batches above
- Phase F: motion + state-of-the-art polish (arrow icons on CTAs, refined hover, gradient dividers)
- Phase G: performance pass (image format upgrade to WebP/AVIF, defer non-critical JS)
- Phase H: accessibility certification (axe-style sweep)
- Phase I: final consistency sweep
