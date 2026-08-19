/**
 * The bucket half of an upload. R2 is S3-compatible, so this is the same client
 * `scripts/upload-assets.mjs` has always used — same env vars, same endpoint —
 * only reached from a route handler instead of a terminal.
 *
 * Bytes land here *before* anything is committed. That is deliberate: the key
 * has to resolve to a real URL for the Editor to see a preview, and committing
 * per upload would spend a production deploy on every photo. An upload that is
 * never published leaves an unreferenced object, which is exactly what the
 * cleanup screen exists to find.
 */

import {
  DeleteObjectsCommand,
  HeadObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export class R2NotConfiguredError extends Error {
  constructor(missing: string[]) {
    super(`R2 is not configured on this deployment (missing: ${missing.join(", ")}).`);
    this.name = "R2NotConfiguredError";
  }
}

const REQUIRED = [
  "R2_ACCESS_KEY_ID",
  "R2_SECRET_ACCESS_KEY",
  "R2_BUCKET",
  "R2_S3_ENDPOINT",
] as const;

function missingEnv(): string[] {
  return REQUIRED.filter((name) => !process.env[name]);
}

export function isR2Configured(): boolean {
  return missingEnv().length === 0;
}

/**
 * Two clients, because presigning needs one setting the ordinary path does not.
 * By default the SDK computes a CRC32 of the body and sends it alongside; on a
 * *presigned* URL there is no body to hash yet, so it bakes the checksum of an
 * empty one into the link. R2 happens to ignore it today, which is worse than
 * enforcing it — the day it stops ignoring it, every upload breaks at once.
 * `WHEN_REQUIRED` drops it from the signature and leaves the direct-upload path
 * (`putAsset`) with the real, useful checksum it has always had.
 */
type Variant = "direct" | "presign";

const cached = new Map<string, { endpoint: string; client: S3Client }>();

function client(variant: Variant = "direct"): S3Client {
  const missing = missingEnv();
  if (missing.length) throw new R2NotConfiguredError(missing);

  const endpoint = process.env.R2_S3_ENDPOINT as string;
  if (cached.get(variant)?.endpoint !== endpoint) {
    cached.set(variant, {
      endpoint,
      client: new S3Client({
        region: "auto",
        endpoint,
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID as string,
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY as string,
        },
        ...(variant === "presign" ? { requestChecksumCalculation: "WHEN_REQUIRED" } : {}),
      }),
    });
  }
  return cached.get(variant)!.client;
}

function bucket(): string {
  return process.env.R2_BUCKET as string;
}

export async function putAsset(
  key: string,
  body: Buffer,
  contentType: string,
): Promise<void> {
  await client().send(
    new PutObjectCommand({
      Bucket: bucket(),
      Key: key,
      Body: body,
      ContentType: contentType,
    }),
  );
}

/** Long enough for a slow connection to push 15 MB, short enough to be no use later. */
const PRESIGN_TTL_SECONDS = 10 * 60;

/**
 * A URL the browser can PUT one specific object to, without the bytes passing
 * through the function (ADR 0004). PDFs need this: Vercel caps request bodies
 * at 4.5 MB and a scanned notice has nothing to shrink.
 *
 * The signature covers the key, the content type **and the exact byte count**,
 * so the URL cannot be replayed to upload something else, something larger, or
 * something elsewhere in the bucket. The browser must send matching
 * `Content-Type` and `Content-Length` headers or R2 rejects the PUT.
 * `signableHeaders` is what puts content type in that list — the SDK leaves it
 * out otherwise, which would let a signed URL for a notice store a script.
 */
export async function presignPut({
  key,
  contentType,
  bytes,
}: {
  key: string;
  contentType: string;
  bytes: number;
}): Promise<string> {
  return getSignedUrl(
    client("presign"),
    new PutObjectCommand({
      Bucket: bucket(),
      Key: key,
      ContentType: contentType,
      ContentLength: bytes,
    }),
    {
      expiresIn: PRESIGN_TTL_SECONDS,
      signableHeaders: new Set(["content-type"]),
    },
  );
}

/**
 * Whether an object exists at `key`. Used two ways: to refuse to mint a key
 * that is somehow already taken, and — on the Publish path — to refuse to add a
 * key to the manifest unless the bytes are really there.
 */
export async function assetExists(key: string): Promise<boolean> {
  try {
    await client().send(new HeadObjectCommand({ Bucket: bucket(), Key: key }));
    return true;
  } catch (error) {
    const status = (error as { $metadata?: { httpStatusCode?: number } }).$metadata
      ?.httpStatusCode;
    if (status === 404 || status === 403) return false;
    throw error;
  }
}

/**
 * Every object in the bucket, with its size and age.
 *
 * Nothing else records object sizes — the manifest holds keys and URLs — so the
 * free-tier gauge, the "what would this give back" figure and the 30-day upload
 * grace all come from this one sweep. ~2,950 objects is three round-trips and
 * well under a second (`scripts/r2-usage.mjs` has swept the same way for
 * months); the cleanup screen caches the result rather than repeating it.
 */
export async function listAllObjects(): Promise<
  { key: string; size: number; modifiedAt: number }[]
> {
  const out: { key: string; size: number; modifiedAt: number }[] = [];
  let token: string | undefined;
  do {
    const page = await client().send(
      new ListObjectsV2Command({ Bucket: bucket(), ContinuationToken: token }),
    );
    for (const object of page.Contents ?? []) {
      if (!object.Key) continue;
      out.push({
        key: object.Key,
        size: object.Size ?? 0,
        modifiedAt: object.LastModified?.getTime() ?? 0,
      });
    }
    token = page.IsTruncated ? page.NextContinuationToken : undefined;
  } while (token);
  return out;
}

/**
 * The Admin's only irreversible act. Deliberately unbatched beyond one call —
 * the cleanup screen caps a deletion at 25 objects, which is one request, and
 * a caller wanting more should be made to think about it rather than loop.
 *
 * Returns the keys R2 refused, so a partial failure is reported rather than
 * silently swallowed by a 200.
 */
export async function deleteObjects(keys: readonly string[]): Promise<{ failed: string[] }> {
  if (keys.length === 0) return { failed: [] };
  const result = await client().send(
    new DeleteObjectsCommand({
      Bucket: bucket(),
      Delete: { Objects: keys.map((Key) => ({ Key })), Quiet: true },
    }),
  );
  return { failed: (result.Errors ?? []).map((error) => error.Key ?? "").filter(Boolean) };
}
