# Knowledge Base

The canonical company-doc store for Worksop Workspace. Everything here is a `.md` file so it's version-controlled, diff-friendly, and AI-readable.

**These files are private — they're in the repo for version control but are not deployed to the public website.** (If `vercel.json` doesn't already exclude this folder, that's the next thing to set up.)

## What lives where

| File / Folder | What it's for |
|---|---|
| [`points-of-truth.md`](./points-of-truth.md) | **The canonical reference.** Brand facts, company facts, addresses, prices, opening hours, what's true *now*. Update this whenever a stated fact about the business changes. Every other doc — and every marketing decision — should defer to this. |
| [`brand/`](./brand/) | Brand identity, voice, visual rules, photography direction, tone of voice. How the brand sounds, looks, and feels. |
| [`operations/`](./operations/) | Day-to-day procedures, email templates, SOPs, vendor references. The "how we do things" library. |
| [`legal/`](./legal/) | Internal-only legal references (drafts, contract templates, internal policies). Not customer-facing — those live in [`/terms-of-business/`](../terms-of-business/) and [`/privacy-policy/`](../privacy-policy/) on the public site. |
| [`strategy/`](./strategy/) | Competitor analysis, positioning, roadmaps, market research. Anything that informs *why* we do what we do. |

## Currently populated

- [`points-of-truth.md`](./points-of-truth.md)
- [`brand/brand-guidelines.md`](./brand/brand-guidelines.md)
- [`operations/email-templates.md`](./operations/email-templates.md)
- [`operations/ghl-webhook-reference.md`](./operations/ghl-webhook-reference.md)
- [`strategy/competitor-analysis.md`](./strategy/competitor-analysis.md)

## How to use this

- **Before writing copy for the site**: read `points-of-truth.md` and `brand/brand-guidelines.md` so the voice, prices, and facts all line up.
- **Before drafting an automated email**: read `operations/email-templates.md` and `operations/ghl-webhook-reference.md`.
- **Before making a positioning or pricing decision**: read `strategy/competitor-analysis.md`.

## Adding new docs

Use kebab-case filenames. Always `.md`. If you're not sure which subfolder a new doc belongs in, the rule of thumb:

- "What's true?" → root or `brand/`
- "How do we do X?" → `operations/`
- "Why do we do this?" → `strategy/`
- "What's the legal position on X?" → `legal/`

Add a one-line entry to the "Currently populated" list above when you create a new doc.
