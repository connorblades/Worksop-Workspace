# Worksop Workspace Scene — Production Plan

*From signed-off preview to live on the page. Pair with `scroll-scene-brief.md`.*

---

## Stage 0 — Setup (one evening)

Before generating anything:

1. **Wave Speed account.** Sign up at wavespeed.ai. Verify you can see the Nanobanana model and the Kling image-to-video model in their model list. If either is missing, flag it before proceeding.
2. **Load credits.** Realistic budget for one full pass with sensible re-rolls: **£20–30**. Cheap end if the first generations land. Up to £60 if a lot of beats need re-rolling.
3. **Brand palette finalised.** The hex codes from the other chat plugged into the brief's CSS variables (§7). Without this, Nanobanana will guess and beats will drift.
4. **Reference image ready.** `website/isometric-floorplan.jpeg` from this repo, plus one photo of the actual Carlton Road space if available. These get fed in as visual references where the model supports it.
5. **Decide who drives Wave Speed.** Either you, or someone you delegate to. The whole pipeline runs through one operator in one Wave Speed session — splitting it between people kills the seed/style consistency.

**You can't skip Stage 0.** If you start generating without the palette finalised, you'll redo all ten stills.

---

## Stage 1 — Stills in Wave Speed (one to two evenings)

This is the make-or-break stage. Get the room right and everything downstream is mechanical. Get it wrong and you'll be re-rolling for days.

### 1.1 — Beat 1 (the empty room)

- Open Wave Speed, select the Nanobanana model.
- Paste the master prompt seed from §6a of the brief. Set the contents line to: *"Empty room only — bare oak floorboards, linen wall, window with morning light."*
- Generate **four variations**. Pick the one that best matches the brand — warm, calm, soft light, no garish colours, isometric 3/4 angle.
- **Lock the seed of the chosen image.** Note it down. This seed is used for every subsequent beat.
- Drop the chosen image into chat with me. Sign-off here.

If none of the four variations are right, regenerate. Don't proceed with a beat 1 you're "kind of okay with" — every later beat inherits its problems.

### 1.2 — Beats 2 through 10

For each beat in order:

- Pass the **previous beat's image** as the image-to-image reference.
- Use the same master prompt seed and the same locked seed.
- Update only the contents line for the new beat.
- Generate three variations. Pick the one that most cleanly adds the new item without disturbing what's already in the scene.
- If the room itself shifts (different floor, different window, palette drift), discard and regenerate from the previous beat. Never patch in Photoshop.

Once all ten are picked, drop them into chat as a contact sheet (one image with all ten in a 2×5 grid is fine). I'll review and call out anything that breaks the sequence. **Don't move to Stage 2 until all ten are signed off.**

### 1.3 — Beat 10 also has a separate job

Beat 10 is the static fallback for users with reduced motion or save-data mode. Make sure it's the strongest single image of the set — it has to do all the work on its own when the video doesn't play.

---

## Stage 2 — Clips in Wave Speed (one evening)

Cleaner stage. The hard work is done.

### 2.1 — Generate the nine transitions

For each consecutive pair (1→2, 2→3, ... 9→10):

- Open Wave Speed's Kling image-to-video endpoint.
- Pass the start image and end image as keyframes.
- Movement prompt (use this exactly): *"The new item gently slides or lowers into place, settles, holds. Camera does not move. Lighting does not change. No other elements move."*
- Duration: 1.5 seconds for transitions, 2 seconds for the 9→10 hold.
- Generate. Review.
- **Reject any clip with:** wobbling existing items, lighting shifts, the people in beat 9 moving their pose, the room shape changing, or any unintended camera movement.

### 2.2 — Sign-off

Drop all nine clips in chat. I'll flag any that introduce unwanted motion. Re-roll the bad ones in Wave Speed.

---

## Stage 3 — Stitch and encode (one to two hours)

This is local, not Wave Speed.

1. Export all nine approved clips out of Wave Speed at the highest quality available.
2. Install FFmpeg if you don't have it: `brew install ffmpeg` on Mac.
3. Concatenate butt-to-butt with no transitions:
   ```
   ffmpeg -f concat -safe 0 -i clips.txt -c copy master.mp4
   ```
   where `clips.txt` lists the nine files in order.
4. Encode two web versions:
   - **H.264 MP4:** target ~1.5 Mbps, keyframe every 6 frames, square 1080×1080.
   - **VP9 WebM:** same dimensions, slightly smaller file.
5. Generate beat 1 as a JPEG poster image. ~50KB, same dimensions.
6. Verify total weight: master MP4 under 4MB ideally under 2.5MB. If it's over, drop the bitrate and re-encode — don't downscale.

If FFmpeg is unfamiliar, I can write the exact commands when you're ready to stitch — just paste me the file names.

---

## Stage 4 — Wire into the page (Claude Code, one to two evenings)

Now hand it to Claude Code along with `scroll-scene-brief.md` and the encoded video files.

What Claude Code needs to do:

1. Replace the placeholder geometry in the preview HTML with a `<video>` element.
2. Wire scroll progress to `video.currentTime` using `requestAnimationFrame`.
3. Build the CTA panel (§10a) underneath, driven by a config block.
4. Wire the handoff: at progress 0.95 → 1.0, sticky stage releases, desk video translates upward, CTA panel translates up.
5. Lazy-load the video. Set the poster to the beat 1 JPEG.
6. Reduced-motion fallback: serve the beat 10 still, no video.
7. Save-data fallback: serve the beat 10 still, no video.
8. Mobile: serve a lighter side-on version (which means generating a separate, simpler video set in Wave Speed — see §11 of the brief).
9. Hook the CTA button to analytics.
10. Test on a real iPhone in Safari. **This is the gating test.**

---

## Realistic Timeline

If you focus on it:

- Stage 0 (setup): one evening
- Stage 1 (stills): one to two evenings — most variable
- Stage 2 (clips): one evening
- Stage 3 (stitch): under two hours
- Stage 4 (wire): one to two evenings (Claude Code does most of it)

**Total: one to two weeks of evenings**, assuming sensible sign-off speed and no major palette rework. Faster if you batch the evenings together over a weekend.

---

## Cost Expectation

Wave Speed pricing changes, so check current rates, but rough order:

- Nanobanana: ~£0.02–0.05 per image. Ten beats × 3 variations × possible re-rolls = **£2–8**.
- Kling: ~£0.25–0.50 per 5s clip. Nine transitions × possible re-rolls = **£3–10**.
- Mobile lighter version (separate set): roughly half again — **£3–8**.
- Buffer for re-rolls: 30–50%.

**Realistic total: £15–35 in credits for a clean run, up to £60 if it gets messy.**

If it's costing more than that, something's wrong with the workflow — stop and check. Usually it's the seed not being locked, or someone re-prompting from scratch instead of image-to-image off the previous beat.

---

## What Could Go Wrong (and what to do)

| Problem | Fix |
|---|---|
| Beats 2–5 keep changing the room layout | Seed isn't locked. Stop. Re-find the seed in beat 1's metadata, lock it, restart from beat 2. |
| Palette drifts cooler / greener / bluer | The brand palette isn't being passed in the prompt. Re-paste the master prompt with explicit hex codes if Wave Speed supports them, otherwise use precise colour words ("clay terracotta", "sage green"). |
| Kling clip introduces unwanted movement | Movement prompt isn't restrictive enough. Add: *"absolutely no other movement of any kind. Static camera. Static lighting."* |
| iPhone Safari can't scrub the video | Re-encode with more frequent keyframes (every 3 frames instead of 6). If still broken, fall back to a shorter video at lower bitrate. |
| Final video is over 4MB | Drop bitrate, not dimensions. Try 1.2 Mbps before going lower. |
| The whole thing feels lifeless | Likely a Kling movement issue, not a stills issue. Add subtle ambient motion to beat 10 hold (steam rising, lamp glow pulsing) — sells "ready" without restarting motion. |

---

## What I Need From You to Move Forward

Tick these off before starting Stage 1:

- [ ] Wave Speed account active, credits loaded
- [ ] Brand palette hex codes pasted into `scroll-scene-brief.md` §7
- [ ] `website/isometric-floorplan.jpeg` and one site photo (if any) ready as references
- [ ] You're happy with the beat list and copy in §4 of the brief
- [ ] You're happy with the CTA panel approach in §10a
- [ ] You've signed off on the preview HTML rhythm (or told me what to change)

Once those six are ticked, generate beat 1 and drop it in chat. We move from there.
