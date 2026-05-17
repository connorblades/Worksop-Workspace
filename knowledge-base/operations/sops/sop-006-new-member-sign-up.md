# SOP-006: New Member Sign-Up

**Worksop Workspace** · Operations · *Phase 1 reference*

Status: Draft v1 — needs Connor review · Last updated: 15 May 2026

---

The procedure for converting a prospect into an active member with a rolling weekly subscription. Phase 1 covers Hot Desk Weekly (£30/wk) and Private Office (from from £79/wk). Dedicated Desk arrives in Phase 2. The tour comes first — see [`./sop-003-member-onboarding-tour.md`](./sop-003-member-onboarding-tour.md). This SOP picks up the moment a prospect says **"yes, sign me up."**

---

## 1. Confirm the plan

1. Re-state what they're buying — *"Just to confirm — that's the Hot Desk Weekly at £30 a week, rolling, you can cancel any time, first charge today."*
2. If they're going for a Private Office, confirm which one and the agreed weekly rate (offices vary — see [`../../sales/product-offerings.md`](../../sales/product-offerings.md)).
3. Confirm the **start date** — today, or a specific day. If a future start date, take the sign-up but schedule the first charge for that date in Stripe.

---

## 2. Capture details on the member app

4. Open the member app's admin → **New member**.
5. Fill in:
   - Full name (legal name — what's on their card)
   - Email (this becomes their app login)
   - Mobile number
   - Business name (optional)
   - Plan
   - Start date
6. Tick **Issue locker** if they want one (Hot Desk Weekly = shared locker; Private Office = the office is the locker).
7. Tap **Send onboarding link**. The link goes to their email.

---

## 3. Stripe subscription

8. The member app creates the Stripe customer and subscription automatically when the onboarding link is opened and they enter card or direct-debit details.
9. Confirm with them in person that the email landed. Wait while they tap through it.
10. They'll see:
    - **Direct debit setup** (Stripe Bacs) — preferred, lower fees, less card-decline risk. Or:
    - **Card setup** — fine, but with the proviso that we'll re-collect if a card fails.
11. They accept the [`../legal-and-compliance/terms-of-business.md`](../legal-and-compliance/terms-of-business.md) inline as part of the sign-up flow.
12. Once they confirm, Stripe issues the first charge. The app activates their membership.

---

## 4. Confirm the basics

13. Show them their app dashboard on their phone. Confirm:
    - Plan is correct
    - Next billing date shows what they expect
    - Locker number (if assigned)
    - Their QR code (for Phase 2+ door access)
14. Show them where the email confirmation will be (their inbox — Stripe receipt + our welcome email).

---

## 5. Welcome and orientation

15. Hand them a printed copy of the [`../../marketing/members/welcome-pack.md`](../../marketing/members/welcome-pack.md). It's short on purpose.
16. Walk them to their desk (Hot Desk Weekly: any free hot desk; Private Office: their office).
17. Connect them to Wi-Fi.
18. Show them:
    - Their locker, if assigned
    - Where to find the meeting room (and how to book it on the app)
    - Where the kitchen / coffee station is
    - The toilets and fire exits
19. Introduce them to anyone else nearby by name if it feels natural. Not forced.

---

## 6. Set expectations

20. Tell them three things, plainly:
    - **"Come and go as you like."** No clocking in. No signing the door.
    - **"Use the app for everything — book, cancel, raise an issue."**
    - **"You can cancel any time, no questions asked, no notice period beyond the current week."**
21. Then stop. They came here to work, not to be onboarded for an hour.

---

## 7. Within the first week

22. Day 1 — send a short follow-up email at 4:30pm: *"How was your first day? Anything we can sort?"* Template in [`../../sales/communications/email-templates.md`](../../sales/communications/email-templates.md).
23. Day 5 — light touch-base. Are they getting what they need? Different desk? Different time of day? Don't pester.
24. Day 7 — first billing cycle completes. Stripe charges the next week automatically. If the charge fails, see section 8.

---

## 8. Handling failed payments

25. The member app surfaces failed-charge alerts. Address within 24 hours.
26. Open the member's record. Look at Stripe's failure reason — usually expired card, insufficient funds, or a fraud-block flag.
27. Email them using the failed-payment template (firm, friendly): *"Hey [name] — looks like the card on file didn't go through this week. Pop your details into [link] when you get a moment and we'll re-collect. No drama."*
28. If unresolved after 48 hours, call them.
29. If unresolved after 7 days, suspend the account on the app (their QR code stops working) and email a final notice. Don't delete the record — they may be back.

---

## 9. Handling a private office sign-up

30. Private offices have additional steps:
    - Photograph the office before handover (condition record).
    - Hand over the office key (logged in Drive's `07-facilities/keys-and-access-register` once that lives in Drive).
    - Show the office Wi-Fi extender (if applicable).
    - Walk them through the office furniture (chairs, drawers, sit/stand desk, blinds).
    - Note the deposit (if any) in the Stripe record.
31. The office stays in their name until they cancel. We don't sublet or hot-desk a private office between members.

---

## Common issues

| Issue | First action |
|---|---|
| Direct debit setup fails | Offer card setup instead, with a note to fix the bank details on the next visit. Stripe Bacs sometimes rejects niche bank accounts. |
| They want to pay weekly by card manually | Politely steer to direct debit or recurring card — manual payments are admin debt. If they push, log it as a known exception. |
| They want a contract or invoice for their accountant | Stripe issues PDF receipts/invoices on each charge — show them where in the app. For a full VAT invoice, see [`../../finance/`](../../) (placeholder — lives in Drive). |
| They want to pay for the year up front | Politely no for now. The flexible weekly model is the product. If pushed, take 12 weeks paid in advance via Stripe with rolling thereafter — only with Connor's say-so. |
| Under-18 enquiry | The [`../legal-and-compliance/terms-of-business.md`](../legal-and-compliance/terms-of-business.md) is 18+ only. Politely decline. |

---

*Worksop Workspace · A space to drop your shoulders.*
*30 Carlton Road, Worksop S80 1PH · hello@worksopworkspace.co.uk · worksopworkspace.com*
