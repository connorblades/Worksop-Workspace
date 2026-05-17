# Asset Register

**Worksop Workspace** · Operations · Facilities · *Phase 1 reference*

Status: **Draft v1 — needs Connor review and population.** Last updated: 16 May 2026.

---

The asset register is the master list of every physical thing Worksop Workspace owns that has material value — furniture, equipment, technology, fittings. It's different from the [Equipment Inventory](equipment-inventory.md):

- The **Equipment Inventory** is a working operational list — what's in the space, what condition is it in, is anything missing.
- The **Asset Register** is a **financial / insurance / accounting** record — what did it cost, when was it bought, what's its replacement value, what's its current book value, where's the receipt.

In a small business these can blur. Worksop Workspace keeps them separate because they're used for different purposes by different people (operations vs accountant vs insurer).

---

## 1. Why we keep it

1. **Insurance evidence.** If something is damaged or stolen, the register is the contemporaneous record that the item existed, was owned by us, and what it was worth. Without it, claims are harder.
2. **Depreciation and tax.** The accountant uses the register to calculate writing-down allowances and capital allowances.
3. **End-of-life planning.** When something nears the end of its useful life, the register tells us when it was bought and when we should budget to replace it.
4. **Audit.** If we ever sell the business, are bought, or have an outside investor look in, the register answers "what do you actually own?".

---

## 2. Scope

In the register:

- Furniture (desks, chairs, sofas, tables, dividers, drawer units, pin boards, whiteboards)
- Kitchen equipment (coffee machine, fridge, dishwasher, microwave, kettle)
- Tech (router, access points, switches, monitors, TVs, projectors, cameras, PCs)
- Significant fittings we own (signage, bespoke storage, custom shelving)

Not in the register:

- Consumables (coffee beans, milk, paper, pens, cleaning supplies) — these are P&L expenses, tracked elsewhere
- Items below the **£100 individual value** threshold, unless they are part of a set (e.g. a single £40 desk lamp isn't recorded; 10 of them as a set is)
- Member or staff personal property
- Items the landlord owns and we use (assessed separately as part of the lease)

---

## 3. Register

Each item gets a row. Where multiple identical items exist (24 standard chairs), one row records the set with a `qty` field.

| Asset ID | Description | Brand / model | Qty | Date acquired | Purchase price (excl. VAT) | Current replacement value | Useful life (years) | Location | Serial / batch | Notes / receipt ref |
|---|---|---|---|---|---|---|---|---|---|---|
| WW-001 | 8-seater meeting table | Senator [model] | 1 | | | £1,500–£3,000 | 15 | Main meeting room | | |
| WW-002 | Premium office chair | [brand/model] | 10 | | | £250–£450 each | 10 | Hot-desk + meeting room | | |
| WW-003 | Standard office chair | [brand/model] | 24 | | | £80–£150 each | 7 | Hot-desk floor | | |
| WW-004 | Desk 100×60 cm | Senator [model] | 26 | | | £150–£280 each | 15 | Hot-desk floor | | |
| WW-005 | Curved desk 120×180 cm | Senator [model] | 6 | | | £280–£500 each | 15 | Hot-desk floor / private office | | |
| WW-006 | Desk divider 120 cm | [brand] | 6 | | | £40–£80 each | 10 | Hot-desk floor | | |
| WW-007 | Desk divider 100 cm | [brand] | 12 | | | £30–£60 each | 10 | Hot-desk floor | | |
| WW-008 | Pin board | [brand] | 5 | | | £30–£80 each | 10 | Various | | |
| WW-009 | Whiteboard | [brand] | 5 | | | £40–£120 each | 10 | Various | | |
| WW-010 | Drawer pedestal 330×600 | [brand] | 24 | | | £80–£150 each | 10 | Under desks | | |
| WW-011 | Chesterfield-style sofa | [brand] | 2 | | | £700–£1,300 each | 15 | Breakout area | | |
| WW-012 | Marble-top coffee table | [brand] | 2 | | | £120–£250 each | 10 | Breakout area | | |
| WW-013 | Bucket chair | [brand] | 2 | | | £150–£300 each | 10 | Breakout area | | |
| WW-014 | Pub-style table | [brand] | 5 | | | £100–£200 each | 10 | Standing-height bar / events | | |
| WW-015 | Desk/table 2.2 m × 60 cm | [brand] | 1 | | | £150–£250 | 15 | TBC | | |
| WW-016 | Circular table | [brand] | 1 | | | £120–£300 | 10 | Breakout area | | |
| WW-017 | Coffee machine | TBC | 1 | | | £500–£1,500 | 7 | Kitchen | | |
| WW-018 | Fridge | TBC | 1 | | | £200–£500 | 10 | Kitchen | | |
| WW-019 | Microwave | TBC | 1 | | | £80–£150 | 7 | Kitchen | | |
| WW-020 | Kettle | TBC | 1 | | | £30–£60 | 5 | Kitchen | | |
| WW-021 | Ring camera kit | Ring | TBC | | | £400–£600 (set) | 7 | Building-wide | | |
| WW-022 | BT Business router | TBC | 1 | | | £100–£300 | 5 | Networking cabinet | | |
| WW-023 | Wifi access point(s) | TBC | TBC | | | | 5 | Building-wide | | |
| WW-024 | Meeting room monitor / TV | TBC | TBC | | | | 7 | Meeting room | | |
| WW-025 | Signage (external + internal) | Various | TBC | | | | 10 | Building-wide | | |

**Populate the empty cells before insurance is bound.** Photo each item before populating — photos go in `Worksop Workspace HQ > 02-operations > asset-register-photos`.

---

## 4. Update cycle

- **On purchase:** new row added the same day. Receipt scanned into Drive. Accountant CC'd on any item over £500.
- **On disposal / write-off:** row not deleted; "Date acquired" remains, a "Date disposed" column is added and filled. Reason recorded (sold, scrapped, donated).
- **Quarterly:** Connor walks the space with the register and verifies. Missing items investigated.
- **Annually:** entire register reviewed; replacement values updated for inflation; insurance sum insured re-declared.

---

## 5. Insurance link

The total **current replacement value** column drives the **contents sum insured** on the business insurance policy. The current estimate (mid-range): £25,000 — £35,000.

Get a written replacement valuation from a Senator dealer before binding insurance, especially for WW-001 through WW-007 — Senator-tier furniture varies materially by spec.

---

## 6. Related documents

- [Equipment Inventory](equipment-inventory.md)
- [PAT Testing Log](pat-testing-log.md)
- [Suppliers and Contractors](suppliers-and-contractors.md)
- [Damage and Breakage Policy](../legal-and-compliance/damage-and-breakage-policy.md)
- [Operating Manual](../operating-manual.md)
