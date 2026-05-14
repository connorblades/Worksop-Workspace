# Worksop Workspace — Repository Structure

This is the canonical layout for the Worksop Workspace repo. Anything not described here either belongs somewhere described here, or doesn't belong in this repo at all.

## Philosophy

1. **Public URLs are locked.** Every folder at the root that contains an `index.html` corresponds to a live URL (`/membership/` → `worksopworkspace.com/membership`). Don't rename or move these folders without 301 redirects in `vercel.json`.
2. **Knowledge base is `.md` only.** No Word docs, no HTML for internal docs. Markdown so it's version-controlled, diff-friendly, AI-readable, and won't go stale in proprietary formats.
3. **Three top-level concerns, kept separate:**
   - **The website** — everything Vercel serves
   - **The knowledge base** — company docs, SOPs, points of truth (private, not deployed)
   - **Social media** — content assets for Instagram, Facebook, etc. (private, not deployed)

## Top-level layout

```
worksop-workspace/
│
├── README.md                       # Top-level project orientation
├── STRUCTURE.md                    # This file
├── .gitignore
│
├── ── WEBSITE ROOT ────────────────────────────────────────────
├── index.html                      # /  (homepage)
├── robots.txt                      # SEO: crawler rules
├── sitemap.xml                     # SEO: URL index
├── site.webmanifest                # PWA manifest
├── favicon.ico                     # Browser-expected at root
├── favicon.png
├── apple-touch-icon.png            # iOS-expected at root
├── icon.png, icon-192.png, icon-512.png   # PWA icons
├── .htaccess                       # Apache config
├── vercel.json                     # Vercel config + redirects
├── package.json                    # Dev dependencies
├── serve.js                        # Local dev server (only one we keep)
│
├── css/
│   └── styles.css                  # Site-wide styles (cache-busted ?v=N)
│
├── js/
│   └── animations.js               # Site-wide JS, GHL webhook, chat widget (cache-busted ?v=N)
│
├── assets/                         # All content media referenced by HTML
│   ├── img/                        # Logos, photos, illustrations
│   └── video/                      # MP4s used on the site
│
├── ── PAGE FOLDERS (URLs preserved — DO NOT RENAME) ───────────
├── space/                          # /space
├── membership/                     # /membership  (pricing page)
├── meeting-room/                   # /meeting-room
├── podcast-studio/                 # /podcast-studio  (Phase 2)
├── community/                      # /community
├── support/                        # /support
├── sponsors/                       # /sponsors
├── contact/                        # /contact
├── thank-you/                      # /thank-you  (post-submit page)
├── bassetlaw/                      # /bassetlaw  (area page)
├── near-doncaster/                 # /near-doncaster  (location page)
├── near-retford/                   # /near-retford  (location page)
├── privacy-policy/                 # /privacy-policy
├── terms-of-business/              # /terms-of-business
└── blog/                           # /blog
    ├── index.html                  # /blog
    └── <post-slug>/index.html      # /blog/<post-slug>
│
├── ── KNOWLEDGE BASE (private — not deployed) ─────────────────
└── knowledge-base/
    ├── README.md                   # Index of what's in here
    ├── points-of-truth.md          # Canonical brand/company facts
    ├── brand/
    │   └── brand-guidelines.md     # Visual + verbal system, voice rules
    ├── operations/
    │   ├── email-templates.md      # Customer auto-reply drafts per GHL tag
    │   └── ghl-webhook-reference.md # Webhook fields, tag map, merge tags
    ├── legal/                      # Terms drafts, internal policies (empty)
    └── strategy/
        └── competitor-analysis.md  # Local Worksop competitor research + gaps
│
└── ── SOCIAL MEDIA (private — not deployed) ───────────────────
    └── social-media/               # Content assets for social channels
        └── (organize by channel or campaign as it grows)
```

## Where does X go?

| If you want to add… | Put it in… |
|---|---|
| A new blog post | `blog/<post-slug>/index.html` |
| A new city / location page | `near-<city>/index.html` |
| A new SOP | `knowledge-base/operations/<sop-name>.md` |
| A new internal policy or contract | `knowledge-base/legal/<doc-name>.md` |
| A brand voice document | `knowledge-base/brand/<topic>.md` |
| A strategy / planning document | `knowledge-base/strategy/<doc-name>.md` |
| An image used on the website | `assets/img/<descriptive-name>.<ext>`<br>Reference as `/assets/img/<name>.<ext>` |
| A video used on the website | `assets/video/<name>.mp4`<br>Reference as `/assets/video/<name>.mp4` |
| A social media post asset | `social-media/<channel-or-campaign>/<name>.<ext>` |
| A new page on the website | New folder at root: `<slug>/index.html`<br>Then add to `sitemap.xml` and the footer nav |

## Files that MUST stay at the repo root

These have URL or filesystem expectations from browsers, search engines, or deploy tools — moving them breaks things:

- `favicon.ico`, `favicon.png`, `icon-*.png`, `apple-touch-icon.png`
- `robots.txt`, `sitemap.xml`
- `site.webmanifest`
- `.htaccess`, `vercel.json`, `package.json`
- `index.html` (the homepage)

## What's deliberately *not* in this repo

- Word docs / Google Docs / Notion exports — convert to `.md` first and put in `knowledge-base/`
- Customer data, GHL exports, payment records — these live in GHL / Stripe / wherever, never in git
- Large source files (raw video, PSDs, Figma exports) — put on Drive / Dropbox / cloud storage and link to them in the relevant knowledge-base doc
- Personal / scratch notes — keep on your machine, gitignored
- API keys, webhook URLs that aren't already public — these stay out of the repo entirely

## Token-scoping cheat sheet

When asking Claude to work on a specific area, name the folder up front so it doesn't load the whole site into context:

| What you're changing | Tell Claude |
|---|---|
| The pricing page | "Work in `membership/`" |
| The waitlist form site-wide | "Update the `<form id=\"waitlist-form\">` in every page" |
| A specific blog post | "Work in `blog/<post-slug>/`" |
| All blog posts | "Work in `blog/`" |
| Legal pages | "Work in `privacy-policy/` and `terms-of-business/`" |
| Location pages | "Work in `bassetlaw/`, `near-doncaster/`, `near-retford/`" |
| Site-wide JS / forms / GHL webhook | "Work in `js/animations.js`" |
| Site-wide CSS | "Work in `css/styles.css`" |
| Knowledge base (any doc) | "Work in `knowledge-base/`" |
| A specific knowledge category | "Work in `knowledge-base/operations/`" (or brand/, legal/, strategy/) |
| Social media assets | "Work in `social-media/`" |
| Adding a new image to the site | "Add to `assets/img/` and update HTML references" |

## Naming conventions

**One rule, enforced everywhere:** `lowercase-kebab-case` for every file and folder. No exceptions.

- All lowercase. No `CamelCase`, no `PascalCase`, no `SHOUTING`.
- Words separated by a single hyphen. No underscores. No spaces.
- No special characters: `()`, `&`, `$`, `?`, `!`, `'`, etc.
- Concise but descriptive. Use full words. Abbreviate only when the abbreviation is universally understood (`html`, `css`, `js`, `url`, `seo`, `pdf`, `sypb`).
- File extensions are always lowercase: `.md`, `.html`, `.png`, `.mp4`, never `.MD` or `.PNG`.

### Patterns by file type

| Type | Pattern | Example |
|---|---|---|
| HTML page folder | `<topic>/` containing `index.html` | `meeting-room/` |
| Blog post folder | `<descriptive-slug>/` | `why-coworking-worksop-is-growing/` |
| Knowledge base doc | `<topic>.md` | `brand-guidelines.md` |
| Image asset | `<descriptive-name>.<ext>` | `bullseye-logo.png` |
| Video asset | `<name-or-context>.<ext>` | `office-walkthrough.mp4` |
| Date-stamped doc (when chronology matters) | `YYYY-MM-DD-<name>.md` | `2026-05-12-launch-checklist.md` |
| Social media asset | `<channel>/<date-or-campaign>-<slug>.<ext>` | `instagram/2026-06-01-launch-reveal.jpg` |

### When to use date-prefixed names

Use `YYYY-MM-DD-` only when:

- The file is **time-sensitive** and order matters when listed alphabetically (launch checklists, incident reports, monthly market updates).
- You'll have **multiple versions over time** that you want to keep separate.

Don't date-stamp **living documents** like `brand-guidelines.md` or `points-of-truth.md` — those are continuously updated in place.

### Anti-patterns to avoid

- ❌ `Bullseye-logo.png` (capital letter) → ✅ `bullseye-logo.png`
- ❌ `Worksop Workspace Social/` (spaces, capitals) → ✅ `social-media/`
- ❌ `office_main_backup.mp4` (underscores) → ✅ `office-backup.mp4`
- ❌ `meetingRoomFAQ.md` (camelCase, abbreviation) → ✅ `meeting-room-faq.md`
- ❌ `2026 Sponsor Pack (Final v2).pdf` → ✅ `2026-sponsor-pack.pdf`

## Cache-busting reminder

Two files are loaded everywhere with a `?v=N` cache buster:
- `css/styles.css?v=N`
- `js/animations.js?v=N`

**Every time you edit either of these, bump the version site-wide before pushing.** Otherwise visitors get the cached old file. One-liner:

```bash
grep -rl 'animations\.js?v=N' --include="*.html" . --exclude-dir=".claude" --exclude-dir=".git" \
  | xargs sed -i '' 's|animations\.js?v=N|animations.js?v=N+1|g'
```

Replace `N` with the current version and `N+1` with the next.
