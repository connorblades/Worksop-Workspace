# Worksop Workspace — Generation Prompts (Wave Speed)

*Copy-paste-ready prompts for Nanobanana (stills) and Kling (clips). Use in order. Don't edit unless you know why.*

---

## How to Use This Doc

1. Set up Wave Speed (see "Settings" below).
2. Generate **Beat 1** using its prompt block. Lock the seed of the chosen image.
3. For Beats 2–10, switch to image-to-image, pass the previous beat's image as the reference, and use that beat's prompt block.
4. Once all ten stills are signed off, run the **Kling clip prompts** to animate the transitions.
5. Stitch with FFmpeg (see `production-plan.md`).

---

## Settings (do this once, before generating)

**For Nanobanana (stills):**
- Aspect ratio: **1:1 (square)**
- Output size: **1080×1080**
- Format: PNG (lossless, then convert later)
- Variations per generation: **3–4**
- Seed: lock the seed of the chosen Beat 1, reuse for every subsequent beat
- Mode: text-to-image for Beat 1, then **image-to-image** for Beats 2–10 with the previous output as reference
- Reference strength (image-to-image): start around **0.7–0.8**. Higher = more faithful to the previous beat. If items don't appear, drop to 0.6.

**For Kling (clips):**
- Source: image-to-video with **two keyframes** (start image, end image)
- Duration: **1.5 seconds** for transitions, **2 seconds** for the Beat 9→10 hold
- Resolution: 1080×1080
- Frame rate: 24fps
- No audio

---

## Master Prompt — Nanobanana

This is the **base** prompt. Every beat appends its specific contents line at the end.

```
A 3/4 isometric illustration of one corner of a calm, premium coworking space in Worksop, England. Soft morning light streams through a tall window on the right wall, casting long warm shadows. Light oak floorboards. Linen-coloured walls. Editorial illustration style — somewhere between a soft 3D render and a high-end magazine illustration. Premium, considered, unhurried feeling. Warm and inviting, never sterile.

Palette: linen off-white (#F5F1EA), light oak soft (#E5D6BE), mid oak wood (#C9A57B), sage green foliage (#8E9775), clay terracotta accents (#C57B57), espresso brown (#1A1714) for upholstery, deep navy (#203A5B) only for the monitor screen.

Square 1:1 framing. No text. No logos. No signage. Subtle wood grain on floor and desk. Matte finishes only — no glossy plastics. Soft long shadows. Camera angle: 3/4 isometric, looking down at roughly 30 degrees. Mood: "I can drop my shoulders here."

Contents: {{BEAT-SPECIFIC LINE}}
```

**Negative prompt** (paste into the negative field if Wave Speed supports it):

```
text, words, letters, signage, logos, brand names, busy patterns, neon, cyberpunk, futuristic, glossy plastic, cartoon, comic, anime, photorealistic photography, harsh lighting, flash, multiple people in foreground, visible faces, cluttered surfaces, clipart, watermark, stock photo style, fisheye, distortion, low quality, blurry
```

---

## Beat-by-Beat Stills

### Beat 1 — Empty Room *(text-to-image)*

```
[paste Master Prompt above, then replace {{BEAT-SPECIFIC LINE}} with:]

Contents: An empty room. Light oak floorboards. Linen-coloured walls. A tall window on the right wall casting soft morning light. Nothing else in the scene — no furniture, no objects, no people. Just the empty, calm space waiting to be filled.
```

**Sign-off rule:** before moving to Beat 2, lock the seed of the chosen Beat 1 image. Note it down here: `Seed: __________`

---

### Beat 2 — Rug + Wall Print *(image-to-image, reference: Beat 1)*

```
Contents: The same empty room as the reference image, with two additions: a small woven rug centred on the floor in muted clay terracotta tones, and a single framed line-drawing print on the left wall (simple geometric or abstract drawing, thin black frame). Everything else exactly as the reference.
```

---

### Beat 3 — Oak Desk *(image-to-image, reference: Beat 2)*

```
Contents: The same room as the reference image, now with a solid mid-oak wooden desk added, parallel to the right wall, positioned in front of the window. Clean rectangular shape, four straight legs, subtle wood grain visible on the surface. The desk is empty — no objects on it yet. Everything else exactly as the reference.
```

---

### Beat 4 — Ergonomic Chair *(image-to-image, reference: Beat 3)*

```
Contents: The same room as the reference image, now with an ergonomic office chair added, tucked under the desk and angled slightly. Espresso-brown fabric upholstery, dark frame, mesh back, five-spoke wheeled base. Modern, premium, designed — not generic. Everything else exactly as the reference.
```

---

### Beat 5 — Monitor and Laptop *(image-to-image, reference: Beat 4)*

```
Contents: The same scene as the reference image, now with a slim modern monitor on a thin stand placed centrally on the desk, and a closed silver laptop placed to the left of the monitor. The monitor screen is on, showing a soft warm off-white glow (no UI, no text, no apps — just a gentle warm light). Everything else exactly as the reference.
```

---

### Beat 6 — Coffee Mug *(image-to-image, reference: Beat 5)*

```
Contents: The same scene as the reference image, now with a clay-coloured ceramic coffee mug placed on the desk to the right of the laptop. A faint thin wisp of steam rises from it. The mug is matte, hand-thrown style, terracotta tone. Everything else exactly as the reference.
```

---

### Beat 7 — Plant *(image-to-image, reference: Beat 6)*

```
Contents: The same scene as the reference image, now with a tall potted plant added in the back-left corner of the room. Sage-green leaves, slightly trailing, medium-sized — a snake plant or rubber plant style, real and lived-in, not stylised. Sitting in a clay terracotta pot. Everything else exactly as the reference.
```

---

### Beat 8 — Lamp, Notebook, Headphones, Locker *(image-to-image, reference: Beat 7)*

```
Contents: The same scene as the reference image, with four small additions: (1) a slim modern desk lamp on the desk, switched on, casting a soft warm pool of light; (2) an open notebook with a fountain pen resting across it, on the desk; (3) a pair of dark over-ear headphones resting on the desk to the right of the monitor; (4) a tall slim wooden locker against the back wall, mid-oak finish, with a small brass keyhole. Everything else exactly as the reference.
```

---

### Beat 9 — Background Silhouettes *(image-to-image, reference: Beat 8)*

```
Contents: The same scene as the reference image, now with two soft, out-of-focus, blurred silhouettes of people working at desks far in the background — barely there, suggestive only, no faces visible, no details. They should feel like distant ambient presence, not focal subjects. The foreground desk and all its items are unchanged and remain perfectly sharp. Everything else exactly as the reference.
```

---

### Beat 10 — Final Hold *(image-to-image, reference: Beat 9)*

```
Contents: The same scene as the reference image, with no new items added. The complete workspace is now fully assembled — desk, chair, monitor on with warm glow, laptop, coffee mug with rising steam, plant in the corner, lamp on, notebook, headphones, locker, and the two soft background silhouettes. This is the finished hero frame: warm, ready, lived-in, calm. Nothing extra, nothing missing. Camera angle and lighting unchanged.
```

**This still doubles as the reduced-motion fallback. Make it the strongest single image of the set.**

---

## Kling Clip Prompts (transitions between stills)

Once all ten stills are signed off, generate nine clips. Each clip uses two stills as keyframes (start = previous beat, end = current beat).

### Default movement prompt (use for Clips 1→2 through 8→9)

```
The new item gently slides or lowers into place, settles smoothly, then holds completely still. Calm, unhurried, soft motion with a gentle settle at the end — no bounce, no overshoot, no wobble. The camera does not move at all. Lighting does not change. Existing items in the scene do not move, drift, or alter in any way. No other elements move. Static camera. Static lighting. Static existing scene. Duration: 1.5 seconds.
```

### Clip 9→10 — the hold (use this prompt instead)

```
The scene holds completely still. The only motion is a thin wisp of steam rising gently and slowly from the coffee mug, and a barely perceptible warm pulse in the lamp's glow. Nothing else moves. The camera does not move at all. Lighting does not change. Existing items do not move. Duration: 2 seconds. Calm, ready, finished.
```

### Negative motion prompt (paste into Kling's negative field if supported)

```
camera movement, zoom, pan, tilt, dolly, rotation, items wobbling, items shaking, lighting flicker, lighting change, colour shift, people moving, faces appearing, new items appearing, items disappearing, distortion, morphing, glitch, stutter
```

---

## Quick Checklist

Run through these as you go.

**Stills:**
- [ ] Beat 1 generated, seed locked, noted
- [ ] Beat 2 (image-to-image off Beat 1)
- [ ] Beat 3 (image-to-image off Beat 2)
- [ ] Beat 4 (image-to-image off Beat 3)
- [ ] Beat 5 (image-to-image off Beat 4)
- [ ] Beat 6 (image-to-image off Beat 5)
- [ ] Beat 7 (image-to-image off Beat 6)
- [ ] Beat 8 (image-to-image off Beat 7)
- [ ] Beat 9 (image-to-image off Beat 8)
- [ ] Beat 10 (image-to-image off Beat 9)
- [ ] Contact sheet (2×5 grid) reviewed for consistency
- [ ] All ten stills signed off

**Clips:**
- [ ] Clip 1→2
- [ ] Clip 2→3
- [ ] Clip 3→4
- [ ] Clip 4→5
- [ ] Clip 5→6
- [ ] Clip 6→7
- [ ] Clip 7→8
- [ ] Clip 8→9
- [ ] Clip 9→10 (hold version)
- [ ] All nine clips signed off

---

## If a Beat Drifts

Don't patch in Photoshop. Don't accept "close enough". Re-roll inside Wave Speed using the previous beat as the reference and the same locked seed. Drift compounds — one wrong beat will warp every beat after it.

Common drift patterns and fixes:

- **Floor pattern changed** → reference strength too low. Push to 0.8.
- **Window moved or disappeared** → re-roll. Don't keep going.
- **New colour appeared (blue, red, anything off-palette)** → re-paste the master prompt and re-roll. Wave Speed sometimes drops palette context after several generations.
- **Item appeared in the wrong position** → add positional language ("on the right side of the desk", "back-left corner of the room") and re-roll.
- **Style shifted (more cartoony, more photoreal)** → re-paste master prompt with style anchors emphasised.

---

*Treat this doc as living. If a phrase consistently produces drift, edit it here so the next pass starts cleaner.*
