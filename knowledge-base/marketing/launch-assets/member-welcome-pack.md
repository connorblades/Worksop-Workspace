# Member Welcome Pack

**Worksop Workspace** · Launch-readiness asset

The first fortnight of a new member's life with Worksop Workspace. Four touch points by email, plus a laminated reception card. Friendly, low pressure, built around the moments that matter in the first two weeks.

The cadence is deliberate. Day one is warmth and orientation. Day three is a check that everything works. Day eight is the review ask, the only commercial moment. Day fourteen is the soft community invite.

---

## Email 1. Welcome. Sent immediately after first payment

**Trigger:** the GHL "first successful payment" event.

**Subject:** Welcome to Worksop Workspace

**Body:**

```
Hi {{first_name}},

Welcome aboard. Whether you bought a day pass, a weekly desk or a
private office, here is everything you need to settle in.

The basics

Address: 30 Carlton Road, Worksop, S80 1PH
Hours: Monday to Friday, 8am to 5pm
Wi Fi: WorksopWorkspace, password on the card at reception
Parking: free outside, no time limits
Tea and coffee: in the kitchen, help yourself

The first day

Walk in any time after 8am. Wave at whoever is on reception, that
is normally me, sometimes a colleague. Pick any free desk on the
open floor. Make yourself a drink. Plug in. Get going.

If you booked a private office, your door key is on a labelled
fob at reception.

If you booked the meeting room, your booking is in the diary and
the screen is on five minutes before your slot.

Anything I have forgotten, my number is below. Phone or text any
time during the working day.

Connor
07739 063734
hello@worksopworkspace.com
worksopworkspace.com
```

**Notes:**
- Plain text. No images.
- The address and hours are repeated even though they are on the website. New members read this email on the morning of day one and a confirmed reminder helps.
- The "wave at whoever is on reception" line is deliberately personal. It tells the new member they are walking into a small place run by a human, not a faceless brand.

---

## Email 2. Day three check in

**Trigger:** 72 hours after first payment.

**Subject:** Three days in. how is it going?

**Body:**

```
Hi {{first_name}},

Three days in. Quick check, on three things specifically:

1. Wi Fi. has it held up on any video calls?
2. The chair and desk you have been using. comfortable enough?
3. The kettle and coffee setup. you found what you need?

If any of those is "no", reply to this email or grab me in the
building. The whole point of a small workspace is that small things
get fixed quickly.

If everything is fine, ignore this email, no offence taken.

Connor
07739 063734
```

**Notes:**
- Three specific things. Vague "how are you finding it?" emails get ignored. Specific questions get specific answers.
- The explicit "ignore this email" line is permission to not reply. Counterintuitively, this lifts response rates because people who otherwise feel guilty about not replying now feel free to.

---

## Email 3. Day eight review ask

**Trigger:** day eight after first payment. See `review-request-email.md` for the full template, sender details, subject line and body.

This is the only commercial moment in the first fortnight. Treat it as part of the welcome cadence, not as a standalone marketing email. The review link is the only CTA. No upsells, no offers, no community plug.

---

## Email 4. Day fourteen community invite

**Trigger:** day fourteen after first payment.

**Subject:** Two weeks in. couple of things

**Body:**

```
Hi {{first_name}},

Two weeks in. Couple of things on the table.

We run an informal coffee at 10:30 on the first Friday of every
month. Anyone in the building that day is welcome, no need to RSVP,
just walk into the kitchen and join in. The conversation tends to
be a mix of work, local news and what is going on in Bassetlaw. A
good way to put faces to the names you have started seeing around
the floor.

If you ever want to book the meeting room (£20 an hour, your
member rate gets a small discount), the link is on the website.

If anything is not working for you, hello@worksopworkspace.com or
07739 063734.

Connor
```

**Notes:**
- "First Friday coffee at 10:30" is a specific event with a specific time and a low commitment cost. Vague "community events" produce nothing. Specific recurring events produce a culture.
- The meeting room nudge is light. It belongs here because day fourteen is roughly when a member has settled in enough to think about hosting a client at the building.
- No second review ask. The review window closed at day fourteen with the SMS. Stop.

---

## Laminated reception card

**Format:** A6 (105mm x 148mm), landscape, laminated, displayed in a small acrylic holder on the reception counter and on the kitchen worktop. One copy on every private office desk.

**Front of card:**

```
WORKSOP WORKSPACE
A space to drop your shoulders.

Wi Fi: WorksopWorkspace
Password: ask Connor or check the welcome email

Hours: Monday to Friday, 8am to 5pm
Parking: free outside

Tea and coffee in the kitchen.
Help yourself.

Quiet booth on the left for phone calls.
Meeting room: book on the website or ask at reception.

In an emergency:
Connor 07739 063734
First aid kit on the kitchen wall.
Fire exit at the rear of the building.

30 Carlton Road, Worksop, S80 1PH
hello@worksopworkspace.com
worksopworkspace.com
```

**Back of card:**

```
ENJOYING THE PLACE?

A Google review helps people in your situation find us.
Two minutes, here:

[QR CODE PLACEHOLDER]

Or type worksopworkspace.com/review

Thank you.
```

**QR code:**
- Encode the Google review short link from the GBP dashboard, in the form `https://g.page/r/...`.
- Set the QR code error correction to "H" (high) so it still scans after wear.
- Minimum size 25mm square on the card so it scans cleanly from a phone at desk height.
- Test scan with both iOS and Android cameras before printing.

**Print notes:**
- Print on 350gsm card. Laminate at 250 microns.
- Use the brand colour palette. White background, espresso text, oak honey divider line. No clay on the laminated card, save the clay accent for digital CTAs.
- Order ten copies. Two for reception, one for each private office desk, one for the meeting room table, two for the kitchen, two spares.

---

## A note on the cadence

Four emails in fourteen days is the right amount for a brand new member of a small workspace. It is enough touch to make the place feel attended to and not so much that the inbox feels harassed. The pattern that works on similar small businesses is:

- Day 0: orientation
- Day 3: practical check
- Day 8: review ask
- Day 14: community soft sell

After day fourteen, the member goes on the standing monthly newsletter (separate document, not in this pack) and the welcome cadence is over. No more automated emails. From here, the relationship is in person.

---

## Editing the cadence over time

Three signals will tell you the cadence needs adjusting:

1. **Day three reply rate.** If below 10%, the email is being read as marketing. Shorten it, change the subject line, send earlier in the day.
2. **Day eight review conversion.** If below 25%, the review ask email is the problem (not the day three email). Run the alternative subject lines in `review-request-email.md`.
3. **Day fourteen first Friday coffee attendance.** If after three months the coffee has fewer than three people each time, the community email is not landing. Try a different event format (a Wednesday lunch, a Thursday breakfast) and update the email.

Run the first review after thirty days. Adjust quietly, do not overhaul.

---

*Worksop Workspace · A space to drop your shoulders.*
*30 Carlton Road, Worksop S80 1PH · hello@worksopworkspace.com · worksopworkspace.com*
