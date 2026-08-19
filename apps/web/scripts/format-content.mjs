#!/usr/bin/env node
// Rewrite every content/*.json in the one canonical format (2-space indent, LF,
// trailing newline):
//
//   pnpm --filter web format-content
//   pnpm --filter web format-content --check    # exit 1 instead of writing
//
// This matters because a Publish from the Admin is a git commit and
// the git history is the audit trail. The Admin serialises through
// src/content/format.ts; if a file on disk is shaped differently — CRLF, a
// stray blank line, prettier-style inline objects — the first Publish would
// reformat the whole file and bury the actual edit in the diff. `--check` runs
// in the build gate so that drift cannot come back.

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { contentFiles } from "../src/content/schema/index.ts";
import { serializeContentFile } from "../src/content/format.ts";

const contentDir = join(dirname(fileURLToPath(import.meta.url)), "..", "content");
const checkOnly = process.argv.includes("--check");

const drifted = [];
for (const { file } of contentFiles) {
  const path = join(contentDir, file);
  const actual = readFileSync(path, "utf8");
  const canonical = serializeContentFile(JSON.parse(actual));

  if (actual === canonical) {
    if (!checkOnly) console.log(`ok       content/${file}`);
    continue;
  }

  drifted.push(file);
  if (checkOnly) {
    console.error(`UNFORMATTED content/${file}`);
    continue;
  }
  writeFileSync(path, canonical);
  console.log(`written  content/${file}`);
}

if (checkOnly && drifted.length > 0) {
  console.error(
    `\n${drifted.length} content file(s) are not in canonical format.` +
      "\nRun: pnpm --filter web format-content",
  );
  process.exit(1);
}

if (checkOnly) console.log("All content files are canonically formatted.");
