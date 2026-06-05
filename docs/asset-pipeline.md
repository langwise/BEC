# Asset Pipeline — images & PDFs → Cloudflare R2

**Goal:** every image/PDF on the site is served from R2, referenced through a manifest — never an external `becbgk.edu` link and never committed binaries bloating git.

## Flow

```
local scraped folder  ──▶  scripts/upload-assets.ts  ──▶  Cloudflare R2 bucket
                                      │
                                      └──▶  src/data/asset-manifest.(ts|json)   (key → public URL)
                                                          │
                            src/lib/assets.ts  asset(key) ─┘  used by data files / components
```

## Pieces

### 1. R2 bucket + env

Bucket e.g. `bec-assets`, public read via R2 custom domain or `*.r2.dev`. Credentials in `apps/web/.env.local` (and document in `apps/web/.env.example`, no secrets):

```
R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET=bec-assets
NEXT_PUBLIC_R2_BASE_URL=https://assets.becbgk.edu   # or the r2.dev URL
```

### 2. Ingest script — `scripts/upload-assets.ts`

Node + `@aws-sdk/client-s3` (R2 is S3-compatible). It:

1. Walks the local scraped folder (path passed as an arg).
2. Normalizes each file to a stable **key** with a sane prefix:
   - `departments/<slug>/...`
   - `governance/<role-or-dept>/...`
   - `documents/<section>/...` (e.g. `documents/calendar/2025-ug.pdf`)
   - `gallery/<initiative>/...` (e.g. `gallery/nss/2024-blood-drive-01.jpg`)
   - `placements/brochure.pdf`
3. Uploads with correct `ContentType`; **idempotent** (re-running re-uploads/overwrites the same keys, safe to run repeatedly).
4. Emits `apps/web/src/data/asset-manifest.ts` — a map `{ "<key>": "<NEXT_PUBLIC_R2_BASE_URL>/<key>" }`.

### 3. Helper — `src/lib/assets.ts`

```ts
import { manifest } from "@/data/asset-manifest";
export function asset(key: string): string {
  return manifest[key] ?? `/${key}`; // fallback to /public during transition
}
```

### 4. `next.config.ts`

Add the R2 host to `images.remotePatterns` so `next/image` accepts R2 URLs. (Flipping `unoptimized: false` is a later optimization, out of current scope.)

### 5. Backlink pass

Replace hardcoded external/relative PDF & image URLs with `asset(...)`. Known offenders to sweep:

- `app/programs/calendar/page.tsx` (many academic-calendar PDFs)
- `app/research/scopus/page.tsx`, `app/research/policy/page.tsx`
- `app/institute/about-sangha/page.tsx`
- Any `becbgk.edu/...` or `/Documents/...` string.

Sweep command: `grep -rn "becbgk.edu\|/Documents/" apps/web/src` → should trend to zero.

## Adding a new asset later

1. Drop the file into the local scraped folder under the right prefix.
2. Re-run `scripts/upload-assets.ts <folder>`.
3. Reference it via `asset("<key>")`. Done — no manual URL copying.
