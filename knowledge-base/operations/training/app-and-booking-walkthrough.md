# App and Booking Walkthrough

**Worksop Workspace** · Training · *Phase 1 reference*

Status: Draft v1 — needs Connor review · Last updated: 14 May 2026

---

The member app, from the staff side. How to use it day-to-day, how to help members who get stuck, and how to read the QR check-in log (which doubles as the fire-safety occupancy log).

---

## What the app does

For members:

- Get in and out via QR code (scan at the front door — auto check-in / check-out)
- Book hot desks, dedicated desks, meeting rooms (Phase 3), podcast studio (Phase 3)
- See real-time availability
- Manage membership (change plan, pause, cancel)
- Raise issues or complaints

For staff:

- View today's bookings at a glance
- See who's checked in right now (critical for fire safety)
- Look up any member's account and plan
- See incoming issues / complaints raised through the app
- Trigger admin actions (manual check-in, comp a session, refund a booking)

---

## Daily app rhythm

### Morning (part of `../03-operations/sops/sop-001-opening-the-space.md`)

1. Open the staff dashboard
2. Check today's expected arrivals:
   - Who has a private office booking?
   - Who has a dedicated desk and is expected in?
   - Any day passes pre-booked?
   - Any room bookings (boardroom / podcast, Phase 3)?
3. Note any first-time visitors — these need the full tour
4. Note any cancellations or no-shows from yesterday that might affect today's rota

### Through the day

- Glance at the QR check-in list every hour or so — confirms occupancy in real time
- When someone walks in without scanning, prompt them: "Quick scan on the way in just so we know who's in for fire safety"
- When the app pings with a new issue raised, deal with it within the hour if possible

### End of day (part of `../03-operations/sops/sop-002-closing-the-space.md`)

- Confirm everyone has scanned out
- Walk anyone who hasn't to the QR reader on their way out
- Review the day's bookings — anything missed, refunded, or to follow up?
- Check the issue queue is empty (or noted for tomorrow)

---

## Looking up a member

The most common admin task. Use it to confirm someone's plan, see what they've booked, troubleshoot a payment issue.

1. Search by name, email, or phone
2. Profile view shows: plan, sign-up date, payment status, current bookings, recent activity
3. Quick actions from the profile: send a message, comp a session, edit booking, view payment history

**Never share another member's info with a member.** "I can see Sarah's not in today" — fine if context warrants. "Sarah's on the £30 weekly plan" — not your call to share. Use judgement.

---

## The QR check-in log (this matters)

In a fire or other evacuation, **the QR check-in log is how we know who's in the building.** It's referenced explicitly in `../03-operations/sops/sop-010-emergency-evacuation.md`.

That means:

- Members MUST scan in when they arrive and out when they leave
- If someone forgets, prompt them politely
- The log should match reality at any given moment — if you can see ten members on the floor but only seven on the log, something's wrong; fix it

**How to do a manual check-in (member can't scan):**

1. From the staff dashboard, find the member's profile
2. Click "Manual check-in" — confirm the timestamp
3. Note why you did it (member's phone dead, app issue, walked in carrying things) in the activity log

**How to do a manual check-out:**

Same process, opposite direction. Always do this at end of day if anyone's still showing as checked in after they've left.

---

## Helping a member with a booking issue

### "I tried to book but it didn't go through"

1. Have them refresh the app
2. Walk through the booking with them
3. If still failing, check: do they have an active plan? Is their payment method working? Is the slot actually available?
4. If you can't fix it in 60 seconds, take the booking manually on the staff side and tell them you've sorted it

### "I want to change my plan"

1. Open their profile
2. Plan switches go through the app for self-service — show them where
3. Switches take effect at the end of their current weekly billing cycle (don't pro-rate)
4. If they want to downgrade, ask once if there's something we can fix to keep them on the current plan — but don't push. Respect the answer.

### "I want to cancel"

1. Show them the cancel button in the app — it's self-service
2. Don't try to talk them out of it
3. After they've cancelled, ask: "Anything we could do better?" — log the answer in `../05-members/feedback-log.md`
4. Tell them: "Same price waiting for you if you ever want to come back. No drama."

### "I forgot to scan out yesterday"

Easy fix. Manual check-out from the staff side. Apologise that it's a bit fiddly. Don't make it their fault.

### "I got charged twice"

Take this seriously and act fast:

1. Open Stripe (in the linked dashboard) and check their payment history
2. If genuine double-charge, refund the duplicate immediately and tell them you've done it
3. If it's actually a different transaction (e.g. their plan renewed + they bought an hourly booking), explain calmly
4. Email confirmation either way so they have a record

---

## Issue / complaint queue

When a member raises an issue through the app:

1. Acknowledge within the hour (the app shows when it was received)
2. Triage: is it operational (broken kettle), interpersonal (loud member), or admin (billing)?
3. Operational → fix or log in `../07-facilities/maintenance-log.md`
4. Interpersonal → use the framework in `member-conflict-handling.md`
5. Admin → resolve via the app or Stripe; reply to the member with what you've done

**Every issue gets a reply within the same day.** Even if you can't fix it today, tell them when you can.

---

## Common troubleshooting

| Member problem | Likely cause | Fix |
|---|---|---|
| QR won't scan at the door | Phone screen brightness low; or QR generation expired | Up brightness; refresh the QR in the app |
| Can't see today's booking | App showing wrong day / timezone | Pull-to-refresh; check timezone in phone settings |
| Got an error trying to upgrade plan | Payment method declined or expired | Update payment method in app; or take payment in person |
| Booking conflict (two people booked the same room) | Rare, but cache issue | App is source of truth — whoever's in the booking log wins; offer alternative to the other |
| "I never got my confirmation email" | Often went to spam | Walk them through checking spam; resend from staff side; confirm their email address |
| Can't find their locker | Lockers aren't pre-assigned in Phase 1 — first come, first served | Help them find an empty one; record the locker number in their profile for the day |

---

## Things the app is NOT for

- **Storing passwords.** That's 1Password. Never put account passwords in the app's notes field.
- **Sensitive medical info about members.** Don't record someone's allergy details — only what they tell you they need.
- **Replacing the maintenance log.** Operational issues might come in via the app but they live in `../07-facilities/maintenance-log.md`.
- **Replacing direct conversation.** If a member has a real concern, talk to them. Don't hide behind the app.

---

## When the app goes down

It will happen at some point. When it does:

1. Tell Connor immediately
2. Fall back to manual: paper sign-in sheet at reception, take payments via the Stripe terminal manually, write bookings on a whiteboard
3. **The QR check-in for fire safety becomes a paper sign-in.** This is non-negotiable — we still need to know who's in.
4. Once the app is back, retroactively log the day's activity if possible

---

*Worksop Workspace · A space to drop your shoulders.*  
*30 Carlton Road, Worksop S80 1PH · hello@worksopworkspace.co.uk · worksopworkspace.com*
