# Worksop Workspace — Repository Structure

The canonical layout for the Worksop Workspace repo. Anything not
described here either belongs somewhere described here, or doesn't
belong in this repo at all.

Last updated: 16 May 2026.

---

## Philosophy

1. **Three top-level concerns, kept separate**:
    - **`website/`** — everything Vercel serves at `worksopworkspace.com`
    - **`marketing/`** — content assets for Instagram, Facebook, launch
      videos, content plans (private, not deployed)
    - **`knowledge-base/`** — company docs, SOPs, policies, training,
      points of truth (private, not deployed)

2. **Public URLs are locked.** Every folder under `website/` that
   contains an `index.html` corresponds to a live URL. Renaming or
   moving them without `vercel.json` redirects will break the site.

3. **Knowledge base is `.md` only.** No Word docs, no HTML for
   internal docs. Markdown so it's version-controlled, diff-friendly,
   AI-readable, and won't go stale in proprietary formats.

4. **Sensitive operational data lives in Drive**, not the repo — see
   [`knowledge-base/documentation-roadmap.md`](./documentation-roadmap.md)
   §4 for the full list (supplier rates, account numbers, IT
   credentials, etc.).

---

## Top-level layout

```
Worksop Workspace/
├── README.md
├── .gitignore
│
├── website/                # Deployed at worksopworkspace.com
├── marketing/              # Social content, brand assets, launch material
├── knowledge-base/         # Internal docs — SOPs, policies, training
├── tools/                  # Dev tooling (pdf-generator, kb-export)
│
├── pdfs/                   # Build output — gitignored
└── kb-exports/             # Drive backups — gitignored
```

That's it at the top level. If something else is sitting at the
root, it's either being moved or it shouldn't be there.

---

## `website/` — the deployed site

```
website/
├── index.html              # /  (homepage)
├── scroll-scene-preview.html  # Preview/demo of a specific site feature
│
├── robots.txt              # SEO crawler rules
├── sitemap.xml             # SEO URL index
├── site.webmanifest        # PWA manifest
├── favicon.ico
├── favicon.png
├── apple-touch-icon.png
├── icon.png, icon-192.png, icon-512.png
│
├── vercel.json             # Vercel config (cleanUrls: true)
├── package.json            # `npm start` → `npx serve .`
├── serve.js                # Local dev server (Node)
├── serve.pl                # Local dev server (Perl alternative)
├── serve.py                # Local dev server (Python alternative)
│
├── logo.png                # Primary brand lockup (also read by pdf-generator)
├── Bullseye-logo.png       # Sponsor logo — referenced on every page
├── SYPB-logo.png           # Sponsor logo — referenced on every page
├── isometric-floorplan.jpeg  # Used on /space
├── office.mp4              # Used on / (homepage)
│
├── css/
│   └── styles.css          # Site-wide styles (cache-busted ?v=N)
├── js/
│   └── animations.js       # Site-wide JS (cache-busted ?v=N)
│
└── ── Page folders — URL-locked, do not rename ──
    ├── space/              # /space
    ├── membership/         # /membership
    ├── meeting-room/       # /meeting-room
    ├── podcast-studio/     # /podcast-studio (Phase 3)
    ├── community/          # /community
    ├── support/            # /support
    ├── sponsors/           # /sponsors
    ├── contact/            # /contact
    ├── thank-you/          # /thank-you (post-submit)
    ├── bassetlaw/          # /bassetlaw (area page)
    ├── near-doncaster/     # /near-doncaster (location page)
    ├── near-retford/       # /near-retford (location page)
    ├── privacy-policy/     # /privacy-policy
    ├── terms-of-business/  # /terms-of-business
    └── blog/               # /blog + every post under /blog/{slug}
```

**Vercel Root Directory:** the Vercel project is configured with
Root Directory = `website`. That means Vercel treats this subfolder
as the web root, so URLs stay clean (`worksopworkspace.com/contact`
not `worksopworkspace.com/website/contact`).

---

## `marketing/` — social and brand content

Renamed from `Worksop Workspace Social/`. Holds:

```
marketing/
├── CONTENT-PLAN.md
├── MARKETING-PLAN.md
├── Carousel Slides (1080×1080)/
├── Landscape - Facebook & LinkedIn (1200×628)/
├── Square (1080×1080)/
├── Stories (1080×1920)/
├── launch-video-landscape.mp4
└── launch-video-portrait.mp4
```

Not deployed. Not version-controlled for binary assets (Stories etc.
may be heavy and could be moved to Drive if they grow).

---

## `knowledge-base/` — internal docs

The single source of truth for how the company runs. Markdown only.
Cross-linked. The full structure and index is in
[`documentation-roadmap.md`](./documentation-roadmap.md).

Headline folders:

```
knowledge-base/
├── README.md
├── STRUCTURE.md                # This file
├── documentation-roadmap.md    # Master index of every doc
│
├── operations/
│   ├── operating-manual.md
│   ├── points-of-truth.md
│   ├── sops/                   # Numbered SOP-001…SOP-018
│   ├── checklists/             # Daily, weekly, monthly, quarterly
│   ├── training/
│   ├── health-and-safety/
│   ├── legal-and-compliance/
│   ├── hr/
│   └── facilities/
│
├── marketing/                  # Brand + member-facing docs
│   ├── brand/brand-guidelines.md
│   ├── competitor-analysis.md
│   └── members/                # welcome-pack, house-rules, FAQs
│
├── sales/
│   ├── product-offerings.md
│   ├── conversion/             # tour-script, phone-and-enquiry
│   ├── communications/         # email-templates
│   └── crm/                    # ghl-webhook-reference
│
└── ideas/
    ├── ideas-log.md
    ├── scroll-scene-brief.md   # Working notes for the scroll-built scene
    ├── production-plan.md
    ├── generation-prompts.md
    └── wave-speed-setup.md
```

---

## `tools/` — Node tooling

```
tools/
├── pdf-generator/         # Renders staff-facing markdown to branded PDF
│   ├── generate.js
│   ├── render-all.js
│   ├── upload-to-drive.js   # OAuth + push PDFs to Drive
│   ├── template.html
│   ├── styles.css
│   └── README.md
│
└── kb-export/             # Backs up the Drive knowledge base locally
    ├── export.js
    └── README.md
```

Read the per-tool READMEs for usage.

`pdf-generator` reads `website/logo.png` and `website/icon.png` as
brand assets — if those move again, update
[`tools/pdf-generator/generate.js`](../tools/pdf-generator/generate.js)
`LOGO_LOCKUP_PATH` and `LOGO_MARK_PATH`.

---

## Naming conventions

| Thing | Pattern | Example |
|---|---|---|
| Files and folders | kebab-case | `terms-of-business.md` |
| Numbered SOPs | `sop-NNN-name.md` | `sop-004-meeting-room-booking.md` |
| Numbered checklists | `NN-name.md` | `01-daily-opening.md` |
| Image assets | `descriptive-name.ext` | `isometric-floorplan.jpeg` |
| Markdown headings | Title Case for H1, sentence case below | `# Operating Manual` |

---

## What's *not* in the repo

| What | Where it lives |
|---|---|
| Supplier rates, account numbers | Drive `Worksop Workspace HQ/07-facilities/` |
| IT credentials | 1Password |
| Stripe / GHL / Google Workspace admin | Drive `Worksop Workspace HQ/08-technology-and-it/` |
| Insurance policy numbers | Drive `Worksop Workspace HQ/06-legal-and-compliance/` |
| Member contact details | Member app (Stripe + the app provider) |
| CCTV footage | Recording system (30-day retention) |
| Rendered PDFs (canonical copies) | Drive `Worksop Workspace HQ/02-operations/_pdfs/` |
| Bank details, lease, signed contracts | Drive, restricted access |

The repo holds the **structure and policies**. Drive holds the
**specifics**.

---

## When this file goes stale

If you add a top-level folder, rename one of the three big folders,
move tooling around, or change where assets live, update this file.
This is the orientation map — keeping it accurate is cheap;
recovering from a stale map is not.

---

*Worksop Workspace · A space to drop your shoulders.*
*30 Carlton Road, Worksop S80 1PH · hello@worksopworkspace.co.uk · worksopworkspace.com*
