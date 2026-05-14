# Email Templates

Customer-facing auto-replies triggered by GHL workflows. Voice should match [`../brand/brand-guidelines.md`](../brand/brand-guidelines.md) — punchy but not sweary, warm, direct, no salesy language.

For the underlying form fields and GHL merge-tag conventions, see [`./ghl-webhook-reference.md`](./ghl-webhook-reference.md).

---

## Trigger map

| Tag fired | Workflow / email |
|---|---|
| `Website Waitlist` | Source tag — fires on every waitlist submission. Use for segmentation, not for triggering email. |
| `Day Pass` | Day Pass welcome (to draft) |
| `Weekly Pass` | Weekly Pass welcome (to draft) |
| `Private Office` | Private Office enquiry response (to draft) |
| `Meeting Room` | Meeting Room welcome — drafted below |
| `Something Else` | Something Else welcome with suggestion echo — drafted below |
| `Undecided` | "Not sure yet" gentle nurture (to draft) |

---

## Meeting Room

**Subject:** You're in, {{contact.first_name}} — about the meeting room

**Preview text:** Manned. Weekends open. Free parking. Final pricing live 1 June.

**Body:**

Hi {{contact.first_name}},

Thanks for jumping on the waiting list. You'll be one of the first to hear when we open the doors at 30 Carlton Road on 1 June.

You picked the **meeting room**, so here's what that actually means in Worksop:

- **Manned, not self-serve.** Someone's always in the building when the door's open. We let you in, make the coffee, then stay out of the way while you work.
- **Weekends open.** Most places in town shut at 4:30 or don't open Saturdays — we will be.
- **Town centre with free parking.** No hunting for a space. No feeding a meter every hour.
- **By the hour, no half-day minimums.** You book exactly what you need. Final pricing goes live on 1 June.
- **Open day on 1 June 2026 — completely free.** Come in, see the room, try it with a client if you like. No pitch, no pressure.

Quick favour: hit reply and tell me what kind of meeting you have in mind. Four people round a table? Client pitch with a screen? Recurring weekly catch-up? Knowing this helps us set the room up properly for the people actually using it — we're building this place around what people need, not what looks good in a brochure.

See you on the 1st.

Connor
Worksop Workspace
30 Carlton Road, Worksop S80 1PH
07739 063734 · hello@worksopworkspace.com
[See the meeting room](https://worksopworkspace.com/meeting-room) · [Instagram](https://instagram.com/worksopworkspace)

---

## Something Else

**Subject:** Got your suggestion, {{contact.first_name}}

**Preview text:** Echoing it back to you, and what happens next.

**Body:**

Hi {{contact.first_name}},

Thanks for getting on the waiting list — and double thanks for typing in what you're actually looking for. Most people just tick a box. You took the extra ten seconds, so here's a proper reply.

You said:

> {{contact.suggestion}}

Honest truth: we're building this space around the people who use it, not whatever looked good on a planning application. Suggestions like yours are exactly what we want to hear before 1 June, while the floor plan and the schedule are still moveable.

A few things I'd love to know if you've got two minutes to hit reply:

1. How often do you reckon you'd actually use it? Daily, weekly, occasional?
2. Is it a "I'd pay for that" thing, or more of a "would be nice"?
3. Anything else we're missing — equipment, hours, layout?

Every answer goes straight into how we shape Phase 2.

In the meantime: we open the doors at 30 Carlton Road on **1 June 2026**. Free open day — come and have a look, grab a coffee, try the hot desks. Hot desks, weekly passes, private offices and a meeting room are all live from day one. If your idea fits into a later phase, you'll be the first to hear when it's ready.

Talk soon,

Connor
Worksop Workspace
30 Carlton Road, Worksop S80 1PH
07739 063734 · hello@worksopworkspace.com
[Instagram](https://instagram.com/worksopworkspace)

---

## Drafting rules for new email variants

1. **Lead with what they specifically picked.** Don't make them re-read a generic welcome and find the relevant bit. The whole point of the tag-trigger is delivering relevance fast.
2. **Three to five concrete bullets.** Each bullet should counter a real local-competitor weakness (no weekends, hidden pricing, gym-contract pressure, fluorescent lighting, dated facilities).
3. **One soft reply ask.** Asking a specific question drives engagement signals + product intel. Keep it to one or two questions max in welcome emails (Something Else gets three because that cohort is more engaged by definition).
4. **The 1 June free open day anchor.** Every email should reference the launch date and the free open day. Single conversion CTA across all variants for consistency.
5. **Personal sign-off.** "Connor" not "The team". People reply to humans, not businesses.
6. **No urgency, no sales language.** See the "Words to avoid" list in [`../brand/brand-guidelines.md`](../brand/brand-guidelines.md).
