# SOP-013: Wi-Fi or Network Outage

**Worksop Workspace** · Operations · *Phase 1 reference*

Status: Draft v1 — needs Connor review · Last updated: 15 May 2026

---

The procedure for handling a Wi-Fi outage. Members come here partly because their home Wi-Fi is unreliable. The day the office Wi-Fi goes down is the day they remember we're not a magic immune workspace. Calm communication and rapid triage matter more than a perfect fix.

The full network specification (router model, ISP account, SSID admin, etc.) lives in Drive's `08-technology-and-it/wifi-and-network.md`. This SOP is the response runbook.

---

## 1. Spotting the outage

1. **First signal** is usually a member glancing up and saying *"Is the Wi-Fi down?"*
2. Don't wait for confirmation. Open your laptop, try to load **<https://www.google.com>** and **<https://www.bbc.co.uk>** on the member-facing network.
3. Also try a private-network site: **<https://1.1.1.1>**.
4. Open the member app — it'll show whether the network heartbeat is up.

---

## 2. Triage in 60 seconds

5. Two checks decide which branch you go down:
    - **Is the LED on the main router solid green?** If yes, the router is up. If no/red/flashing, the router is the issue.
    - **Can you reach a private-network site (1.1.1.1)?** If yes, the Wi-Fi is up locally but the ISP link is down. If no, the local network is down.

| What you find | Likely cause | Branch |
|---|---|---|
| Router LED red/flashing, no internal access | Router fault or power | A |
| Router green, no internet at all | ISP / external | B |
| Some devices fine, others not | Per-device issue, not a true outage | C |
| Slow but technically working | Capacity / interference | D |

---

## 3. Tell the room first

6. Before you fix anything, announce it. Calm, plain, friendly.
7. Walk the floor: *"Quick heads-up — the Wi-Fi's playing up, I'm on it. Two minutes."*
8. Don't promise a fix time you can't keep. *"I'm on it"* > *"It'll be fixed by 2pm."*
9. If you're going to be more than 10 minutes, send an app broadcast to all currently-checked-in members: *"Wi-Fi issue — working on it. I'll let you know the moment we're back. If you're on a deadline, your phone's hotspot is on us — pop to reception and we'll sort you out."*

---

## 4. Branch A — Router down

10. Check the router has power. Cable connected, plug in the wall, switch on.
11. Power-cycle the router: pull the power, count to 30, plug it back in. Wait 5 minutes for full boot.
12. If LEDs come back green, retest connectivity.
13. If still red — check the router log via the admin interface (URL and password in Drive's `08-technology-and-it/`).
14. If router won't boot or is clearly faulty, swap to the backup router (in the staff cupboard) — same SSID, same password (configured ahead of time).
15. If we don't have a backup router, you'll need to follow Branch B's mitigation steps until a replacement is ordered.

---

## 5. Branch B — ISP / external connection down

16. Check the modem / ONT (the box from the ISP). Is its WAN LED green?
17. Power-cycle the modem. Pull power, count to 30, plug back in. Wait 5 minutes.
18. If still no WAN, call the ISP. Account number and support line in Drive's `08-technology-and-it/wifi-and-network.md`.
19. While waiting for the ISP:
    - Set up the 4G backup hotspot (staff phone or dedicated MiFi). SSID and password printed on the back of the device.
    - Announce the temporary network: *"Hop onto WW-BACKUP for now — same password as a Wi-Fi card on the desk. We're on 4G until the main line's back; it's slower but it works for emails and most things."*
20. Don't promise the backup will handle video calls or heavy uploads. Be honest.

---

## 6. Branch C — One device can't connect

21. Probably their device, not our network. Ask:
    - Is their flight mode on?
    - Did they recently change their device password? (Older devices store the SSID password and break if reset.)
    - Can they "forget the network" and re-enter the password?
22. Walk them through it. Get them re-connected.
23. Log if it happens repeatedly — there may be a roaming/coverage issue worth investigating.

---

## 7. Branch D — Slow but working

24. Bad slow can be worse than off — members try to push through, get frustrated, then complain belatedly.
25. Open the speedtest dashboard (Drive's IT page has the URL) or run <https://fast.com> on a wired or strongest-signal Wi-Fi device.
26. If down by more than 50% of typical, treat like an outage and start the response sequence.
27. Common causes:
    - One user pulling huge upload (sync, backup, video). Easy to spot in the router admin.
    - Microwave / interference in the kitchen.
    - Router got hot.
28. Don't shame the heavy user. We're a coworking space, not a strict-policy network. If a member is regularly hammering it, mention it privately *— "if you do regular big uploads, mind kicking those off after 5pm so it doesn't slow others?"*

---

## 8. Telling members the truth

29. Don't pretend the network is fine when it's not.
30. Don't pretend you know the cause when you don't.
31. *"We're seeing an issue, here's what we know, here's what I'm doing, here's the workaround"* is the formula.
32. Keep the broadcasts short. Two messages — *"we have a problem"* and *"we're back"* — are enough.

---

## 9. Apology, where warranted

33. If the outage lasted more than 30 minutes during a billed day:
    - For day-pass visitors that day — automatic refund or free return-day. Process via Stripe.
    - For weekly members — no automatic credit, but the goodwill day-pass-for-a-friend gesture is appropriate if you've inconvenienced people significantly.
    - For Private Office members — same as weekly, plus a personal apology from Connor.
34. Don't grovel. Acknowledge, mitigate, move on.

---

## 10. After the outage

35. Log the incident in Drive's `07-facilities/maintenance-log.md`:
    - Time started / time resolved
    - Branch (A/B/C/D)
    - What you did
    - Whether the ISP / supplier was contacted
    - Impact (how many members affected, refunds issued)
36. If it's the third outage in a month, **flag to Connor for a network review.** Either the hardware needs replacing, the ISP needs switching, or we need to make a permanent 4G failover investment.

---

## Common issues

| Issue | First action |
|---|---|
| ISP says "no fault reported in your area" | Insist on a line test from their end. Note the case reference. |
| One member dominating the connection | Speak to them privately. Don't shame in public. |
| Outage during a meeting room booking | Apologise. Offer to credit the booking. Switch them to the 4G backup if it works. |
| Outage out of hours (after close) | Triage in the morning. Don't wake up the on-call for Wi-Fi unless it affects a 24/7 member in Phase 2+. |

---

*Worksop Workspace · A space to drop your shoulders.*
*30 Carlton Road, Worksop S80 1PH · hello@worksopworkspace.co.uk · worksopworkspace.com*
