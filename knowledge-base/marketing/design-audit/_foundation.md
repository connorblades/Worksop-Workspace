# Foundation Audit (Phase A)

*Worksop Workspace · Design Audit · 17 May 2026*

The site has one stylesheet, `website/css/styles.css`, 3,504 lines. No build step. One font (Outfit via Google Fonts). Icons via Lucide CDN. Phase A documents what's in the design system today, what's missing, and what to fix in Phase D.

---

## 1. Design tokens (`:root` variables)

| Token | Value | Used for |
|---|---|---|
| `--white` | #FFFFFF | Body background, light surfaces, button-white |
| `--linen` | #F5F1EA | Soft cream section background, hover surfaces |
| `--oak` | #C9A57B | Hero accent, page-banner kicker text, gym-link |
| `--oak-soft` | #E5D6BE | Card hover borders |
| `--espresso` | #1A1714 | Dark sections, headings, primary text on light bg |
| `--stone` | #5C5C58 | Subtitles, body de-emphasis |
| `--sage` | #8E9775 | Confirm/positive accents, h4 labels, badge tints |
| `--clay` | #C57B57 | Primary CTA, hover accent, brand orange |
| `--navy` | #203A5B | Defined but never directly referenced. Dead token |
| `--charcoal` | #2B2B2B | Default body text |
| `--line` | #ECE8DF | Borders, separators |
| `--muted` | #8A8680 | Caption text, helper text |
| `--font` | 'Outfit' | Single family across the site |
| `--radius` | 4px | Default border radius |
| `--max-w` | 1100px | Container max-width |
| `--py` | 120px (80px @ 900px, 64px @ 768px) | Section vertical padding |
| `--px` | 48px (32px @ 900px, 24px @ 768px) | Container horizontal padding |
| `--shadow-sm` | 0 2px 8px rgba(26,23,20,0.06) | Subtle cards |
| `--shadow-md` | 0 8px 40px rgba(26,23,20,0.10) | Hovered cards, modals |

**Dead tokens:** `--navy` is defined but only the espresso colour is used for dark sections (despite class names like `.section-navy`).

---

## 2. Section background system

The site alternates section backgrounds for visual rhythm. Five recognised variants:

| Class | Background | Text colour treatment |
|---|---|---|
| `.section` (default) | var(--white) | Standard espresso/charcoal text |
| `.section-cream`, `.section-warm`, `.section-sage` | var(--linen) | Standard text, suitable for body content |
| `.section-navy` | var(--espresso) | White text, rgba(255,255,255,0.55) for subtitles |
| `.cta-section` | var(--espresso) | Same as section-navy, centred 680px container |
| `.page-banner` | var(--espresso) | Hero variant for inner pages |
| `.gym-band` | var(--linen) (was espresso, overridden later) | Standard text |

**Issues:**
- `.section-navy`, `.cta-section`, `.page-banner` all use `--espresso` but are styled with redundant rules in three places. Consolidate.
- `.section-sage` is aliased to linen, so the name is misleading.
- `.gym-band` is defined twice (lines 1204 and 3224) with the second overriding the first. Dead code at line 1204.

---

## 3. Button system

7 button variants documented:

| Class | Style | Used for |
|---|---|---|
| `.btn` (primary) | Clay fill, white text | One primary CTA per view. The "Join the waiting list" button |
| `.btn-dark` | Espresso fill, white text | Secondary CTA |
| `.btn-outline` | Transparent, espresso border | Tertiary or destructive |
| `.btn-white` | White fill, espresso text | Primary CTA on dark backgrounds |
| `.btn-outline-white` | Transparent, white border | Secondary on dark backgrounds |
| `.btn-sm` | Compact padding | Modifier |
| `.btn-lg` | Larger padding | Modifier |
| `.btn-full` | Width 100% | Modifier |

All buttons use `translate-y(-1px)` on hover. None have an animated arrow icon. Focus ring not custom; relies on browser default.

**Recommended additions:** state for `.btn:active`, `.btn:focus-visible`, `.btn:disabled`. Animated arrow on `.btn-primary` is a state-of-the-art polish move worth adding in Phase F.

---

## 4. Card patterns (8 documented)

| Pattern | Class | Used on |
|---|---|---|
| Space card | `.space-card` | Homepage product grid |
| Pricing card | `.pricing-card` (and `.pricing-card.featured`) | /membership, /private-offices, every product page |
| Feature card | `.feature-card` | Homepage features, every product page benefits |
| Persona card | `.persona-card` | /community persona grid |
| Bubble card | `.bubble-card` | Homepage pain section (numbered) |
| Sponsor card | `.sponsor-card` | Homepage sponsors-section, /sponsors |
| Blog card | `.blog-card` | /blog grid, homepage journal teaser |
| Transport card | `.transport-card` | Homepage Find us panel |

**Issues:**
- 8 different card patterns is a lot. Some could merge. Sponsor card and persona card are nearly identical visually.
- Hover treatment is consistent: border colour shift to `var(--oak-soft)`, shadow-md, translate-y(-3 or -4 px). Good.
- Border radius inconsistent: most use `var(--radius)` (4px) but sponsor-card, modal, contact-map-full, bubble-card use 12px or 24px.

**Recommendation:** introduce `--radius-card: 12px` and `--radius-pill: 100px` tokens. Migrate non-pill cards to use `--radius-card`.

---

## 5. Hero patterns

| Pattern | Used on | Style |
|---|---|---|
| `.scroll-scene` + `.scroll-stage` | Homepage only | 500vh container with sticky video that scrolls through 5 text states. Cinematic. |
| `.page-banner` | Every inner page | 80px top, 72px bottom, espresso background, white H1, oak kicker |
| `.coming-soon-hero` | /meeting-room | Centred card on linen background with `.badge-coming` |
| Blog post header | All blog posts | `.blog-post-wrap` with tighter H1, kicker, meta line |

**Issues:** the page-banner is the workhorse but the eyebrow/kicker is inconsistent. Some pages use `.eyebrow`, some use `.hero-kicker`. Both render similarly but the classes don't normalise.

**Recommendation:** rename both to `.eyebrow` everywhere. Add a `.eyebrow-light` variant for dark backgrounds (current oak colour serves).

---

## 6. Type scale

Current state, drawn from CSS:

| Element | Desktop size | Line-height | Notes |
|---|---|---|---|
| Body | 17px | 1.7 | Good default |
| h1 (default) | clamp(40px, 6vw, 72px) | 1.05 | Good |
| h2 (default) | clamp(28px, 4vw, 52px) | 1.1 | Good |
| h3 (default) | 22px | 1.3 | Tighter than mid-tier |
| h4 (default) | 13px uppercase | 1.4 | Acts as eyebrow, not heading |
| `.lead` | 19px | 1.6 | Good for hero copy |
| `.eyebrow` | 12px uppercase, 0.16em | n/a | Brand-voice strong |
| Blog post body | 17px | 1.75 | Good |
| Blog post H1 | clamp(24px, 2.8vw, 32px) | 1.25 | Capped 32px. Pleasingly editorial. |
| `.price` (pricing card) | 44px | 1 | Good |

**Issues:**
- No documented type-scale token; everything is hard-coded.
- `h4` is uppercase 13px, which is a label not a heading. This means `h3` followed by `h4` in semantic order looks like a heading hierarchy break.
- Pricing-card heading at 20px and feature-card heading at 16px are inconsistent; better to align to one ladder.

**Recommendation:** introduce a type-scale token block:

```
--text-xs: 12px;
--text-sm: 14px;
--text-base: 17px;
--text-lg: 19px;
--text-xl: 22px;
--text-2xl: 28px;
--text-3xl: 36px;
--text-4xl: clamp(40px, 6vw, 72px);
```

---

## 7. Motion system

Current state:
- Scroll-triggered classes `.animate-fade`, `.animate-left`, `.animate-right`, `.animate-scale`. Each runs 0.7-0.8s.
- Delay modifiers `.d1` through `.d5` and `.delay-1` through `.delay-5`. Two parallel naming conventions in use.
- `.btn`, `.space-card`, `.pricing-card` etc all use translate-y(-1 to -4 px) on hover.
- Bubble card has a 4s infinite `bubbleFloat` keyframe on the number bubble.
- Chat widget has a pulsing halo animation.

**Issues:**
- **No `@media (prefers-reduced-motion: reduce)` support anywhere.** Users with vestibular sensitivities will see every animation. WCAG 2.2 Success Criterion 2.3.3 fail.
- Animation durations 0.7-0.8s are too slow. Target is 200-400ms; we should drop to ~0.35-0.45s.
- Two delay naming conventions (`.d1` vs `.delay-1`). Pick one.
- Bubble-card `bubbleFloat` is a 4s infinite loop. Acceptable, but harms perceived performance.

**Recommendation:** Phase D should add prefers-reduced-motion support and shorten animation durations.

---

## 8. Focus and accessibility

Current state:
- No `:focus-visible` styles on any element.
- Form inputs have a custom focus border + shadow (good).
- Some elements rely on browser default focus rings (links, buttons, cards).
- Modal has `role="dialog" aria-modal="true"` on most pages (verify).
- No skip-to-main-content link.

**Issues:**
- Custom focus ring needs to be defined globally. WCAG 2.4.7 fails inconsistently.
- Skip-to-main-content link missing on every page. WCAG 2.4.1 fail.

**Recommendation:** add `:focus-visible` rules for every interactive element. Use a single token `--focus-ring: 0 0 0 3px rgba(197,123,87,0.4)` (clay-tinted).

---

## 9. Dead or duplicated CSS

| Issue | Location | Fix |
|---|---|---|
| `--navy` token defined, never used | line 16 | Remove |
| `.gym-band` defined twice (espresso then linen-overridden) | lines 1204 and 3224 | Delete first definition |
| `.delay-1` through `.delay-5` parallel to `.d1` through `.d4` | lines 447 and 1820 | Pick one. Recommend keeping `.delay-N` and removing `.d1-4`. |
| Two `.modal` patterns (`.modal-backdrop .modal` and legacy `.modal:not(.modal-backdrop .modal)`) | lines 1442 and 1577 | Older blog posts may still use the legacy. Audit and migrate. |
| `.section-navy`, `.cta-section`, `.page-banner` all redefine espresso bg + white text | lines 109, 1264, 1297 | Extract a `.surface-dark` mixin or unify. |
| `.stat-icon` and `.pain-icon` defined as `display: none` | lines 666 and 711 | Confirm intentional or remove rules |

---

## 10. Recommended new tokens (Phase D)

```css
:root {
  /* Type scale */
  --text-xs: 12px;
  --text-sm: 14px;
  --text-base: 17px;
  --text-lg: 19px;
  --text-xl: 22px;
  --text-2xl: 28px;
  --text-3xl: 36px;
  --text-4xl: clamp(40px, 6vw, 72px);

  /* Radius scale */
  --radius-card: 12px;
  --radius-pill: 100px;

  /* Motion */
  --ease: cubic-bezier(0.16, 1, 0.3, 1);
  --duration-fast: 0.18s;
  --duration-base: 0.28s;
  --duration-slow: 0.45s;

  /* Focus */
  --focus-ring: 0 0 0 3px rgba(197, 123, 87, 0.35);
  --focus-ring-offset: 2px;

  /* Layout / prose */
  --max-prose: 65ch;
}
```

These don't have to replace existing usage; they let new code reference a system instead of magic numbers.

---

## What ships in Phase D

Based on this audit, Phase D will:

1. Add the new tokens (no breakage; opt-in only).
2. Add `@media (prefers-reduced-motion: reduce)` support.
3. Add `:focus-visible` styles for every interactive surface.
4. Add a skip-to-main-content link via a `.sr-only` utility plus visible-on-focus rules.
5. Shorten animation durations on `.animate-*` classes from 0.8s to 0.45s.
6. Standardise `.eyebrow` vs `.hero-kicker` and `.d*` vs `.delay-*`.
7. Remove dead `--navy` token and duplicate `.gym-band` rule.
8. Add prose max-width helper for blog body and long-form sections.

No HTML changes required from this phase; everything is CSS-level.
