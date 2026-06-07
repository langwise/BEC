# Build Progress Tracker

Living status of the content-population + revamp sprint, page by page. Updated 2026-06-07.
Legend: ✅ done · 🟡 partial / needs data · ⛔ not started.

---

## Administration tab — 🟡 mostly done

The whole **Administration** menu (`data/navigation.ts`) and its routes have been revamped onto the shared UI system. Detail below.

### Done ✅
- **Governance Overview** (`/administration/governance`) — fully rebuilt on the JSON content model (`content/governance.json` + `governance.schema.json` + `src/content/governance.ts`). Sections: Leadership (Principal) · Deans · Key Officers · B.V.V. Sangha · Board of Governors · Org chart · HOD directory · Documents.
- **Principal** (`/administration/principal`) — real R2 portrait (Dr. B. R. Hiremath) + revamped via `LeadershipMessage`.
- **Director** (`/administration/director`) — real R2 portrait (Dr. R. N. Herkal, `governance/director/cine9670.webp`) + `LeadershipMessage`.
- **Chairperson** (`/administration/chairperson`) — layout revamped via `LeadershipMessage` (image/name still pending — see below).
- **Board of Governors** (`#bog`) — real 14-member data, `FilterChips` category filter, photos for the 2 members that have them (Dr. V. B. Pagi, Dr. B. R. Hiremath).
- **Deans / Key Officers** (`#deans`) — Academic & Placement deans confirmed; Controller of Examinations, Librarian, Admission Section officers added with photos.
- **HOD directory** (`#hods`) — 15 of 17 departments have head + R2 portrait.
- **Shared UI system** built + documented in `.cursor/rules/DESIGN.mdc`: `PersonCard`/`PersonGrid`, `SectionHeading`, `FilterChips`, `LeadershipMessage` (in `src/components/common/`). All admin people-listings use them.
- Removed external `becbgk.edu` images from Principal & Director (now on R2).

### Missing / needs data 🟡
- **Chairperson photo + name** — page still uses an external `becbgk.edu` image and the name *Dr. Veeranna Charantimath* (unconfirmed). Marked with a `TODO` in the file. Need the current chairman's identity + an R2 photo.
- **The Senate** (`/administration/governing/senate`) — still 100% placeholder (7 placeholder roles, no names/photos). Needs the official Senate notification/PDF.
- **Dean R&D / Dean QA** — name↔role mapping is a best-guess (Bharati Meti → R&D, Mahabaleshwar S.K. → QA); both flagged "To confirm" in-page.
- **B.V.V. Sangha members** — exact names/designations unconfirmed (roles read "B.V.V. Sangha Office Bearer"; "Shri Omkar" is a partial name). Flagged "To confirm".
- **HODs without a portrait** — Physics & Automobile Engineering (no photo in the delivered set) render as placeholders.
- **BoG photos** — 12 of 14 members have no photo (industry/nominee/IIT invitees/govt/student reps are not in the asset set).

### To improve later 🔧
- **Rotated portraits** — several HOD/Dean photos are stored sideways (EXIF orientation not applied in conversion). You said you'll flag which to rotate manually.
- **Org chart** is text-only cards — could be a nicer visual diagram.
- **Governance "Documents & links"** still points to `becbgk.edu` pages/PDFs — backlink the PDFs to R2 per the asset pipeline.
- **Inline text vs JSON** — Principal/Chairman/Director/Senate keep their copy inline (not JSON). JSON-ify if department/coordinator editing is wanted.
- **Admin `[[...slug]]` catch-all** still imports the legacy `data/governance/*` files — consolidate onto `content/governance` to remove the duplicate data source.
- **RTI** (`/administration/disclosures/rti`) — verify disclosure PDF links resolve; host/backlink to R2 if needed.

---

## Home — 🟡 partial
Hero, About, Campus-life already on the JSON model (`content/home.json`) with R2 images. Remaining home sections (placements stats, ranking, news/events) not yet wired.

## Programs / Departments — 🟡 images done

### Done ✅
- **Per-department photo galleries** — every department detail page (`/programs/departments/<type>/<slug>`) now shows its real R2 photos under the **Infrastructure & Labs** tab. Driven by `content/departments.json` (slug → name + `assetSlug`) + `src/content/departments.ts`, which pulls a whole folder via `assetsUnder("departments/<slug>/")` — add/remove a photo on R2 and it appears automatically.
- **Correct department names** — detail page titles now use the real full name (was "Department of computer-science-and-engg").
- 16 of 21 departments have galleries (3–23 photos each). The other 5 (Automobile + 4 PG specialisations: Environmental, Geo-Technical, Structural, Machine Design) have no photos in the delivered set — names shown, no gallery.
- New shared **`PhotoGallery`** component (`components/common/`) — reusable responsive grid; will be reused for the community gallery.
- Added the gallery renderer to `DepartmentLayout` (the `gallery` section type was previously defined but never rendered).

### Rich department content model ✅ (new)
- **Schema grown** — `content/departments.schema.json` now holds full per-department content: `overview`, `vision`, `mission[]`, `programsOffered[]`, `peos[]`, `psos[]`, `highlights[]`, `researchAreas[]`, `labs[]`, `activities[]`, `associations[]`, `contact`. Everything except `name` is optional, so the 20 not-yet-filled departments still render (overview placeholder + photo gallery) — no regression.
- **Faculty** — `content/faculty.json` + `faculty.schema.json` keyed by department slug. Minimal records `{ name, designation, photo?, cv? }` (R2 asset keys); `src/content/faculty.ts` resolves them to `FacultyMember` and `FacultyCard` shows a photo card that opens the profile/CV PDF in a modal. (Superseded the earlier rich-profile model — see "Faculty simplified" below.)
- **CSE is the reference department** — fully populated from `data/new-provided/CSE/Final_CSE_Department Profile-2025.docx`: overview, vision/mission, PEOs/PSOs, programs, 10 research supervisors + areas, named computing labs (Dijkstra/Babbage/K&R/Kalpana Chawla/Turing/C.V. Raman), recent activities, FOCUS student forum, HOD contact, quick-stats row, and a 17-person faculty directory (from the supervisor list + Board of Examiners + HOD).
- **Loader/renderer wiring** — `getDepartmentData` (in `src/data/department/department.ts`) now assembles `DepartmentData` from the JSON: dynamic sidebar (only tabs with content appear), Home quick-stats, About vision+mission list, Academics / Research & Labs / Activities & Forums / Contact sections, faculty list, and the existing R2 gallery. `ContentSection` extended with `items[]` + grouped `groups[]` rendering; `stats` section type now handled. No more `dummyFaculty`.
- **Verified** — `pnpm build` green; CSE / a name-only dept (Automobile) / a gallery-only dept (AIML) all return HTTP 200 and render correctly.

### Missing / to improve 🔧
- **20 other departments** still carry only `name` (+ `assetSlug`) — repeat the CSE pass per department from `data/new-provided/<DEPT>/`: dept content + faculty photos + profile/CV PDFs (convert docs→PDF, upload to R2, wire `photo`/`cv` keys). Source docs exist for ECS, Maths, Physics, EEE, AIML, Civil, MBA, MCA, Chem, etc.
- **CSE faculty photos — done ✅** (2026-06-07). The real 20-person CSE roster (names + designations) came from the live `becbgk.edu/CSE/Faculty_CSE.php`; portraits were pulled from the scrape (`CSE/img/`), converted via `sips`→`cwebp`, and uploaded to R2 under `departments/cse/faculty/<name>.webp` (uploaded WITHOUT `--prune`). (Contact/ID fields once parsed from the CVs were dropped in the faculty simplification below.)
- **Embedded-doc image staging** — `data/scraped/scripts/extract_doc_media.py` also pulls images embedded in the provided Word docs into gitignored `data/extracted-media/` (190 images from 34 docs + `manifest.csv`) — mostly lab/equipment shots, useful for other departments' galleries.
- **Faculty simplified — done ✅** (2026-06-07, PRD change). Dropped the rich per-faculty model (publications/education/admin/etc.) and the LLM extractor in favour of: photo + a link to the member's provided **profile/CV PDF**. `FacultyProfile` → minimal `FacultyMember` (`{ name, designation, photoUrl?, cvUrl? }`); `faculty.json`/schema slimmed to `{ name, designation, photo?, cv? }`. CSE profile docs were converted to PDF (LibreOffice headless) and uploaded to R2 under `departments/cse/faculty/cv/<slug>.pdf`; `FacultyCard` is a horizontal card (circular portrait left, name + role right, hover chevron) that opens the PDF in a modal `<iframe>` viewer. **CSE: 20 faculty, 17 with CV PDFs** (Smita K., Pradnya Rama, Netra Yaradoni have none → static cards). Removed `extract-faculty.mjs`, `dummy-data.ts`, and the `@anthropic-ai/sdk` + `zod` deps. Pipeline documented in [faculty-extraction.md](faculty-extraction.md).
- **Faculty designations** for some CSE research supervisors in the dept-profile `researchAreas` list are historical PhD guides not on the current teaching roster — that's expected; the roster itself is authoritative from the live faculty page.
- Other tabs (Time Table, Scheme & Syllabus PDFs, Board of Studies, Supporting Staff) still need data — syllabus/BoS PDFs exist in the provided folders and should go to R2 + `asset()`.
- Some department scene photos may be rotated (same EXIF issue) — flag for manual rotation.
- **Local source data** (`data/`, `optimized-and-html/`) is now gitignored — raw scraped/provided binaries never get committed; assets flow to R2 via the pipeline.

## Placements · Alumni · Community gallery — ⛔ not started
Per `docs/plan.md`.
