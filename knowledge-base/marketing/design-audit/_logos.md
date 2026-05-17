# Logo Audit (Phase B)

*Worksop Workspace · Design Audit · 17 May 2026*

Investigating Connor's flag that "the logo is not working" on the live site.

---

## What I found

Every page has the Worksop Workspace logo squashed. The PNG is **1000 by 500 pixels** (2:1 ratio) but the `<img>` tags hard-code mismatched dimensions:

| Pattern | Count | Ratio | Where | Real PNG ratio |
|---|---|---|---|---|
| `height="34" width="180"` | 57 | 5.29 : 1 | Header logo on every page | 2 : 1 |
| `height="30" width="160"` | 57 | 5.33 : 1 | Footer brand logo on every page | 2 : 1 |
| `width="180" height="60"` | 4 | 3 : 1 | Sponsor section (homepage, /sponsors) for Bullseye and SYPB | 2 : 1 |

Plus the 57+57 footer-sponsor sponsor-logo refs that already got fixed to `width="200" height="100"` in commit e201b76 (correctly 2:1).

## Why the browser squashes the logo

Modern browsers use the `width` and `height` attributes on `<img>` to compute the **intrinsic aspect ratio** for layout, even when CSS later resizes the image. So:

- HTML says `width="180" height="34"` → browser thinks the image is 5.29:1
- CSS says `height: 68px; width: auto` → browser scales to 68px tall, computes width via the 5.29:1 ratio → 359px wide
- Image is rendered at 359×68px
- But the actual pixel data is 2:1, so the image data gets resampled / distorted to fit that layout box

The fix is to make the HTML attributes match the natural ratio of the PNG. The CSS rule continues to control the rendered size; the attributes just provide the correct aspect-ratio hint.

## Why this wasn't caught in the earlier footer-sponsor fix

Commit `e201b76` fixed the Bullseye and SYPB **footer sponsor strip** references from a 3:1 hint to a 2:1 hint. But the main `logo.png` references on header and footer weren't part of that sweep (different `<img>` tags, different paths). They've been wrong since Phase 2.

The 4 sponsor section instances on /index and /sponsors also weren't part of the previous sweep because they use a different surrounding HTML pattern.

## The fix

Three sed patterns. Each replaces the wrong attribute pair with `width="200" height="100"` (matches the 2:1 PNGs):

```
height="34" width="180"   →  width="200" height="100"   (Worksop logo, header)
height="30" width="160"   →  width="200" height="100"   (Worksop logo, footer brand)
width="180" height="60"   →  width="200" height="100"   (sponsor section logos)
```

After the sweep:
- Header logo will display at 68px tall × 136px wide (CSS height: 68px on .logo img, 2:1 ratio applied)
- Footer logo will display at 30px tall × 60px wide (CSS height: 30px on .footer-brand img)
- Sponsor card logos will display at their CSS max-width (220px wide, contained inside 80px tall box, object-fit: contain)

All proportional, no distortion.

## Favicons (verified clean)

| File | Real dimensions | Ratio |
|---|---|---|
| `favicon.ico` | binary, not measurable here | n/a |
| `favicon.png` | 405 × 404 | ~1:1 (acceptable) |
| `icon.png` | 405 × 405 | 1:1 |
| `icon-192.png` | 192 × 192 | 1:1 |
| `icon-512.png` | 512 × 512 | 1:1 |
| `apple-touch-icon.png` | 180 × 180 | 1:1 |

All square. No squashing issue here.

## What ships in Phase B

The three sed sweeps above, plus a cache-bust bump. No CSS changes needed; the `<img>` attribute fix alone resolves the squash.
