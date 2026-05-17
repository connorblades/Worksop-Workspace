# SEO & AEO Gap Analysis — Worksop Workspace

**Worksop Workspace** · Marketing · *Phase 2 audit (no edits made)*

Status: Draft v1 — for Connor review · Last updated: 16 May 2026

Pairs with `seo-keyword-research.md`. The action plan that comes
out of these two files is `seo-action-plan.md`.

---

## How to read this

Gaps in five buckets. Each gap names the page (or pages) affected,
why it matters, and what kind of change would fix it. No changes
have been made — this is a recommendation list.

The Phase 3 action plan picks the top 10 from this list and turns
them into a prioritised work queue.

---

## 1. Keywords with no matching page (or weak page)

| Query | Current state | Recommended fix | Priority |
|---|---|---|---|
| `serviced office Worksop` | Aggregators dominate; our `/private-offices` doesn't use the phrase "serviced office" in H1 or meta | Add "(or serviced office)" to the H1 / meta on `/private-offices`. Same product, both terms valid. | High |
| `meeting room hire Bassetlaw` | Community centres dominate; our `/meeting-room` page doesn't mention "Bassetlaw" prominently | Add a "Used by clients across Bassetlaw" line near the top of `/meeting-room` plus expand `areaServed` to be more explicit | High |
| `coworking near A1` / `A1 coworking stopover` | No targeted content | New blog post: *"Coworking stops on the A1 — Worksop Workspace, 7 minutes off junction"* | Medium |
| `where can I work during school holidays in Worksop` | `/for-parents` covers it but title-tag doesn't match this phrasing | Add an FAQ on `/for-parents` with the exact wording | High |
| `coworking comparison Worksop` (us vs Turbine vs Middletons Yard) | No content | New blog post: *"Coworking in Worksop: what's actually available and how to pick"* — fair, factual, our angle is "modern, walk-in, transparent" | High |
| `early-stage founder workspace Worksop` | Weak | Either a section on `/for-freelancers` or a new `/for-founders` page. Worksop Turbine's "The Nest" pitches at this audience. | Medium |
| `cheapest coworking Worksop` | Not framed | Add a small "Pricing in context" section on `/membership` citing UK 2026 medians (£180 median / our £130 equivalent). | Medium |
| `virtual office Worksop` | Service we don't offer | **Flag for product decision.** Three competitors offer it. Easy to deliver (registered address + mail handling). Either build the page + service or skip. | Decision-needed |

---

## 2. Pages where the lead paragraph isn't AEO-ready

LLMs cite the page that opens with the clearest one-sentence answer
to the implied question. Our newer pages are strong; the older
ones drift.

| Page | Current opening line | Problem | Recommended rewrite |
|---|---|---|---|
| `/space` | *"Worksop's only dedicated coworking space. Every environment, one building."* | Contested claim (Worksop Turbine and Middletons Yard exist); doesn't open with a question-answering sentence | *"Worksop Workspace is the only modern coworking space in Worksop town centre — walk-in day passes, weekly rolling membership, transparent pricing. Every working mode in one building: hot desks, dedicated desks, private offices, meeting room, studio."* |
| `/membership` | *"Flexible access. Honest pricing. No contracts."* | Reads like a tagline, not an answer. The query is "how much does it cost" — answer it immediately | *"Worksop Workspace pricing: £12 per day, £30 per week (hot desk), £50 per week (dedicated desk from Phase 2), from £59 per week (private office), £20 per hour (meeting room), £40 per hour (studio, Phase 3). All rolling weekly, no long contracts, no setup fee."* (Meeting room repriced from £30 to £20 in May 2026.) |
| `/community` | Strong banner, no AEO lead paragraph after | Add a one-line citable answer at the top of the page body | *"Worksop Workspace is used by remote workers, freelancers, tradespeople, parents on school-holiday weeks, hybrid commuters, therapists and small business owners across Worksop, Bassetlaw and North Nottinghamshire."* |
| `/bassetlaw` | *"The district's first flexible, community-focused coworking space."* | Decent. Could be sharper on the AEO question "is there a coworking space in Bassetlaw?" | *"Yes — Worksop Workspace on Carlton Road is the closest dedicated coworking space serving every town in Bassetlaw: Worksop itself, Retford, Tickhill, Bawtry, Harworth, Maltby, Dinnington, Clowne and the villages between."* |
| `/contact` | Untouched in this work | Likely fine — flag if anything weak |
| `/sponsors` | Untouched | Lower priority, low SEO value |

---

## 3. Schema gaps and errors

| Page | Issue | Fix |
|---|---|---|
| `/podcast-studio` | LocalBusiness schema has `makesOffer` with `availability: PreOrder` — correct. But the name field still reads "Worksop Workspace — Podcast Studio" while we've rebranded to "Studio" on the page | Update schema `name` to "Worksop Workspace — Studio" to match |
| `/meeting-room` | LocalBusiness schema name reads "Worksop Workspace — Meeting Room Hire". Page label is "Meeting Rooms" plural in nav. Consider whether schema should say "Meeting Room" (current real state: one room) or "Meeting Rooms" (futureproof). | Keep singular until we have a second room — schema is **literal** |
| Older pages (`/space`, `/membership`, `/community`, `/contact`, `/sponsors`, `/support`, `/blog`) | May not have LocalBusiness schema | Audit and add — every page should have it |
| Audience pages (`/for-X`) | `areaServed` lists 8 specific towns plus Bassetlaw + North Notts. Good. | No change needed |
| Location pages (`/near-X`) | Have both `LocalBusiness` (with `serviceArea` for the town) and `Place` schema. Good. | No change needed |
| Blog posts | Have `Article` schema but no `FAQPage` on posts that include FAQs in the body | Add `FAQPage` to blog posts that have Q&A sections (the new 5 do — older 12 likely don't) |
| Pricing on `/membership` and `/hot-desks` etc. | No `Service` schema with `Offer` pricing | Add `Service` + `Offer` markup so prices can show as rich results |
| `Organization` schema | Probably not present at root | Add `Organization` schema to the homepage to support brand SERP / knowledge panel |
| Existing `LocalBusiness` blocks | Some pages still say "Worksop's first dedicated coworking space" in the description field — same contested claim | Soften same as visible content |

---

## 4. Internal-link gaps

The site has 50+ pages but they don't all reference each other where they should. Quick map of the gaps.

| Page | Should link to | Doesn't yet |
|---|---|---|
| `/space` | `/hot-desks`, `/dedicated-desks`, `/private-offices`, `/meeting-room`, `/podcast-studio` | The anchor links `#hot-desks` etc. still point at in-page sections that may now be redundant with the new dedicated pages |
| `/membership` | `/hot-desks`, `/dedicated-desks`, `/private-offices`, `/meeting-room`, `/podcast-studio`, every audience page | Currently mostly self-contained pricing card grid — should add deeper links into the now-real product pages |
| `/community` | All 6 audience pages (done via the persona cards), all 9 location pages (NOT done — could add a "Where members come from" section) | Location-cross-links missing |
| `/contact` | The "Read next" pattern should appear here too | Currently no cross-links |
| Blog posts (older 12) | Some don't yet link out to the new audience pages | E.g. `/blog/working-from-home-vs-coworking` should link to `/working-from-home-alternative` and `/for-freelancers` |
| `/meeting-room` | Could link to `/private-room-for-1-to-1s` more prominently | One mention currently |
| `/podcast-studio` | Could link to `/for-freelancers` (content creators) | None |

---

## 5. Cannibalisation risks

Pages competing with each other for the same query — Google can't decide which to rank.

| Query | Competing pages | Decision needed |
|---|---|---|
| `hot desk Worksop` | `/`, `/space`, `/hot-desks`, `/membership` | Canonicalise to `/hot-desks` (most specific). Other pages link to it; it owns the keyword. |
| `private office Worksop` | `/`, `/space`, `/private-offices`, `/membership` | Canonicalise to `/private-offices`. |
| `meeting room Worksop` | `/`, `/space`, `/meeting-room`, `/membership` | Canonicalise to `/meeting-room`. |
| `coworking Worksop` | `/`, `/space`, `/community` | Keep `/` as the brand homepage; `/space` should reframe as "overview of every product type" not duplicate of homepage. |
| `coworking Bassetlaw` | `/bassetlaw`, `/` | `/bassetlaw` is the answer. |

---

## 6. Existing content that needs editing for accuracy

### The "only coworking space" claim

Appears on 9 pages (live and indexed). Worksop Turbine and Middletons Yard both exist. Suggested rewrites are in `seo-keyword-research.md` §"Soften these claims".

Affected files:
- `/space`
- `/for-tradespeople`
- `/for-freelancers`
- `/for-remote-workers`
- `/working-from-home-alternative`
- `/near-bawtry`
- `/sponsors`
- `/blog/where-to-work-when-the-builders-are-in`
- `/blog/alternatives-to-coffee-shops-for-working-in-worksop`

### Residual `&mdash;` HTML entities

The earlier dash sweep replaced literal `—` characters but missed
the HTML-entity form `&mdash;`. 7 instances remain in:
- `/membership/index.html`
- `/space/index.html`

Same brand voice rule applies; should be cleaned up.

### `/podcast-studio` schema name still says "Podcast Studio"

The page H1 and nav label are now "Studio" (broader framing).
The LocalBusiness schema `name` and `description` still say
"Podcast Studio". Update for consistency.

---

## 7. Pages to add (new)

| Slug | Why | Priority |
|---|---|---|
| `/blog/coworking-options-in-worksop` | Direct comparison of us vs Turbine vs Middletons Yard. Captures the high-intent "what's actually available" query and the AEO citation for that query. | High |
| `/blog/where-to-work-during-school-holidays-in-worksop` | School-holiday-specific angle on top of `/for-parents`. Easy to write. | Medium |
| `/blog/coworking-stops-on-the-a1` | Captures passers-through traffic. Worth one blog post but not a dedicated page. | Medium |
| `/blog/how-much-does-coworking-cost-in-2026-uk-north-notts` | Picks up "how much does coworking cost" volume. Tie to the Q1 2026 CoworkingCafe report (real source). | Medium |
| `/blog/comparing-worksop-coworking-to-sheffield` | Captures the "should I commute or not" intent. Variant of the hybrid post we already have. | Low |
| `/for-founders` (or section on `/for-freelancers`) | Worksop Turbine's "The Nest" owns this audience. Could fight back. | Low (judgement: probably skip — Turbine's pitch is council-funded grants for startups, which we don't offer) |
| `/virtual-office-worksop` | Product decision required. If we add the service, the page is easy. If not, skip. | Decision-needed |

---

## 8. Technical / metadata

- **Title tags**: Most of the older pages have good titles. The new audience pages have keyword + brand. Re-check that every page title is unique and under 60 characters.
- **Meta descriptions**: Spot-checked the new pages. Some of the older ones (`/space`, `/community`, `/contact`) might be generic — flag for rewrite.
- **Canonical tags**: Present on the new pages. Verify on older ones.
- **Open Graph + Twitter cards**: Present everywhere I built. Verify on older.
- **Image alt text**: Mostly fine on new pages. Older pages (`/space`, `/community`) likely need an audit.
- **`robots.txt`**: Should explicitly allow GPTBot, Google-Extended, ClaudeBot, PerplexityBot etc. Confirm in Phase 4.
- **`llms.txt`**: An emerging AEO standard (similar to robots.txt for LLM training). Worth adding a basic version at the root.
- **Sitemap freshness**: Current sitemap is good — needs the `lastmod` bumped when pages are edited.

---

## What goes in the action plan

The top 10 from this list — the ones that move the needle most for
the least effort — get prioritised in `seo-action-plan.md`. Phase 4
implements them after sign-off.

---

*Worksop Workspace · A space to drop your shoulders.*
*30 Carlton Road, Worksop S80 1PH · hello@worksopworkspace.co.uk · worksopworkspace.com*
