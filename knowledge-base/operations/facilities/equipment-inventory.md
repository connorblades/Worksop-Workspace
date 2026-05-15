# Equipment Inventory

**Worksop Workspace** · Operations · Facilities · *Phase 1 reference*

Status: Draft v1 — needs Connor review and population · Last updated: 15 May 2026

---

## Important — what this doc is and isn't

This is the **template and the index** for the equipment register. Actual asset data (serial numbers, supplier names, warranty references, purchase prices) lives in Drive's `07-facilities/equipment-inventory.md` because some of it is sensitive. The structure here is the source-of-truth for how that register is organised; populate the Drive version.

Every piece of equipment that:

- Cost more than £100
- Has a serial number
- Has a warranty or service contract
- Is on a maintenance / safety inspection schedule

…goes on the register.

---

## 1. What we track per item

For each item:

```
- ID                : EQ-NNN (sequential, never reused)
- Category          : Furniture / Tech / Kitchen / H&S / AV / Other
- Description       : Brand, model, key spec
- Serial number     : Manufacturer's serial
- Location          : Where in the space it lives
- Acquired          : Date and supplier (supplier in Drive)
- Price             : Net of VAT, recorded for asset register
- Warranty until    : Date
- Service interval  : N/A | Annual | 6-monthly | etc.
- Last service date : Date
- Next service due  : Date
- Notes             : Anything else — known issues, depreciation pattern
```

The register is held as a markdown table in Drive (sortable + searchable). See template below.

---

## 2. Categories — what counts

### Furniture

- Hot desks
- Office desks (private offices)
- Office chairs (ergonomic — high-traffic items)
- Sit-stand desks (if any)
- Meeting room table and chairs
- Reception desk
- Lockers (individually — lockers are a maintenance item)
- Sofas / lounge seating
- Bookshelves
- Coat stands

### Tech

- Wi-Fi routers (primary + backup)
- Modem / ONT
- Network switches
- Wired access points
- Member-app admin tablets (if any)
- Reception laptop / iPad
- Printer
- Backup 4G router / MiFi
- CCTV recorder
- CCTV cameras (individually)

### Kitchen

- Coffee machine (the prime asset)
- Coffee grinder
- Kettle
- Fridge
- Microwave (if provided)
- Dishwasher (if provided)
- Water filter system

### Health & Safety

- Fire alarm panel
- Smoke / heat detectors (count, not individually)
- Manual call points (count)
- Emergency lights (count)
- Fire extinguishers (individually)
- Fire blanket
- First aid kit
- Defibrillator (Phase 2+ if installed)

### AV

- Meeting room screen / display
- HDMI cables and adapters
- Webcam / camera (if provided)
- Microphones (if provided)
- Podcast studio equipment (Phase 3)

### Other

- Plants (just listed, not service-tracked)
- A-frame / external signage
- Cleaning equipment (vacuum, mop bucket, etc.)
- Locker keypads / replacement parts stock

---

## 3. Inventory cycle

| Frequency | What |
|---|---|
| On purchase | Add to register the same day. Photograph the item. File the receipt and warranty. |
| Daily | Visual presence check as part of [`../sops/sop-001-opening-the-space.md`](../sops/sop-001-opening-the-space.md). |
| Weekly | Detailed look at coffee machine, Wi-Fi, lockers, kitchen as part of [`../checklists/03-weekly-deep-clean.md`](../checklists/03-weekly-deep-clean.md). |
| Quarterly | Full equipment walk-through. Match register to physical reality. |
| Annually | Full audit. Cross-check against insurance schedule. Reconcile depreciation in the accounts. |
| On disposal | Mark as disposed (date, reason, disposal route). Remove from active count. Don't delete the record. |

---

## 4. Equipment register template

The actual register in Drive uses this structure (markdown table):

```
| ID    | Category | Description                  | Serial   | Location          | Acquired       | Net price | Warranty until | Service     | Last service | Next due | Notes |
|-------|----------|------------------------------|----------|-------------------|----------------|-----------|----------------|-------------|--------------|----------|-------|
| EQ-001 | Tech     | Ubiquiti UniFi USG router    | 1234ABC  | Comms cupboard    | 2026-05-01     | £150.00   | 2027-05-01     | Annual chk  | 2026-05-01   | 2027-05-01 | Primary router |
| EQ-002 | Kitchen  | Sanremo Verona TCS coffee m. | 5678DEF  | Kitchen counter   | 2026-05-10     | £4,200.00 | 2028-05-10     | Annual      | 2026-05-10   | 2027-05-10 | The prime kitchen asset; descale weekly |
| EQ-003 | H&S      | 6kg foam extinguisher        | EXT-001  | Reception         | 2026-05-15     | £45.00    | n/a            | Annual      | 2026-05-15   | 2027-05-15 | BAFE-registered service contractor |
| EQ-004 | Furniture| Humanscale Freedom chair x10 | mixed    | Hot desk area     | 2026-05-12     | £4,800.00 | 5 years        | n/a         | -            | -        | Bulk order — see supplier file |
```

Populate the live register at Drive's `07-facilities/equipment-inventory.md`.

---

## 5. PAT testing

Portable Appliance Testing (PAT) covers electrical items used by us or on our premises. Phase 1:

- All staff-issued and Worksop-owned electrical equipment goes through PAT at induction (for new items) or at annual cycle
- Member-owned laptops and personal devices are not PAT-tested by us; members are responsible for the safety of their own equipment, set out in [`../legal-and-compliance/terms-of-business.md`](../legal-and-compliance/terms-of-business.md) §6 and §13
- PAT test certificates are filed in Drive's `06-legal-and-compliance/pat-certificates/`
- The PAT contractor is in [`./suppliers-and-contractors.md`](./suppliers-and-contractors.md)

---

## 6. Insurance

The equipment register feeds the insurance schedule. When an item over £500 is added, removed, or significantly changed:

- Tell the insurer (broker contact in Drive)
- Update the sums-insured if needed
- Update the schedule in Drive's `06-legal-and-compliance/insurance-summary.md`

---

## 7. Disposal

Disposed equipment is:

- WEEE-routed if electronic (we don't bin laptops or routers)
- Cleared of data first (see [`../legal-and-compliance/data-protection-and-gdpr.md`](../legal-and-compliance/data-protection-and-gdpr.md) §8)
- Photographed at disposal
- Logged with disposal route (sold, recycled, gifted, scrapped)

---

## 8. Version history

| Version | Date | Author | Change |
|---|---|---|---|
| Draft v1 | 15 May 2026 | Connor + AI | Template only — populate in Drive |

---

*Worksop Workspace · A space to drop your shoulders.*
*30 Carlton Road, Worksop S80 1PH · hello@worksopworkspace.co.uk · worksopworkspace.com*
