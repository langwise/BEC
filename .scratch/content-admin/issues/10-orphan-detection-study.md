# Orphan detection study

Type: research (AFK)
Status: resolved

## Question

What may safely be called an **orphan asset** (CONTEXT.md)? Enumerate every way the codebase references an asset key: content JSON string fields, `assetsUnder(prefix)` call sites (a prefix protects a whole folder — list all live prefixes, including the dynamic ones in `src/content/departments.ts`), literal `asset("…")` calls in TSX, `src/data/asset-manifest.ts` itself, the public gallery's album prefixes, and anything else (`og` images, PDFs linked from copy). Propose the reference-scan algorithm for the cleanup screen, its failure mode (what a false positive would delete), and what the bucket-usage readout needs (object sizes: manifest doesn't store them — R2 list? stored at upload?).

## Answer

Resolved 2026-08-08 by research agent.

### Reference inventory (manifest: 2,948 keys; only `src/lib/assets.ts` reads it)
- **Content JSON**: 1,177 distinct keys as literal strings. Recognize by **set-membership** (walk every JSON string node, keep those ∈ manifest) — never by field-name or schema `$ref` matching (a new unschema'd field would silently unprotect its assets).
- **`assetsUnder()`**: 13 literal prefixes + 3 dynamic families — `departments/<assetSlug>/`(+`/gallery/`) for 17 slugs from departments.json (the 8 `pg/*` departments have NO assetSlug — held only by direct refs), `cells/nain/v2/projects/1..10`, and the gallery page's `album.prefix` (today only `gallery/life-at-bec/campus/`, with an 18-item `exclude` list that is curation, NOT deadness).
- **Literal `asset("…")`**: 447 distinct keys (328 under `documents/`).
- **Template-literal `` asset(`…`) `` — the dangerous class**: 6 sites (hostel pages, IIPC gallery, NAIN centre/guides) covering 80 keys, **75 with no other reference** — invisible to any static string scan.
- PDFs referenced identically via `asset()`; `resolveDocuments()` (`src/content/departments.ts:292`) silently drops missing keys — wrong deletions produce no 404, no error. Zero hardcoded r2.dev URLs outside `assets.ts`; OG/favicons don't touch R2. One extensionless folder-marker key (`student-life/bec-creative-spectrum/`) must be special-cased.

### Coverage math
2,232 keys prefix-protected (76%, of which 1,944 = `departments/`), 1,617 directly referenced; naive orphans 182 → **107 real candidates** after protecting template-literal folders — mostly superseded year-on-year PDFs under `documents/`, exactly the intended target. Blanket-protecting all of `departments/` (vs per-slug) hides ~123 recoverable objects — accepted as cheap insurance and removes the "assetSlug renamed → 1,944 keys unprotected" cliff.

### Algorithm (adopted)
`orphans = manifest \ (D ∪ P)` where D = set-membership over content JSON + all string literals in `src/**` matching manifest keys; P = a **hand-maintained `PROTECTED_PREFIXES` constant** (13 literal prefixes, `departments/`, `cells/nain/v2/projects/`, `facilities/hostels/`, `cells/iipc/gallery/`, `cells/nain/v2/center/`, `cells/nain/v2/guides/`). Guardrails: skip extensionless keys; skip objects with `LastModified` < 30 days (grace for just-uploaded-not-yet-wired); annotate sibling usage; **fail closed** (zero candidates + error) if content parsing throws or D < 1000.

### Safety requirements for the cleanup screen (ticket 12)
1. **CI guard (highest-value single control)**: build step greps all `assetsUnder(` call sites and asserts every literal prefix ∈ `PROTECTED_PREFIXES` and every template-literal site is on an acknowledged allowlist — fail the build otherwise.
2. **Two-phase delete**: commit manifest-entry removal first (site rebuilds without it; mistakes are a `git revert`), delete the R2 object only after the deploy is green.
3. Hard cap ~25 objects/operation; refuse batches >5% of bucket; per-item confirm with thumbnail + "where last used" (`git log -S"<key>"`); **never auto-delete**.
4. Exclusion lists (`galleryExclude` in departments.json ×88, gallery page `exclude` ×18) are curation, not deletion consent — never use them in reachability.

### Usage readout
No file records object sizes (`r2_keys.json` at the repo parent is NOT a key inventory — it's an **unencrypted R2 credentials blob**; flagged to ticket 01 for rotation). Usage must come from a live `ListObjectsV2` sweep — ~3 round-trips for 2,948 objects, sub-second; `scripts/r2-usage.mjs` already implements it, reuse server-side with a short cache. The same sweep feeds the free-tier gauge, per-orphan reclaimable bytes, the 30-day grace guard, and **manifest-drift detection both ways** (bucket∖manifest = true orphans; manifest∖bucket = broken references — a more urgent bug class).

Also re-flagged: `upload-assets.mjs --prune` is a bigger bulk-deletion footgun than the Admin screen will ever be.
