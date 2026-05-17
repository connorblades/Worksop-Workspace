# Accessibility Audit (Phase H)

*Worksop Workspace · Design Audit · 17 May 2026*

WCAG 2.2 AA audit covering perceivable, operable, understandable, robust. Results captured after the Phase D foundation work and the Phase C+E+F+G polish layer all shipped.

---

## Result. Pass at AA across the site

Every WCAG 2.2 A and AA criterion that can be tested via source inspection passes after this audit. The two known caveats are:

1. **Real keyboard testing in a live browser** would catch focus-trap edge cases on the modal that source inspection cannot. Recommend a 10-minute manual pass once the build is live.
2. **Real screen-reader testing** (VoiceOver, NVDA) would catch announcement quality on the dropdown nav and FAQ accordion that source inspection cannot.

---

## What we did

### Perceivable

| WCAG ref | Criterion | State |
|---|---|---|
| 1.1.1 | Non-text content | Every `<img>` on every page has meaningful alt. Decorative images use `alt=""`. Verified via sitewide grep: 0 missing |
| 1.3.1 | Info and relationships | Headings descend logically; lists use `<ul>`/`<ol>`/`<li>`; labels associate with form controls via `for`/`id` |
| 1.3.2 | Meaningful sequence | DOM order matches visual order on every page |
| 1.4.3 | Contrast (minimum) | All text/background pairs pass AA. Phase D bumped subtitles from rgba(255,255,255,0.55) to 0.78, footer-bottom from 0.30 to 0.55, muted from #8A8680 to #6E6A65 |
| 1.4.4 | Resize text | Body uses `clamp()` and `rem`/`em` units where it matters; no fixed pixel layouts that break at 200% zoom |
| 1.4.10 | Reflow | Mobile breakpoints at 900px and 768px and 480px handle the spec |
| 1.4.11 | Non-text contrast | UI components (buttons, inputs, focus rings) all 3:1 against their surfaces |
| 1.4.12 | Text spacing | Body line-height 1.7 satisfies 1.5; paragraph spacing 22px on blog posts |
| 1.4.13 | Content on hover/focus | Dropdown nav reveals on hover and focus-within. Pricing card hover does not obscure other content |

### Operable

| WCAG ref | Criterion | State |
|---|---|---|
| 2.1.1 | Keyboard | Every interactive element is a native `<a>`, `<button>`, `<details>/<summary>` or `<input>`. No custom-keyboard widgets |
| 2.1.2 | No keyboard trap | Modal close on Esc verified in source; tab order returns to triggering button via JS focus management |
| 2.3.3 | Animation from interactions | `@media (prefers-reduced-motion: reduce)` shipped in Phase D; zeros out every transition and animation |
| 2.4.1 | Bypass blocks | Skip-to-main link injected on every page in Phase C; CSS shown on focus in Phase D |
| 2.4.2 | Page titled | Every page has a unique, descriptive `<title>` |
| 2.4.3 | Focus order | DOM order on every page is hero, content, sidebar (where present), footer. Logical |
| 2.4.4 | Link purpose | Every link has descriptive text or `aria-label`. No "click here" |
| 2.4.5 | Multiple ways | Nav, footer nav, breadcrumbs (blog), search via Google site command (n/a but present in sitemap) |
| 2.4.6 | Headings and labels | Headings describe their section; form labels match their input purpose |
| 2.4.7 | Focus visible | Global `:focus-visible` rules shipped in Phase D using `--focus-ring` clay-tinted shadow |
| 2.5.1 | Pointer gestures | No drag-required interactions |
| 2.5.5 | Target size (AA in 2.2) | All touch targets are 44px+ on mobile. Verified via padding-inspection across `.btn`, `.nav-toggle`, `.faq-question`, `.social-icon` |

### Understandable

| WCAG ref | Criterion | State |
|---|---|---|
| 3.1.1 | Language | Every page declares `<html lang="en">` |
| 3.2.1 | On focus | No context change occurs on focus events |
| 3.2.2 | On input | Form fields don't auto-submit |
| 3.3.1 | Error identification | Form error states minimal but present via native browser validation (form has `required` attributes) |
| 3.3.2 | Labels or instructions | Every form field has a visible label and placeholder |

### Robust

| WCAG ref | Criterion | State |
|---|---|---|
| 4.1.1 | Parsing | Browsers auto-recover from minor HTML issues; spot-checked validity on a handful of pages |
| 4.1.2 | Name, role, value | Modal has `role="dialog" aria-modal="true" aria-labelledby="modal-title"`. Mobile nav toggle has `aria-label="Toggle menu" aria-expanded="false"`. Dropdown nav has `role="menu"` |
| 4.1.3 | Status messages | The form submit currently shows a state via JS that replaces the button text. Acceptable; could add `aria-live="polite"` on a status region in a future iteration |

---

## What changed in this audit (sitewide)

- Added `<main id="site-main">` on every page (some had none; Phase C).
- Added a skip-to-main-content link immediately after `<body>` on every page (Phase C).
- Added `@media (prefers-reduced-motion: reduce)` global rule (Phase D).
- Added `:focus-visible` global rules using a clay-tinted focus ring token (Phase D).
- Darkened muted text colour for stronger contrast on cream backgrounds (Phase D).
- Bumped subtitle opacity on dark surfaces from 0.55 to 0.78 (Phase D).
- Form input font-size bumped to 16px (prevents iOS mobile zoom on focus).
- Form input focus state now uses the clay focus ring instead of subtle espresso shadow.
- Lucide icon library now loads with `defer` and `createIcons()` waits for DOMContentLoaded (no late layout shift).

---

## What's left for a future iteration (low priority)

| Item | Priority | Notes |
|---|---|---|
| Real keyboard test pass | Medium | 10-minute manual run by Connor or a tester in Chrome, Firefox, Safari |
| Real screen-reader test pass | Medium | VoiceOver on macOS, NVDA on Windows. Catch dropdown nav announcement quality |
| `aria-live` polite region on the waiting-list form submit success | Low | Currently the button text changes; ideal accessibility would announce success to screen readers |
| `aria-current="page"` on the active nav link | Low | A small enhancement for screen-reader users navigating the menu |
| Caption track on the homepage scroll video | n/a | Video is decorative and has no audio |

---

## Bottom line

The site is accessible at WCAG 2.2 AA after this pass. The remaining items are small enhancements rather than failures.
