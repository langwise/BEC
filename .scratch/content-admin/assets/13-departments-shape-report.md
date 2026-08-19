# Departments content shape — full research report

Asset of ticket [13-departments-shape-study](../issues/13-departments-shape-study.md). Resolved 2026-08-08. This is the working spec for the departments Zod schema, the normalization migration, and the departments editor IA.

## 0. Corrected premise

`content/departments.json` = `{ "$schema", "departments": Record<contentKey, DepartmentContent> }`, 25 entries, **102 distinct top-level fields in use** (not ~36 — that's just `ai-and-ml`; entries range 15 fields (`pg/machine-design`) to 56 (`civil-engg`)). The loader declares 107 fields → 5 are declared-but-never-set (dead flags). Content keys: 11 UG, 4 basic-science (`physics`, `chemistry`, `mathematics`, `humanities`), 8 `pg/*`, `mca`, `mba`.

Chain: `content/departments.json` → `src/content/departments.ts` (loader, 368 ll.) → `src/data/department/department.ts` (transform, 1455 ll.) → `department-layout.tsx` (section switch ll. 617–722) + `app/departments/[type]/[slug]/[[...section]]/page.tsx`; routing source of truth is a SECOND list, `src/data/departments-catalog.ts`.

## 1. Field inventory (counts = present/25)

**Universal (25/25, treat required):** `name` (only field the current schema requires), `tagline`, `overview`, `vision`, `mission` (string[]), `highlights` (string[] — `[]` on ai-and-ml is a hide-sentinel), `committeeGroups` ({title, members{name,position,email?,phone?}[]}[], 48 groups/492 members), `contact` ({name,designation,phone?,email?,photo?}).

**Near-universal (19–24):** `programsOffered` 24 (missing humanities) · `supportingStaff` 22 · `associations` 20 · `infrastructureItems` 20 (`[]` on civil-engg = sentinel) · `established` 19 · `documents` 19.

**Type-correlated (the real discriminators; UG 11 / BS 4 / PG 8 / MCA+MBA 2):**

| field | UG | BS | PG | M | reading |
|---|---|---|---|---|---|
| `assetSlug` | 11 | 4 | **0** | 2 | PG has no asset folder; gallery hard-suppressed for `pg/*` (department.ts:1093-1105) |
| `intake` | 9 | 0 | 6 | 2 | label varies by type: `intakeLabel()` :222-227 |
| `peos` | 11 | 0 | 4 | 2 | |
| `psos` | 11 | 0 | 1 | 2 | |
| `pos` | 10 | 0 | 0 | 2 | |
| `wk` | 10 | 0 | 0 | 0 | UG engineering only |
| `newsletters` | 9 | 0 | 0 | 2 | |
| `section*` overrides | 7–8 | 1 | **0** | 1–2 | PG never customises nav |
| `softwareItems` | 6 | 0 | 7 | 0 | |
| `phdsAwarded`/`researchGrants`/`researchScholars` | 7 | 0–1 | 4–5 | 0–1 | |
| `heroImage(s)` | 9 | 2 | 0 | 0 | |
| `hodMessage` | 5 | 1 | 0 | 2 | |
| `distinguishedAlumni` | 6 | 0 | 0 | 0 | |
| `curriculumGroups` | 6 | 2 | 0 | 1 | PG uses flat `documents` |

**Conclusion:** no clean per-type schema exists — PG entries are *thinner*, never *differently shaped*. Honest model: one optional-heavy body + explicit `kind: "ug" | "basic-science" | "pg" | "professional"` used for required-field refinement. Today type-dependent behaviour keys off the `pg/` key prefix (intakeLabel, gallery suppression), not a stored field.

**Full list by concern:**
- *Identity & assets:* name(25) tagline(25) assetSlug(17) infrastructureGallerySlug(1) galleryExclude(12, substring matchers) heroImage(9) heroImages(2) chronicleImage(1) overviewImage/Caption(5/5) aboutImage/Caption(1/1) facultyGroupPhoto/Caption(5/5) staffGroupPhoto/Caption(6/6) homeGroupPhoto/Caption(3/3) placementsPhoto/Caption(1/1) facilitiesGallery(4) researchGallery(1) mouImages(2) placementImages(3)
- *Prose:* overview(25) about(4) vision(25) mission(25) highlights(25) values(1) milestones(1) hodMessage(8, {title?,message?,name?,designation?,image?}) quickFacts(2)
- *Academics:* programsOffered(24) programsOfferedCount(2) coursesOffered(1) programStructure(2) peos(17) psos(14) pos(12) wk(10) — all `{code,text}[]`; curriculumGroups(9) documents(19) — `{title,file}` lists
- *People:* supportingStaff(22, photo on 35/184) committeeGroups(25)
- *Research:* researchAreas(16, university on 52/108) phdsAwarded(12, 215 rows) researchScholars(14, 175 rows) researchGrants(11, 111 rows) publications(3) patents(2, 9 optional sub-fields) researchAchievements(1) researchLaboratories(1) startups(1)
- *Facilities:* labs(12, {name,description?,features?,images?,feature?,items?,table?}) infrastructureLabs(1) laboratories(1) infrastructureItems(20, 315 rows) softwareItems(13) facilitiesTables(2)
- *Engagement:* activities(16, 180 rows) activityTables(2) associations(20, 29 assoc.) mous(12, 56 rows) achievementTables(3) studentAchievements(1) distinguishedAlumni(6) testimonials(4) alumniRecords(1) bestPractices(1+1) newsletters(11, 88 PDFs)
- *Contact:* contact(25) additionalContacts(4)
- *Layout/nav (editor-hostile, 19 flags + 6 maps):* sectionOrder(4) sectionTitles(9) sectionNavLabels(10) sectionIcons(2) sectionDocuments(11) sectionEmbeds(1) customSections(3); booleans: nbaAccredited(4) visionMissionOnHome(7) achievementsUnderResearch(3) hodMessageUnderAbout(2) groupPhotosUnderAbout(2) hideInfrastructureQuantity(2) labsUnderFacilities(2) groupSupportingStaff(2) staffCards(2) facultyCompact(1) hideQuickStats(1) milestonesOnHome(1) academicsOnHome(1) hideAboutTab(1) hideResearchTab(1) overviewImageOnHome(1) bestPracticesUnderAbout(1) activitiesUnderAssociation(1) placementsSummaryOnly(1)

## 2. Hack hotspots

**A. Void cast:** `src/content/departments.ts:300` — `data.departments as Record<string, DepartmentContent>`; zero runtime validation. Same at `faculty.ts:15`, `placements.ts:55`.

**B. Current departments.schema.json fails its own data — 42 errors:** 46 in-use fields absent from the schema (with `additionalProperties: false`) → 19/25 departments fail; `associations[].coordinators` typed string-only but 4 objects exist; `committeeGroups` member email/phone rejected; `labs[].items/.table`, `associations[].events/.gallery/.exicomGroups` rejected. `_schema/asset-keys.json` is **stale vs manifest** (2,920 vs 2,948 keys — 14 live refs would be rejected).

**C. Optional-but-effectively-required:** `phdsAwarded[].year` required in type, missing on 1/215; `publications[].years[].year` contains explicit `null` (→ `subtitle: null` at :408); `infrastructureItems[].specification` 257/315, `.quantity` 313/315 (`?? ""`).

**D. Authored data silently dropped:** `phdsAwarded[].usn`/`.status` and committee member `email`/`phone` (6×) exist in JSON, absent from the type, never rendered.

**E. Dead flags (declared + transform branches, never set):** `consolidateResearch`, `peosPsosUnderAbout`, `publicationsUnderAchievements`, `researchAreasList`, `researchFacilities` — unreachable code at department.ts:564-588, :291/:1276/:1374, :636-663, :578, :569/:580.

**F. string|object unions:** `associations[].coordinators` (17 str / 4 obj — object branch FLATTENS designation/email/phone into one prose string at :948-960); `customSections[].groups[].items` (24/2); `labs[].items` (all str); `exicomGroups[].members` (all str). One `labs[].images: []` sentinel (→ undefined at :248-251).

**G. Semantics in prose:** committee `position` em-dash decides 2-vs-3-column table (:544-556); `supportingStaff[].designation` classified by regex `/peon|helper|attender|sweeper|driver|watch|garden|clean/i` (:494-496); association documents' resolved URL stuffed into a `value` text field AND duplicated as attachments (:1000-1003, :1032-1040).

**H. Data-driven table shapes:** `dropEmptyColumns()` :255-264; patents "Area" column conditional :384-387; MoUs "Since" conditional :1059; `hideInfrastructureQuantity` :356-367.

**I. Placeholder fallbacks (contravene the repo's no-placeholder rule):** `defaultHighlights` :209-214; `name ?? "Department of <TitleCased slug>"` :1266; tagline :1336; overview "will be updated soon" :1360-1362; vision :1403; mission :1408; fabricated alt-text :1338, :1110.

**J. Broken asset guards:** `asset()` always returns an `http…` URL for unknown keys (assets.ts:9-15), so `resolveDocuments()`'s `startsWith("http")` filter (departments.ts:336-338) and `resolveAssetUrl()` (department.ts:18-22) can never fail — missing files ship as broken images/404 PDFs. `asset(key: AssetKey | (string & {}))` defeats the key union type. Guarding is inconsistent (supportingStaff photo guarded; alumni/testimonials/hodMessage/group photos bare).

**K. Mutation/casts:** `.filter(Boolean) as DataTable[]` :508; cast-past-union icon mutation of pushed sections :1256; `sectionDocuments`/`sectionEmbeds` loops clobber association attachments :1233-1250; non-null assertions :1319/:1326/:1331.

**L. Untyped record keys, destructive whitelist:** all `section*` maps are `Record<string, …>` — typo'd ids silently ignored; `sectionOrder` deletes any unlisted section from nav AND page (:1323-1332) — adding a new section to a department with `sectionOrder` makes it invisible, no warning. Icon names are free strings.

**M. Flag coupling:** `visionMissionOnHome || hideAboutTab` :1426; one-element `heroImages` renders NO hero (:1340-1346); `tables: []` keeps an empty custom section alive (:1175).

**N. Hardcoded slugs in renderer:** department-layout.tsx:601 (civil-engg width), :605 (civil/EEE staff photo gate).

**O. Two sources of truth for department existence:** `departments-catalog.ts:56-63` comments out **7 of 8 `pg/*` entries** → ~102 KB of authored content with NO reachable URL (`dynamicParams=false`). `keyFor()` fallback (departments.ts:302-304) resolves arbitrary type segments to UG entries. The `stats` section variant is never produced (dead renderer arm :714).

## 3. Joins

Join key = department content key, computed at department.ts:1264.
- **Faculty**: `getDepartmentFaculty(key)` (faculty.ts:31-40) → `faculty` section (:451-466); absent key = tab silently vanishes. All 25 keys exist; 4 PG rosters empty. With `staffCards: true`, `supportingStaff` (departments.json) is reshaped into `FacultyMember[]` — same component, two files.
- **Placements**: `getDepartmentPlacements(key)` (placements.ts:58-60) — only 6/25 keys have data; others get no tab. `placements.json` has **no schema at all** (129 KB). Cross-file coupling: `placementsSummaryOnly`/`placementImages`/`placementsPhoto` live in departments.json but tables/chart in placements.json — editing Placements touches two files.
- **Constraints:** renaming/adding a key = coordinated change across departments.json + faculty.json + placements.json + departments-catalog.ts, unenforced. The editor must load all four to render an accurate section list; surface faculty/placements as read-only cross-links on the department screen.

## 4. Section model (produced sections, id → type → feeding fields)

academics→content (programsOffered, coursesOffered, programStructure, peos/psos/pos/wk) · curriculum→documents (curriculumGroups | documents) · faculty→faculty-list (faculty.json + group photo/flags) · staff→faculty-list|tables (supportingStaff + flags) · governance→tables (committeeGroups) · research→content+tables (areas, labs, gallery, foldable achievements/equipment) · research-achievements→tables (phdsAwarded, scholars, grants) · publications→content · patents→tables · startups→tables · achievements→tables (achievementTables raw grid) · student-achievements→content+tables · alumni→testimonials|content (distinguishedAlumni, testimonials, alumniRecords embeds) · placements→tables (placements.json + photos) · facilities→content|tables (labs, tables, laboratories, infrastructureItems, softwareItems, galleries) · activities→content (auto simple/rich split) · association→content (deepest: about, coordinators, events, exicom, gallery, documents, contact) · activity-programs→tables · mou→tables · infrastructure→content (infrastructureLabs) · newsletters→documents · custom ids→content (customSections escape hatch) · photo-gallery→gallery (derived from R2 minus galleryExclude) · contact→contact. Plus non-section Home and About screens on DepartmentData. Post-processing: sectionDocuments→attachments, sectionEmbeds, sectionIcons, sectionTitles, sectionNavLabels, sectionOrder (filter+sort).

## 5a. Zod schema skeleton (proposed)

Primitives: `AssetKey` (refined against manifest), `DocRef {title, file}`, `CodedItem {code,text}`, `DataTable` (with ragged-row refine), `Photo {key, caption?}` (replaces every *Image/*Caption pair), `Person`, `LabelledItem` (string→`{label}` coerced at parse — unions never stored), `ContentGroup` (with `emphasis` enum replacing featureImages/largeImages).

Top level: `DepartmentBase` with explicit `kind` enum; grouped bodies `home`, `about`, `academics`, `curriculum`, `people`, `governance`, `research`, `facilities`, `engagement`, `contact`, `customSections`; ALL layout flags + section maps quarantined under `layout` (order/titles/navLabels/icons/sectionDocuments/embeds/flags) with `SectionId` regex-validated against producible ids and `IconName` as a lucide enum. `z.discriminatedUnion("kind", …)` for required-field refinement (UG requires academics+PEOs/PSOs/POs), plus `superRefine` cross-field invariants: layout keys must reference producible sections, customSections ids unique and non-colliding, no empty-array sentinels.

Deliberate normalisations (each kills a hotspot): Photo pairs; heroImage+heroImages→one array; emphasis enum; union coercion; year/specification promoted required; explicit `kind`; layout quarantine.

**De-risking migration order:** (1) delete 5 dead flags + unreachable branches; (2) fix `asset()`/`resolveDocuments` guard contract so missing assets fail loudly; (3) regenerate asset-keys.json in the same script as the manifest; (4) land Zod `parse()` at the loader boundary replacing the cast; (5) route or delete the 7 orphaned `pg/*` entries.

## 5b. Editor information architecture (proposed)

**Level 0 — Department picker:** grouped by kind, with per-department completeness and an "unrouted" warning for orphaned `pg/*`; must merge departments.json keys with departments-catalog.ts and flag mismatches.

**Level 1 — Section tabs mirroring the published IA.** Widgets: Home/About/Vision-Mission = simple forms; Academics = four instances of a code+text pair-list sub-editor + program list; Curriculum = 2-level nested doc list with asset picker; Faculty = READ-ONLY cross-link to the faculty editor; Supporting Staff = person list with cards/split toggles (warn: regex-driven split); Board Members = list-of-lists with the em-dash convention made an explicit third column; Research = 3 lists + 3 big tables (215/175/111 rows — paging + CSV import) + publications tree + patents + labs cards; Facilities = 315-row equipment table (CSV import/export essential) + software + labs + gallery multi-pickers; Placements = read-only tables (link out) + editable photo/summary-only fields; Activities/Association = rich-card lists (association is the deepest screen); MoUs = table; Awards/Programmes/Student-Achievements = spreadsheet-style grid with column-count guard; Alumni = card lists; Newsletters = flat doc list; Photo Gallery = derived read-only grid where `galleryExclude` becomes CHECKBOXES over resolved images (not substrings); Custom Sections = gated escape hatch; Contact = form; **Layout & Navigation = expert panel** generated from the produced section list (drag-to-reorder with an explicit "hidden" state exposing the destructive whitelist; labelled toggles for the 19 booleans; live preview).

Shared components implied: asset picker (manifest-backed + existence check), document row, person row, code+text list, table grid with CSV import, rich-card list (ContentGroup), live section preview.
