# PDF attachments

Type: task (AFK)
Status: resolved
Blocked by: 05, 08

## Question

Attachments for News/Announcements (CONTEXT.md "Attachment"): the link field's three modes — attach PDF (upload to R2 under `documents/news/`, immutable key, size cap per the [Upload transport decision](19-upload-transport.md), no WebP step), external URL, or no link. Rides the upload pipeline; PDF keys join the manifest like images.

## Answer

A News item's "When someone clicks it" is one control with three buttons —
**Nothing / A PDF / A link** — over the single stored `link` field.

### One field, three modes

Three separate fields would make the Editor decide *which box applies*; one
control makes them decide *what should happen*, which is the question they
actually have. Same reasoning that put calendar dates and period labels in one
`date` field in [News migration and first editor](05-news-migration-editor.md).

The stored value stays one string, so `content/news.json` did not change shape
and the 16 existing items — two `/admissions`-style links, one off-site URL —
keep working untouched. What distinguishes the modes is the shape of the string:
an asset key (`documents/news/notice-k3f9wq.pdf`) is an attachment, anything
else is a link. That rule now lives in exactly one place,
`lib/asset-key-shape.ts`, deliberately free of any Node import so the *site* can
use it too — the home page's news section is a client component, and the
Admin's copy of the rule sits behind `node:crypto`.

The mode is held in React state rather than derived from the value. "A link,
not yet typed" and "no link" are both the empty string, and a toggle that snaps
back to Nothing while someone is mid-URL is the kind of thing that makes an
Editor stop trusting the screen.

### What the site does with it

`content/news-link.ts` resolves a stored `link` once, at the content layer, so
no renderer has to know an attachment exists: `NewsListItem` now carries
`href` / `external` / `attachment` instead of the raw `link`. Both renderers
(the home section and `/news`) mark attachments with a document icon, off-site
links with the arrow they already had, and open both in a new tab.

That module builds the URL as `base + "/" + key` rather than calling `asset()`,
on purpose — `asset()` carries the ~2,950-entry manifest, and this code reaches
a client bundle. The manifest lookup would only add a does-it-exist check that
the Publish path has already enforced.

### Transport

PDFs do not go through `/api/admin/upload`. A scanned notice is routinely over
Vercel's non-configurable 4.5 MB body cap, and unlike a photo there is nothing a
server pass would do to it — no format to convert, nothing to resize. So per
ADR 0004 the browser gets a **presigned URL** and PUTs the file straight to R2:

- `POST /api/admin/upload/presign` — session-gated, PDF-only, folder normalised
  and top-level-checked exactly as the image route does, key minted with the
  same `mintAssetKey` and the same 5-attempt collision check against the
  manifest *and* the bucket. Returns `{key, uploadUrl, contentType, url}`.
- `lib/admin/upload-pdf.ts` — the browser half. Cap 15 MB, checked client-side
  too so an oversize file fails instantly instead of after a round trip.

The signature pins **key, content length and content type**. Length means a
signed URL for a 400 KB notice cannot be replayed to push 400 MB into the free
tier. Content type needed `signableHeaders: new Set(["content-type"])` — the
SDK leaves it unsigned by default, which would let a URL issued for a notice
store an HTML file that R2 then serves as HTML from our domain. Verified: a PUT
with `Content-Type: text/html` against a PDF-issued URL is refused with
`SignatureDoesNotMatch`.

One trap found by inspecting the generated URL rather than trusting it: the AWS
SDK adds a CRC32 of the body by default, and when presigning there *is* no body
yet, so it baked `x-amz-checksum-crc32=AAAAAA==` — the checksum of nothing —
into the link. R2 ignores it today, which is worse than enforcing it: the day it
stops ignoring it, every upload breaks at once. Presigning now uses a client
with `requestChecksumCalculation: "WHEN_REQUIRED"`; the direct-upload path keeps
the real checksum it has always had.

### The picker that was not used

[Image picker](07-image-picker.md) built `kind="document"` expecting this ticket
to want it. It did not. The ticket's three modes are attach / link / nothing —
there is no "pick a PDF someone uploaded earlier", and a full dialog for
browsing 100+ documents is a lot of screen for a step that is always "the file
I have in front of me". So the attachment mode is a plain file button.

The consequence, recorded rather than hidden: attaching the same circular to two
News items uploads it twice under two keys. Both are small, both are referenced,
and neither is an orphan — but if re-attaching an existing document ever becomes
a real request, `kind="document"` is already there to switch on.

### Registration

Nothing extra was needed. `collectKeyCandidates` walks the whole submitted
document, so a PDF key sitting in a News item's `link` is picked up by the same
three gates as an image — key-shaped, not already known, and **verified present
on R2** — and lands in the same single commit as the content change. There is
no PDF-specific bookkeeping to forget.

## Verified

Against a dev server with real R2 credentials and a minted session cookie:

| case | result |
| --- | --- |
| no cookie | 401 |
| `notice.docx` | 400, "Only PDF files can be attached." |
| `folder=nonsense/news` | 400, `There is no "nonsense" section in the document library.` |
| 20 MB declared | 413, "Attachments have to be under 15 MB." |
| `Exam Notice — Nov 2026 (final).PDF` | 200 → key `documents/news/exam-notice-nov-2026-final-sfjnbq.pdf` |
| PUT to the signed URL | 200 |
| public URL after the PUT | 200, `application/pdf`, byte-identical to the file sent |
| PUT with `Content-Type: text/html` | 403 `SignatureDoesNotMatch` |
| signed headers on the URL | `content-length;content-type;host`, no checksum params |

**Both test objects were then deleted from the bucket** (list-then-delete under
a `documents/news/` prefix guard); the public URL returns 404 and the folder is
empty again. The staged credentials file and every scratch artefact were removed
afterwards.

Also: `npx tsc --noEmit -p apps/web` clean, `pnpm --filter web test` 149 pass /
0 fail (9 new — `news-link.ts` and the news-shaped case in `manifest-sync`),
`pnpm --filter web build` clean with `/api/admin/upload/presign` registered,
lint 0 problems on the changed files.

## Left for Pratik

- **The bucket's CORS policy is still the one gap.** curl PUTs to a presigned
  URL succeed, which proves the whole server path, but a browser will not send
  the request at all until `bec-assets` allows the Admin's origin. Assigned in
  [Secrets and access](01-secrets-and-access.md); until it is done the Editor
  gets the sentence "The file could not be sent to storage. Ask Pratik to check
  the bucket's CORS settings" rather than an unexplained failure.
- **`@aws-sdk/s3-request-presigner` added** (dependencies, not dev). It also
  forced `@aws-sdk/client-s3` up to `^3.1110.0` — the two packages share
  `@smithy/types`, and the older range resolved to a different copy, which is a
  type error, not a warning. `pnpm-lock.yaml` updated.
- `content/news.schema.json` regenerated: the `link` description now spells out
  the three forms, since that string is what a schema-guided editor reads.
