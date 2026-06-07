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

## Adding a department

The source profiles live in `data/new-provided/<DEPT>/` — usually a
"Faculty directory with Photo-brief profiles" folder of per-faculty `.pdf`,
`.doc` and `.docx` files. Steps:

1. **Identify** which file belongs to which faculty member. Filenames are often
   initials or site codes (`TCS016.pdf`, `TMCA003-VBH.pdf`); when unclear, read
   the first lines: `pdftotext file.pdf -` or `textutil -convert txt -stdout file.doc`.

2. **Convert** any `.doc`/`.docx` to PDF with LibreOffice (one-time install:
   `brew install --cask libreoffice`):

   ```bash
   /Applications/LibreOffice.app/Contents/MacOS/soffice \
     --headless --convert-to pdf --outdir <tmp> "<file.doc>"
   ```

   PDFs are used as-is.

3. **Stage** each file as `<root>/departments/<slug>/faculty/cv/<name-slug>.pdf`,
   using the **same `name-slug` as the portrait** (e.g. portrait
   `departments/cse/faculty/veerappa-b-pagi.webp` → cv
   `departments/cse/faculty/cv/veerappa-b-pagi.pdf`).

4. **Upload** (never `--prune` — it deletes bucket keys not in the staging dir):

   ```bash
   cd apps/web
   node scripts/upload-assets.mjs <root>          # PDFs get application/pdf
   node scripts/build-content-schema.mjs          # refresh asset-keys.json
   ```

5. **Wire** the `cv` (and `photo`) keys into `content/faculty.json` for that
   department, then `pnpm build` to type-check.

Faculty without a profile PDF simply omit `cv` — the card stays static (no modal).

CSE is the worked reference (20 faculty, 17 with CV PDFs).

## Portraits

Portraits follow the standard image pipeline (`convert-images.mjs` →
`upload-assets.mjs`) and live at `departments/<slug>/faculty/<name-slug>.webp`.
If a profile doc embeds the portrait, extract it with `pdfimages` /
`data/scraped/scripts/extract_doc_media.py`, then convert + upload as usual.
