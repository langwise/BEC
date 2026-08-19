# Upload pipeline

Type: task (AFK)
Status: resolved
Blocked by: 04, 06, 19

## Question

Server-side upload: accept an image, convert to WebP (sharp), mint an immutable key (context-derived folder + slug + short random suffix — ADR 0003), PUT to R2, append the manifest/asset-keys entries, and commit them through the publish pipeline. Per-file size cap; reject non-images; wire the picker's upload slot so "change the photo" = upload + reference update in one Publish.

## Answer

`POST /api/admin/upload` takes a photo, converts it, files it under an
immutable key and hands the key back. The picker's upload button is live.

### The one thing the ticket had backwards

The ticket says the upload should "append the manifest/asset-keys entries, and
commit them through the publish pipeline". Committing *at upload time* is the
wrong place: every commit to `main` triggers a production deploy, so filling a
gallery with ten photos would queue ten deploys and the Editor would sit
watching a page rebuild ten times to publish one change.

So the upload does **not** commit. It PUTs the bytes and returns the key; the
**Publish that references that key** registers it, and manifest + asset-keys +
content land in one commit — which is exactly the "one Publish" the ticket's
last sentence asks for, and the reason `commitFiles` was built multi-file back
in [Publish pipeline](04-publish-pipeline.md).

Which keys to register is read off the submitted document rather than from a
list the browser sends (`lib/admin/manifest-sync.ts`). A client-supplied list
would have to be threaded through every editor's state and every editor could
forget; reading the document is bookkeeping-free and self-healing — a key that
somehow missed its commit is picked up by the next Publish that mentions it.
Three gates stop that from being sloppy:

1. the string has to look like an asset key (no URLs, no absolute paths, no `..`);
2. the manifest must not already have it;
3. **the object must actually exist on R2** — verified with a HeadObject before
   anything enters the manifest, because an unverified key is a broken image on
   the live site.

An upload that is never published leaves an object nothing references. That is
not a leak to fix here — it is precisely what [Cleanup and usage
screen](12-cleanup-usage-screen.md) exists to find.

### Conversion

`lib/admin/image-convert.ts` reproduces what every asset already on R2 went
through (`sips` + `cwebp`: longest edge 2400, quality 80, never upscale), via
`sharp().rotate().resize({fit:"inside",withoutEnlargement:true}).webp({quality:80})`.
`.rotate()` is load-bearing — sips baked EXIF orientation into the pixels and
sharp does not unless asked, so without it phone photos arrive sideways.

The format is sniffed from the bytes, never from the browser's Content-Type: a
renamed non-image with an image MIME fails at the route, verified.

### Getting under 4.5 MB

Vercel's request-body cap is not configurable (ADR 0004), so `shrink-image.ts`
resizes in the browser first — **but only when it has to**. A file under 3.5 MB
is sent untouched, because the server re-encodes anyway and shrinking first
would put a second lossy pass on a photo that never needed one. Above that, the
browser resizes to 2400px and steps quality down 0.92 → 0.6 until it fits,
using `createImageBitmap(..., {imageOrientation: "from-image"})` so the phone's
EXIF rotation survives the canvas. HEIC (which only Safari decodes) gets a
sentence that says what to do — "open it and export as JPEG first" — instead of
a silent failure.

### Keys

`lib/admin/asset-key.ts`, per ADR 0003: `governance/principal-photo-k3f9wq.webp`
— folder from the field, slug from the uploaded file name, six random
characters. Readable, because these keys end up in content JSON that Pratik
reads in diffs. The suffix uses rejection sampling rather than `% 36`, since 256
is not a multiple of 36 and the lazy version quietly favours a–d.

Two guards worth naming:

- The folder is slugged segment by segment, so `../../etc` becomes `etc/` and an
  absolute path loses its leading slash — an upload cannot escape the library.
- The folder's **top-level segment must already exist** in the manifest, so a
  typed `depatments/` is refused rather than filed somewhere nobody looks.

Where an upload goes: the field says so (`uploadFolder="governance/"`), falling
back to whichever folder the Editor is browsing. Fields know where their
pictures belong; the root is never a destination.

### Picker

The disabled slot from [Image picker](07-image-picker.md) is now a working
button. An uploaded key is on R2 but not yet in the committed manifest, so the
picker adds it to its own copy of the catalogue, selects it, and navigates to
its folder — the Editor sees the photo they just uploaded, in place, and a line
saying it goes on the site when they publish. Document uploads stay disabled:
PDFs go presigned direct-to-R2, which is [PDF
attachments](09-pdf-attachments.md).

## Verified

Against a dev server with a minted session cookie:

| case | result |
| --- | --- |
| no cookie | 401, "Your session has expired." |
| no file | 400, "No photo was attached." |
| no folder | 400, "There is nowhere to file this photo." |
| `folder=depatments/typo` | 400, `There is no "depatments" section in the photo library.` |
| non-image with a `.jpg` name | 415, "could not be read as a picture" |
| 3000×2000 JPEG, `gallery/admin-smoke-test` | 200 in 1.0s → 2400×1600 WebP, 6,910 bytes |

The uploaded object was then fetched from its public R2 URL (HTTP 200,
`image/webp`, decodes as 2400×1600), the `assetExists` gate the Publish path
relies on was checked against it (`true`) and against a bogus key (`false`), and
**the test object was deleted from the bucket** — the public URL now returns
404, so nothing was left stranded.

Also: `npx tsc --noEmit -p apps/web` clean, `pnpm --filter web test` 140 pass /
0 fail (28 new), `pnpm --filter web build` clean with `/api/admin/upload`
registered, lint 0 problems on the new files.

The `renderAssetKeys` test regenerates the checked-in
`content/_schema/asset-keys.json` from the manifest and compares byte for byte,
so a Publish that registers a key cannot silently reformat a 2,948-entry
generated file.

## Left for Pratik

- **`sharp` and `@aws-sdk/client-s3` moved from devDependencies to
  dependencies** — a route handler needs them at runtime. `pnpm-lock.yaml`
  updated.
- **The four R2 write variables must be added to Vercel**
  (`R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET`, `R2_S3_ENDPOINT`).
  Until now they were only read by local scripts. Without them the upload
  button fails with a clear message but stays dead — added to [Secrets and
  access](01-secrets-and-access.md).
- The registration half has been unit-tested but never executed end to end,
  because that requires a real Publish to `main`. It happens with the first
  Publish, alongside the rest of [News migration and first
  editor](05-news-migration-editor.md)'s pending walkthrough.
