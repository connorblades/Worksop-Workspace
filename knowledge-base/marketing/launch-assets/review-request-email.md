# Review Request Email Template

**Worksop Workspace** · Launch-readiness asset

A single short email asking a member for a Google review after their first week. Branded plaintext, one CTA, no attachments.

---

## When to send

**Trigger:** day eight after the member's first successful payment.

Day eight is the end of their first full week as a member. The "honeymoon window" is wide open. They have settled into a routine, found a favourite seat, tasted the coffee, taken at least one phone call in the booth. They have not yet hit any small frustration big enough to dampen a five star review.

If a member pays on a Monday, the email lands the following Tuesday morning. If they pay mid week, the email lands eight calendar days later.

Send from GoHighLevel as a one off automation triggered by the "first payment" event.

---

## Sender details

- **From name:** Connor at Worksop Workspace
- **From address:** connor@worksopworkspace.com (or hello@worksopworkspace.com if a single reception inbox is preferred)
- **Reply to:** same as From

Use a real human first name as the sender. "Worksop Workspace Team" feels corporate and converts worse.

---

## Subject line

> A two minute favour

Tested alternatives if the open rate is low after the first batch:
- A quick favour, if you have two minutes
- Two minute favour. nothing to buy

---

## Email body

```
Hi {{first_name}},

If Worksop Workspace has been useful this week, a Google review really helps
people in similar situations find us. It takes about two minutes and you do
not need to write much. A line or two about what you used the space for is
plenty.

Here is the link.

{{review_link}}

If anything has not landed for you, hit reply and tell me. I would rather
hear it than not.

Thanks,
Connor
Worksop Workspace
worksopworkspace.com
07739 063734
```

---

## Notes on the body

- One CTA. The Google review short link.
- Plain text. No images, no attachments, no banner. Plain text emails land better in inboxes and read more personally.
- The review link is the GBP "Get more reviews" short link, in the form `https://g.page/r/...`. Pull from the GBP dashboard once verified.
- The "if anything has not landed for you, hit reply" line is a deliberate pressure release. It tells the recipient you actually want feedback and not just a star count. It also catches the people who would otherwise leave a quiet two star review without ever telling you why.
- No urgency phrases. No "limited time", no "we would really appreciate it", no "your review means the world". Direct, human, light.

---

## Variables to merge

| Variable | Where it comes from | Example |
|---|---|---|
| `{{first_name}}` | GHL contact record | `Sarah` |
| `{{review_link}}` | Fixed for every send, pulled from GBP | `https://g.page/r/...` |

---

## What happens after this email

- **No reply, no review, day 14:** SMS follow up (see `review-request-sms.md`).
- **Reply asking a question:** Connor handles in person, in the building, that week. Do not push the review again. The relationship comes first.
- **Reply with feedback or a complaint:** acknowledge same day, fix in the building same week, log in the operations folder. Do not push the review again until the issue is closed.
- **Positive review posted:** reply within 48 hours using the positive review template in `review-reply-templates.md`.

---

## Things to avoid

- Sending the email from a no reply address. Defeats the point.
- Adding a feedback survey link as a second CTA. Two CTAs cuts conversion by roughly half.
- Asking the member to mention a specific keyword in their review. Violates Google's guidelines and risks the review being filtered.
- Sending the email at 9am Monday. Tuesday or Wednesday mid morning lands better.
- Following up more than once by email. The SMS at day 14 is the last reminder. After that, leave it.

---

*Worksop Workspace · A space to drop your shoulders.*
*30 Carlton Road, Worksop S80 1PH · hello@worksopworkspace.com · worksopworkspace.com*
