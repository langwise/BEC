# Image picker

Type: task (AFK)
Status: resolved
Blocked by: 03

## Question

The reusable picker component every editor embeds for image fields: searchable thumbnail grid over the asset manifest (staff never see raw keys), folder-ish browsing by key prefix, selection returns the asset key. Must handle ~3,000 keys without jank (virtualized grid). Upload-from-picker arrives later via [Upload pipeline](08-upload-pipeline.md) — design the slot for it now.

## Answer

`<ImagePicker value={key} onChange={setKey} />` — a preview tile plus a dialog
that browses the R2 library by folder, searches across all of it, and hands back
an asset key. Nobody sees a key: the preview says *Campus front* / *Institute ›
Campus*, and the tiles are pictures with names under them.

### Where the catalogue comes from

The manifest is the only list of what exists on R2, and four scripts each had
their own regex for reading it. That is now one module,
`src/lib/asset-manifest-io.ts` — `parseManifest`, `manifestKeys`,
`renderManifest`, `manifestBaseUrl`, and the repo path — with
`upload-assets.mjs`, `upload-activities-images.mjs`, `asset-browser.mjs` and
`build-content-schema.mjs` refitted onto it. Generated output verified
byte-identical before and after, including a test that regenerates the real
2,954-line manifest from its own keys and compares it byte for byte.

`src/lib/admin/asset-index.ts` reads that manifest **from repo HEAD**, not from
this deployment's bundle — same reason content is read from HEAD (ADR 0001). An
upload will commit the manifest and the reference together, so a photo uploaded
two minutes ago has to be findable before the deploy finishes. Cached 60s with
in-flight de-duplication, and `invalidateAssetIndex()` for the upload pipeline
to call.

Confirmed live during the smoke test: local `fix/legacy-url-redirects` has 2,948
manifest entries, `main` has 2,956 — the picker showed `main`'s, which is the
whole point.

`GET /api/admin/assets?kind=image|document|all` — session-guarded, returns
`{ base, keys }`. Keys only; sending the manifest's full URLs would roughly
quadruple the payload for a string the client can assemble. Measured: 81 KB for
1,893 images, 54 KB for 1,063 documents, 7 ms on a cache hit, 401 without a
cookie, 400 on an unknown kind.

### Browsing without folders existing

There is no folder structure — there are keys with slashes in them. The picker
treats prefixes as folders (`src/lib/admin/asset-tree.ts`), so the folders staff
see are exactly the ones whoever uploaded the photos made: `departments/`,
`gallery/`, `governance/`. Folder tiles carry the count of everything *beneath*
them, not just their top level, because "Civil engg — 3 photos" when it really
holds 200 sends an editor down the wrong path.

Search is all-words-must-match across the whole key, so "civil hod" finds
`departments/civil-engg/hod.webp` without anyone knowing the layout. A file-name
hit outranks a folder-name hit — someone typing "principal" wants the photo
called principal, not the 40 pictures filed under a folder with "principal" in
its path. Capped at 400 results, and the header says "First 400 matches" rather
than pretending that is all of them.

### Not janking on 3,000 tiles

`@tanstack/react-virtual` (the one new dependency) over rows, not tiles: entries
are chunked into rows of `columnsForWidth(width)`, and only the visible rows
render. Column count comes from a `ResizeObserver` on the scroll container, so
the grid reflows on a narrow laptop without a media-query ladder. The layout
maths — `gridEntries`, `chunk`, `columnsForWidth`, `rowOf` — is pure and tested
(`asset-grid.test.ts`); the component only draws.

Two consequences worth knowing:

- Thumbnails are the full-size originals. R2's public dev URL has no transform
  parameter and `next.config.ts` sets `images.unoptimized`, so there is nothing
  to resize with. Virtualization is what makes this survivable: ~15 images in
  flight at a time, not 1,900. If it ever feels slow on a college connection,
  the fix is a thumbnail prefix on R2, not a change here.
- React Compiler skips memoizing `PickerBody` because `useVirtualizer` returns
  functions it cannot safely memoize (lint warns, by design). The expensive
  work is behind explicit `useMemo`, so this costs nothing today — but a future
  editor passing `entries`/`rows` into a memoized child should not assume the
  compiler has their back.

### The bits that are about staff, not code

- Opening the dialog starts in the folder the current photo lives in and scrolls
  it into view, so "change this one" begins among its neighbours.
- Click selects, double-click confirms, and there is an explicit **Use this
  photo** button — a single click that both picks and closes is unforgiving
  when you are browsing.
- The catalogue is fetched on first open, not on page load. A form with six
  image fields must not pull the library six times over before anyone touches
  it.
- `kind="document"` is the same component with different words and a file icon
  instead of a thumbnail — [PDF attachments](09-pdf-attachments.md) gets its
  picker for free.

### The upload slot

An **Upload a new photo** button sits next to the search box, visibly disabled
with "Uploading from here is not switched on yet." It is in the layout now so
[Upload pipeline](08-upload-pipeline.md) drops into a settled design rather than
rearranging a screen staff have already learnt. Wiring it means: upload, commit
the manifest, `invalidateAssetIndex()`, `refreshAssetCatalogue()`, select the
new key.

Also added: `src/lib/r2-base.ts`, so the closed picker can build one thumbnail
URL without importing `asset-manifest.ts` and dragging ~3,000 entries into the
admin bundle. `assets.ts` now takes the constant from there — still one
definition.

## Verified

- `npx tsc --noEmit -p apps/web` clean.
- `pnpm --filter web test` — 112 pass, 0 fail (25 new across `asset-grid` and
  `asset-tree`).
- `pnpm --filter web build` clean.
- `/api/admin/assets` exercised against a dev server with a minted session
  cookie: 401 unauthenticated, 400 on a bad kind, 200 with the counts above.
- Lint: 0 errors on the new files; 1 expected React Compiler warning, explained
  above.

## Left for the walkthrough

The dialog itself has not been opened in a browser — the picker is not embedded
in an editor yet, so there is nothing to open. It gets its first real exercise
in [Home and governance editors](15-static-editors.md); that is where a
layout or reflow problem would show up.
