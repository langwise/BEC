# Secrets and access

Type: task (HITL)
Status: resolved

## Question

Provision everything the Admin needs to talk to GitHub, R2, and gate itself — done by Pratik, agent provides the checklist:

1. Create a **fine-grained GitHub PAT** on `langwise/BEC` with only *Contents: read/write*; record as `GITHUB_CONTENT_TOKEN`.
2. **Rotate the classic `ghp_…` token** currently embedded in the git remote URL (over-scoped, leaked into shell history/configs).
2b. **Rotate + relocate the R2 credentials in `../r2_keys.json`** (repo parent dir) — it's an unencrypted blob holding `s3_access_key`, `s3_secret_key`, and an account token (found by the [Orphan detection study](10-orphan-detection-study.md)). Move values into `.env.local`/Vercel env and delete the file.
3. Add Vercel env vars: `ADMIN_PASSWORD`, `GITHUB_CONTENT_TOKEN`, R2 write credentials (mirror `.env.local`), and the R2 bucket/account IDs the upload pipeline needs.
4. Confirm the Vercel project auto-deploys `main` (it does today — just verify nothing changes with env additions).
5. **Set a CORS policy on the R2 bucket** allowing PUT from `https://becbgk.edu` (and localhost for dev) — required by the presigned direct-to-R2 PDF uploads decided in [Upload transport decision](19-upload-transport.md). Via Cloudflare dashboard → R2 → bucket → Settings → CORS, or the API.

Resolution records where each secret lives (names only, never values).

## Answer

Resolved 2026-08-14 by Pratik. Where each secret lives (names only):

- `GITHUB_CONTENT_TOKEN` and `ADMIN_PASSWORD` — added to `apps/web/.env.local` and to Vercel. Both documented in `.env.example`.
- R2 credentials — unchanged, still `R2_ACCOUNT_ID` / `R2_ACCESS_KEY_ID` / `R2_SECRET_ACCESS_KEY` / `R2_BUCKET` / `R2_S3_ENDPOINT` / `NEXT_PUBLIC_R2_BASE_URL`.
- The classic `ghp_…` token is no longer in the git remote (origin is SSH, `git@personal:langwise/BEC.git`).

**Declined by Pratik**: rotating the R2 credentials and deleting `../r2_keys.json` ("not changing R2 creds, idc"). The unencrypted blob with `s3_access_key`, `s3_secret_key` and an account token stays on disk next to the repo — accepted risk, recorded here so it is a decision rather than an oversight.

**Still outstanding, needed before [PDF attachments](09-pdf-attachments.md) can work in production**: the R2 bucket CORS policy allowing `PUT` from `https://becbgk.edu` (and `http://localhost:3000` for dev), per [Upload transport decision](19-upload-transport.md). Not needed for any earlier slice.

Now that [09](09-pdf-attachments.md) is built, the exact policy the code needs — Cloudflare dashboard → R2 → `bec-assets` → Settings → CORS policy:

```json
[
  {
    "AllowedOrigins": ["https://becbgk.edu", "http://localhost:3000"],
    "AllowedMethods": ["PUT"],
    "AllowedHeaders": ["content-type"],
    "MaxAgeSeconds": 3600
  }
]
```

`content-type` in `AllowedHeaders` is not optional: the presigned URL signs that header (so a URL issued for a PDF cannot be used to store HTML), which means the browser must send it, which means the preflight must permit it. Without that line the PUT fails at preflight with no useful message. `PUT` alone is enough — the Admin never reads or lists the bucket from the browser.

**Still outstanding, needed before [Upload pipeline](08-upload-pipeline.md) works in production** (added 2026-08-14): the four R2 write variables — `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET`, `R2_S3_ENDPOINT` — must exist in the **Vercel** environment, not just `.env.local`. Until this ticket they were only ever read by local scripts; the upload route is the first thing that needs them at runtime on the deployment. Without them an upload fails with "The Admin cannot reach the photo storage on this deployment" — a clear message, but still a dead button. Verified working locally; unverified on Vercel.

**Defect found while wiring auth**: `ADMIN_PASSWORD` ended with `#`, which the dotenv parser Next uses reads as the start of an inline comment — Next loaded a 14-character value where the file line held 15, so the correct password was rejected locally while Vercel (which stores dashboard values verbatim) would have accepted it. Fixed by quoting the value in `.env.local`; `.env.example` now warns about it. Worth re-checking the Vercel copy has no stray quotes.
