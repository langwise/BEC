#!/usr/bin/env node
// Regenerate the content-editing IDE hints, all in one command:
//
//   node scripts/build-content-schema.mjs
//
// 1. content/_schema/asset-keys.json — a JSON Schema enum of every asset key
//    that currently exists on R2 (read from the generated manifest), so image/
//    PDF fields autocomplete real keys and flag typos. Re-run after uploads.
// 2. content/*.schema.json — emitted from the Zod content contract in
//    src/content/schema/ (the same schemas the loaders parse through), so the
//    IDE hints can never drift from what the build actually validates. Fields
//    marked with the assetKey meta become $refs into asset-keys.json.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";
import { contentFiles } from "../src/content/schema/index.ts";
import { manifestKeys } from "../src/lib/asset-manifest-io.ts";

const here = dirname(fileURLToPath(import.meta.url));
const manifestPath = join(here, "..", "src", "data", "asset-manifest.ts");
const contentDir = join(here, "..", "content");
const outDir = join(contentDir, "_schema");
const outPath = join(outDir, "asset-keys.json");

// --- 1. asset-keys.json ------------------------------------------------------

const keys = manifestKeys(readFileSync(manifestPath, "utf8")).sort();

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

// --- 2. *.schema.json from the Zod contract ----------------------------------

for (const { schemaFile, title, description, schema } of contentFiles) {
  const jsonSchema = z.toJSONSchema(schema, {
    target: "draft-07",
    override: (ctx) => {
      // assetKey() fields keep autocomplete: swap the plain string for a $ref
      // into the asset-keys enum (allOf so a sibling description survives).
      const meta = ctx.zodSchema.meta?.();
      if (meta?.assetKey) {
        delete ctx.jsonSchema.assetKey;
        delete ctx.jsonSchema.type;
        ctx.jsonSchema.allOf = [{ $ref: "./_schema/asset-keys.json" }];
      }
    },
  });

  delete jsonSchema.$schema;
  const out = {
    $schema: "http://json-schema.org/draft-07/schema#",
    title,
    ...(description ? { description } : {}),
    ...jsonSchema,
  };
  const target = join(contentDir, schemaFile);
  writeFileSync(target, JSON.stringify(out, null, 2) + "\n");
  console.log(`wrote ${schemaFile} from the Zod contract`);
}
