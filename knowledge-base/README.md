# Knowledge Base

The canonical company-doc store for Worksop Workspace. Everything here is a `.md` file so it's version-controlled, diff-friendly, and AI-readable.

This repo is **public**, so this folder only holds non-sensitive operational content (procedures, voice, public-facing rules). Sensitive operational data (utility refs, supplier rates, account numbers, insurance details, fire-risk assessment specifics, GDPR processor refs) lives in the private Google Drive at `Worksop Workspace HQ`. Don't add anything to this folder that you wouldn't be comfortable having scraped.

## What lives where

| File / Folder | What it's for |
|---|---|
| [`essentials/`](./essentials/) | The two foundational docs — start-here and the canonical company facts. Read these first. |
| [`brand/`](./brand/) | Brand identity, voice, visual rules, photography direction, tone of voice. How the brand sounds, looks, and feels. |
| [`operations/`](./operations/) | Day-to-day procedures, SOPs, checklists, training, email templates, vendor references. The "how we do things" library. |
| [`members/`](./members/) | Member-facing content — house rules, welcome pack, FAQs. What members see and read. |
| [`legal/`](./legal/) | Empty in the public repo. Sensitive legal docs (fire risk, GDPR specifics, insurance refs) live in Drive only. |
| [`strategy/`](./strategy/) | Competitor analysis, positioning, roadmaps, market research. |

## Currently populated

- [`essentials/points-of-truth.md`](./essentials/points-of-truth.md)
- [`brand/brand-guidelines.md`](./brand/brand-guidelines.md)
- [`operations/operating-manual.md`](./operations/operating-manual.md)
- [`operations/email-templates.md`](./operations/email-templates.md)
- [`operations/ghl-webhook-reference.md`](./operations/ghl-webhook-reference.md)
- [`operations/sops/`](./operations/sops/) — opening, closing, member onboarding, emergency evacuation
- [`operations/checklists/`](./operations/checklists/) — daily opening, daily closing
- [`operations/training/`](./operations/training/) — tour script, coffee/refreshments, conflict handling, app walkthrough, phone handling, new-staff induction
- [`members/house-rules.md`](./members/house-rules.md)
- [`members/welcome-pack.md`](./members/welcome-pack.md)
- [`members/member-faqs.md`](./members/member-faqs.md)
- [`strategy/competitor-analysis.md`](./strategy/competitor-analysis.md)

## How to use this

- **Before writing copy for the site**: read `essentials/points-of-truth.md` and `brand/brand-guidelines.md` so voice, prices, and facts all line up.
- **Before drafting an automated email**: read `operations/email-templates.md` and `operations/ghl-webhook-reference.md`.
- **Before making a positioning or pricing decision**: read `strategy/competitor-analysis.md`.
- **Before writing a new SOP or training doc**: read `operations/operating-manual.md` first, then the most relevant existing SOP for structure.

## Adding new docs

Use `lowercase-kebab-case` filenames. Always `.md`. Quick decision tree for which subfolder:

- "What's the canonical truth about X?" → `essentials/` (sparingly — usually update `points-of-truth.md` instead)
- "How do we look, sound, feel?" → `brand/`
- "How do we do X?" → `operations/` (or its `sops/`, `checklists/`, `training/` subfolders)
- "What do members see / get / agree to?" → `members/`
- "Why do we do this?" → `strategy/`

Add a one-line entry to the "Currently populated" list above when you create a new doc.

The Drive mirror at `Worksop Workspace HQ` uses numbered prefixes (`00-essentials/`, `02-brand/`, `03-operations/`, etc.) — the repo doesn't, because GitHub auto-renders `README.md` at root and the unprefixed structure is friendlier to git tooling. Both are intentional.
