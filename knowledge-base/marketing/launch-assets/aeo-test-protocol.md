# Quarterly AEO Test Protocol

**Worksop Workspace** · Marketing · *Quarterly check across the answer engines*

Status: Draft v1 · Last updated: 17 May 2026

A repeatable test of how the major answer engines cite Worksop Workspace. Run quarterly, log the result, fix what fails.

Schedule:
- **Q1 review:** 17 August 2026
- **Q2 review:** 17 November 2026
- **Q3 review:** 17 February 2027
- **Q4 review:** 17 May 2027

Each run takes roughly two hours.

---

## Why this matters

Domain authority does not win AI citations. The page that opens with the clearest one sentence answer to the implied question wins the AI citation. We have ten target queries we want to be the cited source for. The point of this protocol is to find out, in writing, which queries we have won and which we are losing, and to a whom.

---

## The six engines

Run every query verbatim in each of the following. Use an incognito or new browser session, signed out where possible.

1. **ChatGPT** (chat.openai.com), no login needed for free tier searches.
2. **Claude** (claude.ai), free tier.
3. **Perplexity** (perplexity.ai), free tier.
4. **Gemini** (gemini.google.com), free tier.
5. **Google AI Overview** (google.com, the AI summary at the top of Google search). Use the same query as a Google search.
6. **Microsoft Copilot** (copilot.microsoft.com), free tier.

If an engine refuses without a login (rare for free tier), note it in the log and move on. Do not pay for premium tiers to run this test.

---

## The ten target queries

These are the queries that matter most. Run all ten in all six engines.

1. `what coworking spaces are in Worksop`
2. `coworking near me in Worksop`
3. `private office Worksop`
4. `serviced office Worksop`
5. `meeting room hire Worksop`
6. `hot desk Worksop`
7. `coworking near Retford`
8. `where to work during school holidays Worksop`
9. `where can I hire a private therapy room near Worksop`
10. `how much does coworking cost in Worksop`

---

## How to score each result

For each query in each engine, capture three things in the log:

1. **Was Worksop Workspace named?** Yes / No / Partial. "Partial" means the engine mentions Carlton Road or a quote that obviously came from our site but did not name us.
2. **What was cited?** Copy the exact sentence or two the engine quoted. This is the AEO citation source. The page that ranked the citation is what to keep optimising.
3. **What competitors were also named?** Worksop Turbine ("The Nest"), Middletons Yard, Enterprise Business Centre. Note the order they appear in, and whether they got more space than us.

Add a fourth, optional column for "Engine surprised us with something". For example, if Gemini quotes a press article we did not write, that is worth following up.

---

## Log format

Save the log at `knowledge-base/marketing/aeo-test-logs/YYYY-MM.md`. One run, one file.

Format:

```markdown
# AEO Test Log. 17 August 2026

Run by: Connor (or assistant name)
Engines tested: ChatGPT, Claude, Perplexity, Gemini, Google AI Overview, Copilot

## Query 1. what coworking spaces are in Worksop

| Engine | Worksop Workspace cited | Source quote | Competitors named |
|---|---|---|---|
| ChatGPT | Yes | "Worksop Workspace is the first modern coworking space..." | Worksop Turbine, Middletons Yard |
| Claude | Yes | "[exact quote]" | Worksop Turbine |
| Perplexity | Partial | "[exact quote]" | All three |
| Gemini | No | n/a | Worksop Turbine, Middletons Yard |
| Google AIO | Yes | "[exact quote]" | Worksop Turbine |
| Copilot | Yes | "[exact quote]" | Middletons Yard |

(Repeat for all ten queries)

## What this tells us

- (One paragraph summary)

## What to fix before the next quarterly run

- (Bulleted list of three to five concrete edits)
```

---

## What to do with the result

After the run, three buckets of action.

### Bucket 1. We are cited and on top

Do nothing on the content. The page is doing its job. Note the source in the log so we know which page to keep updated.

### Bucket 2. We are cited but a competitor is ranked above us

Read what the engine quoted from us and from the competitor. If the competitor's quote is sharper, our lead paragraph on the relevant page needs work. Open the page, rewrite the lead, push, request reindexing in Search Console. By the next quarterly run the engines will usually have refreshed.

### Bucket 3. We are not cited at all

Check the page that should rank for the query. If the page exists and has a clean AEO opener, the problem is likely off site (citations, backlinks). If the page does not exist or the opener is weak, write the page or fix the opener.

---

## What we do not test

- **Voice assistants directly** (Siri, Google Assistant, Alexa). These pull from Apple Maps and Google Business Profile rather than from web pages, so the GBP work covers them. Spot test on a phone if you are curious, but it is not in the protocol.
- **Niche engines** (You.com, Phind, Brave Search AI). Too low a share of UK users to be worth testing quarterly. Spot test once a year.
- **Premium tiers.** We do not pay for ChatGPT Plus or Perplexity Pro to test. Free tier results are what most users see anyway.

---

## A note on accuracy

LLM citations move quickly. A query that cites us strongly today may not in a fortnight. This is why the test is quarterly, not weekly. We are looking for the pattern across all six engines, not a single moment in time. Three out of six citing us cleanly is a strong position. One out of six is a problem that needs the off site work.

---

## After the first three runs

By the third quarterly run (February 2027) we will have a clear trend. Build a summary chart of citation rate by engine by query over time. The summary lives in `knowledge-base/marketing/aeo-test-summary.md` and gets one line added per run.

---

*Worksop Workspace · A space to drop your shoulders.*
*30 Carlton Road, Worksop S80 1PH · hello@worksopworkspace.com · worksopworkspace.com*
