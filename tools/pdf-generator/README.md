# PDF generator — Worksop Workspace knowledge base

Renders staff-facing markdown docs into branded A4 PDFs that match the
Worksop Workspace brand system (see
`knowledge-base/marketing/brand/brand-guidelines.md`).

## What gets rendered

The list is curated in `render-all.js`. It contains operations manuals,
SOPs, checklists, training docs, and the internal-review draft of the
terms of business — everything a staff member follows along with. It
does **not** include member-facing material (welcome pack, house rules,
FAQs — those get a different design treatment), strategy docs, or
copy-paste-source files.

## Source of truth

The `.md` file is the source of truth. PDFs are derivatives. If a doc
changes, regenerate the PDF — never edit the PDF directly.

## Install and run

```sh
cd tools/pdf-generator
npm install
npm run render:all          # render every doc in the curated list
node generate.js path/to/source.md   # render a single doc
```

Output goes to `/pdfs/` at the repo root. The directory is gitignored
because PDFs bloat git history; canonical copies live in the Drive
folder `Worksop Workspace HQ/02-operations/_pdfs/`.

For each doc the renderer also writes a `.html` file beside the `.pdf`
to make layout debugging easy — open it in a browser and use the print
preview to see exactly what Puppeteer printed.

## Brand rules baked into the template

- **Font** — Outfit from Google Fonts (weights 300–800), with a
  `system-ui` fallback chain. Never falls back to a serif.
- **Palette** — Espresso `#1A1714` body text on White `#FFFFFF`, Linen
  `#F5F1EA` for soft section tints, Stone `#5C5C58` for secondary,
  Sage `#8E9775` for eyebrow text, Terracotta Clay `#C57B57` reserved
  for the cover-page underline and the running status marker.
- **Status** — every doc's `Status: …` line is parsed from the markdown
  and shown on the cover page **and** in the running header on every
  body page. Draft = Clay, Approved = Sage, otherwise Stone.
- **Tables** — no full borders. Header row gets a single Stone underline.
- **Bullets** — small Sage dot. No icons, no drop shadows, no gradients.
- **Page format** — A4 portrait, 25mm top/bottom and 22mm left/right
  margins, page numbers centred in the footer, address on the right.

## How the markdown is parsed

The renderer pulls the title, eyebrow line (`**Worksop Workspace** · …`),
`Status: …` line, and last-updated date from the conventional doc
header. The cover page renders that metadata; the running header carries
the status forward. The trailing `*Worksop Workspace · A space to drop
your shoulders.*` wordmark line is stripped from the body because the
cover page and footer already say the same thing.

If you add a new doc that doesn't follow the convention, the renderer
still produces something usable — it just falls back to deriving the
eyebrow from the file path and using a generic "Working draft" status.

## Regenerating after edits

Re-run `npm run render:all` whenever any source doc changes, then
upload the new PDFs to Drive (the canonical copies are in
`Worksop Workspace HQ/02-operations/_pdfs/`). Treat the local
`/pdfs/` directory as a build output — safe to delete and regenerate.
