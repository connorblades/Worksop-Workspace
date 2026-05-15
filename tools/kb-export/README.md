# KB export — Worksop Workspace HQ

Point-in-time local backup of the `Worksop Workspace HQ` Google Drive
knowledge base. This is the **third copy** in your data-durability stack:

1. **Google Drive** — primary, with built-in version history
2. **Drive Desktop sync** (if you enable it) — automatic local mirror
3. **This script** — explicit point-in-time exports, kept by date

If Drive itself is the failure mode (account compromise, accidental
shared-drive wipe), copies 1 and 2 disappear together. This script is
your offline fallback.

## When to run it

- **Monthly** as routine.
- **Before any structural change** to the knowledge base (folder
  reorganisation, mass rename, deletion of a top-level folder).
- **After** a major content milestone you'd be sad to lose (Phase 1
  launch sign-off, final approved version of a contract, etc.).

## What it does

- Walks the entire `Worksop Workspace HQ` folder tree recursively.
- Downloads every native file (PDF, MD, image, etc.) as-is.
- Converts Google Docs / Sheets / Slides / Drawings to their Office
  equivalents (.docx / .xlsx / .pptx / .png) **and** a side-by-side
  `.pdf` of each — so even years from now, with no Office or Drive
  account, you can still open them.
- Skips Google Forms (Drive has no useful export format for them) and
  shortcuts.
- Writes a manifest at the root of each export listing what was
  downloaded, exported, skipped, or failed.
- Outputs to `/kb-exports/YYYY-MM-DD-worksop-workspace-hq/`.
- Optionally zips the directory at the end (pass `--zip`).

The `/kb-exports/` directory is gitignored — these archives are too
big and too sensitive to live in git.

## Setup (one-off, ~5 minutes)

1. **Create an OAuth client.** Go to
   <https://console.cloud.google.com/apis/credentials>, pick the same
   project you use for any other Worksop Workspace automation (or
   create one), and create an **OAuth client ID**. Type: **Desktop
   app**. Download the JSON.

2. **Save the credentials.** Drop the JSON into this directory as
   `credentials.json`. The file is gitignored.

3. **Install dependencies.**

   ```sh
   cd tools/kb-export
   npm install
   ```

## Run

```sh
npm run export             # downloads to /kb-exports/<date>-worksop-workspace-hq/
npm run export -- --zip    # same, plus a .zip beside the directory
```

The first run opens a browser to sign in to the Drive account that
owns `Worksop Workspace HQ` (`hello@worksopworkspace.com`). A
`token.json` is cached so subsequent runs are silent.

The script uses the `drive.readonly` scope — it can only read, never
modify, your Drive.

## Output layout

```
kb-exports/
└── 2026-05-15-worksop-workspace-hq/
    ├── _export-manifest.txt
    ├── 00-essentials/
    │   ├── points-of-truth.docx
    │   └── points-of-truth.pdf
    ├── 02-operations/
    │   ├── _pdfs/
    │   │   ├── operating-manual.pdf
    │   │   └── …
    │   └── …
    └── …
```

Folder names match Drive exactly. Spaces in names are preserved.

## Recovering from an export

This is just a plain folder tree — no proprietary format. Open files
directly in their respective applications, or drag the entire folder
into a new Drive account to repopulate.
