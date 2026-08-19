# Departments content shape study

Type: research (AFK)
Status: resolved

## Question

Map the real shape of `content/departments.json` (920 KB, 25 departments, ~36 fields each) against the 1,455-line transform in `src/data/department/department.ts` and the section union it produces: which fields are common vs per-department-type (UG/PG/MCA/MBA), which are optional in practice, where the transform papers over inconsistencies (those are the "hacky schema" hotspots), and where faculty/placements data joins in. Deliver: a proposed refined Zod schema (successor to the minimal one from [Zod content contract](02-zod-content-contract.md)) and a recommended information architecture for the editor — the natural grouping of fields into screens a non-technical Editor can navigate.

## Answer

Resolved 2026-08-08 by research agent. Full report (field inventory, 15 hack-hotspot classes with file:line, join analysis, section model, Zod skeleton, editor IA): [assets/13-departments-shape-report.md](../assets/13-departments-shape-report.md).

Headlines:
- **Premise correction**: 102 distinct fields in use across 25 departments (not ~36); entries range 15–56 fields; 5 loader-declared flags are dead (never set, unreachable transform branches).
- **No clean per-type schema exists** — PG entries are thinner, never differently shaped. Model: one optional-heavy body + explicit `kind: ug | basic-science | pg | professional` discriminator for required-field refinement (today type behaviour sniffs the `pg/` key prefix).
- **The current departments.schema.json fails its own data with 42 errors** (46 in-use fields missing + `additionalProperties: false`) — confirms "schemas are unreliable" quantitatively. `asset-keys.json` is stale vs the manifest (2,920 vs 2,948).
- Worst hack classes for the editor: 19 layout booleans + 6 untyped `Record<string,…>` section maps (typos silently ignored; `sectionOrder` is a destructive whitelist that deletes unlisted sections); string|object unions collapsed into prose; semantics encoded in strings (em-dash column splitting, regex staff classification); placeholder fallbacks that contravene the repo's no-placeholder rule; `asset()`'s always-http fallback voids every missing-asset guard.
- **7 of 8 `pg/*` departments (~102 KB authored content) are unrouted** — commented out of `departments-catalog.ts`, invisible with `dynamicParams=false` → graduated to [Orphaned PG departments](20-orphaned-pg-departments.md).
- Placements editing spans two files (flags/photos in departments.json, tables in placements.json); `placements.json` has no schema at all; renaming a department key requires coordinated changes in 4 files, unenforced.
- Proposed normalizations (Photo pairs, hero merge, union coercion, `kind` field, layout quarantine) change the JSON shape → graduated to [Departments normalization migration](21-departments-normalization.md). De-risk order: dead flags → asset-guard fix → asset-keys regen → Zod at loader → orphaned PG decision.
- Editor IA: department picker (grouped by kind, completeness + unrouted warnings) → section tabs mirroring the published IA; Faculty and Placements tables surface as read-only cross-links; `galleryExclude` edited as checkboxes over resolved images; Layout & Navigation as an expert panel generated from the produced section list.
