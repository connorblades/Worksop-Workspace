# SOP-012: Lockouts, Lost Keys, and Emergency Access

**Worksop Workspace** · Operations · *Phase 1 reference*

Status: Draft v1 — needs Connor review · Last updated: 15 May 2026

---

The procedure for handling lockouts (member locked out of an office, locker, or building), lost keys, and emergency access to the building. Phase 1 uses physical keys for private offices and combination keypads for lockers; the main door is opened by staff.

---

## 1. Who holds what

| Key / access type | Held by | Backup held |
|---|---|---|
| Main front door key | Connor (set 1) | Connor (set 2, off-site safe) |
| Alarm code | Connor — in 1Password, never written down on site | — |
| Private office keys | Member (1 per member) + Worksop Workspace master | Connor (off-site safe) |
| Locker keypad codes | Member (their chosen 4-digit code) | Override code — staff app, audit-logged |
| Meeting room key | Held on reception during opening hours | Connor (off-site) |
| Cleaner's access | Loaned during clean, returned at end | Connor |
| Landlord access | Landlord's own master — see lease | Logged in Drive |

The full register lives in Drive's `07-facilities/keys-and-access-register.md` (once populated).

---

## 2. Member locked out of a private office

2. Confirm the member is the active tenant of that office on the member app.
3. Use the staff master key to let them in. Don't lecture.
4. If this is the second lockout for the same member in a week, mention casually that we can cut them a spare for £15 (a key-cutting cost, not a fine). Don't push.
5. Log the access in the staff app (admin → Office access log): time, member, office, your initials, reason.
6. If a member has lost their office key entirely, see section 6.

---

## 3. Member locked out of their locker

7. Locker keypads have a staff override code. Each use is auto-logged in the staff app.
8. Confirm the locker is theirs — locker assignments are on the member app.
9. Override the lock for them. Watch them retrieve their items.
10. Help them reset their code on the spot. (Members forget the code more often than they lose anything.)
11. Log in the override log: locker number, member, time, your initials.

---

## 4. Member locked into the building (after hours)

12. Phase 1 only — the building isn't 24/7 yet. We close at 5pm. The last person out is staff and the door is locked from outside.
13. If a member is somehow inside after close (forgotten the time, lost track in a private office) — they call the on-call number on the door sign.
14. Staff (Connor in Phase 1) drives down to let them out.
15. Reset the alarm afterwards. Log the after-hours access in the staff app.
16. From Phase 2 onwards (QR-code 24/7 access), this section is replaced.

---

## 5. Staff locked out of the building

17. Call Connor. Connor's the backup key holder.
18. Don't break in. Don't ask the landlord to break in. Wait.
19. If a member is waiting and we can't get in within 15 minutes, send them a message via the member app: *"Apologies — we're delayed opening this morning. Should be open by [time]. I'll buy you a coffee on the house when you arrive."*

---

## 6. Member loses an office key entirely

20. Same day:
    - Member tells us. We don't panic.
    - Log it in the access register.
    - Issue them the spare (held by Connor) on a temporary basis.
21. Within 7 days:
    - Cut a replacement for the spare so we maintain a backup.
    - Cost is £15 if it's a normal key, more if it's a high-security cylinder.
22. If the lost key is the **only** copy (no spare with Connor or member), and it's a private office with valuables inside:
    - Same-day lock change. Call the locksmith in Drive's `07-facilities/suppliers-and-contractors.md`.
    - Member is invoiced the lock-change cost (~£80–£150).
    - This is set out in [`../legal-and-compliance/terms-of-business.md`](../legal-and-compliance/terms-of-business.md) §6.

---

## 7. Member's office is repeatedly being accessed by them outside hours

23. Phase 1 — there's no out-of-hours access. If the building is locked, they can't be in their office.
24. From Phase 2 — if someone is generating significant out-of-hours access patterns, just note it. We're not surveilling members; the access log is for incident response, not behavioural monitoring.

---

## 8. Suspected unauthorised access

25. Triggered by: a door found unlocked that shouldn't be, signs of forced entry, the alarm having gone off overnight, items missing.
26. **Do not enter** if you arrive in the morning and the door is open or damaged. Stand outside, call 999.
27. Call Connor.
28. If safe to enter (e.g. you just realised mid-day that something looks off), do a walkthrough with someone else present. Don't touch anything that might be evidence.
29. Pull CCTV per [`../legal-and-compliance/cctv-policy.md`](../legal-and-compliance/cctv-policy.md).
30. Log a full incident report per [`../health-and-safety/accident-and-incident-report.md`](../health-and-safety/accident-and-incident-report.md).
31. If a member's office may have been entered, contact them within an hour to advise them to come and check their things.

---

## 9. Locking up procedures (recap)

- Front door locked when last person leaves.
- All private offices not in active use locked.
- Meeting room door closed (not locked — easier for cleaners).
- Alarm armed on exit. Code in 1Password.
- See [`./sop-002-closing-the-space.md`](./sop-002-closing-the-space.md) for the full close-down.

---

## Common issues

| Issue | First action |
|---|---|
| Member without app access claims to have an office | Don't open the office. Verify against the active-member list. If they can't be verified, politely refuse and ask them to log in to the app. |
| Cleaner arrives early and we're not in yet | Don't give them building access ahead of opening. Reschedule politely. |
| Landlord asks to enter a private office | Refuse unless the member has given written consent or there's an emergency (e.g. water leak). The office is their leased space within our lease. |
| Master key snaps in the lock | Don't force it. Call a locksmith. Brief the affected member. |
| Member wants their office locked when they leave each day | That's their choice — they have the only member-side key. We don't intervene either way. |

---

*Worksop Workspace · A space to drop your shoulders.*
*30 Carlton Road, Worksop S80 1PH · hello@worksopworkspace.co.uk · worksopworkspace.com*
