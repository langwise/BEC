# Content Model — where everything lives

All content is typed TypeScript under `apps/web/src/data/`. Components import these and render. To change copy, edit the data file — not the component. Paths below are relative to `apps/web/src/`.

## Navigation

- **File:** `data/navigation.ts` — single source of truth for the top menu.
- **Types:** `types/navigation.ts` — a `NavigationItem` has `title` + either `href` (leaf) or `items[]` (dropdown). Items can nest one more level (`NavigationGroup` with its own `items`).
- Rendered by `components/header.tsx` (desktop `NavigationMenu` + mobile `Sheet`). The Research/Student-Life sidebars also derive from this data.
- **Conventions:** Research block is intentionally commented out (kept for reference). Alumni is a top-level leaf. Keep statutory items (RTI, grievances, governance) in place.

## People & Governance

Folder `data/governance/`:

| File | Contents |
|------|----------|
| `hods.ts` | Heads of Department (`DepartmentHod[]`; clear `placeholder: true` when filled) |
| `deans.ts` | Deans (Academic, Placement, R&D, QA…) |
| `bog-members.ts` | Board of Governors (`BogMember[]`, categorized: chair/sangha/industry/academia/faculty/…) |
| `senate.ts` | Senate / Academic Council members |
| `org-chart.ts` | Organizational chart structure |

- Rendered on `app/administration/governance/page.tsx` (anchors `#deans`, `#bog`, `#hods`, `#org-chart`) via `components/governance/deans-grid.tsx` & `bog-grid.tsx`.
- **Full faculty profiles** use `types/faculty.ts` → `FacultyProfile` (basicInfo, contact, education, publications, etc.). Photo field = `basicInfo.profilePhotoUrl` (R2 URL via `asset()`).

## Departments

- **File:** `data/department/department.ts` — each department is a `DepartmentData` with `name`, `tagline`, `overview`, `vision`, `mission`, `highlights`, `sidebar`, and a `sections[]` array.
- **Section types:** `content` | `faculty-list` | `stats` | `gallery` — a discriminated union; the page renderer switches on `section.type`. Reuse these instead of inventing layout.
- Sample shape in `data/department/dummy-data.ts`.
- **Routes:** listing at `app/programs/departments/`, dynamic detail at `app/programs/departments/[type]/[slug]/`.

## Home

Folder `data/home/` — one file per homepage section, each rendered by a matching component in `components/home/`:

`hero-slides.ts`, `programme.ts`, `announcement.ts`, `testimonials.ts`, `placements.ts` (`placementStats`, `topRecruiters`), `ranking.ts`, `news-section.ts`, `event.ts`, `campus.ts`, `impace-section.ts` (sic).

## Placements

- **File:** `data/placements/content.ts` — `brochureHref`, `recruiterFormSrc` (Google Form embed URL), `accreditation`, `officers`, `home`, `facilities`, `policy.slots`, `process`, `whyRecruit`, `mous`.
- **Page:** `app/placements/page.tsx` — single-page doc, all sections on one scroll. Form embed via `components/placements/recruiter-form.tsx` (shows a placeholder until `recruiterFormSrc` is set). Brochure via `components/placements/brochure-cover.tsx`.
- Placement stats shown here also come from `data/home/placements.ts`.

## Alumni & Community Gallery

- **Alumni data:** `data/alumni/content.ts` — `overview`, `testimonials[]`, `connect` (link/embed for alumni-to-alumni connection).
- **Alumni page:** `app/alumni/page.tsx` (real page; replaces the old `[[...slug]]` placeholder). Top-level nav entry in `data/navigation.ts`.
- **Community data:** `data/community/initiatives.ts` — array of initiatives (Red Cross, NSS, NCC…), each `name`, `description`, `photos[]` (R2 keys), and `lead` (faculty profile / subset).
- **Community page:** `app/community/page.tsx` — photo-gallery grid (reuse the `gallery` department-section pattern + shadcn `carousel`/`card`) + faculty-lead profile cards (reuse `deans-grid` card style).

## Assets (cross-cutting)

Never embedded as content. Images & PDFs are R2 URLs resolved through `lib/assets.ts` `asset(key)` from the generated manifest. See [asset-pipeline.md](asset-pipeline.md).
