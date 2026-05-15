# Data Breach Response Plan

**Worksop Workspace** · Operations · Legal & Compliance · *Phase 1 reference*

Status: **Draft v1 — needs Connor review and data-protection adviser sign-off.** Last updated: 15 May 2026.

---

## Important — what this doc is and isn't

This is the playbook for responding to a personal data breach. Under UK GDPR, a notifiable breach must be reported to the ICO **within 72 hours of becoming aware**. That clock starts the moment we suspect a breach, not when we're sure. Speed matters; this plan exists so we don't lose time deciding what to do while it's already running.

A "personal data breach" means: a breach of security leading to the accidental or unlawful destruction, loss, alteration, unauthorised disclosure of, or access to, personal data.

---

## 1. The four phases

1. **Contain** — stop the breach from spreading
2. **Assess** — understand what happened and what the risk is
3. **Notify** — tell the ICO and (where required) affected people
4. **Learn** — fix the cause, update procedures, train

Do these in order. Don't skip to notification before containing.

---

## 2. Phase 1 — Contain

When a breach is suspected or detected:

- **Stop the source.** If a system is leaking data, take it offline. If a paper file is missing, search now. If an email went to the wrong person, recall it (and don't trust the recall — assume they got it).
- **Preserve evidence.** Don't overwrite logs. Don't "tidy up" the affected files. Screenshot or export anything that proves what happened.
- **Don't broadcast.** Not yet. Tell only the people who need to know to contain it.
- **Log the time.** Note the time **of awareness** — that's the start of the 72-hour clock.

Containment actions take precedence over everything else for the rest of the day.

---

## 3. Phase 2 — Assess

Within 24 hours of detection, document the following:

| Question | Answer |
|---|---|
| What happened? | Plain-language summary |
| When did it happen? | Specific date / time if known; date range if not |
| When did we become aware? | The 72-hour-clock start |
| How did we become aware? | Internal detection, external report, third-party notification |
| What data is affected? | Categories, volume, special-category content |
| How many data subjects? | Estimate |
| What's the nature of the risk? | Confidentiality, integrity, availability — and to whom |
| What are the possible consequences? | Financial loss, identity theft, reputational damage, emotional distress, discrimination |
| What's our containment status? | Contained, partially, ongoing |
| Have we recovered the data? | Yes / no |

That's the basis for the next phase.

---

## 4. Phase 3 — Notify

### When to notify the ICO

Notify the ICO if the breach is **likely to result in a risk to the rights and freedoms of natural persons**. The bar is not high.

Examples that meet the bar:
- A spreadsheet of member contact details sent to the wrong recipient
- Loss of a laptop with member data not encrypted
- A database breach with member records exposed
- A successful phishing attack accessing email
- Theft of paper records containing identity data

Examples that don't:
- A breach affecting only the data of one of our staff with no real-world risk
- Accidental deletion of recoverable data with backups in place
- Internal misuse contained immediately without external exposure

If in doubt, **notify**. The ICO would rather hear about a "no-risk" breach than the reverse.

Notify within **72 hours** of becoming aware. If we miss the 72-hour window, we notify anyway and explain the delay.

ICO breach reporting: <https://ico.org.uk/for-organisations/report-a-breach/personal-data-breach/>. The breach reporting form needs:

- Our details (controller name, contact)
- Nature of the breach
- Categories and approximate numbers of data subjects and records affected
- Likely consequences
- Measures taken or proposed

### When to notify affected people

Notify **the affected people themselves** if the breach is likely to result in **high risk** to their rights and freedoms.

Examples that meet that higher bar:
- Financial data exposed (card numbers, bank details)
- Special-category data exposed (health, etc.)
- A combination of identity + contact details that could enable fraud
- Login credentials exposed

The notification must use **clear, plain language** and include:
- A description of the breach
- The name and contact of the DPO / data lead (Connor)
- Likely consequences
- Measures taken to address it
- What the affected person can do to protect themselves

Templates in [`./../sales/communications/email-templates.md`](../../sales/communications/email-templates.md) — to be added.

Where notifying each person individually would involve disproportionate effort, we may use a public notice instead. The bar for that is high; we don't expect to ever rely on it.

### Other notifications

| Recipient | When |
|---|---|
| Insurer | Same day, if there's a possibility of claim |
| Police | If the breach involves a crime (e.g. theft, hacking) |
| Affected sub-processor | If their data is implicated |
| Other regulators | Where required (e.g. financial conduct, if relevant — unlikely for us) |

---

## 5. Phase 4 — Learn

Within 30 days of resolution, complete a post-incident review:

- **What happened** (definitive account)
- **Why it happened** (root cause)
- **What stopped it being worse** (controls that worked)
- **What didn't work** (gaps)
- **What we're changing** (SOP, training, technical, contractual)
- **By when** (specific date, owner)

The review is signed off by Connor and held in Drive's `06-legal-and-compliance/breach-log.md`.

---

## 6. The breach log

Every breach — notifiable or not — is logged in `06-legal-and-compliance/breach-log.md` with:

- Date of breach (or estimate)
- Date of detection
- One-line description
- Categories and volume of data
- Whether ICO was notified, with reference number
- Whether subjects were notified
- Closure date
- Root cause
- Actions taken

The log is retained for **at least 3 years**.

---

## 7. Pre-position checklist (do this before any breach happens)

- [ ] This plan is approved and signed by the director
- [ ] An out-of-hours contact route for Connor exists and is in 1Password
- [ ] A breach assessment template (the table in §3) is in Drive ready to use
- [ ] An ICO account / contact exists so we know who's filing
- [ ] A draft "notification to affected member" email template exists in [`../../sales/communications/email-templates.md`](../../sales/communications/email-templates.md) (under "Data breach notification")
- [ ] The insurer's notification path is known and documented
- [ ] Each sub-processor's incident contact is in the processing register

---

## 8. Worked example — small accidental disclosure

A staff member emails a bulk update to "all members" but uses **CC** instead of **BCC**, exposing 73 members' email addresses to each other.

| Phase | Action |
|---|---|
| Contain | Send a follow-up immediately asking recipients to delete. Don't pretend it didn't happen. |
| Assess | Categories: email addresses. Subjects: 73. Risk: low (no special category, no financial). |
| Notify | The breach is borderline — limited risk, but mass disclosure. We'd notify the ICO erring on the side of yes. We'd also send a direct apology to the affected members. |
| Learn | Switch to a bulk email tool that doesn't allow CC. Update the comms SOP. |

---

## 9. Worked example — laptop theft

A staff laptop is stolen from a vehicle. The laptop holds local copies of member contact details, financial records, and access to the member app admin via stored credentials.

| Phase | Action |
|---|---|
| Contain | Remote-wipe the laptop. Reset the member app admin credentials. Reset email password. Cancel any tokens or stored payment methods accessible via the laptop. Report theft to police; get a crime reference. |
| Assess | If FileVault / BitLocker was on and the password was strong, risk is low. If the laptop was unencrypted with auto-login, risk is high. Document which. |
| Notify | If risk is non-trivial, notify ICO within 72 hours. If special-category data was on the laptop and risk is high, notify each affected member. |
| Learn | Encryption mandatory. No local copies of bulk member data. MFA on every system. |

---

## 10. Version history

| Version | Date | Author | Change |
|---|---|---|---|
| Draft v1 | 15 May 2026 | Connor + AI | First version |

---

*Worksop Workspace · A space to drop your shoulders.*
*30 Carlton Road, Worksop S80 1PH · hello@worksopworkspace.co.uk · worksopworkspace.com*
