#!/usr/bin/env node
// Report R2 bucket object count + total size against the 10 GB free tier, so it's
// easy to confirm the project never crosses into billing.
//
//   node scripts/r2-usage.mjs

import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { requireEnv } from "./_env.mjs";

const env = requireEnv("R2_ACCESS_KEY_ID", "R2_SECRET_ACCESS_KEY", "R2_BUCKET", "R2_S3_ENDPOINT");
const FREE_GB = 10;

const s3 = new S3Client({
  region: "auto",
  endpoint: env.R2_S3_ENDPOINT,
  credentials: { accessKeyId: env.R2_ACCESS_KEY_ID, secretAccessKey: env.R2_SECRET_ACCESS_KEY },
});

let count = 0, bytes = 0, token;
do {
  const res = await s3.send(new ListObjectsV2Command({ Bucket: env.R2_BUCKET, ContinuationToken: token }));
  for (const o of res.Contents ?? []) { count++; bytes += o.Size ?? 0; }
  token = res.IsTruncated ? res.NextContinuationToken : undefined;
} while (token);

const gb = bytes / 1024 ** 3;
console.log(`bucket ${env.R2_BUCKET}: ${count} objects, ${(bytes / 1048576).toFixed(1)} MB`);
console.log(`free tier: ${gb.toFixed(3)} / ${FREE_GB} GB used (${((gb / FREE_GB) * 100).toFixed(1)}%)`);
console.log(gb < FREE_GB ? "OK — within free tier" : "WARNING — over free tier");
