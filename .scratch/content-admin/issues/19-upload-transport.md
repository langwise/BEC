# Upload transport decision

Type: grilling (HITL)
Status: resolved
Blocked by: 06

## Question

Vercel functions hard-cap request bodies at 4.5 MB (surfaced by [Asset pipeline study](06-asset-pipeline-study.md)), which breaks the grilling Q12 assumption of a ~15 MB PDF cap. Decide the upload transport:

- **(a) Through-the-function only**: images work via mandatory client-side pre-shrink (≤2400px before POST; HEIC fails outside Safari), but **PDF Attachments are capped at ~4 MB** — many scanned college notices exceed that.
- **(b) Presigned direct-to-R2 PUT**: no size ceiling (cap becomes policy, e.g. 15 MB), original bytes reach the server-side converter via a finalize step — but needs a bucket CORS policy (new provisioning step for [Secrets and access](01-secrets-and-access.md)), `@aws-sdk/s3-request-presigner`, and a two-phase upload flow.
- **(c) Hybrid**: images via (a) — simpler, and conversion stays server-side; PDFs via (b) — they're pass-through anyway, so presign+PUT with a size condition needs no finalize conversion.

Recommendation to grill: **(c)** — smallest surface that keeps the 15 MB PDF promise.

## Answer

Resolved 2026-08-08 with Pratik: **(c) Hybrid.** Images go through the Vercel function (mandatory client pre-shrink to ≤2400px, server re-converts to WebP at 2400px/q80 — conversion stays server-side). PDFs go presigned direct-to-R2 with a **15 MB policy cap** (pass-through storage, no finalize conversion needed). Consequences: bucket CORS policy + `@aws-sdk/s3-request-presigner` added to the stack; CORS provisioning added to [Secrets and access](01-secrets-and-access.md); presigned PDF uploads must still register the key in the manifest via the same commit path (the presign response carries the minted key; the Publish that references it commits the manifest entry).
