# Overnight Prod-Ready Sweep — Log

Autonomous run started **2026-06-07 night** (continuing into 2026-06-08). Goal: move every page toward the prod-ready bar in `website/CLAUDE.md`. This log is the human-readable record — one entry per page: **state before → what changed → sources → why → flags**.

## Run parameters (decided by user)

- **PDF backlinks:** upload scraped PDFs to R2, reference via `asset()` (kill `becbgk.edu` hotlinks).
- **Visual scope:** additive & safe only — wire images, fill source-verified content, remove placeholders, backlink PDFs. Subjective visual/responsive/perf redesign is **logged for a supervised pass**, not done unattended.
- **Blocked items:** never invent. Senate roster, placements Google Form URL, confirmed chairman identity+photo are left as-is and flagged here.
- **Commits:** none — all changes left uncommitted in the working tree for morning review.

## Prod-ready bar (from website/CLAUDE.md)

1. All provided images used appropriately.
2. All data (text/stats/photos/PDFs) source-verified — from `data/new-provided/`, `data/optimized/` (on R2), `data/scraped/site/becbgk.edu/`, or current live becbgk.edu copy.
3. Zero dummy / lorem / placeholder content.
4. Responsive, good cross-browser/-device UX. *(audited & logged, not redesigned tonight)*
5. Optimized for low-end / low-network. *(audited & logged)*
6. Premier-institute visual & layout quality. *(audited & logged)*

## Sources legend

- `NEW` = `data/new-provided/<DEPT>/…`  ·  `OPT` = `data/optimized/…` (R2)  ·  `SCR` = `data/scraped/site/becbgk.edu/…`  ·  `LIVE` = fetched from becbgk.edu  ·  `EXISTING` = already-correct content kept.

---

## Phase status

| # | Phase | Status |
|---|-------|--------|
| 0 | Setup: R2 env, log, baseline | ✅ done |
| 1 | Backlinks: scraped PDFs → R2 + manifest, swap hotlinks | ✅ done |
| 2 | Image wiring: PhotoGallery/hero into image-less sections | ✅ done (Workflow A, ~18 pages, images viewed + verified) |
| 3 | Placeholder purge: broken refs, stubs, dead nav targets | ✅ done (Workflow A, ~10 backlink pages) |
| 4 | Name-only departments: overview/vision/faculty from SCR/LIVE | ✅ done (Workflow B, 7 depts merged) |
| 5 | Verify + reconcile hardcoded text/stats vs sources | 🔎 mostly done — home 5000+/350+ vs institute 3500+/180+ stat reconcile deferred to supervised pass |
| 6 | Final `pnpm build` + lint green; summary | ✅ done — `next build` succeeded; 0 lint errors in modified files |

## Baseline (start of run)

- R2: `bec-assets`, 572 objects, 164.9 MB (1.6% of 10 GB free tier).
- `asset-manifest.ts`: 572 keys.
- `grep becbgk.edu apps/web/src`: 32 files.
- `placeholder: true`: `senate.ts`, `hods.ts`, `deans.ts`.

---

## Page log

<!-- entries appended below, newest phase last -->

### /administration/governance — backlinks cleaned (main loop)
- **State before:** `governanceLinks` had 4 entries: 2 dead becbgk.edu `.php` page links (BOG Members.php, Governance.php) + 2 PDFs hotlinked to becbgk.edu.
- **Changed:** imported `asset` from `@/lib/assets`; swapped Mandatory Disclosure → `asset("documents/disclosures/mandatory-disclosure.pdf")` and Academic Council Members → `asset("documents/misc/ac-members.pdf")` (both on R2); **removed** the 2 `.php` rows — the BoG roster is already rendered in-page from `bogMembers`, so the external page links were redundant/dead.
- **Sources:** SCR→R2 (PDFs uploaded Phase 1; keys confirmed in manifest). URL→key map `data/_r2-pdf-staging/_map.json`.
- **Why:** prod-ready bar #2/#3 — no becbgk.edu hotlinks, no dead external links.
- **Flags:** none. The two `.php` URLs were in the map's "missing/non-file" list (page routes, not assets) — correctly dropped, not fabricated.

### Governance data — audited, already complete (no change)
- `content/governance.json` (the real source for `/administration/governance`) is **fully populated**: 15 named HODs with `governance/hod/<dept>/<name>.webp` photos, 4 deans, 3 officers, BoG, Sangha. Automobile & Physics HODs are intentionally blank (no provided portrait); Dean R&D, Dean QA, Admission In-charge carry `verify:true`.
- The placeholder `data/governance/{deans,hods,senate}.ts` flagged in the baseline are **stale** — imported only by the intentional `[[...slug]]` "coming soon" catch-all + the senate page. Left untouched.
- **🚩 Blocked:** Senate roster (the senate page already degrades gracefully and requests the official notification).

---

## Departments filled — Workflow B merge (7 name-only → full)

Merged source-verified metadata + faculty rosters into `content/departments.json` and `content/faculty.json`. These 7 were name-only stubs (`name` + `assetSlug`) that rendered an overview placeholder; they now render full Home / About / PEO-PSO / labs / associations / faculty.

**Deliberately omitted (safe, not fabricated):** `documents[]` (curriculum/syllabus PDFs) and faculty `cv` keys. The schema requires a real uploaded R2 key; these PDFs exist in the scrape/new-provided but are **not yet on R2**, and mis-mapping CVs to names is worse than none. Source paths are recorded per-agent for a clean upload+wire follow-up. This matches existing prod-ready depts (ai-and-ml, eee, physics, chemistry, mba) that also carry no `documents`.

| slug | status | faculty added | primary source |
|---|---|---|---|
| biotechnology | done | +7 | scrape + live |
| electronics-and-computer-engg | done | — (already had roster) | new-provided + scrape |
| industrial-and-production-engg | done | +3 | scrape + live |
| information-science-and-engg | done | +18 | scrape + live |
| mechanical-engg | done | +24 | scrape + live |
| mathematics | partial | — (already had roster) | new-provided + scrape |
| humanities | done | +3 | scrape + live |

**Per-department flags (verbatim from research agents — need human eyes):**

- **biotechnology**
  - M.Tech (Food Biotechnology): live site lists it as offered, but the official NBA DCP-BT (Mar 2025) records this PG programme as started 2020 and CLOSED 2024. I therefore OMITTED M.Tech from programsOffered. Human should confirm whether to list it (e.g., as discontinued) or exclude it. The site also mentions BiSEP PG Diploma/Certificate courses in Nutraceuticals and Food Processing, which I omitted pending confirmation of current status.
  - HOD phone: CV (bsm.pdf) and DCP give 9448972628 (10 digits); live site shows 94489872628 (11 digits, likely a stray extra digit). Used the CV value +91-9448972628.
  - Faculty name reconciliation: NBA DCP-BT C1 table lists 'Dr. Sharada S B' (Associate Professor) where the CV folder and Research Centre doc name 'Dr. Sharada P.' (Associate Professor, ID TBT006). Treated as the same person; used the CV form 'Dr. Sharada P.'. Human may verify exact spelling.
  - Tagline/vision are the same sentence (derived from the site's vision line) as no separate marketing tagline was found.
  - documents[].file and faculty[].cv paths are PROPOSED R2 keys following the Civil pattern; the actual source PDFs exist in the scrape but have not been uploaded to R2. Verify/adjust keys before publishing, or omit if not uploaded.
  - No faculty portrait photos available for this department (photo field omitted as instructed).
- **electronics-and-computer-engg**
  - VISION/MISSION ANOMALY: The live ECS department page (ECS_Home.php) literally states the vision as 'To be a recognized leader in the Instrumentation discipline...' — the word 'Instrumentation' appears to be a copy-over artifact from the HOD's Instrumentation background and likely should read 'Electronics and Computer Engineering'. Reproduced verbatim from source; recommend human confirmation/correction with the department.
  - PEOs and PSOs are NOT PRESENT on the live ECS page or in any provided/scraped source, so both fields were omitted (not fabricated). Needs human input if required.
  - HOD email: live page lists 'hodei@becbgk.edu' (used). Her scraped CV (CLC_Profile.pdf) also lists official id 'clcei@becbgk.edu' and personal 'chayalakshmi.cl@gmail.com'; the live page additionally showed an unrelated 'send2kb@rediffmail.com'. Used the department HOD alias 'hodei@becbgk.edu'. Confirm preferred address.
  - DOCUMENTS omitted: scrape contains syllabus/scheme/time-table PDFs (e.g. ECS_Faculty_List-2024-25.pdf, Time Table_Odd_2024-25.pdf, Syllabus/*.pdf) but none are present under 'departments/ecs/docs/' in the R2 asset manifest (_schema/asset-keys.json has 13 ecs keys, all faculty webp/cv). Did not emit 'documents' to avoid broken R2 references — upload to R2 + re-key, then add.
  - No HTML overview/vision/mission pages existed in the scrape folder (only CV/Documents/img assets); overview, vision, mission, labs and association were sourced from the live becbgk.edu ECS_Home.php page.
  - 'established' set to '2024' to match the canonical year format used by other departments; the source states the academic year '2024-25'.
- **industrial-and-production-engg**
  - No scraped HTML existed for this dept (only PDFs + images); vision, mission, PEOs, PSOs, established year, intake, programs, HOD contact and association were sourced from the LIVE site (becbgk.edu/IPE/*.php) as fallback. Confirm against current live pages before publishing.
  - FACULTY ROSTER CONFLICT: The live Faculty_IPE.php page lists 5 teaching faculty — Dr. S. T. Dundur (Professor), Dr. V. S. Puranik (Professor & HOD), Dr. C. M. Javalagi (Associate Professor), Dr. D. G. Mallapur (Associate Professor), Dr. S. M. Pharsiyawar (Associate Professor). However this page appears OUTDATED: Javalagi's own CV (PDF) and IPE_Home.php both state Dr. C. M. Javalagi is 'Professor (CAS) and Head of the Department' (HOD since 1.12.2022). I returned only the 3 CV-backed current faculty (Javalagi as Professor/Head, Mallapur, Pharsiyawar). Dundur and Puranik are listed as research guides in the Research Centre doc but may be retired/emeritus — NEEDS HUMAN VERIFICATION of whether they are still serving faculty and their current designations.
  - HOD designation: CV says 'Professor (CAS) and Head'; live home page says 'Professor and HOD'. Used 'Professor & Head' for the contact card. Phone +91-9448751788 and email hodip@becbgk.edu are from the live home page (CV official ID is cmjip@becbgk.edu; personal cmjavalagi@gmail.com).
  - Labs: distinct lab names are not enumerated in the scrape (infrastructure PDF lists equipment, not named labs). I used the two named labs found in the Research Centre funded-projects list ('Advanced Machining Science Laboratory', 'Management Science Laboratory'). There may be additional labs (e.g. CAD/CAM, Metrology, Machine Shop) — verify with the dept.
  - PIESA full form: live association page gives 'Production and Industrial Engineering Students' Association'; the Home page rendered it slightly differently ('Production, Industrial & Engineering Student Association'). Used the association-page wording.
  - intake '30' is stated as the ORIGINAL/initial intake (1984); current sanctioned intake may differ — verify.
  - documents[].file (R2 keys) omitted as no R2 keys are known; titles map to the scraped PDFs listed in sources. cv paths in faculty are suggested R2 keys, not yet uploaded.
  - The existing departments.json entry for this slug is a stub (name + assetSlug 'ip' only); this fills it. assetSlug 'ip' preserved by orchestrator.
- **information-science-and-engg**
  - No HTML pages exist in the scrape for ISE (or any dept) — the scrape is PDF/image based. All facts were sourced from departmental PDFs, primarily the NBA SAR (2022) and the NBA Faculty-List 2024-25.
  - HOD phone number not found in any source — contact.phone omitted. HOD email spbis@becbgk.edu verified from the HOD's own CV (SPB.pdf). HOD identity (Dr. S. P. Bangarashetti / Dr. Sadhana P. Bangarashetti, Professor) confirmed by the RISE Office Bearers 2024-25 doc.
  - Vision and Mission are from the 2022 NBA SAR (department section). Mission M1 was partially truncated in the SAR text extraction ('To impart quality engineering education developing ethical,'); completed minimally as '...ethical and competent professionals.' Verify exact wording against a current department brochure if available.
  - PEOs (5) and PSOs (3) taken verbatim from the 2022 NBA SAR (PEOs p.12; PSOs p.54/196). These may have been revised under newer NEP schemes (2021-22 / 2022-23 / 175-credit) — confirm they are still current.
  - established=1999 is the start year of the UG programme (SAR p.6); intake=90 is the sanctioned program intake N=90 (SAR p.76). The Research Centre was established in 2020 (Research Centre Information.pdf).
  - programsOffered: only B.E. and Ph.D. (research centre) are source-verified for ISE. No M.Tech is run by this department per sources — did NOT invent one.
  - Faculty roster (18) is from the authoritative NBA Faculty-List 2024-25. Full names and designations cross-verified against individual CV PDFs. Note: NBA list spelled some as 'S. P. Bangarshetti' / 'P. R. Muttanavar' / 'P. K. Deshapande' / 'G. B. Shettar'; CVs give fuller correct spellings used here. Designations reflect the NBA 2024-25 list (Bhajantri & Puranik & Kulkarni = Associate Professor; S. R. Patil & Bangarashetti = Professor; rest Assistant Professor).
  - Dr. B. M. Reshmi appears as a research guide in the 2020 Research Centre doc but is NOT in the 2024-25 NBA faculty list — excluded from the current roster (likely retired/transferred). Confirm if she should be listed.
  - Three extra CV PDFs in the CV folder do NOT match the 2024-25 NBA roster and were excluded: 'Netra Pattar.pdf' (Netravati Pattar — software testing trainee), 'My CV.pdf' (Chetan Bulla), 'Resume-Seema.pdf' (Seema) — likely contract/research/visiting staff. Confirm whether any should be added.
  - cv paths are proposed R2 keys (departments/ise/faculty/cv/<slug>.pdf) following the Civil/CSE convention; the actual source PDFs exist under .../ISE/CV/ and must be uploaded/re-keyed by the orchestrator. S. S. Guttannavar (joined 04/09/2025) has no CV PDF in the scrape — cv omitted for that entry.
  - documents[].file (R2 keys) omitted because final R2 keys are assigned by the orchestrator; source PDFs are: ISE-SAR-22.pdf, STAFF_LIST-NBA-2024-25.pdf, Research Centre Information.pdf, Best_Practices.pdf under .../ISE/Documents/.
  - No faculty portrait photos provided for this dept (only a few jpeg/png in /ISE/img that are not a clean per-faculty portrait set) — photo field omitted as instructed.
- **mechanical-engg**
  - labs OMITTED: the live ME_Infrastructure.php page lists only equipment and software (no explicitly named laboratories). An earlier model-inferred lab list was discarded to avoid fabrication. Human should supply named labs (e.g. from a syllabus/NBA SAR) if needed.
  - documents.file (R2 keys) OMITTED: the ME PDFs are not present in the asset manifest (content/_schema/asset-keys.json has no departments/mechanical/docs/* keys). Document titles are provided; R2 keys must be assigned during asset upload.
  - Faculty CVs exist as local scrape PDFs under .../ME/CV/ but are NOT uploaded to R2 and several map to faculty only by ambiguous initials; cv fields omitted to avoid broken/unverifiable links.
  - HOD designation: live site states 'Professor (CAS) and Head'; normalized to 'Professor & Head'. Verify whether 'Professor (CAS)' phrasing should be preserved.
  - HOD email: live site lists both hodme@becbgk.edu and vvkme@becbgk.edu; used the role address hodme@becbgk.edu.
  - Faculty roster sourced from Faculty list.pdf and reflects designations as of that document (24 regular/contractual teaching faculty). 'Currently Associated' = Y for all listed. Some research guides named in Research Centre Information.pdf (e.g. Dr. P. B. Gangavati, Dr. S. A. Kori, Dr. G. B. Rudrakshi, Dr. S. S. Balli) are guides but not in the current teaching faculty list — not included in faculty array.
  - Faculty name 'Vivekanand B. S.' appears as 'Prof. Vivekanand B S' (item 14) and the same person 'B. S. Vivekanand' elsewhere; spelling kept as on faculty list.
  - overview total-students figure (~560) from live site was NOT included as it is approximate/unverified across sources.
- **mathematics**
  - No department-level vision/mission/PEOs/PSOs/labs exist in the new-provided handoff or scrape; the six handoff .doc/.docx files are all individual faculty profiles. Vision, mission, overview and established year were sourced from the LIVE site (https://becbgk.edu/MATHS/MATHS_Home.php) since the scrape contained no HTML/prose.
  - PEOs and PSOs OMITTED: none found in any source. Mathematics is a service/basic-science department and the live page explicitly lists no PEOs/PSOs.
  - intake OMITTED: department offers no standalone B.E. degree (only service courses + Ph.D.); no UG intake number stated anywhere.
  - labs and associations OMITTED: no mathematics labs or student association named in any source.
  - HOD designation conflict: live site says 'Professor & HOD' but the authoritative 2025 profile doc and the existing faculty roster both say 'Associate Professor'. Used 'Associate Professor & Head' (matches handoff + faculty.json). Note: an OLDER scraped BOS.pdf (2022-23) lists Dr S. S. Benchalli as Professor and Head — superseded; Dr Vidya M Shettar became HOD in August 2023 per her profile doc.
  - documents field OMITTED: relevant PDFs (BOS, merged syllabus, faculty list, dept publications) exist in the scrape but their R2 keys are unknown, and schema says to omit the file key rather than invent one. Human can wire these via the asset pipeline if desired.
  - established '1963' is verbatim from the live site ('The department of mathematics established in the year 1963'); note this is also the college's founding year, so it may reflect the college inception rather than a distinct departmental founding.
- **humanities**
  - No intake, programsOffered (B.E./M.Tech/Ph.D.), PEOs, PSOs, or associations were emitted: HSS is a service/interdisciplinary department that teaches common courses to all engineering students and does not run its own degree programme. None of these fields appear in any source; omitted rather than invented.
  - Faculty name discrepancy for the second member: the scraped faculty-profile PDF (Employee ID THSS004) names her 'Smt. Shanta Byadagi', while the live site (Faculty_HSS.php) lists 'Prof. Shanta B. Basanagoudar'. Both share email becshanta@gmail.com, so they are the same person (likely maiden vs. married surname). Used the live-site form 'Shanta B. Basanagoudar'; needs human confirmation of preferred name.
  - Faculty roster confirmed as exactly 3 via the live Faculty_HSS.php page. The faculty Staff BOS.pdf uses non-extractable subset fonts (no ToUnicode CMap) so its table content could not be read; employee-ID gap (HOD THS001, then THSS004/THSS005) raised a possibility of THSS002/003, but the live faculty page lists only these three, so no additional names were invented.
  - cv R2 keys ('departments/hss/cv/...') are proposed paths mirroring the scraped CV/ PDFs (Faculty Profile.pdf, nidhi.pdf); they are not yet uploaded to R2 — verify/upload before relying on them, or drop the cv field.
  - documents[] have titles only (no R2 file keys) since these PDFs are not yet in R2. Source files exist under HSS/Documents/ (Publications.pdf, HSS_Events.pdf, Time table.pdf).
  - No vision/mission/overview HTML existed in the local scrape (only PDFs/docx); vision, mission, overview, established year (2006) and the Language Laboratory detail were sourced from the live site https://becbgk.edu/HSS/HSS_Home.php.
  - HOD personal/Gmail address (basavarajeshwari18779@gmail.com) intentionally omitted from contact in favour of the official bghhs@becbgk.edu.

---

## Section pages — Workflow A (28 pages: 8 curate · 10 gallery · 10 backlink)

Each flagship/curate page had every chosen image **viewed** by a fresh-context subagent and matched to its caption intent, then independently image-verified. Gallery pages wired PhotoGallery/hero from R2 prefixes. Backlink pages swapped `becbgk.edu` hotlinks → `asset()` R2 keys and purged broken refs.

### HOME (flagship landing page) — done · 9 images wired
- **Files:** `content/home.json`
- **Before:** Image-to-caption matching was wrong across the page. hero[0] used a faculty crowd (cine1579) for an infrastructure slot; hero[1]/hero[2] used generic group/facade photos for research and library slots; hero[3] "Celebrating Excellence" used an amenity shot (facilities/general/cine1255 = India Post office); about.image used another amenity shot (facilities/general/cine1256 = shuttered campus hospital); campusLife[2] reused a near-duplicate of the hero[4] dance group. No dummy/lorem/Unsplash/broken local refs and no becbgk/PDF backlinks were present in the file.
- **Changed:**
  - hero[0] World-Class Infrastructure: institute/group-photos/cine1579.webp -> institute/group-photos/cine1641.webp (clean single-figure main-building facade under dramatic sky, viewed)
  - hero[1] Cutting-Edge Research: institute/group-photos/cine1604.webp -> research/labs/robotics/cine0884.webp (AI-based Mitsubishi articulated robot arm over a chessboard; viewed bosch + robotics candidates and picked the most unmistakable research-lab subject)
  - hero[2] Knowledge Hub: institute/group-photos/cine1627.webp -> facilities/library/cine1235.webp (wide library reading-hall with rows of reading tables and book cabinets; avoided the librarian portrait dr-shreekant-g-karkun.webp)
  - hero[3] Celebrating Excellence: removed amenity image facilities/general/cine1255.webp (India Post office) -> institute/group-photos/cine1614.webp (full dignitary/leadership group before the facade); description refined to 'Honouring the leadership and mentors who shape generations.' to truthfully match the leadership-group image
  - hero[4] Vibrant Community: kept student-life/cultural/cine0157.webp (vibrant synchronized student dance group) - already correct intent
  - about.image: removed amenity image facilities/general/cine1256.webp (shuttered campus hospital) -> institute/group-photos/cine1583.webp (large faculty/staff crowd before the facade, fits the institutional about copy about 180+ faculty / 200 staff / community)
  - campusLife[0] Student Clubs: kept student-life/clubs/cine1910.webp (large student cohort in formal blazers) - correct intent
  - campusLife[1] Sports Excellence: kept student-life/sports/cine0040.webp (badminton players in BEC red/black jerseys on indoor court) - correct intent
  - campusLife[2] Cultural Fests: student-life/cultural/cine0167.webp -> student-life/cultural/cine0200.webp (classical Bharatanatyam dancer; distinct from hero[4] which was the same dance group/room as cine0167)
- **Sources:**
  - Task-provided verified facts on facilities/general/* (amenity buildings) and institute/group-photos/cine1614/cine1619/cine1579/cine1583 roles
  - Direct visual inspection of local optimized mirror images at data/optimized/ for every chosen key (facade cine1627/1630/1638/1641, bosch cine0700/0741, robotics cine0862/0884, library cine1188/1216/1235, group cine1583/1614/1619, cultural cine0157/0167/0200, clubs cine1910/1915, sports cine0040)
- **Why:** The most-visited page had image intent mismatches, including two amenity-building photos (a shuttered hospital and a post office) standing in for the about block and the "Celebrating Excellence" hero. I viewed multiple candidates per slot from the specified prefixes and matched each slot to the strongest source-verified image: a striking facade for infrastructure, a clear robotics rig for research, a wide reading hall for the library, a leadership group for excellence (with a truthful caption tweak), a faculty crowd for about, and a distinct classical-dance image for cultural fests so it does not duplicate the hero community shot.
- **Flags:** none
- **Build risk:** none — only image-key strings and one description string changed in content/home.json; JSON re-validated with a parser (parses cleanly) and all new keys (cine1641, robotics/cine0884, library/cine1235, cine1614, cine1583, cultural/cine0200) exist in the local optimized mirror, matching the R2 manifest layout. No code/import/schema changes; the typed loader applies asset() to keys unchanged.

### /institute/about — done · 4 images wired
- **Files:** `src/app/institute/about/page.tsx`
- **Before:** Page rendered correctly with source-verified copy and stats but contained zero imagery (text-only hero + narrative + timeline + facilities + achievements). It also had an unused Marquee import. No becbgk.edu/Documents/PDF links and no placeholders/lorem/Unsplash/broken refs were present.
- **Changed:**
  - Added imports: next/image Image, PhotoGallery from @/components/common/photo-gallery, and asset from @/lib/assets
  - Removed unused Marquee import (was imported, never used)
  - Wired hero feature image: institute/group-photos/faculty-group-photo.webp (iconic facade + full faculty crowd) inside the hero section using next/image fill+priority, wrapped in FadeIn, aspect-video tile matching existing codebase convention
  - Added a 3-tile PhotoGallery at the end of the Introduction narrative section using faculty-group-photo-2.webp, cine1614.webp, and technical-and-non-technical-staff-group-photo-2.webp with descriptive alt text
  - Used aspect-video (verified used elsewhere in src) instead of aspect-16/9 for codebase consistency
- **Sources:**
  - data/optimized/institute/group-photos/faculty-group-photo.webp
  - data/optimized/institute/group-photos/faculty-group-photo-2.webp
  - data/optimized/institute/group-photos/cine1614.webp
  - data/optimized/institute/group-photos/technical-and-non-technical-staff-group-photo-2.webp
  - src/data/asset-manifest.ts (keys confirmed present)
  - src/components/common/photo-gallery.tsx (component contract)
  - src/components/programs/departments/department-layout.tsx (PhotoGallery usage pattern)
- **Why:** An About-the-institute page must show provided imagery (CLAUDE.md prod-ready bar). The page had verified copy but no photos. The faculty-group-photo with the BEC facade signage is the iconic shot ideal for the hero; the three distinct group photos reinforce the alumni/faculty/staff community narrative without redesigning the layout. All copy/stats were already source-verified and left untouched.
- **Flags:** 
  - No becbgk.edu/Documents or PDF links existed in this file, so nothing to swap via the R2 PDF map.
  - Several near-duplicate cine* facade frames (cine1579, cine1583, etc.) of the same shot were intentionally not used to avoid duplicate-looking gallery tiles.
- **Build risk:** low

### /institute/about-sangha — done · 17 images wired
- **Files:** `src/app/institute/about-sangha/page.tsx`
- **Before:** Static page with verified Sangha copy and a stats card, but no images wired at all and a hardcoded becbgk.edu PDF link (Institute_list.pdf). Also carried an unused Badge import.
- **Changed:**
  - Restructured the hero into a responsive two-column grid and wired governance/sangha/group-photo.webp as a priority feature image (existing intro copy unchanged)
  - Added a 'Leadership / The People Behind the Sangha' section using the shared PhotoGallery, populated via assetsUnder('governance/sangha/') -> {src, alt} (all 16 provided portraits + group photo)
  - Swapped the hardcoded https://www.becbgk.edu/Documents/others/Institute_list.pdf link to asset('documents/institute/institute-list.pdf') per the R2 PDF map
  - Removed the unused Badge import; added Image, PhotoGallery, asset, assetsUnder imports (all used)
- **Sources:**
  - data/optimized/governance/sangha/ (16 provided images: group-photo, cine*, named office-bearer portraits)
  - data/_r2-pdf-staging/_map.json (Institute_list.pdf -> documents/institute/institute-list.pdf)
  - src/data/asset-manifest.ts (confirmed all sangha keys + institute-list.pdf present)
  - src/components/programs/departments/department-layout.tsx (PhotoGallery+assetsUnder usage pattern mirrored)
- **Why:** Page was prod-incomplete: zero of the 16 provided Sangha photos were used, and it pointed at becbgk.edu for a PDF that has an R2 mapping. Wiring the group photo (hero) + a full leadership gallery uses the provided assets appropriately, and the asset() swap removes the external dependency. Existing source-verified copy/stats were preserved verbatim.
- **Flags:** none
- **Build risk:** low

### /institute/history — done · 7 images wired
- **Files:** `src/app/institute/history/page.tsx`
- **Before:** Image-less text/icon-only timeline page (no asset() or imagery). The only literal "placeholder" was a harmless layout comment; the real gap was zero institute imagery plus three copy claims that diverged from / were unverifiable against the live source.
- **Changed:**
  - Added imports: next/image Image, PhotoGallery (@/components/common/photo-gallery), asset (@/lib/assets).
  - Wired hero facade image asset('institute/group-photos/cine1579.webp') — the iconic main-building + college-name-banner shot — as a priority 16:9 hero below the intro copy.
  - Added a 'Through the Years' heritage PhotoGallery (6 curated facade/community group photos: faculty-group-photo, cine1583, cine1590, cine1604, cine1614, faculty-group-photo-2) with descriptive alts, placed before the timeline.
  - Corrected 'Present' milestone: '10 UG, 8 PG, and 10 Doctoral programs' -> '9 UG and 8 PG programmes, with 10 departments recognised as VTU-approved R&D centres' (matches live becbgk.edu About_BEC).
  - Replaced unverified '2010s' NAAC 'A' Grade / 'national QIP centers' claim with verified language: NAAC accreditation by UGC + 100% NBA accreditation of all UG courses + VTU R&D centres.
  - Replaced unverified Phase II 'BECAA founded 2001' milestone with verified Phase-II expansion detail (7 additional UG + 4 new PG incl. MCA); reworded adjacent 1980s-90s and research-genesis milestones to remove unverifiable specifics.
  - Removed the stale 'Desktop alignment placeholder' comment.
- **Sources:**
  - data/optimized/institute/group-photos/ (viewed cine1579, cine1583, cine1590, cine1604, cine1614, faculty-group-photo, faculty-group-photo-2, dr-r-n-herkal-dte)
  - src/data/asset-manifest.ts (confirmed all 7 institute/group-photos keys exist)
  - live becbgk.edu — https://www.becbgk.edu (homepage) and https://www.becbgk.edu/About_Us/About_BEC.php: founded 1963, BVVS Sangha, grant-in-aid 1968, academic autonomy 2007 by UGC, TEQIP I/II/III, NBA 100% UG, NAAC accredited (no grade stated), 93.18 acres, 9 UG + 8 PG, 10 VTU R&D centres
  - src/components/common/photo-gallery.tsx (mirrored PhotoGallery API: images={{src,alt}[]})
  - src/app/administration/principal/page.tsx (mirrored asset() import/usage pattern)
- **Why:** Page had no real imagery (the prod bar requires provided images used appropriately) and three copy claims that either contradicted or could not be verified against the authoritative live source. Wired the heritage facade/group photos and brought the timeline copy in line with verified becbgk.edu facts without inventing dates.
- **Flags:** 
  - NAAC grade: page previously asserted NAAC 'A' Grade; live About lists 'NAAC accreditation by UGC' with no grade letter, and IQAC/NAAC.php 404s. Softened to verified 'NAAC accreditation' — confirm the exact grade/CGPA + cycle year for human review.
  - Alumni association BECAA and its 2001 founding year could not be verified (Alumni dir is a PHP listing with no text); removed the dated claim rather than keep an unverified year — confirm association name + founding year.
  - '15,000+ Global Alumni' metric (legacyMetrics, untouched) is not source-verified against live becbgk.edu; left as-is per additive/safe rule but flag for verification.
  - '93 Acres' metric kept; verified exact figure is 93.18 acres (rounding acceptable; not changed to preserve design).
  - No PDF/DOC backlinks present in this file, so _r2-pdf-staging/_map.json was not needed.
  - Single-person portrait institute/group-photos/dr-r-n-herkal-dte.webp deliberately excluded from the heritage gallery (it is a portrait of Dr. R. N. Herkal, not a heritage/community shot).
- **Build risk:** low

### /placements — done · 15 images wired
- **Files:** `src/app/placements/page.tsx`, `src/data/placements/content.ts`
- **Before:** Page rendered fine but had zero real photos (two BrochureCover mockups in image slots, no gallery despite 14 placement-cell photos existing in R2), brochureHref pointed at a local /placement-brochure.pdf that does not exist, there was no placement-policy download even though the PDF exists in R2, and recruiterFormSrc was empty (already handled by a styled placeholder in RecruiterForm).
- **Changed:**
  - content.ts: brochureHref now resolves via asset('placements/brochure.pdf') (was local '/placement-brochure.pdf'); added import { asset } from '@/lib/assets'
  - content.ts: added policyHref: asset('placements/placement-policy.pdf') for the new policy download slot
  - content.ts: left recruiterFormSrc: '' untouched (BLOCKED — no Google Form URL provided)
  - page.tsx: replaced the second BrochureCover mockup in the About band with a real next/image feature photo (placements/cell/cine0682.webp — students in the computer centre), aspect-4/3 framed
  - page.tsx: added a 'Inside the placement cell' PhotoGallery section wiring all 14 photos via assetsUnder('placements/cell/') mapped to {src, alt}, mirroring the department gallery pattern
  - page.tsx: added a 'Download placement policy' link in the Policy band using policyHref (asset-backed)
  - page.tsx: added imports for Image (next/image), FileText (lucide), PhotoGallery, asset, assetsUnder; destructured policyHref; hero BrochureCover and all other content kept as-is
  - Verified no remaining unsplash/lorem/placeholder/becbgk.edu/Documents/broken-local-image refs in either file
- **Sources:**
  - data/optimized/placements/cell/ (14 webp photos, viewed cine0633/0635/0664/0682 — seminar hall + computer centre, all on-brand)
  - asset-manifest.ts (confirmed keys: placements/brochure.pdf, placements/placement-policy.pdf, placements/cell/cine06*.webp x14)
  - src/components/common/photo-gallery.tsx and src/content/departments.ts (mirrored the assetsUnder -> {src,alt} gallery pattern)
  - src/lib/assets.ts (asset/assetsUnder contract)
  - src/components/placements/recruiter-form.tsx (confirmed empty recruiterFormSrc already renders a graceful placeholder, not a broken iframe)
  - next.config.ts (images.unoptimized:true + R2 remotePattern — remote R2 photos render fine)
- **Why:** The page advertised a brochure/policy and a placement cell but shipped only CSS mockups and a dead local PDF link. Wiring the real R2 photos and asset-backed PDFs makes it source-verified and removes the broken /placement-brochure.pdf reference, meeting the prod-ready bar without redesigning the layout or inventing data.
- **Flags:** 
  - BLOCKED: recruiterFormSrc / Google Form embed URL not provided — left empty as instructed; RecruiterForm already shows a styled non-broken placeholder. Needs the real Form embed src before launch.
  - UNVERIFIABLE STATS (left untouched, not changed): data/home/placements.ts values 96% placement record, ₹3.14 Lac average package, 50k+ alumni, 35+ MoUs — no headline-stats source found in data/new-provided or scraped Placement pages (scrape only had asset subfolders, no page HTML). Same for content.ts accreditation values (NIRF 150–250 band, NBA 100% UG/50% PG, NAAC 'A' 3.34, AICTE–CII Gold). Recommend a human/live becbgk.edu verification pass.
  - Gallery section and following Recruiters band share the same bg-orange-50/50 styling (existing site convention for alternating bands) — adjacent same-bg sections create a faint double border; left as-is to avoid layout redesign.
- **Build risk:** low

### facilities/library (main, about, infrastructure) — done · 14 images wired
- **Files:** `src/app/facilities/library/page.tsx`, `src/app/facilities/library/about/page.tsx`, `src/app/facilities/library/infrastructure/page.tsx`
- **Before:** All three pages were icon-only with zero photos despite 31 provided library images. Main page hero was text-only; its "Quick Access" card had four broken href="#" placeholder anchors. No page named the current librarian. about and infrastructure pages had no imagery; infrastructure imported next/image but never used it. No becbgk.edu PDF/Documents backlinks existed in any of the three files (only library@becbgk.edu, an email, which stays).
- **Changed:**
  - main page.tsx: wired a hero image (facilities/library/cine1145.webp book-stacks) into the hero section as a 2-col grid beside the title (priority, fill, sized)
  - main page.tsx: replaced the 4 broken href="#" placeholder anchors in the Quick Access card (OPAC/Reserve/Renew/Digital Library) with real internal <Link> routes (e-resources-paid, e-resources-free, useful-links, infrastructure)
  - main page.tsx: added a Librarian card using the verified portrait facilities/library/dr-shreekant-g-karkun.webp next to the name 'Dr. Shreekant G. Karkun' / title 'Librarian'
  - main page.tsx: added a 6-image PhotoGallery ('Inside the Library') of stacks, reading halls, reading rooms, digital section, periodicals
  - infrastructure/page.tsx: removed the unused `import Image from next/image`; added PhotoGallery + asset imports and a 6-image gallery ('A Glimpse Inside') of the space
  - about/page.tsx: added a feature reading-hall image (cine1239) at the top of the main content column
- **Sources:**
  - Provided portrait facilities/library/dr-shreekant-g-karkun.webp (nameplate reads 'Dr. Shreekant G. Karkun, Librarian')
  - Live becbgk.edu/Library/Library_Staff.php confirms current Librarian = Dr. Shreekant G. Karkun
  - Provided photos under data/optimized/facilities/library/ (viewed cine1116/1131/1145/1178/1207/1216/1235/1239 + portrait) for categorization
  - data/_r2-pdf-staging/_map.json (no PDF backlinks present in target files; library@becbgk.edu is an email, left as-is)
- **Why:** Pages had zero imagery despite 31 provided photos and contained broken href=\"#\" placeholders, failing the prod-ready bar. Wired source-verified library photos as hero/gallery/portrait, named the current librarian (live-site verified), and purged the broken anchor stubs without redesigning layout or inventing data.
- **Flags:** 
  - Out-of-scope (not edited): src/app/facilities/library/staff/page.tsx lists a stale librarian 'Dr. (Mrs.) Rekha Shahapurkar' — current librarian per live site + provided portrait is Dr. Shreekant G. Karkun; should be corrected by the staff-page owner.
  - Out-of-scope (not edited): src/app/facilities/library/useful-links/page.tsx still has url:"#" placeholder links (OPAC, Digital Library, Institutional Repository, Reserve, Renew) — no real OPAC/repository URL available to wire.
  - Stats on these pages (1,40,000+ books, 200+ journals, 50+ e-resources, 1 Gbps, 10,000+ sq ft, 300+ seating) were pre-existing and left untouched; not independently re-verified against a primary source.
- **Build risk:** low

### /facilities/amenities — done · 11 images wired
- **Files:** `src/app/facilities/amenities/page.tsx`
- **Before:** Page rendered 6 amenity cards (Bank/Canteen/Health/Co-op/Transport/Auditorium) sourced from generic AI/stock placeholder PNGs in public/facilities/amenities/ (bank.png showed a Western "CAMPUS BANK" lobby, transport.png showed US "STATE UNIVERSITY" articulated buses, auditorium.png showed a Western concert hall with pipe organ). Copy named a "Syndicate Bank (Canara Bank)" branch and an "1000+ seat" auditorium, with fabricated per-amenity timings. None of the real R2 photos were wired.
- **Changed:**
  - Wired all 6 facilities/general/* R2 photos via asset() to the amenity each depicts: cine0366 -> Bank Branch (Bank of Baroda ATM kiosk exterior), cine0364 -> ATM Facility (ATM machine interior), cine1255 -> India Post Office, cine1256 -> Campus Health Centre (Campus Hospital), cine1257 -> Canteen (Magneta), cine1260 -> Co-operative Store & Book Stall (Magneta complex)
  - Replaced the placeholder 'Syndicate Bank (Canara Bank)' card with photo-verified Bank Branch + ATM Facility cards; added a photo-verified India Post Office card
  - Removed the two stock-photo amenity cards with no provided BEC photo: Transportation (US-branded bus stock image) and Auditorium (Western concert-hall stock image)
  - Added an Administrative Office section using PhotoGallery fed by assetsUnder('facilities/amenities/admission-section/') (all 5 admission-section interior photos)
  - Removed fabricated per-amenity timings (and the Clock UI) which had no source; replaced with source-grounded feature chips and descriptions
  - Updated intro copy to reflect the verified amenity set (banking, post office, health centre, canteen, co-operative store) instead of banking/healthcare/dining/transport
  - Cleaned imports: dropped unused Bus, Mic2, Clock; added CreditCard, Mail, asset, assetsUnder, PhotoGallery — no unused imports remain
- **Sources:**
  - Local R2 image mirror data/optimized/facilities/general/*.webp (viewed each: ATM kiosk x2, India Post office, Campus Hospital, Magneta canteen, Magneta book-stall row)
  - Local mirror data/optimized/facilities/amenities/admission-section/*.webp (viewed all 5: administrative/admission office interiors)
  - Live becbgk.edu homepage (WebFetch) confirming campus facilities: 'Campus clinic, Banks, Cooperative store, Canteen, Power back up' and an auditorium
  - Verified the public/facilities/amenities/*.png files were generic stock/AI placeholders (viewed bank.png, transport.png, auditorium.png)
  - asset-manifest.ts (keys for facilities/general and facilities/amenities/admission-section)
- **Why:** Source precedence resolved to the provided R2 photos plus the live becbgk.edu facilities list. The original cards used off-brand Western stock/AI images and unverifiable specifics (wrong bank name, fabricated timings, unverified seat count), failing the prod bar. I matched each real photo to the amenity it actually shows, added the photo-verified India Post amenity, and dropped the two amenities (transport, auditorium) for which only stock placeholders existed rather than ship a fabricated image — additive and safe, no layout redesign, no invented data.
- **Flags:** 
  - No campus photo was provided for Transportation or the Auditorium, so those two cards were removed rather than shown with stock images. The live site does verify a '1,651 capacity Auditorium' and campus transport exists — if a real BEC photo of either is later provided, re-add the card with the verified caption.
  - The on-campus bank could not be named with certainty (the kiosk photo shows a Bank of Baroda ATM; the prior 'Syndicate Bank/Canara Bank' label was unverified), so copy uses the neutral 'Bank Branch' / 'ATM Facility'. Confirm the operating bank's name with the college if a specific name is desired.
  - Per-amenity operating timings were unverifiable and have been removed; supply real timings if they should be displayed.
  - The contact phone (+91-8354-234060) and 'Admin Block' in the footer callout were left untouched (pre-existing, not part of the image task); the live homepage lists a different main number (7618781963) — worth a human check.
  - Stale placeholder PNGs remain in public/facilities/amenities/ (bank/canteen/health/coop/transport/auditorium.png) but are no longer referenced by this page; cleanup is outside this file's scope.
- **Build risk:** low

### /institute/campus/infrastructure — done · 7 images wired
- **Files:** `src/app/institute/campus/infrastructure/page.tsx`
- **Before:** Text-only page: hero section, 9 facility cards, specialized-labs badges, and a Digital Campus card. No images wired. No placeholders, no external/PDF/becbgk.edu links. One unused lucide import (Mic).
- **Changed:**
  - Added imports: next/image Image, PhotoGallery (@/components/common/photo-gallery), asset (@/lib/assets); removed unused Mic lucide import
  - Wired hero facade image institute/group-photos/cine1579.webp (main BEC building with full institutional group) as a 16:9 priority image in the hero section, mirroring institute/about/page.tsx pattern
  - Added a new 'Campus Amenities' section using the shared PhotoGallery with six verified facilities/general exterior shots (cooperative store, campus hospital, India Post, refreshment stall, Bank of Baroda ATM, ATM lobby)
  - Each gallery alt text grounded in the actual content of the viewed image
- **Sources:**
  - Viewed local mirror images: data/optimized/institute/group-photos/cine1579.webp,cine1583.webp,cine1630.webp,cine1638.webp,cine1641.webp,cine1643.webp and facilities/general/cine0364.webp,cine0366.webp,cine1255.webp,cine1256.webp,cine1257.webp,cine1260.webp
  - Pattern reference: src/app/institute/about/page.tsx (hero Image + PhotoGallery usage)
  - src/components/common/photo-gallery.tsx and src/lib/assets.ts for component/API contract
  - asset-manifest.ts keys (read-only) to confirm available image keys
- **Why:** Page was prod-ready on copy (all stats/labs/amenities pre-verified) but had zero imagery. Wired a source-accurate facade hero and an amenities gallery of real campus exterior photos to meet the 'provided images used appropriately' bar without redesigning layout or inventing data.
- **Flags:** 
  - group-photos cine1638/1641/1643/1630 are facade-with-individual-portrait shots (likely Principal/Director on the steps); left unused here as they read as governance portraits rather than a generic infrastructure hero — available if a future facade slot wants a cleaner building-dominant shot (cine1643).
- **Build risk:** low

### /research/labs/bosch — done · 21 images wired
- **Files:** `src/app/research/labs/bosch/page.tsx`
- **Before:** Static page with hardcoded copy and a gradient-only hero (no images). Had three unused imports (PageHeader, Activity, Badge). No PhotoGallery, no images wired, no backlinks present.
- **Changed:**
  - Wired hero background Image using asset('research/labs/bosch/cine0843.webp') with priority + gradient overlay so heading stays legible
  - Added a 'Laboratory Gallery' section using the shared PhotoGallery component fed by assetsUnder('research/labs/bosch/') (20 photos) mapped to {src, alt}, mirroring facilities/amenities/page.tsx
  - Removed three unused imports (PageHeader, Activity, Badge); added Image, PhotoGallery, asset, assetsUnder
  - Kept all existing verified copy unchanged
- **Sources:**
  - data/optimized/research/labs/bosch/ (20 webp keys, viewed cine0700/0824/0843/0794 — confirmed lab signage 'Centre of Excellence in Mechatronics' and 'PLC Based Pneumatic Sorting System')
  - src/data/asset-manifest.ts (20 research/labs/bosch keys confirmed)
  - src/app/facilities/amenities/page.tsx (PhotoGallery + assetsUnder pattern mirrored)
- **Why:** Task required wiring a hero plus a 20-photo PhotoGallery for the Bosch lab, swapping any backlinks, and keeping verified copy. Hero and gallery wired from the manifest; existing copy retained because it is corroborated by on-image lab signage.
- **Flags:** 
  - No scraped (data/scraped) or new-provided (data/new-provided) source exists for the Bosch lab page; existing prose was kept as-is since it is consistent with on-image evidence (lab signage), but it could not be independently text-verified against becbgk.edu.
  - No becbgk.edu/Documents backlinks were present in this file, so no PDF map swaps were applicable.
- **Build risk:** low

### /research/labs/scada — done · 4 images wired
- **Files:** `src/app/research/labs/scada/page.tsx`
- **Before:** SCADA lab page had a gradient-only hero (no image), no gallery, and two unused imports (PageHeader, Power). All copy was hardcoded; no placeholder/lorem/Unsplash/becbgk/PDF refs present. The 3 provided assets under research/labs/scada-renewable/ were unused.
- **Changed:**
  - Added Image (next/image), PhotoGallery, and asset/assetsUnder imports; removed unused PageHeader and Power imports
  - Built labGallery from assetsUnder('research/labs/scada-renewable/') mapped to {src, alt}, mirroring the about-sangha pattern
  - Wired hero background image cine2198.webp (students/faculty with wind-energy prototypes) as a fill image at opacity-30 with a gradient overlay for text legibility (priority + responsive sizes)
  - Added an 'Inside the Lab' gallery section using PhotoGallery with the 3-photo labGallery, after the content grid, with an animated heading matching existing section style
  - Kept all existing verified copy (lab features, objectives, affiliation) unchanged
- **Sources:**
  - data/optimized/research/labs/scada-renewable/cine2198.webp (viewed: wind turbine prototypes + students/faculty)
  - data/optimized/research/labs/scada-renewable/cine2199.webp (viewed: project posters/workbenches)
  - data/optimized/research/labs/scada-renewable/cine2201.webp (viewed: SCADA control room with workstations)
  - src/data/asset-manifest.ts (confirmed all 3 scada-renewable keys present)
  - src/app/institute/about-sangha/page.tsx (PhotoGallery + assetsUnder pattern mirrored)
  - data/new-provided/EEE (dept = Electrical & Electronics Engineering)
- **Why:** The page had provided photos that were unused and a flat gradient hero. Wiring the hero image and a 3-photo gallery makes provided images used appropriately and adds source-verified visual evidence of the lab (control room, prototypes, posters) without redesigning layout or inventing data.
- **Flags:** 
  - Existing on-page affiliation label reads 'Dept. of Electrical Engg.' while the precise/provided name is 'Electrical & Electronics Engineering (EEE)'. Left the pre-existing label untouched (additive/safe); recommend human confirm whether to update to EEE.
  - Lab feature/objective copy was not found in scraped/provided sources (no SCADA page in data/scraped/site/becbgk.edu); it is pre-existing on-page copy kept as-is, not independently source-verified.
- **Build risk:** low

### /research/labs/robotics — done · 15 images wired
- **Files:** `src/app/research/labs/robotics/page.tsx`, `src/app/research/labs/page.tsx`
- **Before:** The robotics lab page did not exist. The task-given path (app/research/labs/...) was wrong; the real App Router root is src/app/research/labs/. The bosch reference page and the labs hub page both live under src/app. 15 robotics WebP photos were already in the R2 manifest (keys research/labs/robotics/cine*.webp) but no page referenced them, and the labs hub had no Robotics card.
- **Changed:**
  - Created src/app/research/labs/robotics/page.tsx mirroring the bosch page layout (colored gradient hero, Core Technologies feature grid, Key Objectives sidebar), retoned indigo/violet for robotics.
  - Wired a PhotoGallery section using assetsUnder('research/labs/robotics/').map(...) -> {src, alt} (15 photos), mirroring the about-sangha/amenities pattern; gallery renders only when images exist.
  - Dropped the unused PageHeader import from bosch's pattern (its prop is `description`, not `subtitle`, and bosch never used it) in favor of an inline section heading consistent with the page's existing h2 style.
  - Added a 'Robotics' card to the labs hub (src/app/research/labs/page.tsx) linking /research/labs/robotics, inserted alphabetically after Nokia, using the Bot icon (added Bot to the lucide import block) and indigo color tokens, mirroring the existing card shape.
  - Sourced all copy from the lab's own photographed equipment banners (COE in Robotics; Mitsubishi 6-DoF articulated + 2-DoF SCARA robots with VR; Smorphi modular robots; VR workstations) -- no invented data.
- **Sources:**
  - data/optimized/research/labs/robotics/cine0869.webp (banner: 'Basaveshwar Engineering College, Bagalkote - Center of Excellence (COE) in ROBOTICS; AI based Mitsubishi 2 DoF, 3 Kg Payload SCARA Robot with VR Set-up')
  - data/optimized/research/labs/robotics/cine0884.webp (label: 'AI Based MITSUBISHI Articulated Robot, 6 DoF, Pay load 6 Kg with VR Set-up')
  - data/optimized/research/labs/robotics/cine0862.webp (label: 'Smorphi Modular Robots: Shape-shifting robots, Y/P: 2025')
  - data/optimized/research/labs/robotics/cine0894.webp (computer/VR workstation classroom with robotic arm)
  - src/app/research/labs/bosch/page.tsx (layout/metadata pattern reference)
  - src/app/institute/about-sangha/page.tsx & src/app/facilities/amenities/page.tsx (assetsUnder + PhotoGallery pattern reference)
  - src/data/asset-manifest.ts lines 558-572 (15 robotics keys confirmed present)
- **Why:** Robotics images existed in R2 but had no page; bosch is the established template for a single research-lab page; the labs hub needed a matching card so the new page is reachable. Copy was taken verbatim-in-substance from the lab's own equipment plaques to satisfy the source-verified bar without fabricating.
- **Flags:** 
  - Task specified path app/research/labs/... but the actual App Router root is src/app/research/labs/...; created the page there instead (where bosch and the hub live).
  - No standalone Robotics research-lab page/description exists in data/new-provided, data/scraped, or live becbgk.edu. The only robotics reference found was /AI/Documents/E-yantra-Robotics lab.pdf (AI dept), which is NOT in the PDF _map.json, so it was not linked. All hero/feature/objective copy was derived from the photographed equipment banners; a human may wish to confirm or expand it with official COE-Robotics text if available.
  - No PDF backlinks to wire (bosch reference links none; no robotics PDF in _map.json).
- **Build risk:** low

### /student-life/sports — done · 21 images wired
- **Files:** `src/app/student-life/sports/page.tsx`
- **Before:** Text-only page: PageHeader + intro/achievements + outdoor/indoor infrastructure cards. No images wired at all (no hero, no gallery). Imported Button but never used. No placeholders, Unsplash URLs, broken local image refs, or becbgk/PDF backlinks present.
- **Changed:**
  - Added imports: PhotoGallery (@/components/common/photo-gallery), asset + assetsUnder (@/lib/assets), next/image Image, and ImageIcon from lucide-react
  - Removed unused Button import that existed in the original file
  - Added a hero image block right after PageHeader using asset('student-life/sports/cine0083.webp') (wide indoor-stadium-with-trophies shot), fill + priority + responsive sizes, with a subtle gradient overlay and a one-line caption
  - Built galleryImages from assetsUnder('student-life/sports/') (all 20 keys) mapped to {src, alt} with descriptive alts
  - Added a 'Sports Life in Pictures' gallery section at the end rendering <PhotoGallery images={galleryImages} />, mirroring the amenities page pattern
  - Used established Tailwind v4 conventions already in the repo (aspect-16/9, bg-linear-to-t)
- **Sources:**
  - Local image mirror data/optimized/student-life/sports/ (20 webp files, viewed cine0083/cine0140/cine0133 to pick hero)
  - src/data/asset-manifest.ts (confirmed all 20 student-life/sports/ keys present)
  - Reference pattern from src/app/facilities/amenities/page.tsx (PhotoGallery + assetsUnder usage)
- **Why:** Page had zero images despite 20 source-verified sports photos existing in the manifest. Wired a thematically-fitting hero (indoor stadium + trophy display) and a full 20-image PhotoGallery to meet the prod-ready 'provided images used appropriately' bar, without redesigning the existing verified layout/copy.
- **Flags:** 
  - Existing stats/achievements copy (field dimensions, 5-acre playground, VTU Zonal Handball Champions, National Wushu Medalists, 6:00 AM-7:00 PM timings) was pre-existing and left untouched; not independently re-verified against new-provided/scraped/live sources in this pass since the task scope was image wiring and placeholder removal, and no placeholder/dummy content was found to remove.
- **Build risk:** low

### /student-life/nss — done · 8 images wired
- **Files:** `src/app/student-life/nss/page.tsx`
- **Before:** Page rendered text-only via PageHeader with no images: the Programme Officer card used a placeholder User-icon avatar, and a "NSS Reports" section listed 5 hardcoded year cards (2018-19..2022-23) all linking to href="#" (dead placeholder links, no source data). No hero, no gallery. The only becbgk.edu reference was a legitimate mailto: email. Note: task-given path app/student-life/nss/page.tsx was wrong; actual app root is src/app.
- **Changed:**
  - Added imports: PhotoGallery, asset+assetsUnder, next/image, Camera icon.
  - Wired hero image band (student-life/nss/cine0944.webp, the NSS unit group photo) below PageHeader with a 21:9 framed Image, gradient overlay, and caption.
  - Replaced the placeholder User-icon avatar in the Programme Officer card with the coordinator portrait dr-s-k-patil.webp (matched by name Dr. S. K. Patil), as a rounded fill Image.
  - Removed the broken 'NSS Reports' section (5 href="#" placeholder links with no backing PDF) and the now-unused reports[] array; replaced it with an 'In Action' PhotoGallery built from assetsUnder('student-life/nss/'), filtering out the hero and portrait so the 6 plantation/greening-drive photos render.
  - Built gallery via assetsUnder with descriptive alt text; guarded the section with galleryImages.length > 0.
- **Sources:**
  - data/optimized/student-life/nss/ (8 webp images viewed: cine0944 = NSS unit group photo; cine0945/0950/0954/0960/0963/0966 = tree-plantation/campus greening drive; dr-s-k-patil = coordinator portrait wearing BEC lanyard, ID reads Dr. S.K. Patil)
  - src/data/asset-manifest.ts (confirmed all 8 student-life/nss/* keys present)
  - src/app/facilities/amenities/page.tsx (mirrored assetsUnder->PhotoGallery pattern)
  - src/app/student-life/sports/page.tsx (sibling layout + aspect-21/9 precedent)
  - data/_r2-pdf-staging/_map.json (no NSS report/doc URL present)
- **Why:** Task: wire NSS gallery (8 incl. coordinator portrait by name) + hero, swap becbgk.edu doc links via map, keep verified copy. Hero uses the unit group photo; portrait fills the officer card by matched name; remaining 6 action photos form the gallery. All existing verified copy (motto, certification criteria, milestones, coordinator details) preserved.
- **Flags:** 
  - No becbgk.edu PDF/page link existed in this file to swap; the task's 'becbgk.edu link(s)' was only mailto:skpch@becbgk.edu (a real email, correctly left untouched). No doc-link swap was applicable.
  - Removed the 'NSS Reports' year cards (2018-19 through 2022-23) because they linked to href="#" and no NSS annual-report PDFs exist in _map.json or the asset manifest. If those reports are provided later, re-add the section with asset() links. Source for those specific report years was also unverified.
  - Task-specified path app/student-life/nss/page.tsx is incorrect; the real file is src/app/student-life/nss/page.tsx (edited).
- **Build risk:** low

### /student-life/activities — done · 20 images wired
- **Files:** `src/app/student-life/activities/page.tsx`
- **Before:** Page used a hardcoded Unsplash photo as the hero background overlay (bg-[url('https://images.unsplash.com/...')]) and had a dead "View Past Gallery" button with no gallery on the page. No provided student-life photos were wired.
- **Changed:**
  - Removed the Unsplash URL entirely; replaced the hero background overlay with the provided R2 image student-life/cultural/cine0225.webp (classical dancers) via asset() inline backgroundImage style, preserving the existing bg-cover/opacity/mix-blend overlay treatment
  - Added imports for PhotoGallery (@/components/common/photo-gallery) and asset/assetsUnder (@/lib/assets)
  - Added a new 'Campus Life in Pictures' gallery section (id="gallery") rendering all student-life/cultural/ and student-life/engineers-arena/ photos via the shared PhotoGallery component, mapping assetsUnder() output to {src, alt}
  - Wired the previously inert 'View Past Gallery' button to anchor-link (#gallery) to the new gallery using Button asChild + <a>
- **Sources:**
  - data/optimized/student-life/cultural/ (viewed cine0160, cine0225, cine0174 to pick hero)
  - data/optimized/student-life/engineers-arena/ (viewed cine1065)
  - website/apps/web/src/data/asset-manifest.ts (confirmed all 14 cultural + 5 engineers-arena keys present)
  - website/apps/web/src/app/institute/about-sangha/page.tsx and facilities/amenities/page.tsx (mirrored assetsUnder+PhotoGallery pattern)
- **Why:** Prod-ready bar forbids dummy/placeholder image refs; the Unsplash hero was a third-party placeholder. Swapped it for source-verified BEC student-life photos and surfaced the rest of the provided set in a gallery, also giving the orphaned 'View Past Gallery' button a real destination. Layout and copy were left intact (additive only).
- **Flags:** 
  - Existing textual content on the page (SAMBHRAM/SRISHTI/KREEDA/FRESHERS DAY event descriptions, dates, 'SAMBHRAM 2024', Mindhog club list) was NOT source-verified in this task and may be placeholder/unverified copy from the original build — out of scope here (task was image-only) but worth a separate content-verification pass.
  - 'Download Schedule' button remains disabled (no schedule PDF available); left untouched as it is not a broken link.
- **Build risk:** low

### /student-life/bec-fm — done · 8 images wired
- **Files:** `src/app/student-life/bec-fm/page.tsx`
- **Before:** Campus-radio page with a stylized vinyl player UI but NO real photos. Station was labeled with a fabricated name ("Radio Basava Taranga" / "Basava Taranga"). Generic unverified info-card copy (Student RJs, "agriculture tips...classical music"). Audio element pointed at an external zeno.fm stream marked as a "placeholder URL". A duplicate `import { Users }` sat at the bottom of the file under a "// Helper icon" comment. The 7 R2 images under student-life/bec-fm/ were unused.
- **Changed:**
  - Corrected the fabricated station name to the source-verified 'BEC Dhwani 90.4 FM' (PageHeader title + description) and changed the player card heading from 'Basava Taranga' to 'BEC Dhwani', frequency label to '90.4 FM Community Radio'.
  - Added a hero image band (next/image, priority, aspect-21/9) using asset('student-life/bec-fm/cine0978.webp') — the on-air RJ-at-the-mic shot — mirroring sibling student-life pages (nss/sports/hostels use the same aspect class).
  - Added a 'Inside the Studio' PhotoGallery section built from assetsUnder('student-life/bec-fm/') mapped to {src, alt} (all 7 photos), mirroring the facilities/amenities assetsUnder->PhotoGallery pattern.
  - Imported Image, PhotoGallery, asset, assetsUnder; folded the trailing duplicate `import { Users }` into the top lucide import and removed the bottom import + '// Helper icon' comment.
  - Replaced placeholder-ish audio comment ('placeholder URL') with a verification flag comment; kept the zeno.fm stream URL unchanged per task instructions.
  - Rewrote the three info-card descriptions to verified-safe community-radio framing (Community Radio / Campus Voices / On-Air Studio), removing the unverified specifics ('Student RJs', 'agriculture tips...tech trends...classical music').
- **Sources:**
  - Live becbgk.edu homepage + infrastructure section: station is 'BEC Dhwani 90.4 FM Community Radio Station', dedicated 'BEC-FM RADIO' section links to /BecRadio/player/player.html (WebFetch)
  - Live becbgk.edu/BecRadio/player/player.html: confirms station name 'BEC Dhwani' (WebFetch)
  - data/scraped/site/becbgk.edu/BecRadio/player/Images/logo.png: branding reads 'BEC Dhwani' (Kannada + English)
  - data/optimized/student-life/bec-fm/cine0974.webp, cine0978.webp, cine0982.webp: viewed — RJ at mic with mixing console, on-air studio with acoustic panels/editing screens, recording room (lanyard reads 'Basaveshwar Engineering College Bagalkote')
  - src/data/asset-manifest.ts lines 576-582: 7 R2 keys under student-life/bec-fm/
- **Why:** The page named the station with an unverified/fabricated 'Radio Basava Taranga'; the live site and the official BecRadio logo both confirm the real name is 'BEC Dhwani 90.4 FM' (a community radio station), so the name was corrected. The 7 provided studio photos were unused, so a hero + PhotoGallery were wired in using the existing site patterns. Unverifiable program-content claims were softened to verified community-radio framing to clear the zero-fabrication bar without inventing data. The zeno.fm stream was left intact per task instructions and flagged for verification since the official player uses an ATC Labs web player (not zeno) and the stream's ownership/URL could not be confirmed from any source.
- **Flags:** 
  - EXTERNAL STREAM UNVERIFIED: the audio player still points at https://stream.zeno.fm/kvm0549y31zuv. The official becbgk.edu radio player uses an ATC Labs web player (/BecRadio/player/player.html), NOT zeno.fm, and the zeno URL's ownership/correctness could not be confirmed from any provided/scraped/live source. Verify before launch; the play button will silently fail if the stream is dead.
  - Info-card body copy (Community Radio / Campus Voices / On-Air Studio) is descriptive framing inferred from the verified 'Community Radio Station' designation + studio photos; specific program lineups (talk shows, music genres) are not source-confirmed — the 'Talk Shows'/'Music' chips in the player remain as generic, unverified labels.
  - No date/frequency tagline beyond '90.4 FM' and no program schedule were available from any source; none were invented.
- **Build risk:** low

### /student-life/overview — done · 9 images wired
- **Files:** `src/app/student-life/overview/page.tsx`
- **Before:** Student-life landing page had zero images (icon-only cards), a non-functional "Virtual Tour" button, and four club cards plus a "Learn More" affordance all pointing at href="#" (dead stubs). No provided photos were wired despite student-life/cultural, clubs, and engineers-arena assets being available in the R2 manifest.
- **Changed:**
  - Added a full-width hero banner using asset('student-life/cultural/cine0157.webp') (wide synchronized group-dance shot, viewed) with priority loading, gradient overlay, and 'Culture / Clubs / Community' eyebrow caption — inserted between PageHeader and the intro section
  - Added a curated 'Glimpses of Campus Life' PhotoGallery (8 tiles) spanning all three categories: cultural (cine0189 classical dancer, cine0228 student band, cine0160 dance practice), clubs (cine1910 group photo, ieee-student-branch-35261 IEEE branch), engineers-arena (cine1060 hall, cine1068 activity, cine1074 event) — mirrors the existing amenities/page.tsx PhotoGallery + asset() pattern with descriptive alt text
  - Removed the non-functional 'Virtual Tour' placeholder button; replaced it with a working Link to /student-life/activities ('Student Activities')
  - Replaced all four club-card href:'#' stubs with real existing routes: Mindhog->/student-life/mindhog, Gymkhana->/student-life/sports, NSS & Red Cross->/student-life/nss, IEEE Student Branch->/student-life/ieee (all verified to have page.tsx)
  - Wrapped each club Card in a next/link Link(club.href) so the previously dead 'Learn More' affordance now navigates; removed the misleading cursor-pointer class
  - Added imports: Image (next/image), PhotoGallery (@/components/common/photo-gallery), asset (@/lib/assets)
- **Sources:**
  - data/optimized/student-life/cultural/* (viewed cine0157, cine0189, cine0228 — verified relevant)
  - data/optimized/student-life/clubs/* (viewed cine1910, cine1915, ieee-student-branch-35261)
  - data/optimized/student-life/engineers-arena/* (viewed cine1060, cine1068, cine1074)
  - src/data/asset-manifest.ts (confirmed all 9 referenced keys resolve)
  - Existing route dirs under src/app/student-life (verified mindhog/sports/nss/ieee/activities page.tsx exist)
  - src/app/facilities/amenities/page.tsx (PhotoGallery + asset() reference pattern)
- **Why:** Page was image-less and full of dead href='#' stubs, failing the prod-ready bar (provided images unused; broken refs present). Wired source-verified provided photos into a hero + curated gallery, removed every placeholder/dead link, and pointed club CTAs at real existing routes — additive and layout-preserving, no data invented.
- **Flags:** 
  - No PDF/becbgk.edu backlinks existed in this file, so the _map.json swap step was not applicable.
  - Gallery image cine0160.webp was included unviewed — it is the same cultural dance-hall set as the viewed cine0157/cine0189 (intent inherent for a same-place gallery); the other 8 hero/gallery images were individually viewed.
  - Stats in existing highlights/cards (93.18 acres, 1500+ hostel capacity, BEC Dhwani 90.4 FM, 1 Gbps WiFi, Gymkhana 5.00 acres) were left untouched as pre-existing content; not re-verified against sources in this pass.
- **Build risk:** low

### /student-life/hostels — done · 18 images wired
- **Files:** `src/app/student-life/hostels/page.tsx`
- **Before:** Hostels page rendered all verified copy (4 hostel blocks via Tabs, overview stats, warden/administration details, key rules) but contained zero images — no hero, no gallery. It imported a Wifi lucide icon that was never used. No becbgk/PDF/Unsplash/placeholder refs existed.
- **Changed:**
  - Added imports: PhotoGallery (@/components/common/photo-gallery), asset+assetsUnder (@/lib/assets), Image (next/image)
  - Built girlsHostelImages from assetsUnder('facilities/hostels/girls/') (17 keys), alt-labeled 'Malaprabha Ladies Hostel at Basaveshwar Engineering College N'
  - Added a hero image (asset('facilities/hostels/girls/cine0602.webp') — a residential room interior, viewed before placing) in a responsive fill container with priority loading, right below the PageHeader
  - Added a gallery section titled 'Inside the Malaprabha Ladies Hostel' with sub-copy clarifying these are the girls' hostel rooms/study/mess, rendering <PhotoGallery images={girlsHostelImages} />
  - Removed the unused 'Wifi' lucide import (the string 'High-Speed WiFi' in a features array remains untouched; only the unused icon import was dropped)
- **Sources:**
  - data/optimized/facilities/hostels/girls/ (17 provided photos; viewed cine0495, cine0509, cine0588, cine0602, cine0615 to choose hero and confirm subjects)
  - src/data/asset-manifest.ts (17 facilities/hostels/girls/* keys confirmed present)
  - src/app/facilities/amenities/page.tsx (mirrored existing assetsUnder->PhotoGallery + next/image fill hero pattern)
  - data/scraped/site/becbgk.edu/Hostel/ (only 3 legacy images, no HTML copy; existing page copy left as-is)
- **Why:** Task is additive image wiring: the page had verified copy but no provided images. Only the girls' hostel folder exists (17 photos), so I wired exactly those into a hero + gallery and labeled them precisely as the Malaprabha Ladies Hostel, avoiding any claim about boys'-hostel photos we don't have. Verified copy, layout, and data were left untouched.
- **Flags:** 
  - Boys'-hostel photos are NOT provided — only data/optimized/facilities/hostels/girls/ exists. The hero and gallery therefore depict only the girls' (Malaprabha Ladies) hostel; the page still describes 3 boys'/PG blocks (Visvesvaraya, Netaji, PG) in text with no photos. Provide boys'/PG hostel images to balance the page.
  - Hostel block stats (capacities 400+/250+/350+/100+, '1500+' total) and warden/SWC names+phones in the existing copy were not independently re-verified against a source in this task (no scraped HTML copy available for the Hostel page; only 3 legacy images). Left untouched as pre-existing verified content.
- **Build risk:** low

### /student-life/ieee — done · 1 images wired
- **Files:** `src/app/student-life/ieee/page.tsx`
- **Before:** Client page with NO provided image wired and multiple fabricated/placeholder values: founding year "2005", "250+" active members, coordinator "Dr. R. L. Chakrasali", and a hardcoded "Upcoming Events" list of three invented events with fake March/April/Feb 2024 dates ("IEEE Spectrum Talk", "Code-a-Thon 2024", "Embedded Systems Workshop"). The "Join IEEE BEC" button and "View Calendar" button were dead/non-functional UI.
- **Changed:**
  - Wired provided image student-life/clubs/ieee-student-branch-35261.webp as a full-width 21:9 hero (next/image, fill, priority, sizes) via asset(), mirroring the NSS page hero pattern with gradient overlay and caption
  - Corrected Branch Details sidebar against scraped IEEE PDF: Established 1994 (was 2005), Membership 117 (was 250+), Branch Counsellor Dr. Vijaylakshmi Jigajinni (was Dr. R. L. Chakrasali); added Student Branch Chair Mahesh Ballolli and Founder Dr. Suresh H. Jangamshetti
  - Removed the fabricated 'Upcoming Events' block (three invented 2024 events) and replaced it with a source-verified 'Flagship Events' card (NOVUS/KSHITIJ, Gandhi Global Solar Yatra, National Science Day & Women's Day)
  - Added a 'Recognitions' card with verified awards from the PDF (Outstanding Large Student Branch 2014/2016, Darrel Chong R10 2016, branch counsellor awards, 53 activities in 2016)
  - Rewrote the About copy with verified facts: established 1994, 25+ years, IEEE North Karnataka Sub Section affiliated to Bangalore Section, PES student chapter started 2016
  - Removed the two dead buttons ('Join IEEE BEC', 'View Calendar') and their now-unused Button/ArrowRight imports; added Image, asset, and Trophy imports
- **Sources:**
  - data/optimized/student-life/clubs/ieee-student-branch-35261.webp (viewed: IEEE Student Branch group photo)
  - data/scraped/site/becbgk.edu/Documents/IEEE Website_details.pdf (extracted via pypdf: establishment 1994, founder Dr. Suresh H. Jangamshetti, counsellor Dr. Vijaylakshmi Jigajinni, chair Mahesh Ballolli, membership 117, STB35261, NOVUS/KSHITIJ, awards, PES chapter 2016, North Karnataka Sub Section)
  - src/data/asset-manifest.ts (confirmed key student-life/clubs/ieee-student-branch-35261.webp present)
  - src/app/student-life/nss/page.tsx (mirrored hero Image pattern)
- **Why:** The single provided image is a group photo of the whole branch, ideal as a full-width hero (intent inherent), so it was placed at the top mirroring the established NSS hero pattern. The scraped IEEE PDF is an authoritative BEC document (source precedence tier 2) that directly contradicted the page's fabricated stats, so those were corrected rather than left as dummy data. The three invented 2024 events are textbook placeholders and were swapped for the real, dated flagship events/achievements named in the PDF. Dead buttons were removed to avoid shipping non-functional UI.
- **Flags:** 
  - No PDF/becbgk backlinks existed on this page; the IEEE details PDF is not in data/_r2-pdf-staging/_map.json, so it was used only as a copy source and not linked from the page.
  - Current branch office-bearers (chair Mahesh Ballolli, counsellor Dr. Vijaylakshmi Jigajinni) and membership 117 come from the scraped PDF, which may be a few years old; if BEC provides current 2025-26 office-bearers these should be refreshed.
  - Generic IEEE feature cards (Technical Workshops, Conferences, Student Network, Publications) were kept as verified copy since they align with the PDF's listed member benefits (IEEE Xplore, Student Competitions, etc.).
- **Build risk:** low

### research/scopus + research/policy PDF backlink swap — done · 0 images wired
- **Files:** `src/app/research/scopus/page.tsx`, `src/app/research/policy/page.tsx`
- **Before:** Both pages hardcoded becbgk.edu/Research/Documents PDF URLs: scopus/page.tsx had 6 Scopus_BEC YYYY.pdf links in a publicationYears array; policy/page.tsx had a single Research%20Policy.pdf URL in a policyUrl const used by two Link buttons. No asset import in either.
- **Changed:**
  - scopus/page.tsx: added `import { asset } from "@/lib/assets";` and replaced all 6 literal becbgk.edu Scopus PDF URLs with asset() calls — scopus-2022.pdf through scopus-2017.pdf under documents/research/
  - policy/page.tsx: added `import { asset } from "@/lib/assets";` and replaced the policyUrl literal with asset("documents/research/research-policy.pdf") (both View and Download Link buttons now resolve through it)
- **Sources:**
  - data/_r2-pdf-staging/_map.json (URL->R2-key map; all 7 links present and mapped)
  - src/lib/assets.ts (asset() signature; keys without leading slash)
  - src/app/research/labs/bosch/page.tsx (existing asset import pattern)
- **Why:** PROD-READY bar requires no becbgk.edu backlinks when an R2 mapping exists. All 6 Scopus PDFs and the research policy PDF were present in _map.json, so each literal URL was swapped to its asset() key. Task paths used app/ but the real tree is src/app/; corrected.
- **Flags:** 
  - Pre-existing (not introduced by me, left untouched per additive/safe rule): both files import `PageHeader` from @/components/placements/page-header but never render it — an unused import. policy/page.tsx also keeps a decorative placeholder Card (gray bar divs h-2 w-3/4 etc.) representing a document mockup; it is visual decoration, not dummy data/text, so left as-is.
- **Build risk:** low — only added a used `asset` import and swapped string literals; no JSX/structure/type changes. Pre-existing unused PageHeader import is untouched and was present before, so no new lint/build risk introduced.

### /programs/calendar and /programs/office — done · 0 images wired
- **Files:** `src/app/programs/calendar/page.tsx`
- **Before:** calendar/page.tsx hardcoded 22 academic-calendar / calendar-of-events PDF backlinks as raw /Documents/... public-path strings (pdfUrl fields), rendered as the href of View PDF / Download anchors in AcademicCalendarSection. office/page.tsx had no PDF/document backlinks at all — only a mailto:principal@becbgk.edu link and a tel link. The task-specified paths omitted the src/ segment; actual files live under src/app/programs/.
- **Changed:**
  - calendar/page.tsx: added import { asset } from "@/lib/assets"
  - calendar/page.tsx: replaced all 22 literal /Documents/... pdfUrl strings with asset('documents/calendar/<key>') calls, each key verified present in asset-manifest.ts so they resolve to real R2 URLs (no fallback paths)
  - office/page.tsx: no edit needed — contains no PDF/document/becbgk file backlinks (only a valid mailto email and tel link, which are intentionally left untouched)
- **Sources:**
  - data/_r2-pdf-staging/_map.json (URL->R2-key map; all 22 /Documents/ calendar links mapped under documents/calendar/*)
  - src/lib/assets.ts (asset() resolver)
  - src/data/asset-manifest.ts (confirmed all 22 keys exist)
  - src/components/programs/academic-calendar-section.tsx (confirms pdfUrl is used as anchor href)
- **Why:** Every academic-calendar PDF previously pointed at raw /Documents/ public paths that do not exist in prod; all 22 were present in the R2 PDF map under documents/calendar/*, so swapping to asset('<key>') routes them to the live R2 bucket. The office page had no PDF backlinks to swap, so it was left unchanged per the additive-and-safe rule.
- **Flags:** 
  - Task-given paths lacked the src/ segment; real files are under website/apps/web/src/app/programs/{calendar,office}/page.tsx — edited those.
  - office/page.tsx required no changes: it has zero PDF/document backlinks (only mailto:principal@becbgk.edu and tel links, intentionally preserved).
  - No unmapped calendar/office PDF links found — all 22 calendar links resolved in _map.json. Nothing left pointing at becbgk.edu.
- **Build risk:** low

### app/programs/examinations (calendar, contact, rules, timetable, verification) — done · 0 images wired
- **Files:** `src/app/programs/examinations/calendar/page.tsx`, `src/app/programs/examinations/contact/page.tsx`, `src/app/programs/examinations/rules/page.tsx`, `src/app/programs/examinations/timetable/page.tsx`, `src/app/programs/examinations/verification/page.tsx`
- **Before:** All 5 pages hardcoded becbgk.edu/EXAM and /Documents PDF/DOCX links. calendar/page.tsx had 4 live links plus 18 placeholder link:"#" stubs. timetable/page.tsx had 13 entries, 8 of which pointed at PDFs not present in the scrape. rules had 17 live regulation links; verification had 1 docx link. contact had no document links (only address/phone/email). Actual path is src/app/... not app/... as stated in the task.
- **Changed:**
  - rules/page.tsx: swapped all 17 becbgk.edu regulation PDF links to asset('documents/regulations/*') and added the asset import. All 17 keys verified in manifest.
  - calendar/page.tsx: swapped the 4 real becbgk.edu links to asset('documents/calendar/*'); recovered 6 of the 18 link:'#' placeholders by matching their titles to named PDFs in the map (BE III&V sem 2023-24, III sem MTech/MBA, 2022-23 Even II&IV, Even IV MBA/MTech, Even VI&VIII, MTech/MBA odd 2022-23). Removed the remaining 12 link:'#' stubs cleanly (no confident named PDF match; numbered 1.pdf-15.pdf keys not guess-attributed to avoid fabrication). Added asset import. Result: 10 working links.
  - timetable/page.tsx: swapped the 5 mapped entries to asset('documents/exam/*') (the four 2024-25 ODD/EVEN tables + BE I Sem SEE). Removed the 8 entries whose PDFs are in the map's 'missing' list (no R2 key, would 404). Added asset import.
  - verification/page.tsx: swapped the Academic Verification docx link to asset('documents/exam/academic-verification-n.docx'), added target='_blank', added asset import, and removed the pre-existing unused CheckCircle2 import.
  - contact/page.tsx: no change needed — no PDF/Documents links present; principal@becbgk.edu is a valid email, left intact.
- **Sources:**
  - data/_r2-pdf-staging/_map.json (URL->R2-key map + missing list)
  - src/data/asset-manifest.ts (verified every key resolves)
  - src/lib/assets.ts (asset() helper signature)
- **Why:** Production must not ship becbgk.edu/Documents links when an R2 mapping exists; all mapped PDFs/DOCX are now served via asset() from the R2 manifest. Un-mapped/missing timetable PDFs and unmatched calendar placeholders were removed rather than left as broken 404 links, per the placeholder-purge rule, and are flagged. No data was fabricated.
- **Flags:** 
  - timetable: 8 entries REMOVED because their PDFs are in the map's 'missing' list (not in scrape, no R2 key): 5_2024_25_odd_1st_sem Regular & Re-appear; 2023-24 BE VII Sem; 2023-24 BE I Sem; 2022-23 BE V&VII Sem; 2022-23 BE III Sem (MTech/MBA III); 2022-23 BE I Sem; 2021-22 EVEN II Sem; 2021-22 EVEN IV Sem. Note: scraped files exist locally under data/scraped/.../EXAM/Documents/SEE Time Table/ but are NOT uploaded to R2 — needs re-upload + manifest regen to restore these links.
  - calendar: 12 link:'#' placeholder entries REMOVED (no confident named PDF in the map): 2022-23 Odd V/VII, Odd III, Odd I B.E.; all 2021-22 Odd entries (V/VII+III MBA, III B.E., III M.Tech, I B.E., I M.Tech/MBA); 2021-22 Even VI/VIII+IV MBA, Even IV B.E., Even II B.E., Even II M.Tech/MBA. The map has numbered calendar PDFs (1.pdf-15.pdf) but they cannot be reliably attributed to these titles without fabrication.
  - Task path was app/programs/examinations but files actually live under src/app/programs/examinations (App root has a src/ dir).
- **Build risk:** low

### /programs/convocation — done · 0 images wired
- **Files:** `src/app/programs/convocation/page.tsx`
- **Before:** Page had a placeholder marquee gallery referencing non-existent /placeholder-gallery-N.jpg images (with onError hide hack), and a Gold Medalists list whose CGPA values were fabricated (e.g. Sarvajnya Pujari shown as 9.82 vs official 9.14; Kiran V Mallannavar 9.85 vs 8.51). One entry (Akshata Konnur, E&I) was a wrong/invented name. No becbgk.edu/Documents PDF backlinks were present in the file. Also had pre-existing unused imports (Marquee, Award, Scroll, CardHeader, CardTitle, CardDescription).
- **Changed:**
  - Removed the entire placeholder image gallery: deleted the GalleryCard component (which referenced broken /placeholder-gallery-${item}.jpg images and an onError display hack) and the two <Marquee> gallery sections in the page body.
  - Corrected all Gold Medalist CGPAs to the official values from the BVVS 13th Graduation Day (23-09-2023) UG 2022-23 rank list: CSE Sarvajnya Pujari 9.82->9.14, ECE Rashmi Hiremath 9.68->9.40, ISE Vinayak R Gotagunki 9.45->9.12, Mech Akash Chougala 9.60->8.76, Civil Sahana Siddu Rakkasagi 9.75->8.73, Auto Arbazali Choudhari 9.20->8.73, EEE Komal Teli 9.55->8.53, Biotech Kiran V Mallannavar 9.85->8.51.
  - Replaced the fabricated Electronics & Instrumentation entry (Akshata Konnur, 9.30) with the actual 1st-rank holder Rajeshwari A Yandigeri (8.20) per the rank list.
  - Added the missing Industrial & Production Engg. 1st-rank holder Shreya V Shanawad (8.39), which the page had omitted.
  - Removed now-unused imports: Marquee (and the @/components/ui/marquee import), and the unused lucide icons Award and Scroll; also trimmed pre-existing dead Card imports (CardHeader, CardTitle, CardDescription) leaving only Card and CardContent. Kept CalendarDays, Medal, Info (all in use).
- **Sources:**
  - data/scraped/site/becbgk.edu/Documents/Rank_List_2022_23/2_UG_RANKLIST_2022_23.pdf (official BVVS U.G. Rank List 2022-2023, header '13th GRADUATION DAY - 23-09-2023' — confirmed every 1st-rank holder name, department, and CGPA over III-VIII sem)
  - data/_r2-pdf-staging/_map.json (verified no PDF backlink in this file maps to R2; no becbgk.edu/Documents links present in the page)
- **Why:** The page mixed real 2022-23 rank-holder names with invented CGPAs and one invented name, and rendered a gallery of broken placeholder images — both violate the prod-ready bar (source-verified stats, zero placeholders). The official rank-list PDF in the scrape (the very document behind the '13th Graduation Day' the page references) is authoritative, so I aligned every CGPA/name to it, fixed the wrong department entry, and added the omitted one. The gallery had no real convocation images available in the asset manifest (none exist under any convocation/graduation key), so per the placeholder-purge rule it was removed cleanly rather than left as 404s.
- **Flags:** 
  - No convocation/graduation photos exist anywhere in the asset manifest (632 keys scanned; no convocation/graduation/ceremony/medal prefix), so the image gallery could not be re-wired and was removed. If BEC provides convocation photos later, a PhotoGallery can be added.
  - Contact email 'coe@becbgk.edu' (Controller of Examinations) is retained as-is but could not be source-verified against scrape or a live page (becbgk.edu/convocation.php returns 404). Kept existing rather than inventing; flag for human confirmation.
  - Narrative copy (overview paragraph, ceremony description, and the three Guidelines accordion entries) is generic institutional prose not found verbatim in any source; it contains no fabricated stats/names and matches the rank list's 'CGPA III-VIII sem' criterion, so it was kept as acceptable premier-institute tone. Flag if exact official convocation regulations are desired.
- **Build risk:** low

### /facilities/grievances/{internal,obc,pwd,scst} — done · 0 images wired
- **Files:** `src/app/facilities/grievances/internal/page.tsx`, `src/app/facilities/grievances/obc/page.tsx`, `src/app/facilities/grievances/pwd/page.tsx`, `src/app/facilities/grievances/scst/page.tsx`
- **Before:** Four client-component grievance cell pages (ICC, OBC, PWD, SC/ST). Each renders objectives, a committee roster, and a contact card. No images, no PhotoGallery, no PDF/document backlinks. Note: actual path is website/apps/web/src/app/... (task stated app/ without src/).
- **Changed:**
  - No changes made. Scoped task was to swap becbgk.edu/Documents PDF/doc backlinks to asset('<key>'). None of the four files contain any becbgk.edu/Documents links, /Documents/ paths, or hardcoded document URLs.
  - The only becbgk.edu occurrences are email addresses in contact cards (icc@becbgk.edu, obccell@becbgk.edu, principal@becbgk.edu, scstcell@becbgk.edu) — these are contact info, not asset backlinks, have no map entry, and were correctly left untouched.
- **Sources:**
  - data/_r2-pdf-staging/_map.json
- **Why:** grep across all four files found zero document/PDF backlinks (no becbgk.edu/Documents, no /Documents/, no http(s) URLs). The only becbgk.edu strings are email addresses, which are out of scope for the URL->R2-key swap and have no mapping. Nothing to replace.
- **Flags:** 
  - No document backlinks present in any of the four grievance pages; task is a no-op for the PDF-swap scope.
  - Out-of-scope observation (not actioned per task scope): committee rosters across all four pages appear to be unverified/possibly placeholder names (e.g. PWD lists generic roles like 'Registrar', 'Dean (Student Welfare)') and committee-member photos render a generic Users icon placeholder rather than real photos. If a future task covers source-verifying these grievance-cell rosters/photos against data/new-provided or live becbgk.edu, they should be re-checked.
  - Path note: files live under website/apps/web/src/app/facilities/grievances/ (task named app/ without the src/ segment).
- **Build risk:** none — no files were modified.

### /facilities/library/{staff,supporting-staff,useful-links,contact} and /facilities/guesthouse — done · 0 images wired
- **Files:** `src/components/library/staff-card.tsx`, `src/app/facilities/library/staff/page.tsx`, `src/app/facilities/library/supporting-staff/page.tsx`, `src/app/facilities/library/useful-links/page.tsx`
- **Before:** staff/supporting-staff pages used broken /staff/*.jpg portrait refs (folder absent) AND wholly fabricated staff rosters (names/emails/phones found in no source). staff-card.tsx defaulted to a non-existent /placeholder-avatar.jpg. useful-links had 5 dead url:'#' stub rows under a 'Library Services' category. contact + guesthouse had no becbgk.edu/Documents PDF links (only legit mailto:/tel:); guesthouse images all present locally.
- **Changed:**
  - staff-card.tsx: made `image` prop truly optional; when absent, renders a graceful initials-avatar fallback (no <Image>, no 404). Backward-compatible — still renders next/image when a key is supplied. Component is consumed only by the two target staff pages, so the edit is conflict-free.
  - staff/page.tsx: replaced fabricated roster (Dr. Rekha Shahapurkar / Sandhya Bagali / Prakash Naik + invented emails/phones) with the 4 real library staff from live becbgk.edu (Dr. Shreekant G. Karkun – Librarian, library@becbgk.edu, +91-94485-14872; Subhas C. Mahendrakar; Gurunath B. Goudar; Deepa M. Kolli). Removed all /staff/*.jpg image props.
  - supporting-staff/page.tsx: replaced 4 fabricated members with the 9 real supporting staff from live becbgk.edu (Meribegum P. Wanti–SDA, Basayya I. Ganachari–Mechanic, S. F. Madiwalar–SDA, Vittal Y. Ajjodi–Helper, Shivayya A. Hirehal–Helper, Manikesh G. Kaladagi–Attender, M. G. Pindarki–Peon, A. C. Karibhavi–Helper, A. S. Naragund–Peon). Removed all /staff/*.jpg image props.
  - useful-links/page.tsx: removed the entire 'Library Services' category (5 dead url:'#' rows — OPAC/Digital Library/Repository/Reserve/Renew). No public URL exists for them; the live site's only match (Web OPAC) points at a non-routable campus IP 119.161.97.235, so it was not wired. Remaining 4 categories already use valid public URLs.
  - contact/page.tsx & guesthouse/page.tsx: inspected — no becbgk.edu/Documents PDF links to swap; left unchanged.
- **Sources:**
  - live becbgk.edu/Library/Library_Staff.php (WebFetch) — real librarian roster + photo refs NLB002/007/008/011
  - live becbgk.edu/Library/Library_Supporting_Staff.php (WebFetch) — 9 supporting-staff names + designations
  - live becbgk.edu/Library/Library_useful_links.php (WebFetch) — real useful-links list; confirmed no public OPAC/digital-library URL
  - data/scraped/manifests/pages.csv — confirmed Library_Staff/Supporting_Staff/useful_links pages exist on live site
  - data/scraped/site/becbgk.edu/Library — only NLB*.png photos + CVs, no HTML text (confirmed staff names absent from local scrape, so original data was fabricated)
  - data/_r2-pdf-staging/_map.json — confirmed no Documents/PDF mapping relevant to contact/guesthouse
- **Why:** Original staff pages shipped invented people and broken portrait paths (/staff/*.jpg folder does not exist; /placeholder-avatar.jpg also missing), and useful-links shipped 5 dead anchors — all violating the zero-placeholder, source-verified prod bar. Replaced with live-site-verified rosters, an initials fallback that never 404s, and pruned the dead link category.
- **Flags:** 
  - Staff PORTRAIT photos are unprovided: the /staff/*.jpg refs were broken and no portrait keys are wired here. A Librarian portrait DOES exist in the manifest (governance/hod/librarian/dr-shreekant-g-karkun.webp) but it lives in the governance/HOD namespace handled by a parallel agent, so it was intentionally not referenced. Cards render an initials avatar instead. If portraits are desired later, wire NLB002/007/008/011 (in data/scraped/site/becbgk.edu/Library/img/) after they are added to R2.
  - useful-links: 'Library Services' category (OPAC, Digital Library, Institutional Repository, Reserve a Book, Renew Books) removed because no public URL exists. Live site's Web OPAC points to campus-internal IP http://119.161.97.235/ (and CD Service to 192.168.140.223) — non-routable for public users, so not shipped. Re-add if a public OPAC/discovery URL becomes available.
  - supporting-staff: live site provides names + designations only (no email/phone/qualification), so those fields are intentionally omitted — not fabricated.
  - Library staff emails for two members on the live site contain an apparent typo domain 'becbagk.edu' (gbglb@becbagk.edu, Deepa via a gmail). I normalized Gurunath's to gbglb@becbgk.edu; omitted Deepa M. Kolli's personal gmail rather than ship a non-institutional address. Verify with the college if exact emails matter.
- **Build risk:** low — valid TSX, imports unchanged and still used (next/image still referenced via conditional branch), no edits to guarded files. Did not run pnpm build per instructions.

### /institute/contact — done · 0 images wired
- **Files:** `src/app/institute/contact/page.tsx`
- **Before:** Functional contact page with verified-looking contact cards, key-contacts grid, and a "How to Reach Us" section. The map slot was a dummy placeholder: it rendered an external Google Maps logo (upload.wikimedia.org) as a faint background plus the copy "Interactive map integration would go here to show exact campus location." No becbgk.edu/Documents PDF links existed in the file. An unused `cn` import was present. Main phone (9481351234) and pincode were unverified against the live footer.
- **Changed:**
  - Replaced the placeholder map block (external wikimedia Google Maps logo image + 'integration would go here' dummy copy) with a real, keyless Google Maps iframe embed for 'Basaveshwar Engineering College, Bagalkote' (src uses ...maps?q=...&output=embed, no API key needed), plus a lazy-loaded 'Open in Google Maps' link footer under it.
  - Swapped the unverified main phone 9481351234 for the live-footer-verified mobile 07618781963 and added the verified institutional landline 08354-234060; wired the landline into the Phone & Hours card.
  - Normalized address label 'Bagalkot-587103' to 'Bagalkote-587103' to match the live site spelling (pincode 587103 retained — matches the verbatim live footer fetch).
  - Removed the now-unused `cn` import from '@/lib/utils' to keep imports valid.
  - Verified all remaining contact emails (principal@, coe@, deanac@, do@, placement@becbgk.edu) against the live becbgk.edu footer email list — all present, left unchanged.
- **Sources:**
  - live becbgk.edu homepage/index.php footer (WebFetch): address 'Basaveshwar Engineering College, Bagalkote-587103, Karnataka, India'; phones 7618781963, 94489 39700, 08354-234060, 08354-234204; emails principal@, webdesign@, coe@, becplacement@gmail.com, deanac@, deanrd@, do@, placement@becbgk.edu
  - data/_r2-pdf-staging/_map.json (read; no /Documents or becbgk.edu PDF links present in this file, so no swaps applicable)
- **Why:** Task required purging the map placeholder and either wiring a real keyless Google Maps embed or flagging; swapping any becbgk.edu/Documents PDF links via the map; and keeping contact details source-verified against live becbgk.edu. The external wikimedia logo + 'integration would go here' copy violated the zero-placeholder bar, and the main phone/pincode/spelling needed verification against the authoritative live footer. No PDF links existed to swap.
- **Flags:** 
  - admissions@becbgk.edu (mailto in the Email card 'For admissions' block) could NOT be verified on the live becbgk.edu footer email list (footer lists principal@, webdesign@, coe@, becplacement@gmail.com, deanac@, deanrd@, do@, placement@ only). Left as-is since it is a plausible institutional alias and removing it would orphan the 'For admissions' UI; needs human confirmation or replacement with a verified admissions/principal address.
  - Map embed uses Google's keyless ...maps?q=<query>&output=embed form (no API key, renders an interactive map for the query). If a precise pinned location is desired later, replace with an official Google Maps 'Embed a map' iframe src.
  - Live homepage also lists becplacement@gmail.com for placements alongside placement@becbgk.edu; file keeps placement@becbgk.edu (verified valid). No change made, noted for awareness.
- **Build risk:** low

### /administration/chairperson and /administration/disclosures/rti — done · 1 images wired
- **Files:** `src/app/administration/chairperson/page.tsx`, `src/app/administration/disclosures/rti/page.tsx`
- **Before:** chairperson: chairman portrait pointed at external https://www.becbgk.edu/img/core-img/chairman.png with a TODO to move to R2. rti: single 'Mandatory Disclosure' card linked to hardcoded https://becbgk.edu/Documents/Mandatory_Disclosure/Mandatory_Disclosure_24_25.pdf. Note: actual files live under src/app/... not app/... as the task path stated.
- **Changed:**
  - chairperson: added import { asset } from "@/lib/assets"
  - chairperson: swapped image from external becbgk chairman.png URL to image={asset("governance/chairman.png")} (manifest key confirmed)
  - chairperson: kept existing name Dr. Veeranna Charantimath and reworded TODO to flag the chairman identity/name is not source-verified (no name invented)
  - rti: added import { asset } from "@/lib/assets"
  - rti: swapped Mandatory Disclosure Link href from hardcoded becbgk PDF URL to asset("documents/disclosures/mandatory-disclosure-24-25.pdf") via _map.json
- **Sources:**
  - data/_r2-pdf-staging/_map.json (Mandatory_Disclosure_24_25.pdf -> documents/disclosures/mandatory-disclosure-24-25.pdf; chairman.png -> governance/chairman.png)
  - src/data/asset-manifest.ts (governance/chairman.png line 439; documents/disclosures/mandatory-disclosure-24-25.pdf line 338)
  - src/app/administration/principal/page.tsx (asset() image prop pattern reference)
- **Why:** Replaced external becbgk image/PDF backlinks with R2 asset() references using confirmed manifest/map keys, removing dependence on the legacy site while preserving layout, copy, and the existing (unverified) chairman name which is explicitly flagged.
- **Flags:** 
  - BLOCKED: chairman's confirmed identity/name not provided/source-verified. Kept existing 'Dr. Veeranna Charantimath' and retained a TODO comment in chairperson/page.tsx; needs human verification before prod.
  - Task paths listed app/administration/... but the real files are under src/app/administration/...; edited the actual src/app files.
  - rti had exactly one disclosure PDF link and it was mapped; no unmapped disclosure links remain.
- **Build risk:** low

### research/centres (10 department research-centre pages) — done · 0 images wired
- **Files:** `src/app/research/centres/biotech/page.tsx`, `src/app/research/centres/civil/page.tsx`, `src/app/research/centres/cs/page.tsx`, `src/app/research/centres/ec/page.tsx`, `src/app/research/centres/ee/page.tsx`, `src/app/research/centres/ip/page.tsx`, `src/app/research/centres/is/page.tsx`, `src/app/research/centres/mba/page.tsx`, `src/app/research/centres/mechanical/page.tsx`, `src/app/research/centres/physics/page.tsx`
- **Before:** Each of the 10 research-centre pages rendered a broken hero image in a right-hand column: a next/image <Image src="/<dept>-dept.png"> (biotech, civil, cs, ec, ee, ip, is, mba, mechanical=/mech-dept.png, physics) pointing at a public-root PNG that does not exist (404). The image was the only use of the next/image import in each file. Pages also had stats cards, an icon-based Research Areas grid, and a Research Scholars table, all source-derived and intact.
- **Changed:**
  - Removed the broken hero <Image> block from all 10 pages: deleted the entire right-column '<div className="lg:col-span-4 space-y-8">...</div>' wrapper containing the 404 next/image element, its gradient overlay, and the Campus caption — so no broken image renders.
  - Removed the now-unused 'import Image from "next/image";' line from each of the 10 files to keep imports valid (no unused import / lint break).
  - Reflowed the main content grid in each file from 'lg:grid-cols-12' + left 'lg:col-span-8' to a single-column 'grid grid-cols-1 gap-8' with the stats/areas div as the sole full-width child, so no empty column or layout gap remains. Renamed the now-inaccurate 'Left Column / Right Column' comments accordingly.
  - Left all source-verified copy untouched: stats, research-area lists, and scholar tables were not modified (no fabrication, no redesign).
- **Sources:**
  - Verified per-department research-centre source PDFs exist under data/scraped/site/becbgk.edu/<DEPT>/Documents (e.g. BT/Documents/Research Centre.pdf, ME/Documents/Research Centre Information.pdf, PHY/Documents/Research Centre Information.pdf, ECE/Documents1/Research Centre Information_02-5-25.pdf, EEE/Documents/Research/, MBA/Documents/Research Centre Information.pdf) — the research-area/scholar copy in the pages aligns with these and was retained as-is.
  - data/_r2-pdf-staging/_map.json — checked; these files contain no becbgk.edu/Documents PDF backlinks, so no PDF swaps were needed.
- **Why:** The /<dept>-dept.png hero images are broken local refs (no such file in public/, no dedicated research-centre photo provided and none in the R2 manifest), so they 404 in production. Per the prod-ready bar (zero broken refs), the cleanest safe action is to remove the broken element and reflow the layout to full-width rather than invent or substitute an unrelated photo. All other content is source-verified and was preserved.
- **Flags:** 
  - No research-centre / department hero photo is available for any of the 10 centres (not in data/new-provided, scraped assets, or the R2 manifest). The hero image slot was removed cleanly on every page; if BEC later provides per-department photos, re-add an <Image> (via asset()) in the same hero slot.
  - Research-area copy and scholar tables were NOT re-verified line-by-line against the source PDFs (would require PDF text extraction; out of scope for a quick check). They appear internally consistent and source-derived. Spotted pre-existing typos in existing copy left untouched per 'do not invent / additive-safe' (e.g. cs/page.tsx 'Comprehensive nsive Viva-Voce'; ip and others have minor typos). Flagging for human review, not changed.
- **Build risk:** low — only removed a broken image block + its unused next/image import and reflowed a grid to single-column on 10 structurally-identical pages; JSX div/motion.div balance re-verified per file (4/4 motion pairs; div counts uniform across all 10), no remaining -dept.png/next/image/Image-component/lg:col-span/orphan-comment references. Did not run pnpm build (orchestrator runs final build). Changes left uncommitted.

### /student-life/anti-ragging/contact — done · 0 images wired
- **Files:** `src/app/student-life/anti-ragging/contact/page.tsx`
- **Before:** Page had a self-admitted FABRICATED anti-ragging committee: code comments read "Data based on typical composition" and "Placeholder structure for other members". The 3 members were invented or stale — outdated Principal "Dr. S. S. Injaganeri" (2019-20), an invented "Dr. V. S. Puranik / Dean (Student Welfare)" with a made-up email dean_sw@becbgk.edu, and a generic "Police Inspector / 100". UGC helpline hero (1800-180-5522, helpline@antiragging.in) and antiragging.in portal were already correct. NO becbgk.edu/Documents PDF/DOC backlinks existed in the file — only the email principal@becbgk.edu.
- **Changed:**
  - Removed placeholder code comments admitting the committee data was fabricated ('typical composition', 'Placeholder structure').
  - Replaced the 3 fabricated committee members with source-verified entries: Chairman Dr. B. R. Hiremath (current Principal per live becbgk.edu, principal@becbgk.edu); Member/Secretary Dr. P. L. Timmanagoudar, HOD Chemistry (9448693600); Squad Coordinator Prof. V. D. Holla, E&E Engineering (9342647037).
  - Removed invented email dean_sw@becbgk.edu and the generic 'Police Inspector / 100' entry.
  - Trimmed unused imports CardHeader and CardTitle (pre-existing dead imports) to keep the file lint-clean.
- **Sources:**
  - data/scraped/site/becbgk.edu/About_info/Anti Ragging/Review_Committee_Members.pdf (Anti-Ragging Review Committee 2019-20: Dr. P. L. Timmanagoudar = Member/Sec, HOD Chemistry, 9448693600)
  - data/scraped/site/becbgk.edu/About_info/Anti Ragging/Squad_members.pdf (Anti-Ragging Squad: Prof. V. D. Holla = Member/Coordinator, E E, 9342647037; Dr. P. L. Timmanagoudar = Member/Secretary)
  - live becbgk.edu/Anti_Raggining.php via WebFetch (current Principal = Dr. B. R. Hiremath, 9448939700, principal@becbgk.edu; confirms UGC helpline + antiragging.in portal)
  - data/_r2-pdf-staging/_map.json (confirmed no /Documents or becbgk.edu PDF link in this file maps to an asset; nothing to swap)
- **Why:** The file's own comments admitted the committee was placeholder/fabricated, violating the prod-ready bar (zero placeholder, source-verified). The named 'swap becbgk.edu/Documents links' task was a no-op because the file contains no such document backlinks (only an email). Replaced fabricated roster with names/phones/roles verified against the scraped Anti-Ragging Review Committee and Squad PDFs plus the live site's current Principal, keeping the already-correct UGC national helpline and antiragging.in portal.
- **Flags:** 
  - No becbgk.edu/Documents PDF/DOC backlinks present in this file, so the map-swap step had nothing to apply.
  - Committee roster source PDFs (Review_Committee_Members.pdf, Squad_members.pdf) are from 2019-20 and are NOT in the R2 asset manifest or _map.json, so they cannot be linked as asset() downloads. The live page (Anti_Raggining.php) still serves only these three PDFs; full per-member roster could not be cross-checked against a newer source.
  - Current Principal name (Dr. B. R. Hiremath) taken from live becbgk.edu because the scraped committee PDF lists the older Principal Dr. S. S. Injaganeri (2019-20); Dr. Timmanagoudar's and Prof. Holla's roles/numbers may also have changed since 2019-20 and should be re-verified with BEC if a newer committee notification exists.
  - Did not embed the full ~25-member committee or ~42-member squad to keep the existing 3-card layout intact (no redesign); only the most authoritative leadership/contact points were wired.
- **Build risk:** low

