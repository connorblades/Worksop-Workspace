# Blog Refresh Schedule

**Worksop Workspace** · Marketing · *Quarterly content maintenance*

Status: Draft v1 · Last updated: 17 May 2026

Google rewards content that is kept up to date. A post that ranked in 2026 with a stale date stamp and a stale pricing reference does not rank in 2027. This is the rolling refresh queue.

Pull this list every quarter. Pick the three weakest in Search Console, refresh, change the `dateModified` field in the Article schema, leave `datePublished` as it was. Re submit the page in Search Console after the edit.

---

## How posts were selected

Without analytics access on the live site, the candidates below were selected on three criteria:

1. **Pricing references that age fast.** Anything quoting the £30 meeting room (now £20) or the old hot desk price.
2. **Topic timeliness.** Anything tied to "current market" or "Q1 2026 figures" needs a refresh as the year moves on.
3. **Internal link integrity.** Posts written before some of the audience and location pages existed often miss the cross link they should now have.

Once Search Console is live with three months of data, replace this method with the lowest CTR plus highest impressions filter. That is the underperforming bucket Google is hinting at.

---

## The five oldest underperforming candidates

### 1. `/blog/working-from-home-vs-coworking`

**Why refresh.** Likely written before half the location and audience pages existed. Almost certainly missing cross links to `/working-from-home-alternative`, `/for-parents`, `/for-freelancers`. Tone may still lean generic UK rather than Bassetlaw specific.

**What to update.**
- Rewrite the lead sentence as a direct AEO answer to "is working from home or coworking better".
- Add three internal links: `/working-from-home-alternative`, `/for-parents`, `/for-freelancers`.
- Insert one Bassetlaw specific data point (broadband, school holiday weeks, commute pattern).
- Update any pricing figure to match the May 2026 facts (meeting room £20).
- Add or update FAQPage schema with two short Q&As.
- Refresh the featured image alt text to be specific.

**Target effort.** 45 minutes.

---

### 2. `/blog/cost-of-working-from-a-coffee-shop`

**Why refresh.** Numbers in this post will have drifted as coffee shop prices rose. A 2024 coffee plus pastry figure looks understated in 2026. The post should also point at the new cornerstone "cost of working in Worksop 2026" piece.

**What to update.**
- Replace the coffee shop price points with 2026 figures (verify two local cafes).
- Add a sentence on Wi Fi reliability in town centre cafes (varies by location and time of day).
- Cross link to `/blog/cost-of-working-in-worksop-2026-scenarios` (the new cornerstone).
- Add a UK 2026 day pass median reference (£25).
- Update `dateModified` in the Article schema.

**Target effort.** 30 minutes.

---

### 3. `/blog/hot-desk-vs-private-office`

**Why refresh.** Earlier copy may use the old "only coworking space" claim. Verify and soften per the approved variant. Also pre dates the dedicated `/dedicated-desks` page, so the middle ground is probably missing.

**What to update.**
- Remove or soften any "only coworking space" wording.
- Add a third option to the comparison: the dedicated desk at £50 a week, available from Phase 2.
- Cross link to `/hot-desks`, `/dedicated-desks`, `/private-offices` for each option.
- Update any meeting room pricing reference to £20 an hour.
- Add a short FAQ at the end: "What is the difference between a hot desk and a dedicated desk?"

**Target effort.** 30 minutes.

---

### 4. `/blog/is-coworking-worth-it-cost-breakdown`

**Why refresh.** Cost breakdown posts get stale fast. Q1 2026 UK medians should be quoted here. The post should also link to the new cornerstone and to `/membership`.

**What to update.**
- Add Q1 2026 UK coworking pricing context (£180 monthly median, £25 day pass median, £20 meeting room median).
- Cite the CoworkingCafe Q1 2026 report as the source.
- Cross link to `/membership` and to `/blog/cost-of-working-in-worksop-2026-scenarios`.
- Verify all £ figures match current Worksop Workspace pricing (hot desk £30 weekly, day pass £12, meeting room £20).
- Add FAQPage schema if not present.

**Target effort.** 40 minutes.

---

### 5. `/blog/coworking-vs-office-lease`

**Why refresh.** Lease maths shifts as commercial rents move. Worksop town centre rents in mid 2026 should be checked against the latest Rightmove or local agent figures. The post should also reflect the May 2026 meeting room reprice if relevant.

**What to update.**
- Verify Worksop town centre commercial rent per square foot. Update the comparison maths.
- Tighten the lead paragraph to answer "should I lease an office or take a coworking private office in Worksop".
- Cross link to `/private-offices`, `/blog/private-office-vs-high-street-lease-worksop` (the new piece in the editorial calendar).
- Update business rates relief threshold if any change since publication.
- Update `dateModified`.

**Target effort.** 45 minutes.

---

## The quarterly refresh process

Once every three months:

1. Pull Search Console data for the last 90 days. Sort by impressions descending, then CTR ascending. The bottom of that list is the refresh candidates.
2. Open each candidate. Run the checklist below.
3. Apply the smallest edit that fixes the issue. Do not rewrite the whole post if a sentence and a link will do.
4. Update `dateModified` in the JSON LD Article schema. Leave `datePublished` alone.
5. Save, commit, push. Hostinger redeploys.
6. In Search Console, request indexing on the updated URL.

### The refresh checklist

- Does the lead sentence answer the implied AEO question in one sentence?
- Are there three or more internal links to product, audience or location pages?
- Are all £ figures accurate as of today?
- Does the post still claim "only coworking space" anywhere?
- Are there any em or en dashes that slipped through?
- Are images using `loading="lazy"` below the fold, and explicit width and height?
- Is alt text specific or generic?
- Is FAQPage schema present where the body has a Q&A block?
- Is the meta description under 160 characters and accurate?
- Is the canonical URL correct?

---

## When to retire a post

A post is retired (not refreshed) if:

- The topic has been absorbed into a better newer post and the older post now cannibalises.
- The product or service referenced no longer exists.
- The post is so generic it adds no SEO value and brand voice has moved on.

To retire:

1. Decide the canonical replacement URL.
2. Add a 301 redirect from the retired slug to the replacement in `vercel.json` or via Hostinger config, whichever is wired up.
3. Remove the file.
4. Update the sitemap.
5. Note the retirement and replacement URL in the quarterly review note.

Do not delete a post without a 301. Killing a URL Google has indexed costs more than the post.

---

## Next quarterly review

**2026-11-17.** Three months after the launch quarter wraps. By then there will be real Search Console data to use rather than the heuristic in this draft.

---

*Worksop Workspace · A space to drop your shoulders.*
*30 Carlton Road, Worksop S80 1PH · hello@worksopworkspace.com · worksopworkspace.com*
