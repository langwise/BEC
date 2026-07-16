#!/usr/bin/env node
// Stage Section-Changes-15.07.26 assets into a flat keyed dir ready for
// scripts/upload-assets.mjs. Images -> WebP (sips decode -> cwebp q82, max 2400px);
// PDFs copied as-is. Input: a JSON file [{ sourcePath, key }].
//
//   node scripts/stage-section-assets.mjs <plan.json> <out-dir>

import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, copyFileSync, readFileSync, existsSync } from "node:fs";
import { join, dirname, extname } from "node:path";
import { tmpdir } from "node:os";

const MAX_DIM = 2400;
const WEBP_QUALITY = 82;

const [planPath, outDir] = process.argv.slice(2);
if (!planPath || !outDir) {
  console.error("usage: node scripts/stage-section-assets.mjs <plan.json> <out-dir>");
  process.exit(1);
}
const plan = JSON.parse(readFileSync(planPath, "utf8"));

function toWebp(src, dest) {
  const tmp = mkdtempSync(join(tmpdir(), "stage-"));
  const png = join(tmp, "i.png");
  execFileSync("sips", ["-s", "format", "png", "-Z", String(MAX_DIM), src, "--out", png], { stdio: "ignore" });
  execFileSync("cwebp", ["-q", String(WEBP_QUALITY), png, "-o", dest], { stdio: "ignore" });
}

let ok = 0, miss = 0;
for (const { sourcePath, key } of plan) {
  if (!existsSync(sourcePath)) { console.error(`  MISSING  ${sourcePath}`); miss++; continue; }
  const dest = join(outDir, key);
  mkdirSync(dirname(dest), { recursive: true });
  const ext = extname(key).toLowerCase();
  if (ext === ".webp") toWebp(sourcePath, dest);
  else copyFileSync(sourcePath, dest);
  console.log(`  ok  ${key}`);
  ok++;
}
console.log(`\nstaged ${ok}, missing ${miss} -> ${outDir}`);
