# Data Protection and GDPR

**Worksop Workspace** · Operations · Legal & Compliance · *Phase 1 reference*

Status: **Draft v1 — needs Connor review and data-protection adviser sign-off.** Last updated: 15 May 2026.

---

## Important — what this doc is and isn't

This is the **internal data protection policy** for Worksop Workspace — how we actually run our data processing day to day. The customer-facing summary is the [`./privacy-policy.md`](./privacy-policy.md). The two must stay aligned.

We're a small business, but small doesn't exempt us from the UK GDPR or the Data Protection Act 2018. This is how we comply without making it heavier than it needs to be.

---

## 1. Who's responsible

Connor Blades, as director, is the named **Data Protection Officer** (DPO) for Worksop Workspace. Under UK GDPR, a formal DPO is mandatory only in narrow circumstances (public bodies, large-scale special-category processing, etc.) — we don't meet those criteria, so Connor's role here is voluntarily titled DPO rather than statutorily required.

Decisions about new data processing, new sub-processors, and material changes to existing processing go through Connor.

---

## 2. What we process

The detail is in [`./privacy-policy.md`](./privacy-policy.md) §2 (categories of data). The processing register lives in Drive at `06-legal-and-compliance/processing-register.md` — that's the Article 30 record of processing activities.

The register names, for each processing activity:
- The purpose
- The lawful basis
- The categories of data subject
- The categories of personal data
- Any sub-processor
- Whether data is transferred outside the UK/EEA
- The retention period
- The technical and organisational security measures

---

## 3. Lawful basis discipline

Every processing activity has a lawful basis recorded. We don't rely on "consent" where another basis is more appropriate — relying on consent makes the relationship fragile (you can withdraw at any time) and binds us more tightly than we want.

| Activity | Basis | Why |
|---|---|---|
| Running a membership | Contract | We need the data to deliver what you paid for |
| Fire-safety occupancy logs | Legal obligation + legitimate interest | We have to know who's in the building |
| Payment processing | Contract + legal obligation (VAT records) | |
| Marketing emails | Consent | Genuine opt-in, separate from sign-up |
| CCTV | Legitimate interest | Documented in [`./cctv-policy.md`](./cctv-policy.md) |
| First aid records | Legal obligation + Article 9(2)(b) for special-category | |

A legitimate-interest assessment (LIA) is recorded where we rely on legitimate interest — held in Drive's processing register.

---

## 4. Special-category data

The only special-category data we routinely hold is **health data** in first aid records (see [`../health-and-safety/first-aid-policy.md`](../health-and-safety/first-aid-policy.md)). The Article 9 condition is 9(2)(b) — necessary for carrying out obligations under employment and social-security law.

We do not collect:
- Race or ethnic origin
- Political opinions
- Religious or philosophical beliefs
- Trade union membership
- Biometric data
- Genetic data
- Sex life or sexual orientation

If we ever do (e.g. a tenant's accessibility need, a hiring process), we identify the lawful basis and the Article 9 condition before we collect.

---

## 5. Member rights — how we handle them

The rights are listed in [`./privacy-policy.md`](./privacy-policy.md) §7. The internal process:

| Right | Internal process |
|---|---|
| Access (SAR) | Acknowledge within 5 working days, deliver within 30 days. Compile the data from the member app, Stripe, our email platform, and the CCTV system. Redact third-party personal data (e.g. other members' names). Free. |
| Rectification | Update on the spot in the member app if minor; ticket and confirm if it affects derived records. |
| Erasure | Possible where the basis is consent (withdrawal triggers erasure), where the data is no longer necessary, or where erasure is otherwise required. Not possible where we have ongoing legal obligation (e.g. ongoing membership, accounting records). |
| Restriction | Apply where requested while we investigate accuracy or basis. |
| Portability | Provide in CSV or JSON. |
| Object | Stop unless we have overriding legitimate grounds (almost never, for our processing). Always honour for direct marketing. |
| No automated decision-making | We don't do this. |

The SAR process detail is in [`./subject-access-request-process.md`](./subject-access-request-process.md) — Tier 2, not yet populated; meanwhile the steps above are the working framework.

---

## 6. Sub-processors

Our main sub-processors:

| Processor | What they process | Where |
|---|---|---|
| Stripe (Stripe Payments UK Ltd) | Payment data | UK / Ireland |
| The member app provider | Identity, contact, usage data | UK / EEA |
| Email service provider (TBC) | Email, marketing consent, campaign data | UK / EEA / US (with IDTA) |
| Google Workspace | Operational email, Drive | EEA / US (with adequacy / IDTA) |
| Hosting provider (TBC) | Website data | UK / EEA |

Before adding a new sub-processor we:
1. Check their security claims (SOC 2, ISO 27001, or equivalent)
2. Confirm their data processing addendum
3. Confirm they're UK GDPR / EU GDPR compliant
4. Add them to the register
5. If they materially change our processing, notify members

---

## 7. International transfers

Where data goes outside the UK/EEA (e.g. some email or analytics platforms based in the US):

- We use the UK International Data Transfer Agreement (IDTA) or the UK Addendum to the EU SCCs
- We rely on adequacy regulations where they exist (e.g. UK–US Data Bridge for participating US organisations)
- We document the transfer in the processing register

We do not transfer data to jurisdictions without an adequate transfer mechanism.

---

## 8. Security

The minimum baseline:

- **Authentication** — strong passwords on every account (1Password); MFA on every system that supports it
- **Authorisation** — least privilege; admin access only to those who need it
- **Transport encryption** — HTTPS on the website and member app; TLS for email
- **At-rest encryption** — for databases (provider-side), for laptops (FileVault/BitLocker), for backups
- **Backups** — daily for live systems, weekly verification, 90-day retention
- **Patching** — software kept current; OS and browser updates within 14 days of release
- **Physical** — laptops not left unattended in public; office secured at night; safe for cash and paper sensitive records
- **Personnel** — staff data-protection training before they touch personal data; signed confidentiality clause in contracts

Security incidents are logged and reviewed quarterly.

---

## 9. Data Protection Impact Assessment (DPIA)

A DPIA is required where processing is "likely to result in a high risk" to people's rights. We complete a DPIA before:

- Deploying CCTV (DPIA exists; held in Drive)
- Adding biometric access (we currently don't)
- Adding member-facing AI features
- Any new processing involving children
- Any processing involving systematic monitoring

The DPIA template is in Drive's `06-legal-and-compliance/dpia-template.md` (Tier 2, not yet populated; ICO template available at <https://ico.org.uk/for-organisations/>).

---

## 10. Breach response

See [`./data-breach-response.md`](./data-breach-response.md) for the full plan.

Headlines:
- Internal awareness clock starts at "becoming aware"
- ICO notification within **72 hours** if the breach is likely to result in risk to people's rights
- Affected member notification "without undue delay" if the breach is likely to result in **high** risk
- We log every breach, even those we don't have to notify

---

## 11. Training

Anyone with access to personal data goes through data-protection training:

- On induction (day 1)
- Annual refresher
- Whenever a material change happens (new system, new processing, new role)

Phase 1 — Connor's training is self-led using ICO resources; recorded in Drive's training register. From the first hire, training is delivered via a recognised provider.

---

## 12. Records and retention

The retention table is in [`./privacy-policy.md`](./privacy-policy.md) §4. Beyond that:

- The Article 30 processing register — kept current; reviewed every 6 months
- DPIAs — kept for the life of the processing they cover + 3 years
- Breach log — kept for at least 3 years
- SAR responses — kept for 1 year after closure

---

## 13. Review

This policy is reviewed:
- Annually
- After any material change to processing
- After any incident
- After any change in UK data protection law

Next scheduled review: 15 May 2027.

---

## 14. Version history

| Version | Date | Author | Change |
|---|---|---|---|
| Draft v1 | 15 May 2026 | Connor + AI | First internal version. Needs review. |

---

*Worksop Workspace · A space to drop your shoulders.*
*30 Carlton Road, Worksop S80 1PH · hello@worksopworkspace.co.uk · worksopworkspace.com*
