# Wave Speed — First-Time Setup Walkthrough

*Open this alongside Wave Speed. Tick steps as you go. Send me a screenshot the moment anything doesn't match.*

---

## Step 1 — Create the Account (5 min)

1. Go to **wavespeed.ai** in your browser.
2. Click **Sign up** (top right).
3. Use the email you want to keep this tied to long-term — probably `connor@bullseyeproperties.co.uk`.
4. Verify the email if it asks.
5. Once logged in, you'll land on a dashboard with a model directory and a "Playground" or "Generate" area.

**You're done with this step when:** you can see the Wave Speed home screen logged in.

---

## Step 2 — Top Up Credits (5 min)

Wave Speed uses a credit system, not a flat subscription.

1. Find **Billing**, **Credits**, or **Top up** in the top right or in your account menu.
2. Add **£20 to start**. That covers the realistic happy-path cost of one full pass with a couple of re-rolls. You can always add more.
3. Use a card you're happy expensing to the business.

**You're done with this step when:** the account shows a credit balance you can see.

**Why £20 not £100:** if something goes wrong with the workflow (seed not locked, wrong reference image, prompt drift), you don't want to find out after burning £80. Generate Beat 1, confirm everything's working, then top up further if needed.

---

## Step 3 — Find the Right Models (5 min)

Wave Speed hosts dozens of AI models. You only need two.

1. Open the **model directory** (sometimes called "Models" or "Explore").
2. Search for **"Nanobanana"** (sometimes listed as "Nano Banana", "Gemini 2.5 Flash Image", or similar — same model, different names). This is for the **stills**.
3. Pin / favourite / star it so it's easy to find again.
4. Search for **"Kling"** (likely listed as "Kling 2.0", "Kling Image-to-Video", or similar). This is for the **animated clips** later.
5. Pin / favourite / star Kling too.

**You're done with this step when:** both models are saved/pinned in your account.

**If you can't find one of them:** screenshot the model directory and send it to me. There may be a renamed equivalent.

---

## Step 4 — Test Run with Beat 1 (10 min)

This proves everything works before you commit to the full sequence.

1. Click into **Nanobanana**.
2. You'll see a generation panel with these fields (names may vary slightly):
   - **Prompt** — a big text box. The main one.
   - **Negative prompt** — things to exclude.
   - **Aspect ratio** or **Image size** — set to **1:1 / 1024×1024 or 1080×1080**.
   - **Number of variations / outputs** — set to **3 or 4**.
   - **Seed** — leave blank for now (the model picks one).
   - **Mode / Reference image** — leave on text-to-image (no reference image yet).
3. Open `generation-prompts.md` in this folder.
4. Copy the **Master Prompt** block in full.
5. Paste it into the Wave Speed prompt field.
6. In the prompt, find `{{BEAT-SPECIFIC LINE}}` and replace it with the **Beat 1 contents line** from `generation-prompts.md`.
7. Copy the **Negative prompt** block from `generation-prompts.md` and paste it into Wave Speed's negative prompt field.
8. Click **Generate**.
9. Wait. It usually takes 10–30 seconds.
10. You'll see 3–4 variations. Pick the one that best matches the brand — warm, calm, isometric 3/4 angle, oak floors, soft window light, no text or logos.
11. **Lock the seed.** Click on the chosen image — there should be a "Use this seed" or "Reuse seed" or "Copy seed" option. Note the seed number down at the top of `generation-prompts.md` next to "Seed: __________".
12. Download the chosen image. Save it as `beat-01.png` in this folder.
13. Drop it in our chat.

**You're done with this step when:** I've signed off Beat 1, you have the seed written down, and the PNG is saved locally.

**If Beat 1 looks wrong:** don't proceed. Common issues — wrong angle (photo instead of isometric), text appearing in the room, palette is cold/grey/blue, style is cartoony or photoreal. Re-roll. Don't accept "close enough".

---

## Step 5 — Image-to-Image for Beats 2–10 (60–90 min)

This is the workflow that makes the room consistent.

For **each beat from 2 to 10**:

1. Stay on the Nanobanana model page.
2. Look for **"Image-to-image"**, **"Reference image"**, or **"Use input image"** mode. Switch to it.
3. Upload the **previous beat's PNG** as the reference image. (For Beat 2, that's `beat-01.png`. For Beat 3, that's `beat-02.png`. And so on.)
4. **Reference strength / image weight:** set to **0.75** to start. Higher = more faithful to the reference. If new items don't appear, drop to 0.65. If the room drifts, push to 0.85.
5. Paste the **same Master Prompt** as before.
6. Replace `{{BEAT-SPECIFIC LINE}}` with the contents line for the current beat.
7. **Set the seed** to the locked seed from Step 4.
8. Generate 3 variations.
9. Pick the best one — the one where the new item is added correctly *and* nothing else has changed.
10. Download as `beat-02.png` (or 03, 04, etc.).
11. Drop it in our chat for sign-off.
12. Once signed off, repeat for the next beat.

**You're done with this step when:** all ten beats are downloaded and signed off.

**If a beat keeps failing sign-off:** don't push through. Stop. Send me what you've got and I'll tell you whether to push reference strength up, change the prompt wording, or accept and move on.

---

## Step 6 — Kling Clips (later, after stills are signed off)

Don't start this until **all ten stills are approved**. We'll walk through it together when you get there. The short version:

1. Click into **Kling** in your pinned models.
2. Switch to **image-to-video** with **two keyframes**.
3. For each pair of consecutive stills (1→2, 2→3, ... 9→10), upload both as keyframes.
4. Paste the **Default movement prompt** from `generation-prompts.md` (or the **Hold prompt** for the 9→10 clip).
5. Set duration to 1.5s (or 2s for the hold).
6. Generate. Review.
7. Download as `clip-01-02.mp4`, `clip-02-03.mp4`, etc.

We'll handle Step 6 as one focused session once the stills are locked.

---

## What to Do When Something Doesn't Match This Doc

Wave Speed's UI changes. Field names may differ. Models may be renamed. If anything in this walkthrough doesn't match what you see:

1. **Take a screenshot** of the screen you're stuck on.
2. **Drop it in our chat** with one line: "Stuck on Step X."
3. I'll tell you what to click.

Don't guess and don't burn credits trying random settings.

---

## Total Time Expectation

- Steps 1–3 (account, credits, find models): **15 min, one-off setup**.
- Step 4 (Beat 1 + sign-off): **20 min including waiting for me to review**.
- Step 5 (Beats 2–10): **60–90 min** if no major re-rolls. Possibly more.
- Step 6 (Kling clips): **45–60 min** in a separate session.

**Realistic total: one focused evening for stills, one focused evening for clips.**

---

## Total Cost Expectation

If everything goes cleanly: **£8–15** in credits.
With a normal amount of re-rolling: **£15–25**.
If it gets messy: **£30–50** — at which point stop and check the workflow.

The £20 you topped up in Step 2 should comfortably cover stills. Top up again before clips if needed.

---

*One last thing: don't try to run all of this in a single late-night session. Beat 1 sign-off is a natural pause point. Beats 2–10 in one go is fine. Kling clips on a separate evening with fresh eyes — final video quality is too important to rush at midnight.*
