# Mission

You are working inside the `Worksop Workspace` repo. Your job is to build a set of website pages — landing pages, persona pages, location pages, and supporting blog posts — that capture local search intent for the audiences listed below, and rank in three places:

1. **SEO** — Google organic results for transactional and informational queries.
2. **AEO** — answer-engine results inside ChatGPT, Claude, Perplexity, Google AI Overviews. When a real person asks an AI assistant a question that matches the intent of one of these pages, Worksop Workspace should be a named recommendation.
3. **GEO** — generative-engine optimisation. Same idea as AEO, but for the next wave of AI search surfaces (SearchGPT, Gemini, Copilot). Pages must be citation-friendly, factually grounded, and easy for an LLM to lift a quote out of.

Worksop Workspace is a coworking space on Carlton Road in Worksop, North Nottinghamshire. It is the only dedicated coworking space in the town. It serves remote workers, freelancers, tradespeople, small businesses, and anyone who needs somewhere to focus that isn't home or a coffee shop.

# Geographic targeting (strict)

Only target people who can realistically use the space:

- **Primary radius: 15 miles from Worksop town centre (S80 1).** This includes Worksop itself, Retford, Tickhill, Bawtry, Harworth, Blyth, Shireoaks, Carlton in Lindrick, Whitwell, Creswell, Clowne, Maltby, Dinnington, Kiveton Park, parts of Doncaster, parts of Mansfield, parts of Ollerton, parts of Edwinstowe, and surrounding villages. Confirm any town you write about is actually within ~15 miles of Worksop before publishing.
- **Secondary: passers-through.** People travelling the A1, A57, M1 J30, or the East Coast Main Line who might stop in Worksop for a few hours of focused work or a meeting. Pages for this audience should mention proximity to those routes explicitly.
- **Out of scope.** Do not target Sheffield city centre, Nottingham city centre, Leeds, London, or anywhere beyond ~15 miles. Those people have local options. Mentioning them as origin points for *commuters* who have moved out is fine; building pages aimed at them living there is not.

If a persona or query doesn't fit the geographic rule, drop it.

# Read these files FIRST, before writing anything

Do not skip this step. The brand voice and structure rules are unforgiving and the site already has conventions.

1. `STRUCTURE.md` — repo layout, URL rules, naming conventions, cache-busting, where new pages go.
2. `knowledge-base/marketing/brand/brand-guidelines.md` — voice, colours, typography, whitespace rules, banned phrases.
3. `index.html` — homepage. Note the section pattern (eyebrow → h2 → lead → grid), the use of CSS variables, the animation classes (`animate-fade`, `animate-scale`, delays), and the cache-bust query strings on css/js.
4. `community/index.html` — the persona grid you'll be extending. Match this component pattern.
5. `space/index.html`, `membership/index.html`, `meeting-room/index.html` — existing service pages. New landing pages should feel like these.
6. `near-retford/index.html`, `near-doncaster/index.html`, `bassetlaw/index.html` — existing location pages. New location pages should follow this template exactly.
7. `blog/index.html` and one existing blog post under `blog/<slug>/` — the blog-post template. New blog posts must follow this structure.
8. `sitemap.xml` and `vercel.json` — you'll need to update both.

After reading, summarise in 5 lines what the section structure of an existing landing page looks like, so I know you've read it. Then propose your plan before building.

# The audience map — what to build for

Every group below represents real search intent. The deliverable is a set of pages that captures it. Group numbers below match the source brief.

## Group 1 — Home is temporarily uninhabitable
- Decorators / builders / renovators in the house
- New kitchen or bathroom install
- Broken boiler in winter, broken AC / no fans in summer
- Home Wi-Fi or power down
- House move week
- Newly moved to Worksop, no home office yet
- Flooded or damaged property awaiting repair
- Pest control treatment day

## Group 2 — Home is full of people
- Parents working through school holidays / inset days
- Parents with a newborn
- Carers (elderly parent, disabled family member)
- Multi-generational households
- Houseshares / HMO tenants
- Partner also on back-to-back calls
- House guests staying for the week
- New puppy / rescue dog not yet settled

## Group 3 — The job runs out of the van / car / kitchen table
- Tradespeople quoting jobs
- Tradespeople doing end-of-day admin (invoices, CIS, VAT, certs)
- Field engineers between site visits (BT, gas, telecoms, solar)
- Mobile hairdressers, dog groomers, mobile mechanics doing bookings
- Cleaners and gardeners running their own books
- Couriers and delivery drivers on a long break
- Driving instructors writing up notes between lessons

## Group 4 — Sales, advisory, and "between appointments"
- Estate agents between viewings in Worksop / Retford / Bassetlaw
- Mortgage advisors and brokers
- Insurance brokers and loss adjusters
- Financial advisors / IFAs
- Solicitors and conveyancers needing a confidential room
- Recruitment consultants running candidate calls
- Pharma / food / B2B sales reps between client visits
- Surveyors writing up reports

## Group 5 — Coffee-shop refugees
- People generally working from coffee shops
- People who hate background noise and distractions
- People sick of buying a flat white every 40 minutes
- People needing to take a video call without 15 other voices behind them
- People whose laptop battery dies and there are no plugs
- People who tried Costa, Caffè Nero and Starbucks and just want a desk

## Group 6 — Commuters and people passing through
- Commuters between meetings
- Hybrid workers with 1–2 office days in Sheffield, Nottingham, Leeds, Doncaster
- People who used to drive 40 minutes each way
- Train travellers with an hour to kill at Worksop station
- Drivers stopping mid-route (A1, A57, M1 J30) for focused work
- Business travellers visiting a Worksop / Bassetlaw client for the day

## Group 7 — Meetings (internal and external)
- Business owners meeting clients on large projects
- Internal business meetings
- Interview panels and assessment days
- Onboarding new hires
- Team strategy days, quarterly reviews, planning offsites
- Pitches and tenders needing a room with a door that closes
- Investor meetings for local startups
- Board meetings for charities, sports clubs, parish councils
- Trustee meetings
- Mediation sessions

## Group 8 — Founders, freelancers, side-hustlers
- Startup entrepreneurs
- Freelancers needing somewhere professional to take a client call
- Solopreneurs running Etsy / Shopify / Amazon businesses
- Content creators and copywriters
- Bookkeepers and accountants in self-assessment / year-end season
- Consultants between client engagements
- Coaches (life, business, executive) running client calls

## Group 9 — Education, training, creative work
- Online tutors and language teachers
- Distance learning students (OU, masters, professional exams)
- CPD and certification candidates in exam prep
- Authors writing a book
- Journalists and researchers
- Therapists and counsellors running confidential 1:1 sessions
- Trainers running workshops or assessor visits
- Podcast hosts and guests (when the podcast studio opens)

## Group 10 — Life chapters and transitions
- Career-break returners
- Job hunters drafting CVs and taking interview calls
- Recently redundant people setting up something new
- People starting a side business while still employed
- Retired professionals doing part-time consulting
- People going through divorce or separation
- Volunteer trustees doing charity admin

## Group 11 — Community
- People who want community
- Freelancers who miss having colleagues
- People who realise productivity is partly social
- People who have been quietly lonely working from home
- New-to-Worksop residents wanting to meet people without "networking"

# Page architecture — what to build

You will build the site in a hub-and-spoke pattern so that pages support each other for SEO and pass relevance to each other.

## Tier 1 — Hubs (already exist, extend them)

- `community/index.html` — extend the persona grid from 5 cards to 10–12, drawn from the strongest entries above. Don't dilute by listing all 60+. Pick the ones with the highest emotional recognition.
- `space/index.html` — add a "Built for these moments" band linking out to the new persona / situation pages.
- `index.html` (homepage) — add a single new band above Pricing called something like "Why people come in" with 6 chip-style situations linking to `/community` and the new landing pages.

## Tier 2 — Audience landing pages (new)

Build one focused landing page per high-intent group. Recommended (you can refine the slugs):

- `/for-tradespeople/` — Group 3, primary commercial intent.
- `/for-parents/` — Group 2, very high-volume situational intent.
- `/working-from-home-alternative/` — Group 1 + 2 + 5, the "I can't work from home today" page.
- `/for-freelancers/` — Group 8.
- `/for-remote-workers/` — Group 6, hybrid workers.
- `/meeting-room-hire/` — already exists at `/meeting-room/`, extend it with Group 4 and Group 7 use cases.
- `/private-room-for-1-to-1s/` — Group 4 + 9 confidential-session use case (therapists, advisors, mediators). Decide whether this is a new page or a section inside `/meeting-room/`.

Each Tier 2 page must contain:

1. **H1 that answers the search query directly.** Example: "A workspace for tradespeople in Worksop and Bassetlaw."
2. **A lead paragraph** that explicitly names the problem ("Running quotes from the van") and the solution ("A proper desk, free parking outside, sit down for an hour").
3. **A "When this is for you" list** — 5–8 specific moments lifted from the audience map above.
4. **An FAQ section** — 6–10 questions in the exact phrasing a real person would type or ask an AI. Schema-marked as `FAQPage` JSON-LD. See the AEO/GEO rules below.
5. **A nearby-towns line** — name 3–5 specific towns within 15 miles so the page picks up local intent ("Serving tradespeople from Worksop, Retford, Tickhill, Harworth and Maltby").
6. **A primary CTA** (Clay button — one per view) pointing to `/contact` or `/membership`.
7. **Internal links** — at minimum to `/community`, `/membership`, `/meeting-room`, and the closest location page.

## Tier 3 — Location pages (new and existing)

You already have `near-retford`, `near-doncaster`, and `bassetlaw`. Add pages only for towns within 15 miles that have real search demand. Strong candidates: `near-tickhill`, `near-bawtry`, `near-harworth`, `near-blyth`, `near-maltby`, `near-dinnington`, `near-mansfield-north`, `near-clowne`. Pick the 4–6 with the most likely search volume — don't build all of them.

Each location page follows the existing `near-retford` template and must:

- Confirm the town is within ~15 miles of Worksop (state the driving distance and time).
- Reference specific local landmarks or routes ("10 minutes from Tickhill on the A60").
- Include a section on who from that town typically uses the space.
- Cross-link to the Tier 2 audience pages that are relevant ("If you're a tradesperson in Tickhill, see /for-tradespeople").
- LocalBusiness JSON-LD with `areaServed` listing the town.

## Tier 4 — Blog posts (new)

Build 12–20 long-tail blog posts that answer specific questions people ask Google or an AI. Each post lives at `blog/<slug>/index.html` and follows the existing blog template.

Title formats that work for AEO/GEO:

- "Where to work when the builders are in (Worksop / North Notts options)"
- "Working from home with a newborn: what actually helps"
- "Coworking near Retford: what's available and what it costs"
- "I'm a tradesperson — where do I do my quotes and invoices?"
- "Hybrid workers in Worksop: alternatives to commuting to Sheffield"
- "Best alternatives to coffee shops for working in Worksop"
- "Meeting rooms to hire near Worksop and Retford (with prices)"
- "Where to take a confidential client call near Worksop"
- "Coworking spaces near the A1: stopover options"
- "What does coworking actually cost in 2026 (North Notts)?"

Pick the 12–20 with the best intent / volume trade-off. Each post must be 800–1,400 words, answer the question in the first paragraph (citation-friendly), include an FAQ block, internal-link to relevant Tier 2 and Tier 3 pages, and end with a soft CTA to `/membership` or `/contact`.

# SEO / AEO / GEO requirements (locked)

Every new page must do all of the following:

## On-page SEO

- Unique `<title>` (max 60 chars) that includes a primary keyword + "Worksop" or a nearby town.
- Unique `<meta name="description">` (~155 chars) that reads like a sentence, not a keyword stuff.
- Canonical link tag.
- Open Graph + Twitter card metadata.
- H1 once per page, descriptive headings in order (h1 → h2 → h3, no skipping).
- Image alt text on every image, describing the actual content.
- Internal links from at least two other pages in the site point to each new page.
- Add the new URL to `sitemap.xml` with today's `lastmod`.

## AEO / GEO — the citation-friendly bit

LLMs cite pages that answer the question clearly in the first paragraph and have structured, parseable content. Every new page must:

- **Open with a one-sentence direct answer** to the page's question, in the lead paragraph. Example: "Yes — Worksop Workspace offers private meeting rooms to hire by the hour or by the day, two minutes from Worksop town centre with free parking." LLMs lift exactly this kind of sentence.
- **Include an FAQ section** with 6–10 questions phrased the way a real person would ask them (full sentences, not keyword fragments). Mark up with `FAQPage` JSON-LD schema.
- **Use named entities and specifics** that an LLM can cite: street name (Carlton Road), nearest station (Worksop), distances to specific towns, A-road numbers, price points, opening hours.
- **Avoid waffle and superlatives.** "We're the best coworking space in the North" is uncitable. "Worksop Workspace is the only dedicated coworking space in Worksop" is citable.
- **Add `LocalBusiness` JSON-LD** to every Tier 2 and Tier 3 page, with `address`, `geo`, `areaServed`, `openingHours`, `priceRange`, and `telephone`.
- **For Tier 3 location pages**, also add `Place` schema for the town being targeted and `serviceArea` on the LocalBusiness block.
- **Cite externally where it strengthens trust** — link to the bus times site, the train station page, etc.
- **Write paragraphs that stand alone.** Each paragraph should make sense if an LLM lifts it without surrounding context.

## What NOT to do for SEO

- Don't keyword-stuff. The brand voice forbids it and Google penalises it.
- Don't write thin doorway pages — each location page must have at least 500 words of genuinely useful content specific to that town.
- Don't duplicate copy between pages. Each audience and each location gets unique writing.
- Don't write H1s like "Coworking | Office Space | Hot Desk | Worksop | Retford". Write one clear sentence.
- Don't promise services that don't exist (podcast studio is Phase 2 — note "coming soon" if mentioned at all).

# Voice and tone (locked — do not deviate)

Read `knowledge-base/marketing/brand/brand-guidelines.md` and follow it. Short version:

- Simple, direct, friendly, quietly confident. Like Connor talking to a neighbour.
- Bubbly, characterful, community-minded, a good listener.
- NOT corporate, salesy, urgency-driven, try-hard, or generic.
- Banned phrases: "act now", "limited time", "don't miss out", "game-changer", "synergy", "best-in-class", "unlock your potential", anything that sounds like marketing rather than conversation.
- No swearing on web copy. "Get shit done" lives in the building and on Instagram only.
- Plain English. Short sentences. No buzzwords.

# Visual and structural rules (locked)

- Reuse existing CSS classes. Don't invent new components unless absolutely required.
- Whitespace is the brand. 50%+ of any layout stays empty. One idea per view.
- Colours: White 55%, Linen 20%, Espresso 12%, Oak 7%, Sage 4%, Clay 2%. Clay is reserved for the single primary CTA per view. Brand Navy is logo-only.
- Typography: Outfit only. Use the existing scale.
- Buttons: one primary (Clay) per view; secondary = Espresso outline. No gradients, no shadows, no heavy borders.
- Imagery: warm, natural-light, oak-forward. Never generic stock.
- Accessibility: `aria-labelledby` on every section, meaningful alt text on every image, headings in order, visible focus on buttons.

# Operational rules (locked)

- Never rename or move folders that already have an `index.html` without adding 301 redirects in `vercel.json`.
- Every new page = new folder at root with `index.html` inside (e.g. `/for-tradespeople/index.html`). Add to `sitemap.xml` and the footer nav on every other page.
- Lowercase-kebab-case for any new file or folder.
- If you edit `css/styles.css` or `js/animations.js`, bump the `?v=N` cache-buster site-wide in one pass — there's a `grep -rl ... | xargs sed` one-liner in `STRUCTURE.md` for this.
- Don't add new top-level files unless `STRUCTURE.md` says they belong there.

# How to work

This is a big build. Do it in phases, not in one go. Stop and check after each phase.

**Phase 0 — Read and plan.**
Read all the files listed at the top. Summarise the existing page structure in 5 lines. Then propose:
- The exact list of Tier 2 audience pages you'll build (slugs + titles).
- The exact list of Tier 3 location pages you'll build (slugs + towns, with verified distance from Worksop).
- The first 5 Tier 4 blog post titles you'd start with.
- The order you'd build them in.

Wait for sign-off before building anything.

**Phase 1 — Extend the hubs.**
Update `community/index.html` (extended persona grid) and `index.html` (new "Why people come in" band). Show the diff for approval.

**Phase 2 — Build one Tier 2 page end-to-end as a template.**
Pick the highest-impact page (likely `/for-tradespeople/` or `/for-parents/`). Build it complete: HTML, schema, sitemap entry, footer link, internal links. Ship it for review before doing the others, so the pattern can be tuned once instead of fifty times.

**Phase 3 — Roll out remaining Tier 2 pages** using the approved template.

**Phase 4 — Build Tier 3 location pages** using the existing `near-retford` template.

**Phase 5 — Blog posts** in batches of 3. Don't write 20 in one go. Each batch reviewed before the next starts.

After every phase: list every file you touched, every new file you created, every sitemap / footer / schema change, and the cache-bust version bump (if any).

# What to flag, not assume

- If a town you want to target is more than 15 miles from Worksop — flag it, don't build it.
- If a persona on the list overlaps significantly with another — propose consolidating before building two thin pages.
- If the brand voice and the SEO best-practice conflict (e.g. keyword in H1 vs. plain-English H1) — voice wins, every time. Flag the trade-off so I know.
- If you discover a structural change is needed in `STRUCTURE.md`, `sitemap.xml`, or `vercel.json` — propose it before changing it.
