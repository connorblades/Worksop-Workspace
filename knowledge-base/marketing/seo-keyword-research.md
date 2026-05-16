# SEO & AEO Keyword Research — Worksop Workspace

**Worksop Workspace** · Marketing · *Phase 1 research (no edits made)*

Status: Draft v1 — for Connor review · Last updated: 16 May 2026

---

## What this is

A keyword and AI-answer-engine landscape for worksopworkspace.com.
Built by checking live Google SERPs for our target queries,
fetching the top results, and mapping each query to the page on
our site that should rank for it.

This file is research only. The action plan based on it is
`seo-action-plan.md` and the gap analysis is
`seo-gap-analysis.md`.

---

## Headline findings

1. **We have more local competition than we previously thought.**
   Three other workspaces in Worksop town show up in SERPs:
   *Worksop Turbine* (Nottinghamshire County Council, Shireoaks,
   S81 8AP, "The Nest" coworking from ~£250+VAT/month);
   *Middletons Yard* (Potter Street, Bassetlaw Council-linked,
   30 offices, hot desks half-day to full month, 2 meeting rooms,
   pricing opaque); *Enterprise Business Centre* (also Carlton
   Road). All three are .gov-adjacent or established business
   centres. Our claim of "the only dedicated coworking space in
   Worksop" needs nuance — see *Soften* §below.

2. **Worksop Workspace ranks page 1 for the brand-and-near-brand
   queries we'd expect.** `Worksop Workspace` (#1), `coworking
   Worksop` (#7), `is there a coworking space in Worksop` (#3).
   These are healthy positions for a site barely 6 weeks of
   indexed content. AEO citations are already happening — Google's
   summaries lift directly from our meta descriptions.

3. **Several high-intent queries are pure greenfield for us.**
   *Private therapy room hire Worksop*, *podcast studio Bassetlaw*,
   *coworking near Tickhill/Bawtry/Harworth*, and the bigger
   audience queries (`for-parents`, `working-from-home-alternative`)
   have effectively no dedicated competitor content. We can take
   #1 on these with the pages we've already built — what's missing
   is internal-link strength, schema reinforcement, and a couple
   of AEO opening sentences.

4. **Aggregators dominate Google's first 5 results** for most
   transactional Worksop queries: *workin.space*, *coworker.com*,
   *hq.com*, *easyoffices.com*, *instantoffices.com*,
   *flexioffices.co.uk*, *coworkingcafe.com*. We'll never out-rank
   them on raw domain authority. The play is to **beat them on
   AEO** (LLMs cite the page that answers the question best, not
   the highest-DR domain) and to capture long-tail / location-
   specific intent where they're weakest.

5. **UK coworking pricing context:** Q1 2026 median monthly
   membership is **£180/month**. UK day-pass median is **£25**.
   UK meeting-room median is **£30/hour**, Nottingham specifically
   £16/hour. Our £30/week (≈£130/month) hot desk is **clearly
   under-market**, and our £30/hour meeting room is **on UK median
   but high for Notts**. This is worth making explicit on
   `/membership` and the audience pages — under-market pricing
   is a story.

---

## Competitive landscape — what we're actually up against

### Worksop town

| Competitor | Location | Their offer | Our edge |
|---|---|---|---|
| **Worksop Turbine ("The Nest")** | Shireoaks Triangle Business Park, S81 8AP (3 mi out of town) | Coworking from £250+VAT/mo (£300 inc), serviced offices, meeting rooms | Town centre, much cheaper hot desk (£130/mo equivalent), walk-in day passes, modern brand, transparent pricing |
| **Middletons Yard** | Potter Street, Worksop town centre | 30 offices, hot desks half-day to full month, 2 meeting rooms, café | Walk-in day passes (£12), weekly rolling membership, transparent pricing, no opaque "contact for rates", coworking-first not office-first |
| **Enterprise Business Centre** | Carlton Road (also our street) | Serviced offices, semi-rural | Town-centre proper, modern coworking brand, transport-accessible |

### Retford

| Competitor | Location | Their offer |
|---|---|---|
| **Retford Enterprise Centre** | Randall Way, ~2mi from town | 37 managed offices, 2 conference rooms |
| **Bassetlaw District Council** | Retford | Coworking from £300/mo, serviced office from £50/mo |

### Doncaster

Multiple players: *Workhere* (Cavendish Court, town centre), *Apex
Office Space* (Water Vole Way), *BizSpace Doncaster* (Gresley
House), *Spaces by Regus*. Doncaster town centre is saturated; our
play there is fringe villages (Tickhill, Bawtry, Harworth).

### Sheffield / Nottingham

Many players. We are *not* trying to win Sheffield or Nottingham
queries — only commuter-from-those-cities-back-home queries.

---

## Table 1 — Transactional / commercial intent

The money keywords. The bar for ranking is high because aggregators
own the top of the SERPs. We pick our battles: brand-driven queries,
specific service queries with low aggregator coverage, and
near-town variants.

| Query | Est. monthly UK vol. | Intent | Competition | Our page | Current position |
|---|---|---|---|---|---|
| `coworking Worksop` | Medium (~70-110) | Transactional | High (aggregators) | `/` & `/space` | #7 on page 1 |
| `coworking space Worksop` | Medium | Transactional | High | `/` & `/space` | not in top 10 |
| `hot desk Worksop` | Low (~10-30) | Transactional | Medium (Turbine ranks) | `/hot-desks` | Need to recheck post-launch |
| `private office Worksop` | Low-Medium (~30-60) | Transactional | High | `/private-offices` | Aggregators dominate top 5 |
| `serviced office Worksop` | Medium | Transactional | High | `/private-offices` | Aggregators top 10 |
| `meeting room hire Worksop` | Low-Medium (~30-60) | Transactional | High (hotels + town halls) | `/meeting-room` | Not in top 10 |
| `meeting room Worksop` | Low | Transactional | Medium-High | `/meeting-room` | Likely not in top 10 |
| `office space rent Worksop` | Medium (~60-100) | Transactional | High (Rightmove etc.) | `/private-offices` | Aggregators top 10 |
| `shared office space Worksop` | Low | Transactional | Medium-High | `/` & `/space` | Not in top 10 |
| `dedicated desk Worksop` | Very low (<10) | Transactional | Low | `/dedicated-desks` | Greenfield |
| `podcast studio Worksop` | Very low (<10) | Transactional | None (nothing exists) | `/podcast-studio` | Greenfield — once live |
| `coworking near Retford` | Low (~10-30) | Transactional | Medium (Retford Enterprise) | `/near-retford` | Need to verify |
| `coworking near Doncaster` | Medium | Transactional | High (Doncaster has 4+ spaces) | `/near-doncaster` | Likely page 2-3 |
| `coworking near Tickhill` | Very low | Transactional | None | `/near-tickhill` | Pure greenfield |
| `coworking near Bawtry` | Very low | Transactional | None | `/near-bawtry` | Pure greenfield |
| `coworking near Harworth` | Very low | Transactional | None | `/near-harworth` | Pure greenfield |
| `coworking near Maltby` | Very low | Transactional | None | `/near-maltby` | Pure greenfield |
| `coworking near Dinnington` | Very low | Transactional | None | `/near-dinnington` | Pure greenfield |
| `coworking near Clowne` | Very low | Transactional | None | `/near-clowne` | Pure greenfield |
| `private therapy room hire Worksop` | Very low but high commercial value | Transactional | None | `/private-room-for-1-to-1s` | Pure greenfield |
| `therapy room rent Worksop` | Very low | Transactional | None | `/private-room-for-1-to-1s` | Pure greenfield |
| `boardroom hire Worksop` | Very low | Transactional | Medium (Worksop Turbine ranks) | `/meeting-room` | Not in top 10 |

---

## Table 2 — Long-tail informational (Google)

Lower volume, higher conversion because the searcher knows what
they need. These are where blog posts and audience pages earn
their keep.

| Query | Est. vol. | Intent | Competition | Our page | Notes |
|---|---|---|---|---|---|
| `where to work when builders are in` | Low | Informational → transactional | None | `/blog/where-to-work-when-the-builders-are-in` | Pure greenfield. We should own this nationally, not just locally. |
| `alternatives to working from a coffee shop` | Medium | Informational | Medium (WeWork etc. rank) | `/blog/alternatives-to-coffee-shops-for-working-in-worksop` | We won't rank UK-wide but can rank for "Worksop" qualifier |
| `working from home with kids school holidays alternative` | Low-Medium | Informational | Low | `/for-parents` (+ blog?) | Greenfield. Need a dedicated blog post: "Where to work during school holidays — North Notts options". |
| `how much does coworking cost UK 2026` | Medium | Informational | Medium (CoworkingCafe report) | `/membership` + new blog post | Could write "How much does coworking cost in 2026 (UK & North Notts)" — cites Q1 2026 report. |
| `best coworking near Worksop station` | Very low | Transactional | None | `/` or `/near-retford` | Pre-emptive. Could write a small section. |
| `where to work remotely Worksop` | Low | Informational | High (job boards rank) | `/for-remote-workers` | Job-board pages dominate. Need to clarify intent in meta. |
| `hybrid worker Sheffield commute alternative` | Low | Informational | Low | `/for-remote-workers` + blog post we already have | Already published; need backlinks |
| `is coworking worth it for freelancers` | Medium | Informational | Medium | `/for-freelancers` + existing blog | Already have content |
| `tradesperson office quotes invoices admin` | Low | Informational | Low (software companies rank) | `/for-tradespeople` | We're competing with admin software for this term. Reframe to "where do tradespeople do quotes" |

---

## Table 3 — AEO conversational queries

These are how people actually ask ChatGPT, Claude, Perplexity,
Gemini and Google AI Overviews. They're full sentences, often
specific to a situation. **The AI cites the page that opens with
the cleanest one-sentence answer to the implied question.**
Domain authority matters less here.

| Query | Audience | Our page | Lead-paragraph answer exists? | Citation likelihood |
|---|---|---|---|---|
| `is there a coworking space in Worksop` | General | `/` | Yes (homepage hero) | High — we already rank #3 organic and the AI summary in our SERP check quoted our own meta description |
| `where can I work today if my home Wi-Fi is down in Worksop` | Group 1 | `/working-from-home-alternative` | Yes (lead paragraph names builders/Wi-Fi/etc.) | High — page is purpose-built for this |
| `where to work when the builders are in (Worksop)` | Group 1 | `/blog/where-to-work-when-the-builders-are-in` | Yes (strong lead) | High |
| `I'm a tradesperson — where do I do my quotes and invoices` | Group 3 | `/for-tradespeople` and `/blog/tradesperson-quotes-invoices-where-to-work` | Yes | High |
| `where can I hire a private therapy room near Worksop` | Group 4+9 | `/private-room-for-1-to-1s` | Yes | Very high — nothing else exists |
| `I commute Worksop to Sheffield, what are my remote options` | Group 6 | `/for-remote-workers` + blog | Yes (with explicit train fare maths) | High |
| `where can I hire a meeting room near Worksop for 6 people` | Group 7 | `/meeting-room` | Yes — but should we add a 6-person specific FAQ? Suggested |
| `is there a podcast studio in Bassetlaw / North Notts` | Group 9 | `/podcast-studio` | Yes (with "Phase 3 — coming soon") | High once open |
| `parents working from home school holidays Worksop` | Group 2 | `/for-parents` | Partial — could strengthen the lead | Medium-high |
| `where can a freelancer work in Worksop` | Group 8 | `/for-freelancers` | Yes | High |
| `coworking spaces near A1 stopover` | Secondary (passers-through) | None yet | No | Suggested new blog post |
| `where to take a confidential client call near Worksop` | Group 4 | `/blog/confidential-client-call-near-worksop` | Yes | Already strong |
| `cheapest coworking near Worksop` | Price-sensitive | `/` & `/hot-desks` | Not framed as cheapest; should be reframed lightly | Medium |
| `coworking space with free parking Worksop` | Driver | `/` & `/space` | Yes (parking is everywhere in our copy) | High |
| `coworking with day pass Worksop` | Walk-in | `/hot-desks` | Yes (£12 day pass front-and-centre) | High |

---

## Table 4 — Competitor and gap queries

Queries our local competitors are picking up that we could
realistically take.

| Query | Currently ranks for it | Gap |
|---|---|---|
| `serviced office Worksop` | Worksop Turbine, Middletons Yard, aggregators | Our `/private-offices` should be reframed to fight here — title says "Private Offices" not "Serviced Offices" which is the actual transactional keyword |
| `office space to let Worksop` | Rightmove, JLL, LoopNet | Property aggregators own this; we won't crack page 1. Skip. |
| `business centre Worksop` | Worksop Turbine, Middletons Yard | Our brand isn't "business centre" — we're coworking-first. Don't fight this. |
| `virtual office Worksop` | Worksop Turbine, aggregators | We **don't currently offer** virtual offices. Flag — decide whether to add the service or skip |
| `conference room Worksop` | Hotels (Muthu Clumber Park, etc.) | Our meeting room caps at 10 people. We don't compete for conference. Skip. |
| `coworking start-up Worksop` | Worksop Turbine ("The Nest" pitches at startups) | We don't lean startup-y in copy. Could add a small section on `/for-freelancers` or a new "for early-stage founders" angle. Flag, not priority. |
| `hot desk near me Worksop` | Aggregators + Turbine | Position `/hot-desks` heading at this. Done if we add a "near me" friendly meta. |
| `meeting room hire Bassetlaw` | Bassetlaw Action Centre (Retford), town halls, school halls | Community-grade competitors. Easy win for professional intent — `/meeting-room` should add Bassetlaw-specific copy. |
| `coworking Bassetlaw` | Bassetlaw District Council via Coworker.com | `/bassetlaw` page should rank — let's verify what's on it. |
| `meeting room Carlton Road Worksop` | Nothing branded | Pre-emptive: own the street name in `/meeting-room` and `/contact` |

---

## AI Overview / Featured Snippet observations

When I ran the SERP checks, several things stood out:

- **"is there a coworking space in Worksop"** returns an AI summary
  paragraph lifted near-verbatim from Worksop Workspace's
  meta description ("Worksop's first dedicated coworking space,
  opening soon on Carlton Road…"). This is the cleanest signal
  yet that LLMs are already crawling our content for AEO.
- **"coworking Worksop"** AI overview lists 3 spaces with our
  pricing structure quoted: "private offices from £125/week,
  hot desks from £12/day". Pricing accuracy in our content is
  visibly driving citations.
- **"private therapy room hire Worksop"** — no AI overview because
  the SERP has no clear local answer. **This is exactly the kind
  of query where the first to write a clear lead-paragraph answer
  wins the AEO citation.**

---

## Strategic notes — claims to soften, opportunities to expand

### Soften these claims

1. **"The only dedicated coworking space in Worksop"** — repeated
   on most pages. Technically contestable given Worksop Turbine
   and Middletons Yard exist. Suggested rewrites:
   - *"Worksop's first modern, brand-led coworking space"* (true)
   - *"The only walk-in coworking space in Worksop town centre with
     day passes, weekly rolling membership and transparent pricing"*
     (true and differentiated)
   - *"Worksop's first dedicated coworking space designed around
     the freelancer, the remote worker and the tradesperson on
     their admin day"* (audience-led, hard to contest)
2. **Pricing comparison to "the city"** — already accurate;
   reinforce with the UK 2026 medians (£180/mo membership, £25
   day pass, £30/hr meeting room). We're under-market on
   memberships and on-market on the meeting room.

### Expand these areas

1. **A "compare us to Worksop Turbine and Middletons Yard" angle**
   — not a hit piece, but an honest comparison section on
   `/membership` or a blog post: *"Coworking in Worksop: what's
   actually available and how to pick"*. Best for AEO because the
   query "what are the coworking options in Worksop" has no
   single-source clean answer right now.
2. **A "for early-stage founders / startups" angle** — currently
   weak. Worksop Turbine pitches "The Nest" specifically at
   startups. Could extend `/for-freelancers` or add a new
   `/for-founders` page.
3. **A "virtual office" decision** — three competitors offer one,
   we don't. Either flag as out-of-scope or consider adding the
   service (cheap to deliver: a registered address + mail
   handling).
4. **A "compare Worksop coworking vs Sheffield" blog post** —
   we already have the hybrid-commute post. A direct comparison
   would catch a different intent.

---

## What's missing (need to do in Phase 2)

- Audit which Tier 2/3 pages have the cleanest lead-paragraph
  answer to a citable AEO question, and which don't.
- Audit schema for invalid claims (e.g. Service schema for
  podcast studio with availability "InStock" when it's not yet
  open).
- Map internal-link gaps: which pages should link to which.
- Map keyword → page assignments and flag where two pages
  cannibalise the same keyword.

Phase 2 output goes in `seo-gap-analysis.md`.

---

*Worksop Workspace · A space to drop your shoulders.*
*30 Carlton Road, Worksop S80 1PH · hello@worksopworkspace.co.uk · worksopworkspace.com*
