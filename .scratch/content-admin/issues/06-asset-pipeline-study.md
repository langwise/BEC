# Asset pipeline study

Type: research (AFK)
Status: resolved

## Question

Everything the upload pipeline must replicate from the local scripts: how `src/data/asset-manifest.ts` and `content/_schema/asset-keys.json` are generated (`scripts/upload-assets.mjs`, `scripts/build-content-schema.mjs`), the manifest entry format and URL scheme, WebP conversion settings used today (sharp), R2 client config, and what a **serverless upload** (Vercel route) must do so that an uploaded image is complete: R2 PUT + manifest entry + asset-keys entry, committed via the publish pipeline (ADR 0003 — uploads commit the regenerated manifest). Also: function limits (body size, sharp on Vercel) that constrain the design.

## Answer

Resolved 2026-08-08 by research agent. Full findings below.

### Manifest generation
`scripts/upload-assets.mjs`: paginated ListObjectsV2 → upload changed files (md5+size compare) → optional `--prune` → **re-lists the whole bucket** and writes the manifest from bucket contents. Exact format: header comment, `export const manifest = { "<key>": "<url>", … } as const;` + `export type AssetKey = keyof typeof manifest;` — two-space indent, JSON.stringify on both sides, trailing comma on every line, plain UTF-16 `.sort()` (uppercase before lowercase). URL = `NEXT_PUBLIC_R2_BASE_URL` + `/` + key, **no URL-encoding**. Keys are minted upstream by `scripts/asset-map.mjs` `slug()` (lowercase, `[^a-z0-9]+`→`-`, `.webp`, taxonomy folder prefix). Current: 2,948 keys (1,826 webp, 1,055 pdf, rest strays). A second near-duplicate `writeManifest` lives in `upload-activities-images.mjs`; `asset-browser.mjs` and `build-content-schema.mjs` parse the manifest by regex `/^\s*"([^"]+)":\s*"([^"]+)"/gm`.

### asset-keys.json
`scripts/build-content-schema.mjs` regex-extracts keys from the manifest **text**, writes a draft-07 `enum` (`JSON.stringify(…, null, 2) + "\n"`). Consumed only by `*.schema.json` `$ref`s for IDE autocomplete — zero runtime consumers. Must be committed in the same commit as the manifest.

### Conversion settings (no sharp in use today — macOS `sips` + `cwebp`)
Longest edge 2400, WebP q80 (one script uses q82), never upscale; PDFs copied as-is (`application/pdf`). Faithful sharp equivalent: `sharp(buf).rotate().resize({ width: 2400, height: 2400, fit: "inside", withoutEnlargement: true }).webp({ quality: 80 })` — `.rotate()` needed because sips baked EXIF orientation.

### R2 client
`new S3Client({ region: "auto", endpoint: R2_S3_ENDPOINT, credentials: { R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY } })`; env names: `R2_ACCOUNT_ID` (required but unused), `R2_BUCKET`, `R2_S3_ENDPOINT`, `R2_API_TOKEN` (provisioning only), `NEXT_PUBLIC_R2_BASE_URL` (also feeds next.config images.remotePatterns, so already in Vercel build env). Usage script: `scripts/r2-usage.mjs`.

### Vercel serverless constraints
- **Request body hard cap 4.5 MB** (infrastructure-level, not configurable) — the binding constraint; workarounds are client pre-shrink or presigned direct-to-R2 PUT (needs bucket CORS via Cloudflare + `@aws-sdk/s3-request-presigner`, neither present today).
- sharp works on the Node runtime with no config (`sharp` + `@aws-sdk/client-s3` are in Next's default `serverExternalPackages`); Edge runtime no — route must declare `runtime = "nodejs"`. Duration/memory/bundle limits are not binding.
- `sharp`, `@aws-sdk/client-s3`, `mime-types` are **devDependencies** — must move to `dependencies` for a route to use them. Zero route handlers exist today; this would be the first.

### What "live" requires
Runtime source of truth is the **committed manifest**, not the bucket. `assetsUnder()` galleries are invisible for unmanifested keys; `asset()` falls back to a hardcoded r2.dev base for unknown keys (silently masks a failed manifest commit — Admin path should fail loudly). So upload = R2 PUT + manifest entry + asset-keys entry + content-JSON reference, in **one commit** (git Tree API: blobs → tree → commit → ref update).

### Proposed upload service design
`app/api/admin/upload/route.ts`, nodejs runtime, maxDuration 60: (1) auth gate; (2) client-side pre-shrink to ≤2400px before POST (keeps payload under 4.5 MB), server hard-caps ~4 MB; (3) sniff real bytes via sharp metadata, never trust client MIME; (4) convert per settings above, PDFs pass through; (5) mint immutable key (context folder + slug + short suffix), assert not in manifest; (6) PUT with correct ContentType; (7) regenerate manifest + asset-keys **in memory from repo HEAD** (never rebuild from bucket — would resurrect pruned keys); (8) commit atomically with the content change; (9) respond `{ key, url }` for instant preview.

### Open risks (feed later tickets)
- **4.5 MB cap**: images solvable by mandatory client pre-shrink (fails for HEIC outside Safari); **PDFs cannot be pre-shrunk — any Attachment > ~4 MB cannot pass through a function at all.** The ~15 MB PDF cap decided in grilling Q12 is unachievable without presigned direct-to-R2 upload. → graduated to ticket [19-upload-transport](19-upload-transport.md).
- Extract one shared manifest read/write module (`src/lib/asset-manifest-io.ts`) and refit scripts — four regex re-implementations already exist; a fifth guarantees drift.
- Retry-on-stale-SHA for manifest commits (concurrent uploads would orphan a real R2 object; content files stay last-write-wins per ADR 0001).
- `upload-assets.mjs --prune` run against a stale local dir would delete every Admin-uploaded object — document the footgun in `docs/asset-pipeline.md` + asset-pipeline skill.
- Legacy keys violate the new rules (spaces, uppercase, `.JPG`) — picker must tolerate; validation is forward-only. Uppercase-first sort means new lowercase keys interleave oddly in `bec-creative-spectrum` gallery order (user-visible, accepted).
- `docs/asset-pipeline.md` is stale (wrong script name, wrong helper description) — don't treat as spec; update when the upload slice lands.
