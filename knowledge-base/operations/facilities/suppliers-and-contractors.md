# Suppliers and Contractors

**Worksop Workspace** · Operations · Facilities · *Phase 1 reference*

Status: Draft v1 — needs Connor review and population in Drive · Last updated: 15 May 2026

---

## Important — what this doc is and isn't

This is the **structure and the policy**. The live, populated supplier register (with contact details, rates, account numbers, contract dates) lives in Drive's `07-facilities/suppliers-and-contractors.md` because that information is sensitive.

This document tells you:
- What categories of supplier we use
- What we check before engaging anyone
- What we record about each
- How we keep the relationship healthy

---

## 1. Categories we have suppliers for

| Category | What they do | Frequency of contact |
|---|---|---|
| Building services | Electrical, plumbing, HVAC, locksmith, general repairs | Reactive + annual servicing |
| Cleaning | Regular cleaning of the space | Daily / weekly contracted |
| Window cleaning | External windows | Monthly / quarterly |
| Waste & recycling | General waste, recycling, sanitary | Weekly collection |
| Pest control | Ad-hoc / annual inspection | Annual |
| Fire safety | Alarm service, extinguisher service, FRA | Annual (multiple contractors) |
| PAT testing | Annual electrical safety on appliances | Annual |
| Coffee supplier | Beans, milk, equipment service | Weekly / monthly delivery |
| Refreshment supplier | Tea, water, snacks, paper goods | Weekly / monthly |
| Cleaning chemicals | Detergent, sprays, bin liners | Monthly / on demand |
| Stationery | Pens, paper, sticky notes | Monthly / on demand |
| Print | Member-pack printing, leaflets | Ad-hoc |
| IT — ISP | Internet connection | Monthly billing |
| IT — Member app | Membership management platform | Monthly billing |
| IT — Stripe | Payment processing | Per-transaction |
| IT — Email / Google Workspace | Email, Drive, Calendar | Monthly billing |
| Insurance | Public liability, contents, employer's (when needed) | Annual renewal |
| Landlord | Lease, building responsibilities | Quarterly / as needed |
| Utility — electric | Power | Monthly |
| Utility — water | Water and sewerage | Quarterly |
| Utility — gas | If applicable | Monthly |
| Telecoms (other) | Phone line / mobile | Monthly |
| Accountant | Year-end, payroll, VAT | Monthly / quarterly |
| Solicitor | Legal advice on demand | Ad-hoc |
| H&S adviser | Once retained — risk assessments, policy review | Annual |
| HR adviser | Once retained — employment matters | Ad-hoc |
| Data protection adviser | DPIAs, policy review, breach support | Ad-hoc |
| Web hosting | Website hosting | Annual / monthly |
| Marketing | Paid ads management, design, photography | Ad-hoc |

This list will grow.

---

## 2. What we record per supplier

For each supplier in the Drive register:

```
- Supplier ID            : SUP-NNN
- Name                   :
- Service category       :
- Primary contact name   :
- Primary contact email  :
- Primary phone          :
- Out-of-hours contact   : (where relevant)
- Account number         :
- Contract reference     :
- Contract start date    :
- Contract renewal date  :
- Notice period          :
- Standard rate          :
- Out-of-hours rate      :
- Payment terms          :
- Their insurance limit  : (Public Liability £m)
- Insurance certificate  : (filename in Drive)
- Qualifications / accred: (e.g. BAFE, Gas Safe, NICEIC)
- Last review date       :
- Performance rating     : 1–5
- Notes                  :
```

---

## 3. Engaging a new supplier

### Due diligence — minimum

Before engagement, we check:

- **Insurance** — minimum Public Liability £2m. Get a copy of their certificate. Diary the renewal date.
- **Trade qualifications** — appropriate to the work (Gas Safe, NICEIC, BAFE, City & Guilds, etc.).
- **References** — at least one other business they work for, where reasonable.
- **Company status** — Companies House check; we don't engage struck-off or insolvent suppliers.
- **VAT registration** — if they're charging VAT, they're VAT-registered.
- **Method statement and risk assessment** — for any contractor doing on-site work that isn't trivial.

### Quoting

We get **at least two quotes** for anything over £500. For one-off larger jobs (over £2,000), we get three.

### Agreement

We use a short written agreement that covers:

- Scope of work
- Price (and what's not included)
- Timing
- Their insurance
- Liability for damage
- Notice and termination
- Confidentiality (where relevant)

For most small ongoing services, an email exchange is fine. For larger or longer engagements, a written services agreement.

---

## 4. Ongoing management

### Reviews

| Frequency | What we review |
|---|---|
| Per visit / job | Quality, timeliness, cleanliness, professionalism. Add a one-line note to the supplier's record. |
| Quarterly | Spend by supplier. Are we paying for what we're getting? Anything to renegotiate? |
| Annually | Full review. Renewal, re-quote, or switch decision. |

### Performance issues

If a supplier underperforms:

1. Speak to the primary contact — describe specifically what's wrong
2. Give a reasonable chance to fix it
3. If it persists, escalate or terminate per the contract notice

We don't tolerate:
- Repeated no-shows
- Charging for work that wasn't done
- Sub-contracting without telling us
- Working without their insurance in date
- Speaking inappropriately to staff or members on our site

---

## 5. Contractors on site

Any contractor working on site (not just delivering) follows these rules:

- Signs in at reception
- Provides a method statement and risk assessment for non-trivial work
- Carries their public liability insurance certificate (or we hold a copy on file)
- Wears appropriate PPE
- Doesn't block escape routes
- Doesn't smoke on the premises
- Cleans up before leaving
- Reports any near-miss or incident immediately

See [`../health-and-safety/risk-assessment-framework.md`](../health-and-safety/risk-assessment-framework.md) §6 for the competence check.

---

## 6. Payment

- Payment terms are agreed in advance — typically 30 days net from invoice for established suppliers; payment on completion for ad-hoc smaller jobs.
- We don't pay in cash.
- We process supplier payments via the accountant / bookkeeping system. The supplier payment process lives in Drive's `04-finance/supplier-payment-process.md` once populated.

---

## 7. Single points of failure

Where a service is critical and there's a single supplier, we hold a **backup option** on file:

| Service | Primary | Backup |
|---|---|---|
| Locksmith | TBC | TBC |
| Electrician | TBC | TBC |
| Wi-Fi / ISP | TBC | 4G failover (in-house) + alternate ISP option |
| Coffee machine service | TBC | Manufacturer's emergency line |
| Cleaning | TBC | Connor + occasional cover |

This list lives in Drive's `07-facilities/critical-supplier-backups.md` once populated.

---

## 8. Confidentiality

Suppliers may see member data incidentally (e.g. a cleaner sees the space; a maintenance contractor may see a member's office). We include a brief confidentiality clause in our contractor agreements — particularly relevant for cleaning and any IT contractor.

If a contractor needs ongoing access to personal data, they're a **processor** under UK GDPR and we have a Data Processing Agreement with them. See [`../legal-and-compliance/data-protection-and-gdpr.md`](../legal-and-compliance/data-protection-and-gdpr.md) §6.

---

## 9. Version history

| Version | Date | Author | Change |
|---|---|---|---|
| Draft v1 | 15 May 2026 | Connor + AI | Template — populate in Drive |

---

*Worksop Workspace · A space to drop your shoulders.*
*30 Carlton Road, Worksop S80 1PH · hello@worksopworkspace.co.uk · worksopworkspace.com*
