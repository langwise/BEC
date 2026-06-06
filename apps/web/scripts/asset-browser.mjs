#!/usr/bin/env node
// Build a single-file visual browser of every asset on R2, grouped by key
// prefix, each thumbnail labelled with its key and click-to-copy. This is the
// "which image do I want?" tool — open it, find a photo, copy its key, paste
// into a content/*.json file.
//
//   node scripts/asset-browser.mjs [out.html]
//   (default: ../../../data/asset-browser.html)

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const manifestPath = join(here, "..", "src", "data", "asset-manifest.ts");
const outPath = resolve(here, process.argv[2] ?? "../../../../data/asset-browser.html");

const text = readFileSync(manifestPath, "utf8");
const entries = [...text.matchAll(/^\s*"([^"]+)":\s*"([^"]+)"/gm)].map((m) => ({
  key: m[1],
  url: m[2],
}));

const groups = new Map();
for (const e of entries) {
  const group = e.key.split("/").slice(0, 2).join("/");
  if (!groups.has(group)) groups.set(group, []);
  groups.get(group).push(e);
}
const sortedGroups = [...groups.entries()].sort(([a], [b]) => a.localeCompare(b));

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

const toc = sortedGroups
  .map(([g, items]) => `<a href="#${esc(g)}">${esc(g)} <span>${items.length}</span></a>`)
  .join("");

const sections = sortedGroups
  .map(
    ([g, items]) => `<section id="${esc(g)}"><h2>${esc(g)} <small>${items.length}</small></h2><div class="grid">${items
      .map(
        (e) =>
          `<figure onclick="copyKey('${esc(e.key)}', this)"><img loading="lazy" src="${esc(e.url)}" alt="${esc(e.key)}"><figcaption>${esc(e.key.split("/").pop())}</figcaption></figure>`,
      )
      .join("")}</div></section>`,
  )
  .join("");

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>BEC asset browser — ${entries.length} assets</title>
<style>
  :root { color-scheme: dark; }
  * { box-sizing: border-box; }
  body { margin:0; font:14px/1.4 system-ui,sans-serif; background:#0b0d10; color:#e6e8eb; display:grid; grid-template-columns:240px 1fr; }
  nav { position:sticky; top:0; align-self:start; height:100vh; overflow:auto; padding:16px; border-right:1px solid #1c2127; background:#0e1116; }
  nav h1 { font-size:15px; margin:0 0 12px; }
  nav a { display:flex; justify-content:space-between; gap:8px; padding:4px 8px; border-radius:6px; color:#aeb6c0; text-decoration:none; }
  nav a:hover { background:#171c22; color:#fff; }
  nav a span { color:#6b7480; }
  main { padding:20px 24px 80px; }
  section { margin-bottom:36px; }
  h2 { font-size:18px; border-bottom:1px solid #1c2127; padding-bottom:8px; position:sticky; top:0; background:#0b0d10; }
  h2 small { color:#6b7480; font-weight:400; }
  .grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(180px,1fr)); gap:12px; margin-top:14px; }
  figure { margin:0; background:#11161c; border:1px solid #1c2127; border-radius:10px; overflow:hidden; cursor:pointer; transition:border-color .15s,transform .1s; }
  figure:hover { border-color:#3b82f6; }
  figure:active { transform:scale(.98); }
  figure img { width:100%; aspect-ratio:4/3; object-fit:cover; display:block; background:#000; }
  figcaption { padding:6px 8px; font-size:11px; color:#aeb6c0; word-break:break-all; }
  #toast { position:fixed; bottom:24px; left:50%; transform:translateX(-50%); background:#3b82f6; color:#fff; padding:10px 18px; border-radius:8px; opacity:0; transition:opacity .2s; pointer-events:none; }
  #toast.show { opacity:1; }
</style></head>
<body>
<nav><h1>${entries.length} assets</h1>${toc}</nav>
<main>${sections}</main>
<div id="toast"></div>
<script>
  function copyKey(key, el){
    navigator.clipboard.writeText(key);
    const t=document.getElementById('toast');
    t.textContent='copied: '+key; t.classList.add('show');
    clearTimeout(window.__tt); window.__tt=setTimeout(()=>t.classList.remove('show'),1400);
  }
</script>
</body></html>
`;

writeFileSync(outPath, html);
console.log(`asset browser: ${entries.length} assets in ${sortedGroups.length} groups -> ${outPath}`);
