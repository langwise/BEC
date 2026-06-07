# Faculty profiles — photos + CV PDFs

The faculty section is intentionally minimal. We do **not** transcribe per-faculty
details (publications, education, courses, etc.) anymore. Each faculty member is
just:

- **name** + **designation**
- a **portrait** (R2 webp)
- a link to their **full profile / CV PDF** (R2)

`FacultyCard` (`apps/web/src/components/programs/faculty/faculty-card.tsx`) is a
horizontal row — circular portrait on the left, name + designation on the right,
and a hover chevron — that opens the profile/CV PDF in a modal `<iframe>` viewer.
Members without a `cv` render as a static (non-clickable) row.

## Data files

- `apps/web/content/faculty.json` — keyed by department URL slug. Each entry is
  `{ name, designation, photo?, cv? }`, where `photo` and `cv` are **R2 asset
  keys** (autocompleted via `faculty.schema.json` → `_schema/asset-keys.json`).
- `apps/web/src/content/faculty.ts` — `getDepartmentFaculty(slug)` resolves the
  `photo`/`cv` keys to public URLs and returns `FacultyMember[]`.
- `apps/web/src/types/faculty.ts` — the `FacultyMember` shape.

## Adding a department — `scripts/build-faculty.mjs`

The provided "Faculty Profile" docs follow a consistent BEC template (a `Name` /
`Designation` block, then `Contact Details`, with one embedded portrait). One
script does the whole department: it parses name + designation, converts each doc
to PDF (the CV), and pulls the embedded portrait out of that PDF → WebP. No
manual photo↔name mapping needed — the photo lives inside each person's own doc.

**One-time:** `brew install --cask libreoffice` (doc→PDF). `sips`, `cwebp`,
`pdfimages`, `pdftotext`, `textutil` are already on macOS / via poppler+webp.

```bash
cd apps/web

# Dry run — parse + stage to a tmp dir, print entries, NO write/upload:
node scripts/build-faculty.mjs <dept-slug> <assetSlug> "<source-dir>" --stage /tmp/bec-fac

# Real run — also write content/faculty.json[<dept-slug>]:
node scripts/build-faculty.mjs <dept-slug> <assetSlug> "<source-dir>" --write --stage /tmp/bec-fac
```

- `<dept-slug>` = URL slug from `content/departments.json`; `<assetSlug>` = the R2
  folder (e.g. `cse`, `civil`, `ece`).
- `<source-dir>` = the folder of per-faculty `.doc/.docx/.pdf` profiles (point it
  at the dept's "Faculty Profile" folder; dept profiles / templates / syllabi are
  auto-skipped — a file only counts if it has `Contact Details` + a `Designation`).
- The console prints `ok <slug> [designation] cv:y/N photo:y/N` per person and a
  list of skipped files with the reason — **eyeball the skips** for any real
  faculty missed (rare: a typo'd designation or an unusual template).

Then upload everything staged and refresh the schema (run once after all depts):

```bash
node scripts/upload-assets.mjs /tmp/bec-fac   # never --prune; PDFs get application/pdf
node scripts/build-content-schema.mjs         # refresh asset-keys.json
pnpm build                                    # type-check
```

Spot-check a few portraits before committing (some source photos are stored
rotated — same EXIF gotcha as elsewhere; flag those for manual rotation).
Faculty without an extractable portrait keep their `cv` and fall back to initials.

**Status:** CSE was the hand-built reference (20 faculty); AIML, Automobile, ECS,
EEE, Maths, Physics, Civil, and ECE were built with this script. MBA / MCA /
Chemistry have no per-faculty profile docs (department-level data only).
