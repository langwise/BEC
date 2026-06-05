# Action Plan — ship by 2026-06-15

Working plan for the 10-day content-population + revamp sprint. See [context.md](context.md) for the why, [content-model.md](content-model.md) for where content lives, [asset-pipeline.md](asset-pipeline.md) for the R2 flow.

## Decisions (locked)

- **Asset storage:** Cloudflare R2.
- **Data source:** scraped dataset delivered as a local zip/folder.
- **Content model:** keep typed TS data files (no CMS).
- **All four workstreams are must-have** for the deadline.
- Code formatter: deferred (post-launch).

## Workstreams

### 0. Knowledge base — ✅ done first
Root `AGENTS.md` + `docs/` (this folder). Keep in sync as conventions evolve.

### 1. Asset pipeline → R2
`scripts/` package, `upload-assets.ts`, `src/data/asset-manifest`, `src/lib/assets.ts` helper, R2 host in `next.config.ts`, backlink external PDFs. Details: [asset-pipeline.md](asset-pipeline.md).

### 2. Content repopulation (typed TS data files)
Priority order: people/governance → departments/faculty → home stats → institute (history/about/awards). Map the local dataset into `src/data/**`, clearing `placeholder: true`.

### 3. Placements finalize
Set real `brochureHref` (R2) + live `recruiterFormSrc` (Google Form) + real stats in `data/placements/content.ts` / `data/home/placements.ts`.

### 4. Alumni + community gallery
New top-level **Alumni** nav item + `app/alumni/page.tsx` + `data/alumni/content.ts`. Community-initiatives gallery `app/community/page.tsx` + `data/community/initiatives.ts` with faculty-lead profiles.

## Dated schedule (today = 2026-06-05)

| Date | Workstream | Output |
|------|-----------|--------|
| **Jun 5 (Fri)** | Docs + infra | `AGENTS.md` + `docs/*`; provision R2 + env; `scripts/` skeleton |
| **Jun 6 (Sat)** | Assets | `upload-assets.ts` ingest → R2 + manifest; `lib/assets.ts`; R2 in next.config |
| **Jun 7 (Sun)** | Assets + Content | Backlink external PDFs → R2; begin governance/people data |
| **Jun 8 (Mon)** | Content | Finish governance (HoDs/Deans/BoG/Senate) w/ photos; home stats/rankings |
| **Jun 9 (Tue)** | Content | Departments data + dynamic dept pages + faculty (batch 1) |
| **Jun 10 (Wed)** | Content | Departments/faculty (batch 2); institute history/about/awards |
| **Jun 11 (Thu)** | Alumni + Placements | Alumni nav + page + data; placements brochure+form live |
| **Jun 12 (Fri)** | Gallery | Community gallery + faculty-lead profiles + data |
| **Jun 13 (Sat)** | QA | Link sweep (no becbgk.edu/404), image audit, mobile nav |
| **Jun 14 (Sun)** | Buffer/review | Fix QA findings; prep coordinator review links |
| **Jun 15 (Mon)** | Launch | Final build, deploy, smoke test |

Tracks 1–2 (assets/content) and 3–4 (placements/alumni/gallery) are largely independent and parallelizable.

## Verification

- `pnpm install && pnpm build` clean.
- Walk `/`, `/placements`, `/alumni`, `/community`, a department page, `/administration/governance`, `/institute/history` in `pnpm dev`.
- `grep -rn "becbgk.edu\|/Documents/\|placeholder: true" apps/web/src` → ~zero in shipped sections; crawler (e.g. linkinator) finds no 404s.
- Placements: brochure downloads, Google Form iframe loads (not placeholder).
- Mobile: nav shows Alumni, no Research; gallery responsive.
