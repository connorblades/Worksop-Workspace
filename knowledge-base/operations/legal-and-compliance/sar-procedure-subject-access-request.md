# Subject Access Request (SAR) Procedure

**Worksop Workspace** · Operations · Legal & Compliance · *Phase 1 reference*

Status: **Draft v1 — needs Connor review.** Last updated: 16 May 2026.

---

A Subject Access Request (SAR) is when someone asks us, under UK GDPR Article 15, to tell them what data we hold on them and provide a copy. This document is the procedure we follow when one arrives.

A SAR can also be one of the wider data rights — correction (Article 16), deletion (Article 17), restriction (Article 18), portability (Article 20), or objection (Article 21). The procedure below covers all of them.

---

## 1. How a SAR can reach us

- Email to hello@worksopworkspace.co.uk
- Letter to 30 Carlton Road, Worksop, S80 1PH
- Verbal request to any member of staff
- Via social media

**Important:** a SAR doesn't have to use the word "SAR" or "GDPR" or any specific form. "Can you send me everything you have on me?" is a SAR. If in doubt, treat it as one.

---

## 2. Time limit

We must respond within **one calendar month** of receiving the request. The clock starts on the date the request arrives.

We can extend by two further months if the request is complex or there are many requests from the same person. We must tell the requester within the first month if we're extending.

---

## 3. Procedure (step by step)

### Step 1 — Acknowledge within 48 hours

Reply to confirm we've received the request. Use the template at §6.

### Step 2 — Verify identity

We need to be reasonably sure the requester is who they say they are — don't hand someone else's data to the wrong person.

- If the request comes from the email address we hold on file, that's usually enough.
- If it comes from a different email, ask them to send it from the registered email, **or** provide proof of ID (photo of driving licence or passport with non-essential details redacted).
- If the request is on behalf of someone else (parent, guardian, solicitor), ask for written authority from the data subject.

Don't ask for more than is necessary. Asking for excessive ID is itself a GDPR risk.

### Step 3 — Find the data

Check all the places we hold data on this person:

- **Go High Level CRM** — search by email and phone
- **Stripe** — search by email
- **SumUp** — search by email
- **Google Workspace email** — search inbox + sent
- **CCTV** — only if the requester has identified a specific date/time and zone; we don't search 30 days of footage for "anywhere I might have been"
- **Accident book / incident records** — if relevant
- **Physical sign-in logs** — if relevant
- **Member records** — paper agreement file if signed in person

### Step 4 — Apply exemptions

We don't have to disclose:

- Personal data about other people (redact other members' names from CCTV, redact unrelated correspondence)
- Information covered by legal professional privilege
- Information that would prejudice a criminal investigation
- Repeated or "manifestly unfounded or excessive" requests (rare — get a second opinion before refusing)

### Step 5 — Compile the response

Put together:

- A summary of what we hold and why
- Copies of the data itself, in a usable form (PDF or readable export from each system)
- A reminder of the requester's rights (correction, deletion, complaint to ICO)

### Step 6 — Send and log

Send by the method the requester prefers (email is fine if from their registered address).

Log the request in the SAR log:

| Date received | Requester | Method | Type (access / correction / deletion / etc.) | Date responded | Outcome |
|---|---|---|---|---|---|

The log lives in `knowledge-base/operations/legal-and-compliance/sar-log.md` (created on first request).

---

## 4. Deletion requests

If a member asks us to delete their data:

- We can keep what we're legally required to keep (HMRC tax records for 6 years, accident book entries, anything subject to ongoing legal claim).
- We must delete everything else — including CRM records, marketing lists, anything we hold on a basis they're now withdrawing.
- Confirm in writing what was deleted and what was retained (and why).

For **active members**, we can't fully delete while the contract is live (we need the data to deliver the service). Their request becomes effective on cancellation.

---

## 5. Refusing or charging a fee

We respond to SARs **for free** as the default. We can only charge a "reasonable fee" if the request is manifestly excessive (e.g. someone asking for the same data 10 times in a year). Get a second opinion before doing so.

If we refuse a request (rare), we must:
- Tell the requester why, within one month
- Tell them they can complain to the ICO
- Tell them they can challenge our refusal in court

---

## 6. Templates

### Acknowledgement (within 48 hours)

> Hi [name],
>
> Thanks for getting in touch. I'm treating your request as a Subject Access Request under UK GDPR.
>
> We'll come back to you with everything we hold within one calendar month — by [date one month from receipt]. If we need any clarification or a quick identity check first, I'll be in touch.
>
> If you'd like to talk it through before then, you're welcome to reply to this email.
>
> Connor — Worksop Workspace

### Response (with data)

> Hi [name],
>
> Following your request on [date], here's everything Worksop Workspace holds on you. Attached are exports from each system we use:
>
> - CRM record: [filename]
> - Email correspondence: [filename]
> - Payment records: [filename]
> - [Other as relevant]
>
> Each entry shows when the data was created, why we hold it, and our lawful basis.
>
> A reminder of your rights: you can ask us to correct, delete, restrict, or transfer this data, or object to how we use it. You can also complain to the Information Commissioner's Office (ico.org.uk or 0303 123 1113) if you're not happy with this response.
>
> Any questions, reply to this email.
>
> Connor — Worksop Workspace

### Refusal / partial refusal

> Hi [name],
>
> [Brief explanation of what we can and can't provide, and why.]
>
> If you disagree with this decision, you can complain to the Information Commissioner's Office (ico.org.uk or 0303 123 1113) or, if you want, challenge it in court.
>
> Connor — Worksop Workspace

---

## 7. Related documents

- [Data Protection and GDPR](data-protection-and-gdpr.md)
- [Record of Processing Activities](ropa-record-of-processing-activities.md)
- [Data Breach Response](data-breach-response.md)
