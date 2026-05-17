# Record of Processing Activities (ROPA)

**Worksop Workspace** · Operations · Legal & Compliance · *Phase 1 reference*

Status: **Draft v1 — needs Connor review and update on go-live.** Last updated: 16 May 2026.

---

This is the Record of Processing Activities required by Article 30 of UK GDPR. Even though Worksop Workspace is small, the moment we run CCTV and store member personal data we are required to maintain this record. It does not need to be published — but it must be kept up to date and shown to the ICO on request.

This is a live document. Anyone updating a system that touches personal data (new CRM, new form, new supplier) should update the relevant row.

---

## 1. Controller details

| Field | Detail |
|---|---|
| Controller name | Worksop Workspace (trading name) |
| Address | 30 Carlton Road, Worksop, S80 1PH |
| Representative (UK) | Connor Blades, Director |
| Contact | hello@worksopworkspace.co.uk |
| ICO registration | **[reference number — to be populated on registration]** |
| DPO | Not required (small business, no large-scale or special category processing). Connor is the named contact for data matters. |

---

## 2. Processing activities

### Activity 1 — Lead capture (express interest form)

| Field | Detail |
|---|---|
| Purpose | Marketing — respond to enquiries, build pre-launch waitlist |
| Categories of data subjects | Prospective members, prospective customers |
| Categories of personal data | Name, email, phone (optional), interest tags, IP address, submission timestamp |
| Special category data | None |
| Lawful basis | Consent (tick at form) for marketing; legitimate interest for the response itself |
| Source | Direct from the data subject via worksopworkspace.co.uk forms |
| Recipients / processors | Go High Level (CRM, EU-US safeguards), Google Workspace (email), Connor's devices |
| Retention | 24 months from last contact; deleted thereafter |
| International transfers | US (Go High Level) under their SCCs / UK adequacy mechanism |
| Security measures | TLS in transit, GHL access controlled by 2FA, Google Workspace 2FA |

### Activity 2 — Membership and bookings

| Field | Detail |
|---|---|
| Purpose | Deliver the membership / day-pass / meeting-room service |
| Categories of data subjects | Members, day-pass customers, meeting-room bookers |
| Categories of personal data | Name, email, phone, plan, start date, payment status, attendance dates, billing address |
| Special category data | None |
| Lawful basis | Performance of a contract |
| Source | Direct from data subject |
| Recipients / processors | Stripe (recurring billing), SumUp (in-person), Go High Level (CRM), accountant |
| Retention | Active members: duration of membership + 6 years (HMRC requirement). Day-pass and one-off: 6 years from purchase. |
| International transfers | US (Stripe), under UK adequacy / SCCs |
| Security measures | TLS, Stripe PCI-DSS environment, restricted access to records |

### Activity 3 — CCTV

| Field | Detail |
|---|---|
| Purpose | Security of the premises, safety of occupants, incident evidence |
| Categories of data subjects | Anyone entering the premises — members, staff, visitors, contractors |
| Categories of personal data | Video footage with audio (Ring), date/time |
| Special category data | None deliberately, but incidental capture possible |
| Lawful basis | Legitimate interest (LIA on file at [CCTV Policy](cctv-policy.md) §2) |
| Source | Direct recording on premises |
| Recipients / processors | Ring (Amazon) — UK/EU storage, accessed only by Connor |
| Retention | 30 days (Ring Protect Plus rolling), longer only where a specific clip is preserved for an incident |
| International transfers | US (Amazon) — under their UK addendum and IDTA |
| Security measures | Ring account 2FA, restricted access, signage at every recording zone |

### Activity 4 — Wifi access

| Field | Detail |
|---|---|
| Purpose | Provide the wifi service members pay for; operational network management |
| Categories of data subjects | Members, guests using the network |
| Categories of personal data | Device MAC address, connection timestamps, bandwidth volumes |
| Special category data | None |
| Lawful basis | Performance of contract / legitimate interest in network operation |
| Source | Network equipment (router / access points) |
| Recipients / processors | BT Business (broadband provider — connection only, no member data shared); router admin console |
| Retention | 90 days rolling logs |
| Security measures | Router 2FA, client isolation enabled, no DPI |

### Activity 5 — Marketing email list

| Field | Detail |
|---|---|
| Purpose | Send members and waitlist subscribers updates about the space |
| Categories of data subjects | Subscribers who have opted in |
| Categories of personal data | Name, email, open/click activity |
| Special category data | None |
| Lawful basis | Consent (express tick at form, separate from contract performance) |
| Source | Direct from data subject |
| Recipients / processors | Go High Level (sends), email infrastructure (Mailgun or similar via GHL) |
| Retention | While subscribed; immediately on unsubscribe, name and email are kept on a suppression list (to honour the unsubscribe) and deleted otherwise |
| Security measures | TLS, unsubscribe link in every email |

### Activity 6 — Accident book and incident records

| Field | Detail |
|---|---|
| Purpose | Health and safety — record of incidents on the premises |
| Categories of data subjects | Anyone involved in an incident (member, staff, visitor) |
| Categories of personal data | Name, contact, description of incident, injuries (if any), date, time, witnesses |
| Special category data | Health (injury details) — Article 9(2)(b) for occupational health, or (h) for emergency response |
| Lawful basis | Legal obligation (Health and Safety at Work Act and RIDDOR) + Article 9 special-category basis as above |
| Source | Member of staff completing the record at the time |
| Recipients / processors | Connor (records retention), insurer if a claim, HSE if RIDDOR-reportable |
| Retention | 3 years (HSE recommended); longer for RIDDOR-reportable events |
| Security measures | Physical accident book kept in locked drawer at reception; digital records encrypted |

### Activity 7 — Staff records (when staff are hired)

| Field | Detail |
|---|---|
| Purpose | Employment, payroll, statutory record-keeping |
| Categories of data subjects | Employees, contractors |
| Categories of personal data | Name, contact, NI number, bank details, right-to-work documents, hours, pay |
| Special category data | Possibly health (sickness records) — Article 9(2)(b) employment-law basis |
| Lawful basis | Contract + legal obligation (PAYE, RTW, employment law) |
| Source | Direct from employee |
| Recipients / processors | Accountant, HMRC, payroll software |
| Retention | Employment + 6 years for tax records |
| Security measures | Encrypted storage, locked physical files, restricted access (Connor only) |

---

## 3. Review schedule

This record is reviewed:
- Annually as part of the monthly business review cycle (12-monthly checkpoint)
- Immediately whenever a new processing activity is added (new supplier, new form, new tool)
- Immediately after a [data breach](data-breach-response.md), as part of the post-incident write-up

---

## 4. Related documents

- [Data Protection and GDPR](data-protection-and-gdpr.md) — operational policy
- [Privacy Policy](privacy-policy.md) — internal-facing
- [Website Privacy Notice](website-privacy-notice.md) — public-facing
- [CCTV Policy](cctv-policy.md)
- [Data Breach Response](data-breach-response.md)
- [SAR Procedure](sar-procedure-subject-access-request.md)
