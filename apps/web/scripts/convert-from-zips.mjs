#!/usr/bin/env node
// Convert photos straight out of zip archives (no full extraction) -> WebP.
// Built for a near-full disk: each photo is streamed to a temp file, converted,
// then discarded, so peak extra disk use is ~one raw frame (<100MB).
//
//   node scripts/convert-from-zips.mjs <zip-dir> <out-dir>
//
// Keys come from asset-map.mjs. JPG wins over CR3 on key collisions. Writes
// <out-dir>/_index.json for the contact sheet.

import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, statSync, rmSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname, extname } from "node:path";
import { tmpdir } from "node:os";
import { keyFor, extPriority } from "./asset-map.mjs";

const MAX_DIM = 2400;
const WEBP_QUALITY = 80;
const ROOT = "BEC New Website Photos/";
const IMAGE_RE = /\.(jpe?g|png|cr3|heic|tiff?)$/i;

function listEntries(zip) {
  const out = execFileSync("unzip", ["-Z1", zip], { maxBuffer: 64 * 1024 * 1024 }).toString();
  return out.split("\n").filter((l) => l && !l.endsWith("/") && IMAGE_RE.test(l) && !l.includes("/."));
}

function main() {
  const [zipDir, outRoot] = process.argv.slice(2);
  if (!zipDir || !outRoot) {
    console.error("usage: node convert-from-zips.mjs <zip-dir> <out-dir>");
    process.exit(1);
  }

  const zips = readdirSync(zipDir).filter((f) => f.toLowerCase().endsWith(".zip")).map((f) => join(zipDir, f));

  // Gather every image entry across all zips, then pick one winner per key.
  const all = [];
  for (const zip of zips) {
    for (const entry of listEntries(zip)) {
      const rel = entry.replace(new RegExp(`^${ROOT}`), "");
      const key = keyFor(rel);
      if (key) all.push({ zip, entry, rel, key });
      else all.push({ zip, entry, rel, key: null });
    }
  }
  const unmapped = all.filter((e) => !e.key).map((e) => e.rel);
  const mapped = all.filter((e) => e.key);
  mapped.sort((a, b) => a.key.localeCompare(b.key) || extPriority(a.entry) - extPriority(b.entry) || a.entry.localeCompare(b.entry));

  const winners = [];
  const seen = new Set();
  for (const e of mapped) {
    if (seen.has(e.key)) continue;
    seen.add(e.key);
    winners.push(e);
  }

  const tmp = mkdtempSync(join(tmpdir(), "becimg-"));
  const index = [];
  let ok = 0, failed = 0, outBytes = 0;

  for (const w of winners) {
    const outPath = join(outRoot, w.key);
    mkdirSync(dirname(outPath), { recursive: true });
    const tmpSrc = join(tmp, "src" + extname(w.entry).toLowerCase());
    const tmpPng = join(tmp, "frame.png");
    try {
      const buf = execFileSync("unzip", ["-p", w.zip, w.entry], { maxBuffer: 256 * 1024 * 1024 });
      writeFileSync(tmpSrc, buf);
      execFileSync("sips", ["-s", "format", "png", "-Z", String(MAX_DIM), tmpSrc, "--out", tmpPng], { stdio: "ignore" });
      execFileSync("cwebp", ["-q", String(WEBP_QUALITY), "-mt", tmpPng, "-o", outPath], { stdio: "ignore" });
      const ob = statSync(outPath).size;
      outBytes += ob; ok++;
      index.push({ key: w.key, src: w.rel, outBytes: ob });
      if (ok % 25 === 0) console.log(`  ${ok}/${winners.length} ...`);
    } catch (err) {
      console.error(`  FAILED ${w.rel}: ${String(err.message).split("\n")[0]}`);
      failed++;
    }
  }

  rmSync(tmp, { recursive: true, force: true });
  index.sort((a, b) => a.key.localeCompare(b.key));
  mkdirSync(outRoot, { recursive: true });
  writeFileSync(join(outRoot, "_index.json"), JSON.stringify(index, null, 2));

  console.log(`\nconverted ${ok}, failed ${failed}, dropped dupes ${mapped.length - winners.length}, unmapped ${unmapped.length}`);
  console.log(`webp total: ${(outBytes / 1048576).toFixed(1)}MB across ${ok} files`);
  if (unmapped.length) {
    console.log(`\nUNMAPPED (add a rule in asset-map.mjs):`);
    for (const u of unmapped) console.log(`  ${u}`);
  }
}

main();
