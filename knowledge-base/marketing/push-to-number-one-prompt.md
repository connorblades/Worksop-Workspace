# Prompt. Push Worksop Workspace to #1

*Paste everything below the line into a new Claude Code session.*

---

## Mission

Push Worksop Workspace to **#1 ranking** for every commercially relevant query in our catchment, across:

- **Google local search** (the Map Pack + organic blue links)
- **AI answer engines** (ChatGPT, Claude, Perplexity, Gemini, Google AI Overviews, Copilot)
- **Voice assistants** (Siri via Apple Maps, Google Assistant, Alexa)

Target queries (non-exhaustive):

- `coworking Worksop`, `coworking near me` (when searched from within 15 miles of S80 1PH)
- `private office Worksop` / `serviced office Worksop`
- `meeting room Worksop` / `meeting room hire Bassetlaw`
- `hot desk Worksop`
- `podcast studio Worksop` / `recording studio Worksop`
- `coworking near A1`, `coworking near Retford`, `coworking near Tickhill`, `coworking near Bawtry`, `coworking near Maltby`, `coworking near Dinnington`, `coworking near Harworth`, `coworking near Clowne`, `coworking near Doncaster`
- `where to work during school holidays Worksop`, `where to work in Worksop today`, `working from home alternative Worksop`
- `coworking Bassetlaw`, `coworking North Notts`
- `what coworking spaces are in Worksop` (AEO citation target)

Pole position for the brand name `Worksop Workspace` is already a given; the goal is **branded query plus every category query above**.

---

## Where we are now

The on-page work is done. Five phases have shipped:

| Phase | What shipped | Status |
|---|---|---|
| 1 | Brand, positioning, pricing, GHL backend forms | Done |
| 2 | 50+ pages. audience, location, product, blog, dropdown nav | Done |
| 3 | `seo-keyword-research.md`, `seo-gap-analysis.md`, `seo-action-plan.md` | Done |
| 4 | Top 10 SEO/AEO action items. soften claims, AEO leads, schema, UK pricing context, Bassetlaw, comparison blog, school holidays | Done |
| 5 | Bonus items 11-15. llms.txt, robots.txt expansion, FAQ schema retrofit, internal-link sweep, A1 blog, virtual-office decision (skip) | Done |
| 5.5 | **Meeting room reprice £30 → £20/hr (May 2026).** Sitewide sweep across 57 HTML files, JSON-LD Service+Offer schema, internal sales/legal docs, planning records. Repositioned to Notts regional median (£16) rather than UK national (£30). | Done |
| 5.6 | **Private offices repriced to per-sqft tiered structure (May 2026).** Headline moved from "from £125/week" to "from £79/week". Five offices, four tiers: 10 m² (108 sqft) £79/wk, 12 m² (129 sqft) £89/wk, 14 m² (151 sqft) £99/wk (2 available), 20 m² (215 sqft) £125/wk. Anchored at ~£34/sqft/year all-in midpoint. Below the local serviced-office market (BizSpace Doncaster £26/sqft; Sheffield central £40-60/sqft). /private-offices restructured with "Choose your office" grid showing per-office cards. Service+Offer schema split into four Offer entries by tier. | Done |

Read these knowledge-base files **before doing anything else** so you have context. They are the source of truth:

- `knowledge-base/marketing/seo-keyword-research.md` (research)
- `knowledge-base/marketing/seo-gap-analysis.md` (audit)
- `knowledge-base/marketing/seo-action-plan.md` (top 10 list, all done)
- `knowledge-base/marketing/local-ranking-playbook.md` **(the off-site execution plan, biggest remaining lever)**
- `knowledge-base/marketing/virtual-office-decision.md` (parked, do not revisit until 10+ offices booked)

---

## The remaining lever

Per the local-ranking-playbook: for a brand-new domain in a small local market, the website tells Google **what** you are. Google Business Profile, reviews and citations tell Google **that you exist and matter**.

The website is the floor. The next 80% of the ranking gains live off-site and in ongoing content cadence.

---

## Locked constraints (do not change without asking)

1. **15-mile catchment.** Only target queries from people within 15 miles of S80 1PH. The catchment towns are Worksop, Retford, Tickhill, Bawtry, Maltby, Dinnington, Harworth, Clowne, Doncaster (south), Mansfield (north), and the villages between. Do not chase Sheffield, Nottingham, Lincoln or Leeds-scale queries.
2. **Transport-inclusive framing.** Bus stop outside the door, Worksop train station 8 minutes' walk, free on-site parking, A57/A60/A619 minutes from the building. Every location pitch should land on transport.
3. **Brand voice wins over keyword density.** Plain English. **No em dashes. No en dashes. No pause punctuation of any kind.** No banned phrases (see brand-guidelines if present). Sentences end with full stops. Lists use full stops. Replace "X — Y" with "X. Y" or "X, Y" or rebuild the sentence.
4. **AEO-citable opening sentence.** Every page lead opens with a one-sentence direct answer to the implied query. Do not lead with a tagline.
5. **Don't promise what isn't there.** Phase 2 dedicated desks and Phase 3 studio are not yet bookable. Always say "from Phase 2" or "from Phase 3" or "currently in build". Never imply they're open.
6. **Don't overclaim.** "First modern coworking space in Worksop town centre" is the approved framing. **Never** revert to "only" or "Worksop's first dedicated" or any superlative that competitors (Worksop Turbine, Middletons Yard, Enterprise Business Centre) can falsify.
7. **Hours.** Phase 1 manned hours are 8am to 5pm Monday to Friday. From Phase 2, member-app access extends outside those hours. Never imply 24/7 in Phase 1.
8. **Sensitive ops stay in the private Drive.** Anything covering facilities, finance, tech credentials or legal beyond what's already public lives in the private Drive at Worksop Workspace HQ. The repo's `knowledge-base/` is public.
9. **Cache-bust pattern.** Current is `?v=74` on `styles.css`. Next bump would be `?v=75`. Apply sitewide on any CSS-touching change.
10. **Geography honesty.** Worksop Workspace sits roughly 7 minutes off the A1 at Blyth via the A57. Worksop station is on the Sheffield-Lincoln line and the Robin Hood Line. Don't make up numbers; verify before publishing.
11. **No destructive git.** Never `--no-verify`, `--force`, `reset --hard` or delete branches without explicit user authorisation. Always commit cleanly, push to `main`.
12. **GHL is the backend.** Waiting-list forms post to GoHighLevel. Don't replace or restyle the form unless asked.

---

## What to do (sequenced)

Run as numbered phases. After each phase, commit and push, then ask whether to proceed to the next.

### Phase 6. Launch-readiness off-site assets

The local-ranking-playbook describes **what** to do off-site. This phase produces the **specific written materials** Connor needs to execute it. None of this is code, all of it is content saved to `knowledge-base/marketing/launch-assets/`.

Deliver:

1. **GBP post calendar (12 weeks)**, `gbp-post-calendar.md`. One post per week minimum, two preferred. Each entry has: post type (update / offer / event), title, body copy (100-300 words, brand voice), image suggestion, link destination on worksopworkspace.com, CTA button label. Mix destinations across pricing, audience, location and blog pages.
2. **Review-request email template**, `review-request-email.md`. Subject, body, send timing trigger (day 8 after first payment). Branded plaintext, one CTA, no attachments.
3. **Review-request SMS template**, `review-request-sms.md`. 140 chars max, one short link, fallback for non-responders.
4. **Review reply templates**, `review-reply-templates.md`. 5 positive-response templates and 5 negative-response templates. Cover the most likely review themes (parking, noise, broadband, opening hours, value).
5. **Citation submission tracker template**, `citation-tracker-template.md`. A markdown table with the columns from local-ranking-playbook Part 3.3, pre-filled with the 25+ directories named there. One row per directory with submission status, login email placeholder and notes.
6. **Local press pitch emails**, `press-pitches.md`. One personalised pitch per outlet for Worksop Guardian, Mansfield Chad, Bassetlaw FM, BBC Radio Nottingham, and the North Notts BID newsletter. Lead with the local-economy angle, not the business. Each pitch under 150 words.
7. **Partner backlink request emails**, `partner-backlink-asks.md`. One for Bullseye Properties (founding sponsor), one for South Yorkshire Property Buyers (founding sponsor). Specific ask: a one-sentence mention with a link on a body page, not just the footer.
8. **GBP Q&A pre-seed copy**, `gbp-qna-preseed.md`. The 10 questions and answers from local-ranking-playbook Part 1.5, written out in final form ready to post.
9. **Member welcome pack copy**, `member-welcome-pack.md`. The first-week email cadence (welcome, day 3 check-in, day 8 review ask, day 14 community invite). Plus the laminated reception-card copy with the review QR-code placeholder.

End of phase: commit and push the launch-assets folder. Confirm everything is brand-voice-clean (no em dashes, no overclaiming, no fake hours).

### Phase 7. Content cadence

Local search rewards freshness. Set up the next 12 weeks of content so it ships predictably.

Deliver:

1. **Blog editorial calendar**, `blog-calendar-q3-2026.md`. 12 weeks of posts. Two per week is ideal; one per week is acceptable. Each entry has: slug, title, primary keyword, audience, hook (3 sentences), outline (5-8 H2s), CTA, link destinations. Pull topics from `seo-keyword-research.md` gaps not yet covered. Examples (not exhaustive): "How to claim home-office expenses if you use a coworking space", "Where to work from when the heating breaks", "Worksop tradesperson tax tips: where to do the admin", "A morning at Worksop Workspace: what a hot desk day looks like", "Coworking near Retford: how to get to Carlton Road in 15 minutes".
2. **Two cornerstone content pieces**, ready to ship. Cornerstone = 1,500+ words, citation-magnet, link-attracts. Pick topics that no other Worksop competitor will write. My suggestions: (a) "The cost of working in Worksop in 2026: a 12-scenario breakdown" (compare WFH, coffee shops, day-pass, weekly, dedicated, private office across 12 personas. tradesperson, parent, freelancer, sales rep, etc., with maths). (b) "Bassetlaw broadband and the case for a town-centre coworking space" (use real Ofcom data, link to source). These are the kind of posts local press will link to.
3. **Blog post refresh schedule**, `blog-refresh-schedule.md`. Identify the 5 oldest underperforming posts and write a "what to update" note per post for a future quarterly refresh.

End of phase: commit and push. Schedule the next quarterly review for 3 months out.

### Phase 8. Continuous SEO/AEO optimisation

A standing programme of monthly and quarterly checks. Deliver the documentation; Connor or a future Claude session executes.

Deliver:

1. **Monthly SEO checklist**, `monthly-seo-checklist.md`. Items: bump cache-bust if CSS changed; check Google Search Console for new low-CTR/high-impression keywords; check GBP Insights; refresh one blog post that's been live 6+ months; pull one new piece of original member data for a future post; audit sitemap freshness; check that `llms.txt` still reflects the live site.
2. **Quarterly AEO test queries**, `aeo-test-protocol.md`. Procedure: run the 10 target queries in ChatGPT, Claude, Perplexity, Gemini, Google AI Overview, Copilot. Record where Worksop Workspace is cited, what's quoted, and whether competitors are mis-ranked above us. List the queries verbatim.
3. **Image alt-text audit on older pages**, run live. Audit `/community`, `/space`, `/contact`, `/sponsors`, `/support`, `/privacy-policy`, `/terms-of-business`, every `/blog/*` post older than 2026-05-01. Where alt text is generic or missing, replace with specific descriptive text (e.g. "Person working on a laptop at a Worksop Workspace hot desk" not "person at laptop"). Bump cache-bust at the end.
4. **Core Web Vitals quick wins**, run live. Check Pexels and Cloudinary image URLs are using compress and width parameters. Add `loading="lazy"` to all below-the-fold images. Add `width` and `height` attributes to images that don't have them (prevents layout shift). Move any render-blocking scripts to `defer`. Bump cache-bust.

End of phase: commit and push. Hand back to Connor with a one-line "next quarterly review on YYYY-MM-DD".

### Phase 9. Authority signals (post-launch)

Once doors are open at Carlton Road, these unlock. Do not do them until Connor confirms Phase 1 is live.

Deliver:

1. **Event schema** for the launch day on the homepage. `@type: Event` with date, location, registration link. Remove after the event.
2. **`AggregateRating` schema** added to LocalBusiness JSON-LD as soon as there are 10+ Google reviews. Pull rating and count from GBP.
3. **Press release for launch day**, `launch-press-release.md`. Pre-write so Connor can fire on launch morning. Standard format: headline, dateline, lead paragraph (5 Ws), 2-3 supporting paragraphs, quote from Connor, boilerplate, contact details. Under 400 words.
4. **Industry citations**. Claim listings on Coworker.com, Hubble, FlexOffices, Liquidspace, Office Genie. Submit a one-sentence "now open" update to each.
5. **Original member-data survey design**, `member-survey-design.md`. A 10-question survey to run after 30 days of operation, designed to generate one citation-worthy insight per quarter. Sample questions: where members commute from, what they would otherwise have used, broadband speed at home, miles avoided per week. This is link-bait fuel.

End of phase: commit and push. Move to a steady monthly cadence from this point.

---

## Output format expectations

- **Code, content and schema:** ship directly to the website, bump cache-bust, commit and push to `main`. Hostinger auto-deploys.
- **Knowledge-base assets:** save to `knowledge-base/marketing/launch-assets/` (or appropriate sub-folder), commit and push.
- **Decisions:** record in a dated markdown note in `knowledge-base/marketing/`.
- **Plans:** display in chat, do not ship until Connor confirms.

After each phase, output a short summary:
- What shipped (with file paths as markdown links)
- What's next
- Any decisions needed from Connor

Keep summaries under 300 words. Use the markdown link pattern `[filename.ext](path/from/repo/root.ext)` so Connor can click through.

---

## Tone and style for Connor

- Plain English. No jargon. Match the existing brand voice across the site.
- Direct, not flowery.
- Acknowledge what didn't work; don't pretend everything's perfect.
- If a decision needs Connor's input, ask once, briefly.
- If a phase has clear blockers (e.g. Phase 9 needs the building open), say so and stop there.

---

## Quick reference. The hard facts

| Fact | Value |
|---|---|
| Address | 30 Carlton Road, Worksop, Nottinghamshire S80 1PH |
| Coordinates | 53.3038, -1.1237 |
| Phone | +44 7739 063734 |
| Email | hello@worksopworkspace.com (operational) / hello@worksopworkspace.co.uk (alternate) |
| Hours (Phase 1) | Monday-Friday 8am-5pm |
| Broadband | 900 Mbps dedicated fibre |
| Parking | Free on-site, no time limits |
| Day Pass | £12/day |
| Hot Desk Weekly | £30/week |
| Dedicated Desk Weekly | £50/week (Phase 2) |
| Private Office | from £79/week (10 m² solo) to £125/week (20 m² team), all-inclusive. 5 offices, 4 tiers. See /private-offices for the per-office grid |
| Meeting Room | £20/hour |
| Studio | £40/hour (Phase 3) |
| Catchment radius | 15 miles |
| A1 nearest junction | Blyth, ~7 min via A57 |
| Train station | Worksop, 8 min walk |
| Bus stop | Carlton Road, 1 min walk |
| Founding sponsors | Bullseye Properties Ltd, South Yorkshire Property Buyers |
| Competitors named publicly | Worksop Turbine (The Nest), Middletons Yard, Enterprise Business Centre |

---

## Start here

Read the 4 listed knowledge-base files in full. Then propose Phase 6 batch A in chat (the first 3-4 launch-assets), wait for Connor to say "go", and execute. Each batch ends with commit, push, summary.

Reply with **"ready"** and your one-line plan for Phase 6 batch A.

---

*Worksop Workspace · A space to drop your shoulders.*
*30 Carlton Road, Worksop S80 1PH · hello@worksopworkspace.co.uk · worksopworkspace.com*
