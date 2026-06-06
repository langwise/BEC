#!/usr/bin/env node
// Build a local HTML contact sheet from a converted asset tree's _index.json,
// grouped by folder, so photos can be eyeballed for mislabels before upload.
//
//   node scripts/contact-sheet.mjs <out-dir> <html-path> <img-src-prefix>
//
// <img-src-prefix> is the path the HTML uses to reach the webp files
// (e.g. "optimized" if the html sits next to the optimized/ folder).

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function main() {
  const [outDir, htmlPath, imgPrefix = "optimized"] = process.argv.slice(2);
  if (!outDir || !htmlPath) {
    console.error("usage: node contact-sheet.mjs <out-dir> <html-path> [img-src-prefix]");
    process.exit(1);
  }

  const index = JSON.parse(readFileSync(join(outDir, "_index.json"), "utf8"));
  const groups = new Map();
  for (const item of index) {
    const folder = item.key.slice(0, item.key.lastIndexOf("/"));
    if (!groups.has(folder)) groups.set(folder, []);
    groups.get(folder).push(item);
  }
  const folders = [...groups.keys()].sort();

  const toc = folders
    .map((f) => `<a href="#${esc(f)}">${esc(f)} <b>(${groups.get(f).length})</b></a>`)
    .join("");

  const sections = folders.map((f) => {
    const cards = groups.get(f).map((it) => {
      const name = it.key.slice(it.key.lastIndexOf("/") + 1);
      return `<figure>
  <img loading="lazy" src="${esc(imgPrefix)}/${esc(it.key)}" alt="${esc(name)}">
  <figcaption><b>${esc(name)}</b><span>${esc(it.src)}</span></figcaption>
</figure>`;
    }).join("\n");
    return `<section id="${esc(f)}"><h2>${esc(f)} <small>${groups.get(f).length}</small></h2>
<div class="grid">${cards}</div></section>`;
  }).join("\n");

  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>BEC photos — contact sheet (${index.length})</title>
<style>
  :root { color-scheme: light dark; }
  * { box-sizing: border-box; }
  body { font: 14px/1.4 system-ui, sans-serif; margin: 0; }
  header { position: sticky; top: 0; background: Canvas; padding: 12px 16px; border-bottom: 1px solid #8884; z-index: 2; }
  header h1 { margin: 0 0 8px; font-size: 16px; }
  .toc { display: flex; flex-wrap: wrap; gap: 6px 14px; font-size: 12px; }
  .toc a { text-decoration: none; opacity: .8; }
  .toc a:hover { opacity: 1; text-decoration: underline; }
  section { padding: 8px 16px 24px; }
  section h2 { position: sticky; top: 86px; background: Canvas; margin: 0; padding: 10px 0; font-size: 15px; border-bottom: 1px solid #8884; }
  section h2 small { color: #888; font-weight: normal; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 12px; margin-top: 12px; }
  figure { margin: 0; border: 1px solid #8883; border-radius: 8px; overflow: hidden; }
  figure img { width: 100%; height: 165px; object-fit: cover; display: block; background: #8882; }
  figcaption { padding: 6px 8px; font-size: 11px; }
  figcaption b { display: block; word-break: break-all; }
  figcaption span { color: #888; word-break: break-all; }
</style></head><body>
<header><h1>BEC photos — ${index.length} images, ${folders.length} folders</h1>
<div class="toc">${toc}</div></header>
${sections}
</body></html>`;

  writeFileSync(htmlPath, html);
  console.log(`contact sheet: ${index.length} images, ${folders.length} folders -> ${htmlPath}`);
}

main();
