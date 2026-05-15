# SOP-007: Member Cancellation

**Worksop Workspace** · Operations · *Phase 1 reference*

Status: Draft v1 — needs Connor review · Last updated: 15 May 2026

---

The procedure for handling member cancellations cleanly. The promise on the website is "cancel any time" — we honour that without friction. The objective isn't to talk anyone out of leaving; it's to make leaving so respectful that they come back.

---

## 1. The principle

Cancellation is a feature, not a problem. **Don't retain by argument.** If we built a space worth coming to, the numbers will work. If we didn't, we should hear it.

When a member cancels we:
- Process it the same day they ask
- Don't ask why unless they offer
- Don't run a discount play
- Don't apply notice periods beyond the current billing cycle
- Keep their record so they can come back easily

---

## 2. Self-service via the app (preferred)

1. The member app has a **Cancel membership** button in their account screen.
2. Tapping it:
   - Asks for confirmation
   - Sets the membership end date to the end of the current weekly billing cycle
   - Stops the next Stripe charge
   - Keeps their app access live until the cycle ends
3. The admin side fires an alert into the staff app and an email to Connor.
4. **No further action needed from staff unless the member contacts you directly.**

---

## 3. In-person or email cancellation

5. Member says they want to cancel — in person, by email, or by phone.
6. Confirm the cancellation date — end of the current weekly cycle.
7. Acknowledge it: *"All sorted. Last day will be [date]. No need to do anything else."*
8. **Don't ask why.** If they want to tell you, listen properly. Otherwise leave it.
9. Process it on the admin side:
   - Open the member's record
   - Tap **Cancel** → confirm cycle end date
   - The app stops the Stripe subscription automatically
10. Send the cancellation confirmation email — template in [`../../sales/communications/email-templates.md`](../../sales/communications/email-templates.md). Short, warm, mentions they're welcome back.

---

## 4. If they do offer a reason

11. Listen. Don't defend. Don't rebut.
12. Repeat back what you heard: *"So it sounds like the parking was tricky for you and the noise mid-afternoon got in the way."*
13. Thank them. *"That's genuinely useful — appreciate you saying."*
14. Log it in the member feedback log (Drive's `02-operations/member-feedback.md` — placeholder until populated).
15. If the reason is something we can address that day (e.g. "the meeting room was always booked when I needed it") and they'd consider staying, **only then** is it appropriate to ask: *"If we could sort that, would you want to stay?"* — and follow through.

---

## 5. Final-week experience

16. Treat the member exactly like a member through the final week. They paid for it. They get it.
17. Don't downgrade the welcome, the coffee, the conversation. Their last impression is the one that goes home with them.
18. On their last day — say a proper goodbye. *"Thanks for being here. Door's always open."*

---

## 6. Refunds

19. **No refund for partly-used billing cycles.** This is set out in [`../legal-and-compliance/terms-of-business.md`](../legal-and-compliance/terms-of-business.md) §4 and applies in all cases except force majeure / extended closure.
20. Exception — goodwill cases (e.g. member moved to another country mid-cycle, or genuinely unhappy with something we got wrong). Escalate to Connor; refund is processed via Stripe with a brief note in the record.
21. **No partial refund for a member leaving "early" within a week** — there's no early. The week is the unit.

---

## 7. Private office cancellation

22. Same logic, with two extras:
    - Walk the office at the end of the final week. Photo. Compare to handover condition.
    - Collect the key. Update Drive's `07-facilities/keys-and-access-register` once it lives in Drive.
23. Damage beyond fair wear and tear may be deducted from a deposit (if held) or invoiced. See [`../legal-and-compliance/terms-of-business.md`](../legal-and-compliance/terms-of-business.md) §6.

---

## 8. Reactivation

24. Ex-members can rejoin instantly. Open their old record on the member app, tap **Reactivate**, confirm the plan, send a fresh Stripe payment-method link.
25. The old QR code stays the same. The locker may or may not be available — check.
26. No "welcome back" fee. No hoops.

---

## 9. Suspension vs cancellation

27. **Suspension** is for failed payment (see [`./sop-006-new-member-sign-up.md`](./sop-006-new-member-sign-up.md) §8). Reversible without admin overhead.
28. **Termination by us** is rare and follows the grounds in [`../legal-and-compliance/terms-of-business.md`](../legal-and-compliance/terms-of-business.md) §8 (serious misconduct, repeated house-rules breach, non-payment after warnings). See [`./sop-018-complaints-handling.md`](./sop-018-complaints-handling.md) and [`../training/member-conflict-handling.md`](../training/member-conflict-handling.md) for escalation routes.

---

## Common issues

| Issue | First action |
|---|---|
| Member cancels mid-week and asks for prorated refund | Politely no. Point them to the terms. The week is the unit. Offer them the rest of the week to use the space. |
| Member cancels by email but keeps showing up | Their QR code stays live until the end of the cycle. After that it deactivates automatically. Greet them like a member until then. |
| Member cancels in anger over a specific issue | Cancel as requested. Same day. Then address the issue — even if they're gone, the issue might affect others. |
| Member cancels then asks to come back the same week | Reactivate, charge nothing extra, carry on as normal. |
| Member doesn't formally cancel but stops coming and stops paying | Standard failed-payment flow — suspend, notify, eventually close out the record. |

---

*Worksop Workspace · A space to drop your shoulders.*
*30 Carlton Road, Worksop S80 1PH · hello@worksopworkspace.co.uk · worksopworkspace.com*
