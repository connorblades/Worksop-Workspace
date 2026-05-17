# Review Request SMS Template

**Worksop Workspace** · Launch-readiness asset

A single short SMS as a follow up to the day 8 email for members who have not left a Google review yet.

---

## When to send

**Trigger:** day 14 after first payment, if and only if:
- The day 8 email was sent and has not bounced.
- No Google review has been posted by this contact.
- No reply to the email asking a question or raising a complaint.

If any of those conditions fails, do not send. The SMS is the second and final reminder. After day 14 there is no third nudge.

Send between 10am and 4pm on a weekday. Avoid evenings, weekends and bank holidays. An SMS at 8pm on a Sunday reads as desperate.

---

## Sender details

Send from the GoHighLevel SMS number tied to the worksopworkspace.com account. If a short code or business sender ID is configured, use that. Otherwise send from the business mobile (07739 063734) so the reply lands somewhere a human reads.

---

## SMS body (140 characters maximum)

```
Hi {{first_name}}, Connor at Worksop Workspace. Quick favour, if the week
worked, a Google review helps a lot. {{short_link}} Thanks.
```

**Character count:** 134 characters when `{{first_name}}` is replaced with an 8 character name and `{{short_link}}` with a 24 character short URL.

---

## Variables to merge

| Variable | Where it comes from | Example |
|---|---|---|
| `{{first_name}}` | GHL contact record | `Sarah` |
| `{{short_link}}` | Bitly or similar, pointing at the GBP review URL | `https://bit.ly/wws-review` |

Use a branded short link if possible (`wws.link/review` or `worksopworkspace.com/review` set up as a 301 redirect to the GBP review URL). A branded short link converts better than `bit.ly`.

---

## Fallback for non responders

If no review has landed by day 21:
- Stop. Do not send a third message.
- Make a quiet note on the contact record in GHL.
- The next time the member is in the building, mention the review casually. "We are trying to build up our Google reviews to help people find us. If you have a spare minute, the link is on the card at reception." Hand them the laminated card.
- If they leave a review after the in person ask, reply within 48 hours per the positive review template.

The principle is that two reminders is the maximum on automation. Anything beyond two is harassment. The third ask, if it happens at all, happens in person.

---

## Things to avoid

- Sending the SMS from a different sender than the original email. The recipient does not connect the two and the SMS reads as spam.
- Sending after 6pm. SMS at night is a bigger imposition than email at night.
- Sending on a Sunday or a bank holiday.
- Adding more than one link.
- Adding an emoji. The brand voice is plain text. Emojis read as marketing.
- Repeating the SMS weekly. Send once. Stop.

---

*Worksop Workspace · A space to drop your shoulders.*
*30 Carlton Road, Worksop S80 1PH · hello@worksopworkspace.com · worksopworkspace.com*
