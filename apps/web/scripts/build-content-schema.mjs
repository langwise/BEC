#!/usr/bin/env node
// Generate content/_schema/asset-keys.json — a JSON Schema enum of every asset
// key that currently exists on R2 (read from the generated manifest). Content
// JSON files reference it for image fields, so editors autocomplete real keys
// and flag typos. Re-run after uploading new assets:
//
//   node scripts/build-content-schema.mjs

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const manifestPath = join(here, "..", "src", "data", "asset-manifest.ts");
const outDir = join(here, "..", "content", "_schema");
const outPath = join(outDir, "asset-keys.json");

const text = readFileSync(manifestPath, "utf8");
const keys = [...text.matchAll(/^\s*"([^"]+)":\s*"/gm)].map((m) => m[1]).sort();

mkdirSync(outDir, { recursive: true });
writeFileSync(
  outPath,
  JSON.stringify(
    {
      $schema: "http://json-schema.org/draft-07/schema#",
      title: "BEC asset key",
      description:
        "An image/PDF key that exists on R2 (see src/data/asset-manifest.ts). Regenerate with scripts/build-content-schema.mjs after uploading new assets.",
      type: "string",
      enum: keys,
    },
    null,
    2,
  ) + "\n",
);

console.log(`wrote ${keys.length} asset keys -> ${outPath}`);
