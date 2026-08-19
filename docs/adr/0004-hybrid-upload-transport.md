# Hybrid upload transport: images through the function, PDFs presigned to R2

Vercel hard-caps function request bodies at 4.5 MB, which images can duck (client pre-shrinks to ≤2400px before POST; the server still re-encodes to WebP at the pipeline's settings) but PDFs cannot — scanned notices routinely exceed it and there is nothing to shrink. So image uploads go through a Vercel route (conversion stays server-side, one-phase), while PDF Attachments upload via presigned PUT directly to R2 with a 15 MB policy cap. Cost of the split: a bucket CORS policy and `@aws-sdk/s3-request-presigner`; either-path uploads still register their minted key in the committed manifest through the same Publish.

## Considered Options

- Everything through the function: rejected — permanent ~4 MB PDF ceiling with no workaround.
- Everything presigned: rejected — images would need a second "finalize" conversion round-trip, making every upload two-phase for no gain.
