#!/usr/bin/env node
// Validate every content/*.json file against its Zod schema (the same schemas
// the loaders in src/content/*.ts parse through). Fails with the file name,
// JSON path and problem for each violation. Runs as part of `pnpm build`:
//
//   pnpm --filter web validate-content
//
// Imports the TS schema modules directly via Node's built-in type stripping
// (Node >= 22.18).

import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";
import { contentFiles } from "../src/content/schema/index.ts";
import { collectAssetKeys } from "../src/content/schema/asset-fields.ts";
import { isCanonicallyFormatted } from "../src/content/format.ts";
import { manifestKeys } from "../src/lib/asset-manifest-io.ts";

const here = dirname(fileURLToPath(import.meta.url));
const contentDir = join(here, "..", "content");

// `asset()` invents a plausible R2 URL for a key it does not recognise, so a
// typo used to ship as an image that 404s on a live page. The manifest is the
// list of files that exist; a marked field naming anything else fails here.
const knownKeys = new Set(manifestKeys(readFileSync(join(here, "..", "src", "data", "asset-manifest.ts"), "utf8")));

let failed = false;
for (const { file, schema } of contentFiles) {
  const text = readFileSync(join(contentDir, file), "utf8");
  const data = JSON.parse(text);
  const result = schema.safeParse(data);
  if (result.success) {
    const missing = collectAssetKeys(schema, result.data).filter(({ key }) => !knownKeys.has(key));
    if (missing.length === 0) {
      console.log(`ok      content/${file}`);
    } else {
      failed = true;
      console.error(`MISSING ASSETS content/${file}`);
      for (const { path, key } of missing) console.error(`  ${path}: "${key}" is not on R2`);
      console.error("  upload it (pnpm --filter web upload-assets) or fix the key");
    }
  } else {
    failed = true;
    console.error(`INVALID content/${file}`);
    console.error(z.prettifyError(result.error).replace(/^/gm, "  "));
  }

  // The Admin publishes through src/content/format.ts, so a file stored in any
  // other shape would turn the Editor's next one-line edit into a whole-file
  // reformat and destroy the git history as an audit trail.
  if (!isCanonicallyFormatted(text)) {
    failed = true;
    console.error(`UNFORMATTED content/${file}`);
    console.error("  run: pnpm --filter web format-content");
  }
}

// A content file with no schema must fail loudly, not slip past the gate.
const covered = new Set(contentFiles.map(({ file }) => file));
const uncovered = readdirSync(contentDir).filter(
  (name) => name.endsWith(".json") && !name.endsWith(".schema.json") && !covered.has(name),
);
if (uncovered.length > 0) {
  failed = true;
  for (const name of uncovered) {
    console.error(`INVALID content/${name}`);
    console.error("  no schema registered in src/content/schema/index.ts");
  }
}

if (failed) {
  console.error("\nContent validation failed.");
  process.exit(1);
}
console.log("All content files are valid.");
