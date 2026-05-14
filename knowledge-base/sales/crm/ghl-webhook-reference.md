# GHL Webhook Reference

How form submissions on the website reach Go High Level, what fields they carry, and how to reference them in email merge tags.

## Webhook endpoint

`https://services.leadconnectorhq.com/hooks/3Ow2c51hQvMKxgtUBSvX/webhook-trigger/17baff3f-5e42-4aed-ab29-d12fa0c12f06`

Defined in [`/js/animations.js`](../../js/animations.js) at the `WEBHOOK_URL` constant.

**Listens to**: every form submission on the website where the form ID is `waitlist-form` or `contact-form`.

**Method**: `POST`, `application/x-www-form-urlencoded`, `mode: no-cors`. URL-encoded body avoids a CORS preflight.

## Fields the webhook delivers

Every submission delivers a URL-encoded payload with these fields:

| Field | Source | Example value |
|---|---|---|
| `first_name` | Form input | `Sarah` |
| `last_name` | Form input | `Jones` |
| `email` | Form input | `sarah@example.com` |
| `phone` | Form input | `07700 000000` |
| `type` | Dropdown raw value | `meeting-room`, `something-else`, etc. |
| `other` | Comment box (only present when "Something else" picked) | Free-text suggestion |
| `tags` | Auto-built, comma-separated | `Website Waitlist,Meeting Room` |
| `source` | Auto | `waitlist` or `contact` |
| `page` | Auto — URL path they submitted from | `/membership` |
| `referrer` | Auto — page they arrived from | `https://google.com/...` |
| `submitted_at` | Auto — ISO timestamp | `2026-05-12T16:42:00.000Z` |

## Source tags (auto-applied per form)

Every submission gets a SOURCE tag based on which form they used:

| Form ID | SOURCE_TAG applied |
|---|---|
| `waitlist-form` | `Website Waitlist` |
| `contact-form` | `Website Contact` |

This is for segmentation only — don't use it as a workflow trigger by itself. Use it combined with an INTEREST tag.

## Interest tags (driven by dropdown selection)

The waitlist form dropdown drives an INTEREST tag in addition to the SOURCE tag:

| Dropdown value | INTEREST_TAG applied |
|---|---|
| `day-pass` | `Day Pass` |
| `weekly-pass` | `Weekly Pass` |
| `private-office` | `Private Office` |
| `meeting-room` | `Meeting Room` |
| `something-else` | `Something Else` |
| `not-sure` | `Undecided` |

These are defined in `INTEREST_TAGS` in [`/js/animations.js`](../../js/animations.js). **Anytime a new option is added to the dropdown, the map must be updated, and the `?v=N` cache buster on animations.js must be bumped site-wide** — otherwise browsers serve the cached file without the new tag.

## Merge tags in email templates

The exact merge tag syntax depends on how the GHL workflow is wired. Three conventions, in order of preference:

1. **`{{contact.first_name}}` / `{{contact.<custom_field>}}`** — if you map inbound fields to contact fields in the workflow's first action, then reference the contact properties. **This is the cleanest approach** because the data ends up stored on the contact record permanently, not just in the email body.

2. **`{{inboundWebhook.<field_name>}}`** — direct reference to the webhook payload in modern GHL inbound-webhook triggers.

3. **`{{trigger.<field_name>}}`** — older GHL convention, still works in some accounts.

### Recommended mapping for the `other` (suggestion) field

In the GHL workflow that triggers on `Something Else`:

1. Create a custom contact field called **Suggestion** (text).
2. Add a workflow action *before* the email: "Add/Update Contact Field" → map inbound `other` → `Suggestion`.
3. In the email body, reference it as `{{contact.suggestion}}`.

Result: the suggestion is stored on the contact record (so you can see it on the contact card any time) AND appears in the email blockquote.

## Testing checklist when changing forms or tags

When adding a new dropdown option, comment field, or tag:

1. Add the option to every page's waitlist form (currently 30 pages — use a sed/awk script, see [`STRUCTURE.md`](../../STRUCTURE.md) cheat sheet).
2. Add the new entry to `INTEREST_TAGS` in `/js/animations.js`.
3. **Bump the cache buster** on animations.js across every HTML file (`?v=N` → `?v=N+1`).
4. Commit + push.
5. Hard-refresh a browser and submit a test record with the new option.
6. In GHL, confirm both the SOURCE tag and the new INTEREST tag landed on the test contact.
7. If the option drives a workflow, confirm the email fires with the right merge tags populated.
