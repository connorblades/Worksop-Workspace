# Knowledge Base

The canonical company-doc store for Worksop Workspace. Everything here is a `.md` file so it's version-controlled, diff-friendly, and AI-readable.

This repo is **public**, so this folder only holds non-sensitive operational content. Sensitive operational data (utility refs, supplier rates, account numbers, insurance details, fire-risk specifics, GDPR processor refs) lives in the private Google Drive at `Worksop Workspace HQ`. Don't add anything to this folder that you wouldn't be comfortable having scraped.

## Top-level structure

```
knowledge-base/
├── sales/          Customer acquisition, CRM, conversion
├── operations/     How the space runs day to day
├── marketing/      Brand, members, content, competitor analysis
├── finance/        Pricing history, expenses, summaries
└── ideas/          Future possibilities — nothing committed
```

The Drive mirror at `Worksop Workspace HQ` uses numbered prefixes (`01-sales/`, `02-operations/`, `03-marketing/`, `04-finance/`, `05-ideas/`, plus `00-essentials/` and `99-archive/`). The repo doesn't use numbered prefixes because GitHub auto-renders `README.md` at root and the unprefixed structure is friendlier to git tooling.

## What lives where

### [`sales/`](./sales/)

Everything customer-acquisition and conversion-related.

- [`product-offerings.md`](./sales/product-offerings.md) — every product we sell, price, who it's for, sales talk track
- [`communications/email-templates.md`](./sales/communications/email-templates.md) — customer auto-reply drafts per GHL tag
- [`conversion/tour-script.md`](./sales/conversion/tour-script.md) — what to say during a member tour
- [`conversion/phone-and-enquiry-handling.md`](./sales/conversion/phone-and-enquiry-handling.md) — phone scripts for common enquiries
- [`crm/ghl-webhook-reference.md`](./sales/crm/ghl-webhook-reference.md) — Go High Level webhook fields, tags, merge tags

### [`operations/`](./operations/)

How the space actually runs. The biggest folder by content volume.

- [`points-of-truth.md`](./operations/points-of-truth.md) — **the canonical company facts**. Every other doc defers to this.
- [`operating-manual.md`](./operations/operating-manual.md) — master "how the space runs"
- [`sops/`](./operations/sops/) — numbered standard operating procedures (opening, closing, member onboarding, emergency evacuation)
- [`checklists/`](./operations/checklists/) — daily opening and closing tick lists
- [`training/`](./operations/training/) — staff training (coffee/refreshments, conflict handling, app walkthrough, new-staff induction)
- [`legal-and-compliance/`](./operations/legal-and-compliance/) — terms of business and other internal legal references
- [`strategy/`](./operations/strategy/) — roadmap, phase plans (currently empty)

### [`marketing/`](./marketing/)

Brand, member-facing materials, and outward-facing content.

- [`brand/brand-guidelines.md`](./marketing/brand/brand-guidelines.md) — visual + verbal system, voice rules
- [`members/house-rules.md`](./marketing/members/house-rules.md) — rules of conduct in the space
- [`members/welcome-pack.md`](./marketing/members/welcome-pack.md) — what new members get on day one
- [`members/member-faqs.md`](./marketing/members/member-faqs.md) — the questions members actually ask
- [`competitor-analysis.md`](./marketing/competitor-analysis.md) — local Worksop competitor research and gaps
- `events-and-community/` — future
- `content/` — future
- `partnerships/` — future

### [`finance/`](./finance/)

Pricing history, expenses, monthly summaries. Currently empty in the repo — actual financial records live in the private Drive.

### [`ideas/`](./ideas/)

Future possibilities. Nothing here is committed.

- [`ideas-log.md`](./ideas/ideas-log.md) — running list of future events, services, partnerships, etc.

## How to use this

- **Before writing copy for the site**: read `operations/points-of-truth.md` and `marketing/brand/brand-guidelines.md` so voice, prices, and facts all line up.
- **Before drafting an automated email**: read `sales/communications/email-templates.md` and `sales/crm/ghl-webhook-reference.md`.
- **Before making a positioning or pricing decision**: read `marketing/competitor-analysis.md` and `sales/product-offerings.md`.
- **Before writing a new SOP or training doc**: read `operations/operating-manual.md` first, then the most relevant existing SOP for structure.
- **Before drafting a member-facing communication**: read `marketing/members/welcome-pack.md` and `marketing/members/house-rules.md`.

## Adding new docs

Use `lowercase-kebab-case` filenames. Always `.md`. Quick decision tree:

- "Customer acquisition, conversion, or CRM?" → `sales/`
- "How the space actually runs day-to-day?" → `operations/`
- "Brand, member-facing, content, or competitor work?" → `marketing/`
- "Money?" → `finance/` (sensitive data → Drive only)
- "Future possibility, not yet committed?" → `ideas/`

Add a one-line entry to the relevant section above when you create a new doc.

## Cache busters reminder

If a doc you touch is referenced by the live website (e.g. anything that affects pricing copy or T&Cs), confirm the website is updated and the relevant `?v=N` query strings on `css/styles.css` or `js/animations.js` are bumped. Most knowledge-base docs are internal-only and don't trigger this — but cross-check.
