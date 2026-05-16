# Worksop Workspace — Scroll-Built Scene Brief

*A spec for Claude Code. Pair this with the brand palette already produced in the separate chat. UK English throughout.*

---

## 1. The Idea in One Line

As the visitor scrolls, an empty room fills with the things that turn it into a workspace — desk, chair, computer, coffee, plant, locker, lamp, headphones — until the full Worksop Workspace floor is on screen. By the time they've scrolled past, they've **moved in**.

This is not decoration. The scene is the brand promise made visual: *"I can drop my shoulders here. This is a place for me."*

---

## 2. Why This Works for the Brand

- The space sits between a coffee shop and a workspace. The scene literally builds that hybrid in front of the viewer.
- The brand voice is quietly confident, unhurried, welcoming. The motion must match — items glide and settle, never bounce or pop.
- The biggest objection from prospects is "I can't picture what it is." The scene answers that without a single stock photo.
- It frames the offer (desk, chair, Wi-Fi, coffee, lockers, community) without a feature list.

---

## 3. The Camera

- **Perspective:** 3/4 isometric view of one corner of the ground floor — desk against a window, wall to the left, floor running off to the right. Isometric matches the existing `website/isometric-floorplan.jpeg` reference and reads well at any size.
- **Frame:** fixed. The canvas does not move. Items animate **into** the canvas. The scene is pinned (`position: sticky; top: 0; height: 100vh`) while a tall scroll-spacer drives progress.
- **Lighting:** soft morning light from a window on the right. Background warms slightly (linen → soft oak) from beat 1 to beat 10 to suggest the start of a working day.
- **Mobile fallback:** flatten to a 2D side-on view at <768px. Same beats, simpler geometry.

---

## 4. The Beats (in scroll order)

Each beat occupies roughly 10vh of scroll progress (total scene length ≈ 100vh on top of the 100vh sticky stage = ~200vh of document). One headline per beat, max one short line of copy. Copy is paired with the visual element arriving.

| # | What arrives | Headline | Sub-line |
|---|---|---|---|
| 1 | Empty room — floorboards, window, morning light | A space that feels like work. | Not your kitchen table. Not the coffee shop. |
| 2 | Rug unrolls; framed print appears on the wall | Built around how you actually work. | Quiet when you need it. Community when you want it. |
| 3 | **Oak desk** slides in from the left | Your desk. | Same one. Every time you walk in. |
| 4 | **Ergonomic chair** rolls in and tucks under | Built for full days. | Not just sit-down-and-go. |
| 5 | **Monitor + laptop** land on the desk; screen lights up | Plug in. | Fast Wi-Fi. Everything else is sorted. |
| 6 | **Coffee mug** arrives with a wisp of steam | Unlimited coffee. | No queueing. No buying a flat white to justify the seat. |
| 7 | **Plant** rises in the corner (sage tones) | A space that's looked after. | So you can focus on yours. |
| 8 | **Notebook, pen, desk lamp, headphones, locker** stack in together | Storage, light, quiet — handled. | The boring bits, done properly. |
| 9 | Two soft silhouettes appear in the background, mid-distance | You're not on your own here. | But no-one's going to interrupt you either. |
| 10 | The complete desk holds still — fully assembled, lived-in, ready. Camera does **not** move. | This is your workspace in Worksop. | Carlton Road. Opening soon. |
| 11 | Handoff — the desk lifts/slides upward off-frame as the CTA section pushes in from below (see §10a). | *(no headline — handoff is silent)* | *(no sub — the CTA panel takes over)* |

The headlines should sit **outside** the canvas (right-hand column on desktop, beneath the canvas on mobile) and crossfade beat-to-beat so only one is visible at a time.

---

## 5. Motion Rules

The scene is delivered as a **single MP4 scrubbed by scroll position**. Scroll progress maps to `video.currentTime`. The video does not autoplay — it only ever advances or rewinds when the user scrolls.

- **Easing:** baked into the Kling clips. Calm settle, no bounce, no overshoot.
- **Pace:** unhurried. Roughly two seconds of video per beat. Items glide in and hold — they do not vanish, the scene accumulates.
- **Scroll mapping:** as the sticky stage moves through its scroll range (0% → 100%), `video.currentTime` is set to the same proportion of `video.duration`. Use `requestAnimationFrame` for smoothness, never raw `scroll` events.
- **Scrub both ways:** scrolling up rewinds the video frame-accurately. The scene must un-build as cleanly as it built.
- **No parallax stunts, no cursor effects, no audio.** The video is silent. The MP4 must be encoded with `muted` and `playsinline` attributes set on the `<video>` element.
- **Reduced motion:** if `prefers-reduced-motion: reduce`, replace the video with the **beat 10 still image** (Nanobanana export) and disable the scroll lock. Headlines stack as a normal vertical list.

**iOS Safari note:** scroll-scrubbed video is fragile on older iOS. Encode using a fragmented MP4 with frequent keyframes (one keyframe every 6 frames at 24fps) so seeking is cheap. Test on a real iPhone — not just the simulator — before signing off.

---

## 6. Visual Style & Asset Pipeline

**All asset generation runs through Wave Speed.** Nanobanana for stills, Kling for animation, both accessed via the same Wave Speed account. Stitched together on the page as a scroll-driven sequence.

**Why Wave Speed:** single account, single billing, consistent API surface, side-by-side comparison between models if a beat needs re-rolling on a different engine. Don't run Nanobanana or Kling outside of Wave Speed unless a specific feature isn't supported there — and if that happens, flag it before going off-platform.

- **Look:** warm, illustrated, slightly stylised — somewhere between a high-end editorial illustration and a soft 3D render. Not photoreal. Not cartoon. Think *premium, considered, calm*. The reference is a magazine spread for a serious independent workspace, not a tech startup landing page.
- **Lighting:** soft morning light from a window on the right. Long, soft shadows. Warm temperature throughout.
- **Texture:** subtle wood grain on the desk, light fabric weave on the chair, matte ceramics. No glossy plastic.
- **Detail level:** mid-high. Items recognisable but not fussy. The chair is a designed chair, not a brand replica. The plant is a real-feeling plant, not a botanical study.
- **Consistency is the hardest problem.** The same room, same angle, same lighting, same palette must hold across all ten beats. See §13 for how to enforce that.

---

## 6a. Nanobanana (via Wave Speed) — Image Generation

**Goal:** ten still frames showing the cumulative scene at each beat (empty room → fully assembled). Run through Wave Speed's Nanobanana model endpoint.

**Master prompt seed** (re-use across every beat, only changing the *contents* line):

> A 3/4 isometric illustration of one corner of a calm coworking space in Worksop, England. Soft morning light from a tall window on the right. Light oak floorboards, linen-coloured walls, warm minimal aesthetic. Editorial illustration style, soft shading, gentle long shadows, premium and unhurried feel. Palette: linen off-white, mid oak, sage green, clay terracotta, espresso brown, deep navy accents. No text, no logos, no people unless specified. Square 1:1 framing. Contents: {{BEAT-SPECIFIC ITEMS}}.

**Per-beat contents lines:**

1. Empty room only — bare oak floorboards, linen wall, window with morning light.
2. Add a small woven rug centred on the floor, and a single framed line-drawing print on the wall.
3. Add a solid mid-oak desk parallel to the window.
4. Add an ergonomic office chair in espresso fabric tucked under the desk.
5. Add a slim monitor and closed laptop on the desk, screen showing a soft warm glow.
6. Add a clay-coloured ceramic mug of coffee on the desk with a faint wisp of steam.
7. Add a tall potted plant with sage-green leaves in a clay pot in the corner.
8. Add a notebook, pen, small desk lamp (on, soft warm bulb), over-ear headphones, and a slim wooden locker against the back wall.
9. Add two soft, out-of-focus silhouettes of people working at desks far in the background — barely there, suggestive only.
10. The same complete desk as beat 9 (no people in foreground), held still — fully dressed: monitor on, lamp on, coffee mug, notebook, headphones, plant in the corner, locker against the back wall. Same exact angle, same lighting, same palette. This is the "ready to work" hero frame. **Camera does not pull back.** This still also serves as the reduced-motion / save-data fallback image, so it has to do all the heavy lifting on its own.

**Consistency techniques (use all three):**
- **Seed-locking:** lock the same generation seed across all ten frames if the platform exposes it.
- **Image-to-image:** generate beat 1 first, then for every subsequent beat pass the previous beat's image as the reference and prompt only the *additions*. This keeps the room identical.
- **Reference image:** feed `website/isometric-floorplan.jpeg` from this repo as a layout reference where supported.

If a beat drifts (different floor, different angle, different palette), regenerate from the previous beat — never patch in software.

---

## 6b. Kling (via Wave Speed) — Animation

**Goal:** turn the ten stills into one continuous, scroll-controlled animated sequence. Run through Wave Speed's Kling image-to-video endpoint.

**Recommended approach: per-beat micro-clips, stitched.**
- For each transition (beat N → beat N+1), use Kling's image-to-image animation with both stills as keyframes. Output 1.5–2 second clips.
- Movement prompt for each transition is intentionally minimal: *"the new item gently slides/lowers into place, settles, holds. Camera does not move. Lighting does not change. No other elements move."*
- Beat 10 is a **hold** — generate a short 2-second clip from beat 9 to beat 10 with no camera movement. Steam rises gently from the mug, lamp glow pulses imperceptibly, nothing else moves. This sells "ready" without restarting motion.
- Render at 1920×1920 (square), 24fps, MP4 H.264 high-quality, then encode to web in two formats (see §11).

**Why not one long Kling generation:** length limits, drift, and you lose the ability to re-roll a single bad transition without redoing the whole sequence.

**Stitching:** concatenate the nine transition clips + final hold into one continuous master MP4. ~15–20 seconds total. No cuts. No music. Stitch is done locally in FFmpeg after Wave Speed exports — Wave Speed is for generation, not for the final assembly.

**Workflow tip:** Wave Speed supports batch generation with consistent seeds. Use it. For the ten Nanobanana stills, queue all ten in one batch with the same seed locked, beat 1 generated first, then beats 2–10 each referencing the previous output. For the nine Kling transitions, queue them as a batch once all stills are signed off — re-rolling individually inside Wave Speed is faster than re-running a full sequence.

---

## 7. Colour (placeholder — replace with the palette from the other chat)

Use CSS variables only. Do **not** hard-code hexes anywhere in the scene. Map roles like this and let the palette chat drop the values in:

```css
:root {
  --bg-room:       /* warm off-white background */;
  --floor:         /* light oak floorboards */;
  --wall:          /* linen / soft cream */;
  --desk:          /* mid oak */;
  --desk-shadow:   /* deeper oak */;
  --chair:         /* charcoal/espresso */;
  --screen:        /* deep navy when off; white when on */;
  --coffee:        /* clay/terracotta mug */;
  --plant-leaves:  /* sage */;
  --plant-pot:     /* clay */;
  --accent-line:   /* sage outline for active beat */;
  --text:          /* espresso */;
  --muted:         /* stone */;
}
```

The brand-guidelines.html in this folder already defines `--oak`, `--linen`, `--sage`, `--clay`, `--espresso`, `--stone`, `--navy`. Wire those in if the new palette doesn't override them.

---

## 8. Typography

- Use the existing site font: **Outfit** (already loaded in `index.html`).
- Headline weight: 600. Sub-line weight: 400.
- Headline size: clamp(28px, 4vw, 56px). Sub-line: clamp(16px, 1.4vw, 20px).
- Track headlines tight (`letter-spacing: -0.02em`). No all-caps.

---

## 9. Layout

**Desktop (>1024px):**
- Two-column inside the sticky stage: left 60% canvas, right 40% copy column.
- Copy column is vertically centred. Headlines crossfade.
- A thin progress rail on the far right (1px wide, `--accent-line`) fills as the scene assembles. Beat dots optional.

**Tablet (768–1024px):**
- Canvas above, copy below, both inside the sticky stage.

**Mobile (<768px):**
- Switch to side-on 2D view, full-width canvas, copy beneath.
- Reduce beats to 6 by combining 7+8 (plant + extras) and 2+3 (rug + desk). Keeps the section short enough to feel intentional, not a slog.

---

## 10. Section Around the Scene

**Before the scene** (top of homepage, above this section): keep the existing hero. The scene is the second section — it's the proof of the hero's promise.

**After the scene:** the scene **hands off directly into a full-bleed CTA panel** (see §10a). No quiet break, no spacer copy. The whole scroll-built scene is a runway and the CTA is the landing.

---

## 10a. The Handoff and the CTA Panel

The whole point of the scene is to deliver the visitor — calm, sold, ready — into a single, unmissable conversion moment. Build that moment properly. Don't bury it.

**The handoff (mechanical):**
- Beat 10 holds the complete desk. Sticky stage's scroll range ends here.
- As the visitor scrolls another ~30vh, the sticky stage releases and the desk frame translates **upward** (`translateY(-100%)`) on a slow ease.
- At the same time, the **CTA panel** beneath it translates upward into the viewport from `translateY(100%)` to `translateY(0)`.
- Net effect: the desk lifts away, the CTA slides up to take its place. One continuous motion. No fade-to-white in between.
- Implementation: both panels live inside the same scroll-spacer; transform is driven by the same `--progress` variable that drives the scene, just on a later band (e.g. progress 0.95 → 1.0).

**The CTA panel itself:**
- Full-bleed. 100vh on desktop, min 80vh on mobile. Background: `--espresso` or `--navy` from the brand palette — dark, high-contrast against everything that came before.
- One headline. One sub-line. One button. Nothing else. No nav, no footer links bleeding in, no testimonials, no partner logos.
- Headline: large — clamp(48px, 7vw, 96px). Weight 700. Tracked tight. White on dark.
- Button: oversized — minimum 64px tall, 280px wide on desktop, full-width minus 32px gutter on mobile. Use the warm accent (`--clay`) for the fill, white text, weight 600. Hover state: subtle lift, no colour shake.
- The button is a real `<a>` to a real destination. Trackable in analytics. Not a JS handler.

**Honest pushback on "Pay Here":** the space isn't open yet (Phase 0, per `points-of-truth.md`). There is nothing to pay for at the point most visitors land here. A "Pay Here" button would either go to a dead page or feel like a bait-and-switch. That damages the credibility the brand is built on.

The CTA should match the phase the business is actually in. Use this mapping:

| Phase | Primary CTA | Secondary (small text under button) |
|---|---|---|
| **Phase 0 (now — pre-launch)** | **Join the waiting list** | "Or call Connor on 07739 063734." |
| **Phase 1 (ground floor open)** | **Book a tour** | "Or come in any weekday between 8am and 5pm." |
| **Phase 1+ once tours are converting** | **Become a member** | "Or book a day pass for £X." |
| **Phase 2/3 (everything live)** | **Become a member** | "Or book the meeting room / podcast studio by the hour." |

The CTA copy must change as the business changes. Build the panel so the headline, button text, button URL, and sub-line are easy to swap — ideally driven from a single config block at the top of the file, not buried in the markup.

**Suggested Phase 0 copy (lift or rewrite):**
- Headline: *"Be first in the door."*
- Sub-line: *"We're opening on Carlton Road in phases. Get on the waiting list and I'll be in touch the moment your space is ready."*
- Button: **Join the waiting list →**
- Sub-button: *"Or call Connor on 07739 063734."*

This stays on-brand — direct, no pressure language, signed off by a real person, tied to a real phone number.

---

## 11. Performance Targets

- Master video weight: **under 4MB**, ideally under 2.5MB. Encode at 1080×1080 H.264 (MP4) and 1080×1080 VP9 or AV1 (WebM) and serve via `<source>` fallback. Browser picks the lighter one.
- Bitrate: target ~1.5 Mbps. Constant frame rate 24fps. Frequent keyframes (every 6 frames) so scrubbing is cheap.
- Poster frame: serve **beat 1** as a `<video poster>` so the empty room shows instantly while the MP4 streams.
- Lazy-load: don't fetch the video until the section is within one viewport of entering view (`IntersectionObserver` with a 100vh root margin). LCP must not be the video.
- Mobile (<768px): swap to a **lighter, side-on version** of the video — same beats, simpler composition, smaller file (~1MB target). Do not just downscale the desktop video; regenerate it in Kling at the lower complexity.
- Reduced-data mode (`navigator.connection.saveData === true`): serve the beat 10 still image only. No video.
- No JavaScript framework. Vanilla JS only.

---

## 12. Accessibility

- The whole scene is decorative. Wrap in `<div role="img" aria-label="A workspace assembling itself: desk, chair, monitor, coffee, plant.">`.
- The headline copy outside the canvas is the **real** content — semantic `<h2>` and `<p>`, readable by screen readers in document order whether the scene plays or not.
- Keyboard users must be able to tab past the scene without it trapping focus. The CTA in beat 10 is a real `<a>` to `/contact` (or wherever the waiting list lives).
- All copy meets WCAG AA contrast against `--bg-room`.

---

## 13. What to Build, In Order

**Phase A — Stills (Nanobanana via Wave Speed):**
1. In Wave Speed, generate **beat 1** (empty room) using the master prompt. Lock the seed — note it down for use across all subsequent beats. Drop in chat for sign-off.
2. Once approved, generate beats 2–10 inside Wave Speed using image-to-image off the *previous* beat. Same locked seed, same master prompt, only the contents line changes.
3. Drop all ten stills in chat for sign-off as a contact sheet. Re-roll any that drift on palette, angle, or proportion — re-rolls happen inside Wave Speed against the same seed. Don't proceed until all ten match.

**Phase B — Animation (Kling via Wave Speed):**
4. For each consecutive pair (1→2, 2→3, … 9→10), generate a 1.5–2 second image-to-image transition clip in Wave Speed's Kling endpoint using both stills as keyframes and the minimal movement prompt from §6b.
5. The beat 9→10 clip is the **hold** — no item arrives, just a gentle settle (steam, lamp glow). No camera move on any clip.
6. Drop the nine clips in chat for sign-off. Re-roll any that introduce unwanted motion (people moving, lighting shifting, items wobbling) — re-rolls happen inside Wave Speed.
7. Export the approved clips out of Wave Speed and stitch locally with FFmpeg `concat` — no transitions, no fades, just butt-joins.
8. Encode H.264 MP4 + VP9 WebM versions at the targets in §11.

**Phase C — Page (Claude Code):**
9. Build the sticky stage and scroll-spacer. Confirm scroll progress maps to `video.currentTime` smoothly across desktop and mobile.
10. Add the headline column, crossfading headlines based on the same scroll progress (one headline per ~10% of progress).
11. Build the **CTA panel** (§10a) underneath, full-bleed, dark background, single oversized button. Driven by a config block so headline / sub-line / button text / button URL can be swapped per phase.
12. Wire the **handoff**: at progress 0.95 → 1.0, sticky stage releases, desk translates upward off-frame, CTA panel translates up into the viewport. One continuous motion. Verify it reads cleanly when scrolling up too.
13. Wire reduced-motion fallback (beat 10 still image **plus** the CTA panel rendered immediately below it), save-data fallback (same), and the lighter mobile video swap.
14. Lazy-load the video. Set the poster to beat 1.
15. Hook the CTA button to analytics — track click events with the phase + button text in the event payload, so we can see waiting list → tour → member conversion across the lifecycle.
16. Cross-browser pass — **iPhone Safari is the gate**. If it scrubs cleanly there *and* the handoff into the CTA reads as one motion, it's done.

**Sign-off gates:** beat 1 still, all ten stills, all nine clips, the stitched master, the CTA panel in isolation, the full handoff in motion, the live page on mobile. Seven gates. Don't skip them — re-rolls are cheap, fixing a stitched scene with a broken handoff is not.

---

## 14. What I Don't Want

- No stock photos. Every visible asset is Nanobanana-generated and Kling-animated.
- No Lottie. No After Effects exports. No 3D model imports.
- No autoplaying video — the scene only ever moves when the user scrolls.
- No audio. No music. No sound effects.
- No gimmicky cursor effects, sparkles, confetti, or hover tricks.
- No "scroll to continue" arrows after beat 1 — one scroll hint at the very top is enough.
- No copy that promises business outcomes ("grow your business", "find clients here"). The brand doesn't sell that.
- No "act now / limited / don't miss out" pressure language.
- No people with faces. The two background figures in beat 9 are silhouettes only.

---

## 15. Reference Material in This Repo

- `points-of-truth.md` — full brand source. Voice, positioning, what we are and aren't.
- `brand-guidelines.html` — typography, colour variables, spacing.
- `website/isometric-floorplan.jpeg` — the room layout the scene should echo.
- `index.html` — current homepage. The scene replaces nothing; it inserts as a new section between the hero and the existing content.

---

*Sign-off discipline: stills before clips, clips before stitch, stitch before page. Re-rolls are cheap. Fixing a stitched scene wired into a live page is not.*
