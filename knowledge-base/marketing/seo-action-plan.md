# SEO & AEO Action Plan — Top 10

**Worksop Workspace** · Marketing · *Phase 3 prioritised actions*

Status: Draft v1 — awaiting Connor sign-off before Phase 4 build · Last updated: 16 May 2026

Source files: `seo-keyword-research.md` (research), `seo-gap-analysis.md` (audit).

---

## How this was prioritised

Each action scored on three dimensions:
- **Impact** (1-3): how much it moves rankings or AEO citations
- **Effort** (1-3, inverted): 3 = easy, 1 = a day's work
- **Risk** (1-3, inverted): 3 = low risk, 1 = could break something

Top 10 picked by Impact × Effort × Risk, then sequenced so easy
wins ship first and bigger pieces ship later.

---

## The top 10, in build order

### 1. Soften the "only coworking space" claim across 9 pages

**Why:** Currently overclaims against Worksop Turbine and Middletons Yard. Risks a reputational issue if a competitor or member challenges it. Plus the softer claim is more credible and AEO-friendly because it's defensibly true.

**What:** Bulk-replace "only dedicated coworking space" with "only modern coworking space in Worksop town centre" (or equivalent — see `seo-keyword-research.md` for the three approved variants). Same change in meta descriptions and JSON-LD descriptions.

**Effort:** 30 min (sed sweep + spot-check)  ·  **Impact:** Medium  ·  **Risk:** Low

---

### 2. Clean up residual `&mdash;` HTML entities

**Why:** The earlier dash sweep missed entity-encoded em-dashes. 7 instances remain on `/membership` and `/space`. Same brand-voice rule.

**What:** `sed` replacement: `&mdash;` → `.` (with smart capitalisation).

**Effort:** 10 min  ·  **Impact:** Low (cosmetic)  ·  **Risk:** Very low

---

### 3. Rewrite the `/space` lead paragraph

**Why:** Most important "category" page after the homepage. Currently opens with a contested claim that doesn't answer the AEO question "what is The Space?". A clean one-sentence answer + product list earns AEO citations.

**What:** Replace the lead with: *"Worksop Workspace is the only modern coworking space in Worksop town centre — walk-in day passes from £12, weekly rolling membership from £30, transparent pricing across hot desks, dedicated desks, private offices, the meeting room and the studio. Every working mode in one building, on Carlton Road."*

**Effort:** 15 min  ·  **Impact:** High  ·  **Risk:** Low

---

### 4. Rewrite the `/membership` lead paragraph

**Why:** Most likely conversion-page citation target. Query "how much does coworking cost in Worksop" should hit this page with a clean answer in the lead. Currently opens with a tagline.

**What:** Replace lead with: *"Worksop Workspace pricing: £12 per day, £30 per week (hot desk), £50 per week (dedicated desk — from Phase 2), from £125 per week (private office), £30 per hour (meeting room), £40 per hour (studio — from Phase 3). All rolling weekly, no long contracts, no setup fee."*

**Effort:** 15 min  ·  **Impact:** High (conversion + AEO)  ·  **Risk:** Low

---

### 5. Add a UK-pricing-context block to `/membership`

**Why:** The UK Q1 2026 coworking report median is £180/mo, day pass £25, meeting room £30/hr (Notts specifically £16/hr). Our equivalent is £130/mo. Contextualising under-market pricing is a story. Also picks up the "how much does coworking cost UK" query.

**What:** New section on `/membership` titled "How this compares to the UK average" with the three median data points cited. Link to the CoworkingCafe Q1 2026 report.

**Effort:** 30 min  ·  **Impact:** Medium-High  ·  **Risk:** Low

---

### 6. Add "(or serviced office)" qualifier to `/private-offices`

**Why:** "Serviced office Worksop" has higher search volume than "private office Worksop", but our page doesn't use the phrase. Same product, both terms valid. Easy SEO win.

**What:** Update H1 from "A private office. From £125 a week." to keep the H1 but add a second-line subtitle / sub-heading mentioning "Also called a serviced office in some listings". Update meta title and description to include both terms. Add an FAQ: "Is this a serviced office or a private office?" answering they're the same thing.

**Effort:** 20 min  ·  **Impact:** Medium  ·  **Risk:** Very low

---

### 7. Add "across Bassetlaw" to `/meeting-room`

**Why:** "Meeting room hire Bassetlaw" has community-grade competition (Bassetlaw CVS, town halls). Our page should explicitly capture the professional intent within Bassetlaw.

**What:** Add a "Used by clients across Bassetlaw" line near the top. Add a section listing the towns we serve ("Worksop, Retford, Tickhill, Bawtry, Maltby, Dinnington, Harworth, Clowne"). Add an FAQ: "Is there a professional meeting room to hire in Bassetlaw?" with a one-sentence answer.

**Effort:** 30 min  ·  **Impact:** Medium-High  ·  **Risk:** Very low

---

### 8. Write the comparison blog post: "Coworking in Worksop — what's actually available and how to pick"

**Why:** Highest-value AEO citation target right now. The query "what are the coworking options in Worksop" has no single-source clean answer. Whoever writes it first becomes the citation.

**What:** A factual comparison blog post covering: Worksop Workspace, Worksop Turbine (The Nest), Middletons Yard, Enterprise Business Centre. For each: location, pricing, what they do well, who they suit. End with a "which one for which kind of work" rubric. Tone: fair and useful, not a hit piece. Brand-voice plain English.

**Effort:** 90 min  ·  **Impact:** High (AEO + organic)  ·  **Risk:** Low (factual, fair, defensible)

---

### 9. Add a "How to find us during school holidays" FAQ + blog post for `/for-parents`

**Why:** "Where to work during school holidays" is a recurring query. `/for-parents` covers it but the exact AEO question isn't asked-and-answered.

**What:** Add an FAQ to `/for-parents`: "Where can I work in Worksop during the school holidays?" with the one-sentence direct answer in the body. Plus write a short blog post: "Where to work during school holidays in Worksop and North Notts" (similar shape to the existing "builders are in" post).

**Effort:** 60 min total  ·  **Impact:** Medium-High  ·  **Risk:** Low

---

### 10. Add `Organization` + `Service`/`Offer` schema across the site

**Why:** Rich-result eligibility. Pricing rich results would be a visible win on Google SERPs. `Organization` supports brand SERPs and knowledge-panel formation.

**What:**
- Add `Organization` JSON-LD to the homepage with logo, sameAs (Instagram, Facebook), contact.
- Add `Service` + `Offer` JSON-LD to `/hot-desks`, `/dedicated-desks`, `/private-offices`, `/meeting-room`, `/podcast-studio` with prices.
- Validate via Google Rich Results Test.

**Effort:** 60 min  ·  **Impact:** Medium-High  ·  **Risk:** Low (schema is additive)

---

## Bonus (11-15) — if there's appetite for more

These didn't make the top 10 but are worth doing soon.

| # | Action | Why |
|---|---|---|
| 11 | Add `llms.txt` at root + verify GPTBot/ClaudeBot/PerplexityBot are allowed in `robots.txt` | Emerging AEO standard. Cheap. |
| 12 | Rewrite `/podcast-studio` schema name from "Podcast Studio" to "Studio" | Consistency with renamed page |
| 13 | Add an A1-corridor blog post for passers-through | New audience tap |
| 14 | Add `FAQPage` schema to the older 12 blog posts that have Q&A sections | AEO reinforcement on existing inventory |
| 15 | `Virtual office Worksop` — product decision needed | Three competitors offer this. Cheap to deliver. Decision: yes/no |

---

## What's **not** in this list

Things I considered and dropped:
- **Targeting "office space to let Worksop"** — Rightmove, JLL, LoopNet own this. Property aggregators are stronger than we'll ever be on this term. Skip.
- **Targeting "business centre Worksop"** — we are not a business centre. Worksop Turbine and Middletons Yard own this term, correctly. Skip.
- **Targeting "conference room Worksop"** — our meeting room caps at 10. Hotels with 230-person rooms own conference. Skip.
- **A `/for-founders` page** — Worksop Turbine's "The Nest" is council-funded with grant signposting. We can't compete on the same offering. The audience is too small for a dedicated page; the founder use case is already covered by `/for-freelancers`.

---

## Build sequencing if approved

If you green-light all 10:

| Phase 4 batch | Actions | Rough effort | Cumulative |
|---|---|---|---|
| **A** (quick wins) | 1, 2, 3, 4, 6 | 90 min | 90 min |
| **B** (medium) | 5, 7, 10 | 2h | 3.5h |
| **C** (longer-form content) | 8, 9 | 2.5h | 6h |

Total: roughly half a working day for all 10. Each batch gets its
own commit + push so you can review live before the next ships.

---

## Sign-off

Before I move to Phase 4, please confirm:

1. **Top 10 list is approved** (or tell me which to swap out).
2. **The "only coworking space" softening is approved** — pick a
   variant from `seo-keyword-research.md` §"Soften these claims"
   or write your own.
3. **The virtual-office decision** — add the service, or skip the
   keyword. (My recommendation: skip for now; revisit once we
   have 10+ private offices booked.)
4. **The comparison blog post tone** — are you comfortable with a
   factual, fair comparison naming the other Worksop providers?
   It's the highest-impact item in the list but it does name them.
5. **Anything missing** that you want included.

Reply with "go" and any tweaks and I'll start Phase 4 batch A
immediately.

---

*Worksop Workspace · A space to drop your shoulders.*
*30 Carlton Road, Worksop S80 1PH · hello@worksopworkspace.co.uk · worksopworkspace.com*
