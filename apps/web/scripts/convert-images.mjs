#!/usr/bin/env node
// Convert raw camera photos (CR3 / JPG) -> optimized WebP, keyed for R2 via
// asset-map.mjs. Pipeline: sips (decode + resize, PNG intermediate) -> cwebp.
// macOS only: relies on `sips` (system RAW codec) and `cwebp`. No npm deps.
//
//   node scripts/convert-images.mjs <source-root> <out-dir>
//
// <source-root> is the extracted "BEC New Website Photos" folder. Output mirrors
// each photo's R2 key, and an _index.json sidecar is written for the contact sheet.

import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, readdirSync, statSync, rmSync, writeFileSync } from "node:fs";
import { join, relative, extname, dirname, sep } from "node:path";
import { tmpdir } from "node:os";
import { keyFor, extPriority } from "./asset-map.mjs";

const MAX_DIM = 2400;
const WEBP_QUALITY = 80;
const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".cr3", ".heic", ".tif", ".tiff"]);

function walk(dir) {
  const out = [];
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith(".")) continue;
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else if (IMAGE_EXT.has(extname(e.name).toLowerCase())) out.push(p);
  }
  return out;
}

function main() {
  const [srcRoot, outRoot] = process.argv.slice(2);
  if (!srcRoot || !outRoot) {
    console.error("usage: node convert-images.mjs <source-root> <out-dir>");
    process.exit(1);
  }

  // JPG before CR3 so the developed frame wins on key collisions.
  const files = walk(srcRoot).sort((x, y) => extPriority(x) - extPriority(y) || x.localeCompare(y));

  const tmp = mkdtempSync(join(tmpdir(), "becimg-"));
  const seen = new Set();
  const index = [];
  let ok = 0, dupes = 0, srcBytes = 0, outBytes = 0;
  const unmapped = [];

  for (const file of files) {
    const rel = relative(srcRoot, file).split(sep).join("/");
    const key = keyFor(rel);
    if (!key) { unmapped.push(rel); continue; }
    if (seen.has(key)) { dupes++; continue; }
    seen.add(key);

    const outPath = join(outRoot, key);
    mkdirSync(dirname(outPath), { recursive: true });
    const tmpPng = join(tmp, "frame.png");

    try {
      execFileSync("sips", ["-s", "format", "png", "-Z", String(MAX_DIM), file, "--out", tmpPng], { stdio: "ignore" });
      execFileSync("cwebp", ["-q", String(WEBP_QUALITY), "-mt", tmpPng, "-o", outPath], { stdio: "ignore" });
      const sb = statSync(file).size, ob = statSync(outPath).size;
      srcBytes += sb; outBytes += ob; ok++;
      index.push({ key, src: rel, srcBytes: sb, outBytes: ob });
    } catch (e) {
      console.error(`  FAILED ${rel}: ${e.message.split("\n")[0]}`);
    }
  }

  rmSync(tmp, { recursive: true, force: true });
  index.sort((a, b) => a.key.localeCompare(b.key));
  writeFileSync(join(outRoot, "_index.json"), JSON.stringify(index, null, 2));

  console.log(`converted ${ok}, skipped dupes ${dupes}, unmapped ${unmapped.length}`);
  console.log(`size ${(srcBytes / 1048576).toFixed(0)}MB -> ${(outBytes / 1048576).toFixed(1)}MB ` +
    `(${outBytes ? (srcBytes / outBytes).toFixed(0) : 0}x smaller)`);
  if (unmapped.length) {
    console.log(`\nUNMAPPED (add a rule in asset-map.mjs):`);
    for (const u of unmapped) console.log(`  ${u}`);
  }
}

main();
