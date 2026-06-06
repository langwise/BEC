#!/usr/bin/env node
// Idempotently provision the R2 bucket and turn on its public r2.dev URL.
// Uses the Cloudflare REST API (Bearer = R2_API_TOKEN). Prints the public base
// URL, which you paste into NEXT_PUBLIC_R2_BASE_URL.
//
//   node scripts/r2-provision.mjs

import { requireEnv } from "./_env.mjs";

const env = requireEnv("R2_ACCOUNT_ID", "R2_API_TOKEN", "R2_BUCKET");
const API = `https://api.cloudflare.com/client/v4/accounts/${env.R2_ACCOUNT_ID}/r2`;
const auth = { Authorization: `Bearer ${env.R2_API_TOKEN}`, "Content-Type": "application/json" };

async function cf(method, path, body) {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: auth,
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, json };
}

async function main() {
  // 1. Create bucket (ignore "already exists").
  const create = await cf("POST", "/buckets", { name: env.R2_BUCKET });
  if (create.ok) {
    console.log(`bucket created: ${env.R2_BUCKET}`);
  } else {
    const code = create.json?.errors?.[0]?.code;
    const msg = create.json?.errors?.[0]?.message ?? create.status;
    if (code === 10004 || /exist/i.test(String(msg))) console.log(`bucket exists: ${env.R2_BUCKET}`);
    else throw new Error(`bucket create failed: ${JSON.stringify(create.json)}`);
  }

  // 2. Enable the managed public (r2.dev) domain.
  const enable = await cf("PUT", `/buckets/${env.R2_BUCKET}/domains/managed`, { enabled: true });
  if (!enable.ok) throw new Error(`enable public url failed: ${JSON.stringify(enable.json)}`);

  // 3. Read back the managed domain.
  const get = await cf("GET", `/buckets/${env.R2_BUCKET}/domains/managed`);
  const domain = get.json?.result?.domain || enable.json?.result?.domain;
  if (!domain) throw new Error(`could not resolve public domain: ${JSON.stringify(get.json)}`);

  const baseUrl = `https://${domain}`;
  console.log(`public url enabled: ${baseUrl}`);
  console.log(`\n>> set NEXT_PUBLIC_R2_BASE_URL=${baseUrl} in apps/web/.env.local`);
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
