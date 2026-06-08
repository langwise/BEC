# Overnight Prod-Ready Sweep — Plan & Progress

Living tracker for the overnight run. **Goal: make most pages prod-ready** per `website/CLAUDE.md`. Detailed per-page changes live in [`overnight-log.md`](overnight-log.md); this file is the at-a-glance status.

Legend: ✅ done · 🔄 in progress · ⛔ pending · 🚩 blocked (needs human) · 🔎 flagged for supervised pass

## Foundation
- ✅ R2 access wired (`apps/web/.env.local`), connectivity verified (2.0% of free tier)
- ✅ Log + plan docs created
- ✅ Source-precedence rule added to `CLAUDE.md`
- ✅ **Backlink upload**: 60 hotlinked PDFs + chairman image + placement brochure/policy → R2; manifest 572 → 632 keys. URL→key map at `data/_r2-pdf-staging/_map.json`

## WORKFLOW A — section pages (bg task `w6nmerlg3`) ✅ done — all 28 pages
36 agents, ~1.7M tokens, 28/28 entries `done`. Full per-page state→change→source→why→flags in [`overnight-log.md`](overnight-log.md). Build green after main-loop fixed 11 lint errors (unescaped quotes → typographic; one `<a>`→`<Link>`).
Flagship static pages (image-intent matched by VIEWING each photo, then an independent image-verify pass):
- 🔄 **Home** (`content/home.json`) — fix hero/about/campus mismatches. Verified facts handed to agent: `facilities/general/*` = amenity buildings (ATM/post-office/shuttered-hospital/canteen) → banned from hero/about; `institute/group-photos/cine1627–1643` = clean main-building facade shots
- 🔄 institute/about · about-sangha (sangha photos + Institute_list backlink) · history
- 🔄 placements — cell photos + brochure/policy backlink (🚩 recruiter Google Form)
- 🔄 facilities/library (+about, +infrastructure) + librarian portrait · facilities/amenities · institute/campus/infrastructure

Section galleries:
- 🔄 research/labs/bosch (20), scada (3), **robotics — create page** (15) + labs-hub card
- 🔄 student-life: sports (20), nss (8+coordinator), overview, activities (kill Unsplash), bec-fm (🚩 stream), ieee, hostels (girls, 17)

Backlink + placeholder purge:
- 🔄 research: scopus (6 PDFs), policy; centres/* (remove broken `/x-dept.png`)
- 🔄 programs: calendar, office, examinations/* (7 timetables 🚩 not in scrape), convocation
- 🔄 facilities: grievances/*, library/{contact,staff,supporting-staff,useful-links}, guesthouse
- 🔄 institute/contact · administration/{chairperson 🚩 identity, disclosures/rti} · student-life/anti-ragging

## WORKFLOW B — name-only departments (bg task `wc5zt9tyn`) ✅ done — 7 depts merged
- ✅ Research+fill `content/departments.json` (+ faculty where sourceable): Biotechnology, ECS, IPE, ISE, Mechanical, Mathematics, Humanities. All 7 stubs now carry full metadata (overview/vision/mission/PEO-PSO/labs/associations/contact). Faculty rosters added: biotechnology +7, IPE +3, ISE +18, mechanical +24, humanities +3 (name+designation only). maths/ecs already had rosters → agents returned null (correct).
- ✅ Merged serially in main loop (race-safe). **Stripped `documents[]` + faculty `cv`** (PDFs not uploaded to R2; schema needs a real key) — clean follow-up, source paths in log.

## Main-loop work (shared files — done serially here)
- ✅ Governance backlinks: `administration/governance/page.tsx` → 2 PDFs swapped to `asset()` (mandatory-disclosure, ac-members), 2 dead `.php` links removed
- ✅ Governance data: `content/governance.json` found **already populated** (15 named HODs + photos, deans, officers; Automobile/Physics HOD correctly blank; a few `verify:true`). `data/governance/*.ts` are stale (only feed the intentional "coming soon" catch-all) → left as-is. 🚩 Senate roster still blocked.
- ✅ Merge Workflow-B department JSON (done)
- ✅ Home stats reconcile (home 5000+/350+/50k+/100% vs verified 3500+/180+/20,000+/55%) — done 2026-06-08: aligned `stats-section.tsx` + `programme.ts` + home `impace-section.ts`/`placements.ts` + `history` + `programmes/{ug,pg}` to the canonical `home.json`/`about` set. Sangha "50k+" + phd "100% supervisors" left as-is (different scope). See log.

## Finalize (after both workflows return) — ✅ done
- ✅ Merged dept JSON; wrote all 28 per-page log entries + 7 dept entries to `overnight-log.md`
- ✅ `pnpm build` succeeded; fixed 11 lint errors introduced by agents; 0 lint errors in modified files (warnings only, pre-existing-style)
- ✅ Re-grepped `becbgk.edu` → 3 refs left, all legitimate attribution prose (not links)

## 🚩 Blocked / needs human input (left as-is, flagged — never fabricated)
- **Senate roster** (official notification/PDF)
- **Placements** recruiter Google Form URL
- **Chairman** confirmed identity + name (image backlinked, name unverified)
- **7 exam timetable PDFs** not found in scrape (2021-22 EVEN II/IV; 2022-23 BE I/III/V/VII; 2023-24 BE I/VII; 2024-25 odd 1st sem)
- **Physics & Automobile HODs** (no provided portrait → blank in governance.json)
- ✅ ~~Department PDFs not on R2~~ — **done 2026-06-08**: 85 objects uploaded, 31 `documents[]` + 54 faculty `cv` wired (manifest 632→717; R2 at 2.5% of free tier). New flags from this pass: ISE SAR (41 MB) dropped; Mechanical 3 CVs unwired (Vivekanand B. S. ambiguous, R. S. Matti + R. A. Patil no file); HSS Shanta B. Basanagoudar CV unwired (no clean name match). See log.
- 🔎 **Research-centre count 9 vs 10** — `programmes/phd/page.tsx` says "9 VTU Recognized Research Centers"; `home.json`/`about` say 10. Pick one in a supervised pass.
- **Dept roster confirmations:** IPE (Dundur/Puranik retired?), ISE (B. M. Reshmi + 3 extra CVs), Biotech (M.Tech Food Biotech closed 2024), ECS vision says "Instrumentation" (likely typo), Maths/HSS service-dept fields (no PEO/PSO by design)

## Snapshot (morning)
- `next build`: ✅ green · lint: 0 errors in touched files · `becbgk.edu` hotlinks: 0 (3 prose mentions remain)
- Pages advanced: 28 section pages (images viewed+verified, backlinks, purge) + 7 department pages (full content + rosters) + governance (earlier)
- All changes **uncommitted** in the `website` working tree for your review.
