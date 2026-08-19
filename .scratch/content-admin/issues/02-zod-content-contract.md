# Zod content contract

Type: task (AFK)
Status: resolved

## Question

Build the single content contract: one Zod schema per existing content file (`home`, `departments`, `faculty`, `governance`, `placements`), written from what the loaders in `src/content/*.ts` and their consuming pages actually render — NOT from the unreliable `*.schema.json` files. Loaders parse through the schemas (TS types derived via `z.infer`), a `validate-content` script runs in the build and fails loudly on bad JSON, and `*.schema.json` files are regenerated from Zod (keep `$schema` IDE hints; keep the `asset-keys` enum generation from `scripts/build-content-schema.mjs`). Only new runtime dep: `zod`.

Note: the departments schema lands **minimal-but-faithful to the current shape** here (validating what exists, replacing the `as Record<…>` casts at `departments.ts:300`, `faculty.ts:15`, `placements.ts:55` — placements currently has no schema at all). The shape-changing refinements live in [Departments normalization migration](21-departments-normalization.md); the field inventory in [the departments report](../assets/13-departments-shape-report.md) is the reference for what "faithful" means (102 fields, 5 dead flags to skip).

## Answer

Resolved 2026-08-08. Built by implementation agent; verified by orchestrator (validate-content passes, full build clean via turbo). Left as uncommitted working-tree changes for Pratik to review and land.

**Created:** `src/content/schema/{shared,home,governance,faculty,placements,departments,index}.ts` (Zod v4 schemas + z.infer types; `parseContent()` wraps failures with file + JSON path via prettifyError; `index.ts` exports the `contentFiles` manifest for future admin routes); `scripts/validate-content.mjs`; `content/placements.schema.json` (placements' first-ever schema).

**Changed:** all 5 loaders now `parseContent()` instead of unchecked casts (`departments.ts` 369→87 lines, handwritten types now derive from the schema under unchanged export names); transform got exactly two one-line nullability fixes (`department.ts:320`, `:408`); `build-content-schema.mjs` now also emits all five `*.schema.json` from Zod; `package.json` chains `validate-content` before `next build`; asset-keys.json regenerated 2,920→2,948 (fixes the 14 stale refs); `tsconfig` allows `.ts` imports so Node ≥22.18 type-stripping runs the schemas directly.

**Enforcement points:** (1) loader-import parse fails `next build`; (2) `pnpm --filter web validate-content` as build step 1 — corruption test produced `INVALID content/departments.json → at departments["civil-engg"].mission: expected array…`, exit 1; (3) `@/content/schema` importable by admin server routes. **Asset-key autocomplete preserved**: `.meta({assetKey:true})` fields emit `allOf: [{$ref: ./_schema/asset-keys.json}]` in generated schemas.

**Surprises:** faculty.json has 21 keys, not 25 — the 4 pg/* engineering rosters are absent entirely (report said "empty"); moot given ticket 20's delete decision, but ticket 21 must drop those keys rather than author rosters. placements.json still lacks its `$schema` pointer line (content edits were out of bounds) — one-line follow-up for the first Publish or ticket 21.

**Follow-ups added to ticket 21's scope:** dead flags + unreachable branches; promote year/specification or drop rows; kill the null publication year; coerce string|object unions; fate of phdsAwarded.usn/status + committee email/phone (validated but unrendered). ~~placements `$schema` line; engines~~ — both fixed in the review pass below.

## Review (fresh-context subagent, 2026-08-08)

Verdict: **ship-with-fixes**. All claimed contract guarantees verified holding (loader parse, build gate with corruption test, schema regeneration incl. asset-key `$ref` autocomplete, unchanged export names, transform fixes). Four findings, all fixed:

1. **Zod shipped in client bundles (~65 KB gzip)** — `home.ts`/`governance.ts` (and, missed by the reviewer, `placements.ts` via `placement-offers-chart.tsx`) reach client chunks; their module-scope `parseContent()` pulled all of Zod into the `/` route. The reviewer's suggested `NODE_ENV` ternary was **insufficient** — top-level `z.strictObject()` calls are side effects the bundler won't tree-shake; the 286 KB chunk stayed referenced. Real fix: those three loaders now use **type-only imports + `as` casts**, with a new server-only `src/content/schema/dev-validate.ts` (imported from `app/layout.tsx`) re-validating them on the dev server. Verified post-fix: 0 zod markers in client chunks, chunk no longer referenced by `/`. `faculty.ts`/`departments.ts` stay parsing (server-only).
2. **Engines mismatch** — validate-content needs Node ≥22.18 (native TS type-stripping) but engines said >=18. Fixed: `"node": ">=22.18"` in root + web package.json, plus `.nvmrc` = 24.
3. **placements.json missing its `$schema` pointer** — added (formatting-preserving sed).
4. **Silent gap for unregistered content files** — a new `content/*.json` with no schema would sail past the gate. validate-content now cross-checks the directory against the `contentFiles` manifest and fails loudly (tested: fake file → exit 1, removed → clean pass).

Post-fix verification: `pnpm build` clean (388 pages), `tsc --noEmit` clean, `validate-content` passes. Still uncommitted, awaiting Pratik's review.
