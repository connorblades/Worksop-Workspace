# Monthly SEO and AEO Checklist

**Worksop Workspace** · Marketing · *Standing monthly task*

Status: Draft v1 · Last updated: 17 May 2026

A short, repeatable monthly check. Run on the first working day of each month. Allow 90 minutes. The aim is small and consistent, not a quarterly deep dive.

Connor or a future Claude session executes. The output of every run is a one paragraph note in `knowledge-base/marketing/monthly-seo-notes/YYYY-MM.md` summarising what was checked, what changed and what to fix.

---

## Before you start

- Sign into Google Search Console (sc-domain:worksopworkspace.com).
- Sign into Google Business Profile dashboard.
- Open the live site in an incognito tab.
- Have a notepad ready for the closing summary.

Estimated time: 60 to 90 minutes total.

---

## 1. Cache bust check (5 minutes)

- Open one HTML file at random (try a `/near-X` or `/for-X` page).
- Grep for `styles.css?v=` and confirm every page uses the same version.
- If you have edited any CSS this month, bump the cache bust everywhere sitewide before publishing.

Current canonical: `?v=75`. Next bump: `?v=76`.

```
grep -rh "styles.css?v=" website/ | sort -u
```

The output should have one and only one version number.

---

## 2. Google Search Console review (15 minutes)

- **Performance > Search results > last 28 days.**
- Sort by impressions descending. Note the top 10 queries we are getting impressions for.
- Sort by CTR ascending. Note any query with 100+ impressions and CTR under 2%. These are page title and meta description rewrites waiting to happen. Add to the "to fix" list.
- Click through to the Pages tab. Sort by impressions descending. Note the top 10 pages.
- Click through to the Devices tab. If mobile share is under 60%, something is wrong with mobile UX. Investigate.
- Check the Coverage report. Any new errors? Any new excluded pages? Add to the "to fix" list.

What you are looking for:
- A query getting good impressions but poor clicks. Fix the title and meta description.
- A page that should be ranking but is not. Look at the body for the AEO opening sentence and internal links.
- A page being excluded from indexing that should be in. Check the robots, canonical and sitemap.

---

## 3. Google Business Profile insights (10 minutes)

- **Performance** tab in GBP dashboard.
- Note the last 28 days: profile views, search impressions, direction requests, website clicks, calls.
- Compare to the previous 28 days. Anything dropped sharply? Anything surged?
- Check for new reviews. Reply to each within 48 hours (use `review-reply-templates.md`).
- Check for new Q&A questions. Answer each within 48 hours.

Targets by month 6 (per `local-ranking-playbook.md`):
- 1,500 profile views per month
- 4,000 search impressions
- 80 direction requests
- 200 website clicks
- 50+ Google reviews at 4.7+ stars

---

## 4. Refresh one blog post (20 minutes)

Pick one post from `blog-refresh-schedule.md`. Apply the smallest possible edit that fixes the issue. Update `dateModified` in the Article schema. Leave `datePublished` alone.

After the edit:
- Save, commit, push.
- In Search Console, paste the URL into the URL Inspection tool, then click "Request indexing".

Five posts cycle through the refresh queue. Rotate. After all five are refreshed, rebuild the queue from the latest Search Console low CTR / high impressions list.

---

## 5. Original member data note (10 minutes)

A one paragraph observation pulled from the operations diary or a quick conversation with members. Examples:
- "Eight day pass walk ins this month came from Retford."
- "Three new meeting room bookings from small consultancies in Mansfield."
- "The 10am to 12 noon block on Tuesdays is now consistently the busiest slot."

Save the note. Once a quarter, the strongest observation becomes a blog post or a press pitch. This is the slow drip that turns into the cornerstone "three months in the numbers" piece on the editorial calendar.

---

## 6. Sitemap freshness (5 minutes)

- Open `website/sitemap.xml`.
- For any page edited this month, update the `<lastmod>` field to today's date.
- Save, commit, push.

Hostinger redeploys automatically. Search Console picks up the updated sitemap within a few days.

---

## 7. Verify `llms.txt` matches the live site (5 minutes)

- Open `website/llms.txt`.
- Skim against the actual live nav and product pages.
- Update any phase 1 vs phase 2 wording that has changed since last month.
- Update any pricing references that have changed.
- Save, commit, push.

`llms.txt` is the single most cited source by AI answer engines when they crawl us. A stale `llms.txt` means stale AI citations.

---

## 8. The "to fix" list (10 minutes)

Open `knowledge-base/marketing/monthly-seo-notes/` and create the month's note file (e.g. `2026-07.md`).

Format:

```
# Monthly SEO note. July 2026

Run by: Connor (or assistant name)
Date: 1 July 2026

## What changed this month
- (One line per item)

## To fix next month
- (One line per item)

## Quick observation
- (The member data note)
```

Take five minutes to write this honestly. The accumulated notes become a real audit trail across the year and prevent the same problem being found twice.

---

## End of month

- One commit per change made during the month. Do not save up changes for a single end of month commit.
- Push everything to `main` before logging off.
- If the next month is a quarter end (March, June, September, December), the quarterly AEO test protocol runs in addition. See `aeo-test-protocol.md`.

---

## Quarterly diary

| Month | Standing | Plus |
|---|---|---|
| January | Monthly checklist | Year retro, post traffic ranking, plan year ahead |
| February | Monthly checklist | UK coworking Q1 report references refreshed |
| March | Monthly checklist | Quarterly AEO test protocol |
| April | Monthly checklist | New financial year. tax angle blog post |
| May | Monthly checklist | Launch anniversary review |
| June | Monthly checklist | Quarterly AEO test protocol, summer cadence kicks in |
| July | Monthly checklist | School holidays content cadence live |
| August | Monthly checklist | Back to work / September prep |
| September | Monthly checklist | Quarterly AEO test protocol |
| October | Monthly checklist | Q4 prep, year end nudges |
| November | Monthly checklist | Year end blog refresh batch |
| December | Monthly checklist | Quarterly AEO test protocol, plan next year |

---

## What this checklist is not for

- Big strategic pivots. Those belong in a quarterly review with the action plan and gap analysis files.
- Major schema changes. Those need a deeper pass, not a monthly nudge.
- New page builds. Those follow the editorial calendar.
- Anything that takes more than 30 minutes per item. If a task overruns by 30 minutes, stop, log what is left in the "to fix" list, move on.

---

*Worksop Workspace · A space to drop your shoulders.*
*30 Carlton Road, Worksop S80 1PH · hello@worksopworkspace.com · worksopworkspace.com*
