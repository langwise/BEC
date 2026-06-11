---
name: asset-pipeline
description: >-
  Get images/PDFs onto the BEC website via Cloudflare R2. Convert raw camera
  photos (CR3/JPG) to optimized WebP, upload to R2, regenerate the asset
  manifest, and reference them with asset(). Use when adding new photos,
  backfilling media, restructuring/re-keying assets, or wiring an image into a
  page. macOS host (uses sips + cwebp).
---

# BEC asset pipeline (Cloudflare R2)

Every image/PDF on the site is served from R2 and referenced through a generated
manifest — never an external `becbgk.edu` link, never a committed binary. This
skill is the end-to-end loop: **convert → upload → manifest → reference**.

## Where things live

| Thing | Path |
|---|---|
| Scripts | `website/apps/web/scripts/` |
| Secrets (gitignored) | `website/apps/web/.env.local` (template: `.env.example`) |
| Generated manifest | `website/apps/web/src/data/asset-manifest.ts` |
| `asset()` helper | `website/apps/web/src/lib/assets.ts` |
| Optimized WebP staging | `data/optimized/` (gitignored, safe to delete/regen) |
| Raw source photos | `data/photos/*.zip` (kept local, **never uploaded**) |

Run all `node scripts/...` commands from **`website/apps/web/`**.

## Prerequisites

- macOS tools: **`sips`** (system RAW codec — decodes CR3 natively) and **`cwebp`** (`brew install webp`). No ImageMagick/sharp/dcraw needed.
- `node` ≥ 20, deps installed (`@aws-sdk/client-s3`, `mime-types` are devDeps in `apps/web`).
- `apps/web/.env.local` populated (see `.env.example`). The values come from one
  Cloudflare **R2 API token** (Admin Read & Write): it yields the Bearer token
  *and* the S3 access key/secret. The bucket is `bec-assets`; public URL is the
  r2.dev managed domain.

## The scripts

1. **`r2-provision.mjs`** — idempotently creates the bucket + enables the public
   r2.dev URL via the Cloudflare API. Prints `NEXT_PUBLIC_R2_BASE_URL`. Run once.
   ```bash
   node scripts/r2-provision.mjs
   ```

2. **`asset-map.mjs`** — the source→key mapping (the taxonomy). `keyFor(relPath)`
   turns a source path like `Departments/Civil Engineering/CINE9534.JPG` into an
   R2 key like `departments/civil/cine9534.webp`. **Edit this to add categories
   or change where photos land.** Keys mirror the site's sections:
   `governance/ · departments/<slug>/ · research/labs/<slug>/ ·
   student-life/<slug>/ · facilities/<slug>/ · placements/ · administration/ ·
   institute/`. Filenames: portraits keep their slugified human name
   (`dr-v-b-pagi.webp`); scene shots keep the camera code (`cine9534.webp`).

3. **`convert-from-zips.mjs`** — converts photos **straight out of zips** without
   bulk-extracting (built for a near-full disk: streams one frame at a time,
   peak <100 MB). JPG wins over CR3 on a key collision. Writes WebP +
   `_index.json`.
   ```bash
   node scripts/convert-from-zips.mjs <zip-dir> <out-dir>
   # e.g. node scripts/convert-from-zips.mjs ../../../data/photos ../../../data/optimized
   ```
   `convert-images.mjs` is the same thing for an already-extracted folder.

4. **`contact-sheet.mjs`** — builds a local HTML thumbnail grid from `_index.json`
   for eyeballing before upload. Review, fix mappings, reconvert.
   ```bash
   node scripts/contact-sheet.mjs <out-dir> <html-path> optimized
   open ../../../data/contact-sheet.html
   ```

5. **`upload-assets.mjs`** — uploads `<dir>` to R2 (idempotent: skips byte-identical
   keys), regenerates `asset-manifest.ts` from the bucket's full contents.
   `--prune` deletes bucket keys no longer present locally (use after re-keying).
   Skips `_`-prefixed sidecars.
   ```bash
   node scripts/upload-assets.mjs ../../../data/optimized --prune
   ```

## Add / update photos (the loop)

1. Drop the source (zip or folder) somewhere under `data/`.
2. If it introduces new categories, add rules to `asset-map.mjs`.
3. `convert-from-zips.mjs <src> data/optimized` → WebP + index.
4. `contact-sheet.mjs` → review in the browser.
5. `upload-assets.mjs data/optimized [--prune]` → R2 + manifest.
6. Reference it: `asset("departments/civil/cine9534.webp")`.

Restructuring later is cheap: edit `asset-map.mjs`, reconvert, upload `--prune`.

## Referencing in the site

```ts
import { asset } from "@/lib/assets";
<Image src={asset("governance/principal/dr-b-r-hiremath.webp")} ... />
```

`asset()` returns the public R2 URL from the manifest (falls back to `/<key>` in
`/public` if a key isn't found yet). `assetsUnder("prefix/")` returns every URL
under a prefix, sorted — use it for "show all" galleries. `next.config.ts` derives
the R2 host from `NEXT_PUBLIC_R2_BASE_URL` and adds it to `images.remotePatterns`.

## Content layer — `content/*.json` is the source of truth

Page content (text + which image appears where + order) lives in hand-editable
**`apps/web/content/**/*.json`**, NOT in the page code. The user edits only these
files to add/remove/relocate images or change copy.

- **Images are asset keys**, never URLs (e.g. `"facilities/general/cine1255.webp"`).
- A typed loader in **`src/content/<page>.ts`** imports the JSON, resolves keys →
  R2 URLs via `asset()`/`assetsUnder()`, and exports typed objects the components
  consume. Pages import from `@/content/<page>`, never from raw JSON.
- **Editor autocomplete:** each `content/*.json` has inline
  `"$schema": "./<page>.schema.json"`; image fields `$ref`
  `content/_schema/asset-keys.json` — a generated enum of all manifest keys, so
  editors offer a dropdown of real keys and flag typos. Regenerate after uploads:
  ```bash
  node scripts/build-content-schema.mjs
  ```
- **Pick images visually:** `node scripts/asset-browser.mjs` → `data/asset-browser.html`,
  a click-to-copy grid of every R2 asset.
- Path alias `@content/*` → `./content/*`. Migration is ride-along (extract a
  page's content to JSON as you do its image work). Home is the reference example
  (`content/home.json` + `src/content/home.ts`).

## Billing safety — stay on R2's free tier

- Free tier: **10 GB storage**, 1M Class-A ops/mo (writes/lists), 10M Class-B/mo
  (reads), **egress always free**. Current footprint: ~82 MB WebP / 410 objects.
- **Only optimized WebP goes to R2. Raw CR3/JPG (~9 GB) stay local in
  `data/photos/`** — never upload them. That single rule keeps storage ~1% of the
  free cap.
- `df -h` before large conversions — the host disk runs near-full; that's why
  conversion streams from zips instead of extracting.

## Gotchas

- **CR3 = Canon RAW.** `sips` decodes it via macOS's codec; direct CR3→WebP isn't
  supported, so the chain is `sips` (decode + resize to 2400px, PNG intermediate)
  → `cwebp -q 80`. ~150× smaller.
- **JPG/CR3 duplicate** of the same shot → JPG wins (developed frame), CR3 dropped.
- **Manifest is generated** — never hand-edit `asset-manifest.ts`; re-run upload.
- **r2.dev URL** is rate-limited by Cloudflare and fine for this site's volume; to
  go production-grade later, add a custom domain (`assets.becbgk.edu`) in the R2
  dashboard and update `NEXT_PUBLIC_R2_BASE_URL`, then re-run upload to regenerate
  URLs.
- Hard rule (`AGENTS.md`): no raw external asset URLs. `grep -rn "becbgk.edu" apps/web/src` should trend to zero.
