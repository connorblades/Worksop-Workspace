# Prompt. Design Audit and State-of-the-Art Polish

*Paste everything below the line into a new Claude Code session.*

---

## Mission

Audit every page of worksopworkspace.com and bring the visual design, typography, readability, motion, accessibility and performance up to **state-of-the-art** for a 2026 launch. The current site is content-complete and SEO-strong. What it isn't yet is **visually as good as the positioning**. Worksop Workspace pitches as the modern, well-designed alternative to council-funded business centres and rented hotel rooms. The site needs to deliver that promise in three seconds when a stranger lands on it.

State-of-the-art for this brand does not mean visual gimmicks, animation overkill, or trendy frosted-glass nonsense. It means:

- Typography that reads like a book, not a brochure
- Visual hierarchy that tells you what matters before you have to think
- Motion that's purposeful and quick, never showy
- Whitespace that lets the brand breathe
- Genuinely accessible (WCAG 2.2 AA at minimum, AAA where reasonable)
- Fast (LCP under 2 seconds, INP under 200 ms, CLS under 0.05)
- Mobile-first and beautiful on the smallest screen
- Cohesive across every page (no orphan styles, no template drift)

Reference aesthetic, in spirit not literal copy: Linear, Stripe, Vercel, Posthog, A24, Mindspace, Second Home, King's Cross Goods Yard's brand site. Calm, confident, typographic.

---

## Where we are now

Six phases of work have shipped:

| Phase | What shipped | Status |
|---|---|---|
| 1 | Brand, positioning, pricing, GHL backend forms | Done |
| 2 | 50+ pages. audience, location, product, blog, dropdown nav | Done |
| 3 | SEO research, gap analysis, action plan | Done |
| 4 | Top 10 SEO/AEO action items | Done |
| 5 | Bonus items 11-15. llms.txt, robots.txt, FAQ schema retrofit, internal links, A1 blog | Done |
| 5.5 | Meeting room reprice £30 to £20/hr | Done |
| 5.6 | Private offices repriced to per-sqft tiered structure £79 to £125/wk | Done |
| 5.7 | Em-dash sweep cleanup (1.4 people, £15.£25, Sheffield.Lincoln etc) and footer sponsor logo aspect ratio fix | Done |

Read these knowledge-base files before doing anything else:

- `knowledge-base/marketing/seo-keyword-research.md`
- `knowledge-base/marketing/seo-action-plan.md`
- `knowledge-base/marketing/local-ranking-playbook.md`
- `knowledge-base/marketing/push-to-number-one-prompt.md` (for SEO/AEO context)
- This file

Look at the live site at https://worksopworkspace.com and the source in `website/`. The main stylesheet is `website/css/styles.css`. Custom fonts are loaded from Google Fonts (Outfit 400-800). Icons from Lucide (loaded via CDN). One stylesheet, no build step, plain HTML.

---

## Specific issues already flagged

These are known by Connor and need to be in scope of the audit, not added at the end:

1. **The main site logo is not rendering correctly somewhere.** Connor flagged this on 2026-05-17. Could be the header logo, the footer logo, or both. The footer sponsor logos were squashed from a 3:1 hard-coded aspect ratio versus 2:1 real PNGs; fix shipped in commit e201b76. Investigate whether the Worksop Workspace logo itself has the same kind of aspect-ratio mismatch in any `<img>` tag, or whether the CSS sizing is breaking it at certain breakpoints. Check header (top-left), footer (the "Worksop Workspace" wordmark in the footer-brand block), favicon, apple-touch-icon, and the modal logo if there is one.

2. **Readability on some pages could be improved.** Connor flagged that some pages are harder to read than others. Likely culprits: line length too long on desktop (over 75 characters), line-height too tight, body text too small on mobile, low contrast on certain backgrounds, paragraph spacing too compressed. The newest pages (`/private-offices`, `/membership`, `/community`) are stronger than the older pages (older `/blog/*` posts pre-May 2026). Audit every body content section against the typography principles below.

3. **Em-dash sweep legacy.** Earlier brand-voice sweep replaced em dashes with full stops everywhere, leaving range artefacts (1.4 people, £15.£25, Sheffield.Lincoln) that took several follow-up passes to clean. **Do not** reintroduce em dashes during this audit. Use commas, full stops or the word "to" for ranges. Use a regular hyphen only inside hyphenated proper nouns or compound adjectives, never as a sentence-level pause.

---

## Locked constraints (do not change without asking)

1. **Brand voice.** Plain English. No em dashes. No en dashes. No pause punctuation of any kind. Sentences end with full stops. Lists use full stops. Ranges use the word "to" or a comma. Banned phrases stay banned (see brand-guidelines if present in knowledge-base).
2. **AEO-citable opening sentence.** Every page lead opens with a one-sentence direct answer to the implied query. Do not lead with a tagline.
3. **15-mile catchment.** Worksop, Retford, Tickhill, Bawtry, Maltby, Dinnington, Harworth, Clowne, Doncaster (south), Mansfield (north).
4. **Don't promise what isn't there.** Phase 2 dedicated desks and Phase 3 studio are not yet bookable. Always say "from Phase 2" or "from Phase 3".
5. **Don't overclaim.** "First modern coworking space in Worksop town centre" is the approved framing. Never revert to "only" or "first dedicated".
6. **Hours.** Phase 1 manned hours are 8am to 5pm Monday to Friday.
7. **Pricing.** £12 day pass, £30 hot desk weekly, £50 dedicated desk weekly (Phase 2), £79 to £125 private office weekly (5 offices, 4 tiers, see /private-offices), £20 per hour meeting room, £40 per hour studio (Phase 3).
8. **No destructive git.** Never --no-verify, --force, reset --hard. Always commit cleanly, push to main.
9. **Cache-bust pattern.** Current is `?v=79` on `styles.css`. Bump on every CSS-touching change.
10. **GHL is the backend.** Waiting-list forms post to GoHighLevel. Don't replace or restyle the form unless asked.
11. **Don't reintroduce em dashes.** Audit replacements should use commas, full stops or "to".
12. **No breaking changes to canonical URLs, JSON-LD, sitemap, robots, llms.txt.** These are SEO assets and any change risks rankings.
13. **One stylesheet, no build step.** Don't introduce Sass, PostCSS, Tailwind or a bundler. Plain HTML and CSS only.

---

## Design principles for this audit

The framework to evaluate every page against.

### 1. Typography

The single biggest readability win. Target the following on body content sections (paragraphs, lists, FAQs):

- **Font size:** 17px to 19px on desktop, 16px to 17px on mobile for body. Never smaller than 16px on mobile for any reading content.
- **Line height:** 1.6 to 1.75 for body paragraphs. 1.3 to 1.4 for headings.
- **Line length:** maximum 70 to 75 characters per line on desktop. Use `max-width: 65ch` or `max-width: 720px` containers for long-form copy. Wider than 80 characters is harder to read; narrower than 45 characters is choppy.
- **Paragraph spacing:** 1em to 1.25em between paragraphs.
- **Letter spacing:** zero on body. Small negative (-0.01em to -0.02em) on large display headings only.
- **Font weight contrast:** 400 for body, 600 for strong/links, 700 for h2/h3, 800 for h1. No 500 anywhere (looks like a glitch).
- **Heading hierarchy:** h1 ~48-72px, h2 ~32-40px, h3 ~22-26px, h4 ~18-20px. Halve on mobile.

Outfit (the current font) is fine. Stick with it. Consider adding a serif for blog posts if it suits, but do not change without asking.

### 2. Colour and contrast

- WCAG 2.2 AA at minimum (4.5:1 for body, 3:1 for large text).
- Aim for AAA (7:1 body, 4.5:1 large) on the cream and warm backgrounds.
- Audit every text/background pair, especially the white-on-clay buttons, the light-grey subtitle text under headings, the cream-on-cream pricing cards, and the muted-text footer.
- Brand palette (in `:root` of styles.css): cream, warm, clay, espresso, stone, sage, navy, white. Keep these. Do not introduce new colours.
- Body text on dark sections (navy, espresso) should be at least rgba(255,255,255,0.85), not 0.65 or 0.7.

### 3. Spacing and rhythm

- Sections should have 80 to 120px of vertical padding on desktop. 48 to 64px on mobile.
- Vertical rhythm between content blocks should be consistent. Use multiples of 8 (8, 16, 24, 32, 48, 64, 96, 128).
- Cards should have generous internal padding (24 to 32px on desktop).
- Avoid cramped grids. If a card grid feels tight, reduce the column count.

### 4. Visual hierarchy

- One thing matters most on every page. Make sure the page makes that obvious within 3 seconds of scrolling.
- Hero CTA should be unmissable. The "Join the waiting list" button.
- Secondary CTAs (footer cards, "Read next", related pages) should be present but quieter.
- Avoid more than two competing CTAs above the fold.

### 5. Motion and interactivity

The current site uses scroll-triggered fade animations (`.animate-fade`, `.animate-fade-up`, etc.) and a scroll-progress bar. Audit:

- Animations should complete in 200 to 400ms. Anything slower feels broken.
- `prefers-reduced-motion: reduce` should disable animations. Add a media query if missing.
- Hover states should exist on every interactive element. Buttons, links, cards, nav items.
- Active and focus states need clear visual treatment. Never rely on browser default focus rings; design ours.
- Avoid: bounce animations, parallax outside the hero, fade-in on every block (creates janky scrolling).

### 6. Accessibility

- All `<img>` tags need meaningful `alt` text. No empty alts on content images.
- Every interactive element needs a discernible label. `aria-label` on icon-only buttons.
- Headings descend logically (h1 then h2 then h3, no skipping).
- Form fields have associated labels.
- Tab order is logical.
- Focus is visible at all times (custom focus ring).
- Modal dialogs have proper focus trap and `role="dialog" aria-modal="true"`.
- The mobile nav toggle uses `aria-expanded` correctly (it does, verify).
- Skip-to-main-content link at the top of every page (likely missing).

### 7. Performance and Core Web Vitals

Targets:

- **LCP** (Largest Contentful Paint) under 2.0 seconds on a 3G connection.
- **INP** (Interaction to Next Paint) under 200ms.
- **CLS** (Cumulative Layout Shift) under 0.05.
- Total page weight under 800 KB on first load (excluding video).

Audit each page:

- Images use width/height attributes matching their natural aspect ratio (recent footer logo bug was caused by mismatched aspect ratios. check every img tag).
- Images below the fold have `loading="lazy"`.
- Images use modern formats (WebP, AVIF) where possible, with proper srcset.
- Pexels CDN URLs use `?auto=compress&cs=tinysrgb&w=1200` parameters.
- Cloudinary URLs use `f_auto,q_auto` transformations.
- Fonts: preconnect to Google Fonts is in place. Verify `font-display: swap` is set.
- Lucide icons: confirm the umd.min.js script isn't blocking render. Move to defer if not already.
- The scroll-stage video on the homepage is large. Verify it's lazy-loaded properly and has a poster image.

### 8. Mobile-first responsive

- Touch targets minimum 44px square (Apple guideline) or 48px (Google).
- Mobile nav drawer should be usable with one thumb.
- Font sizes never below 16px on mobile for any reading content.
- Carousels and horizontal scrollers should snap and indicate scrollability.
- Tables: never let them overflow horizontally without a clear scroll affordance.

### 9. Cohesion across pages

The biggest tell of an amateur site is template drift. Different pages with different patterns, slightly different spacing, slightly different button styles, slightly different cards. Audit:

- Every page uses the same nav and footer (verify, the older pages predate the dropdown nav rollout in Phase 2; some may still have the old flat nav).
- Every CTA button uses the same component class.
- Every "feature card" uses the same component class.
- Every FAQ uses the same `<details>` pattern.
- Every hero uses one of two or three documented variants.

### 10. State-of-the-art moments

Where to add small, restrained craft that elevates the perception:

- **Hero typography.** Consider a refined display approach on the homepage hero. The current scroll-stage is good. Keep it.
- **Page-banner refinements.** The kicker label (small caps, letter-spaced) is a strong pattern; make sure every page has it.
- **Section dividers.** Subtle gradient borders or thin keylines between sections instead of just background colour changes.
- **Pricing cards.** Could use deeper shadows, better hover treatment, a "selected" state for the featured card.
- **Buttons.** Consider arrow icons on primary CTAs that animate on hover (translate-x).
- **Forms.** Floating labels or persistent labels with refined focus rings.
- **Image treatment.** Subtle rounded corners and a hint of shadow on content imagery. Avoid the default sharp corners that older pages have.
- **Cursor effects.** Skip. Skip ALL custom cursor effects. They harm accessibility.
- **Cookie banner.** If we add one, make it minimal and brand-voice. Not a giant modal.

---

## The audit framework

For every page in `website/`, capture the following:

| Field | What to record |
|---|---|
| URL | The path |
| Score 1-10 | Subjective overall score |
| Heading hierarchy | Pass/fail and notes |
| Typography (body) | Font size, line-height, line length |
| Contrast issues | List any pairs below WCAG AA |
| Spacing issues | Cramped sections, inconsistent rhythm |
| Image issues | Aspect ratio, alt text, lazy loading |
| CTA issues | Hierarchy, hover state, mobile size |
| Accessibility issues | Focus, aria, semantics |
| Performance issues | Render-blocking, layout shift |
| Mobile issues | Touch targets, scroll, readability |
| Recommended fixes | Prioritised list, top 5 |

Save the per-page audit as `knowledge-base/marketing/design-audit/<slug>.md`. Run them all into one summary at `knowledge-base/marketing/design-audit/_summary.md`.

---

## What to do (sequenced)

Run as numbered phases. Commit and push after each. Show Connor the summary of each phase and wait for sign-off before the next.

### Phase A. Foundation audit (no code changes)

Audit the global stylesheet and the design system that's actually in use.

Deliver `knowledge-base/marketing/design-audit/_foundation.md` covering:

1. The complete inventory of CSS custom properties (`:root` variables). Document each one and what it's used for.
2. The complete inventory of section background colours and how they alternate.
3. The complete inventory of button styles, with screenshots if possible.
4. The complete inventory of card patterns.
5. The complete inventory of hero patterns (page-banner, scroll-stage, etc).
6. Any CSS that's dead (defined but unused).
7. Recommended additions: focus-ring tokens, motion-duration tokens, type-scale tokens if missing.

### Phase B. Logo audit and fix

Specifically investigate the logo issue Connor flagged.

1. Identify every `<img>` referring to `logo.png`, `Bullseye-logo.png`, `SYPB-logo.png`, the favicon, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`.
2. For each: real PNG dimensions, declared `width`/`height` attributes, applied CSS sizing, expected display.
3. Identify any mismatches.
4. Fix them in code. Bump cache-bust. Commit and push.
5. Report findings as `knowledge-base/marketing/design-audit/_logos.md`.

### Phase C. Per-page audit (every page on the site)

Walk the site URL by URL. Start with the highest-value pages:

1. `/` (homepage)
2. `/space`
3. `/membership`
4. `/private-offices`
5. `/meeting-room`
6. `/hot-desks`
7. `/dedicated-desks`
8. `/podcast-studio`
9. `/community`
10. `/contact`
11. All 6 audience pages (`/for-*`, `/working-from-home-alternative`, `/private-room-for-1-to-1s`)
12. All 9 location pages (`/near-*`, `/bassetlaw`)
13. `/blog` and every blog post
14. `/sponsors`, `/support`, `/privacy-policy`, `/terms-of-business`, `/thank-you`

For each: render the page mentally based on the source, capture the audit fields above, save the per-page note. Group into batches of 5-10 pages per commit.

### Phase D. Fix the foundation issues

Based on Phase A and C findings, implement the high-impact global fixes first:

1. Typography updates to `:root` and body styles (font size, line-height, max-width on prose).
2. Contrast fixes on muted text colours.
3. Focus ring standardisation.
4. `prefers-reduced-motion` support.
5. Skip-to-main-content link.
6. Section spacing tokens unified.
7. Image lazy-loading and aspect-ratio attributes everywhere.

Bump cache-bust, commit, push.

### Phase E. Page-by-page polish

Implement the per-page fixes from Phase C, in order of value (highest-traffic and highest-conversion pages first). One batch of 3-5 pages per commit. Each batch:

- Apply specific fixes per the audit notes
- Spot-check visually (describe what would render)
- Bump cache-bust
- Commit with a short description of what changed and why

### Phase F. Motion and polish layer

Once the foundation and content are clean, add the restrained craft:

1. Refined hover and active states on every interactive element.
2. Arrow-icon translate-x on primary CTAs.
3. Subtle gradient or keyline section dividers.
4. Pricing card hover and "selected" states.
5. Image rounded corners and shadow treatment.
6. Form input focus rings and validation states.

### Phase G. Performance pass

1. Audit every image: format, compression parameters, dimensions, lazy loading, aspect ratio.
2. Audit fonts: subsetting, display strategy, preload critical weight.
3. Audit JS: defer non-critical, preconnect to CDN origins.
4. Audit CSS: critical CSS extracted into `<style>` head if needed, rest deferred.
5. Audit layout shift: every img and iframe has width/height, no fonts swap layout, no animations cause shift.
6. Run a mental Lighthouse: list anything blocking the target scores.

### Phase H. Accessibility certification pass

1. Run an axe-DevTools-style mental audit on every page.
2. Fix every WCAG 2.2 AA failure found.
3. Verify keyboard navigation across the site.
4. Verify screen-reader friendliness on the modal, dropdown nav, FAQs, forms.
5. Document the pass at `knowledge-base/marketing/design-audit/_accessibility.md`.

### Phase I. Final consistency sweep

1. Re-walk every page checking for template drift (any pre-Phase-2 page that still has the old flat nav, old footer, old CTAs).
2. Verify cache-bust is consistent across all HTML.
3. Verify llms.txt and sitemap reflect every live page.
4. Run a final visual proof-read for any remaining brand voice slips (em dashes, lowercase-after-period, etc).

---

## Output format expectations

- **Code changes:** ship directly to `website/`, bump cache-bust, commit and push to main. Hostinger auto-deploys.
- **Audit notes:** save to `knowledge-base/marketing/design-audit/`, one file per scope. Commit alongside the related code change.
- **Summaries:** after each phase, output a short summary in chat (under 300 words). What was audited, what was fixed, what's next. Use markdown link pattern `[filename.ext](path/from/repo/root.ext)` for file references.
- **Plans:** display in chat, do not ship until Connor confirms.
- **Decisions:** record in dated markdown notes in `knowledge-base/marketing/`.

After each phase, ask Connor if you should proceed to the next. Do not chain all 9 phases without sign-off.

---

## Tone and style for Connor

- Plain English. No jargon. Match the existing brand voice across the site.
- Direct, not flowery.
- Acknowledge what didn't work; don't pretend everything's perfect.
- If a decision needs Connor's input, ask once, briefly.
- Show, don't tell. When you describe a typography change, give the exact CSS.
- Be honest if you can't actually test something (you can't take screenshots of the live site, you can only reason from source).

---

## Quick reference. The hard facts

| Fact | Value |
|---|---|
| Domain | https://worksopworkspace.com |
| Repo | github.com/connorblades/Worksop-Workspace |
| Branch | main |
| Hosting | Hostinger Horizons (auto-deploy on push to main) |
| Address | 30 Carlton Road, Worksop, Nottinghamshire S80 1PH |
| Hours (Phase 1) | Monday-Friday 8am-5pm |
| Day Pass | £12/day |
| Hot Desk Weekly | £30/week |
| Dedicated Desk Weekly | £50/week (Phase 2) |
| Private Office | from £79/week (6 m² solo) to £125/week (20 m² team) |
| Meeting Room | £20/hour |
| Studio | £40/hour (Phase 3) |
| Stylesheet | website/css/styles.css |
| Font | Outfit (Google Fonts, 400-800) |
| Icons | Lucide (CDN) |
| Cache-bust current | ?v=79 |
| Competitors | Worksop Turbine (The Nest), Middletons Yard, Enterprise Business Centre |

---

## Start here

Read the listed knowledge-base files in full. Then propose Phase A (foundation audit) in chat as a one-paragraph plan. Wait for Connor to say "go", then execute Phase A. Each phase ends with a commit, push, and short summary in chat.

Reply with **"ready"** and your one-line plan for Phase A.

---

*Worksop Workspace · A space to drop your shoulders.*
*30 Carlton Road, Worksop S80 1PH · hello@worksopworkspace.co.uk · worksopworkspace.com*
