#!/usr/bin/env node
// Build minimal faculty entries ({ name, designation, photo, cv }) for ONE
// department from its provided "Faculty Profile" docs. Per doc it:
//   1. parses Name + Designation from the doc text (the BEC profile template),
//   2. converts the doc to PDF — that PDF is the linked "View Profile" CV,
//   3. pulls the embedded portrait out of that PDF and encodes it to WebP.
// Assets are staged under <stage>/departments/<assetSlug>/faculty/... ready for
// `node scripts/upload-assets.mjs <stage>`; with --write the entries are merged
// into content/faculty.json[<slug>].
//
//   node scripts/build-faculty.mjs <dept-slug> <assetSlug> <source...> [--write] [--stage <dir>] [--limit N]
//
// <source...> = files or folders to scan for .doc/.docx/.pdf faculty profiles.
// Non-faculty docs (department profiles, templates, syllabi) are auto-skipped:
// a file only counts if its parsed designation looks like a faculty rank.
//
// Requires: LibreOffice (soffice), textutil, sips, cwebp, pdftotext, pdfimages.

import { execFileSync } from "node:child_process";
import {
  readdirSync, statSync, mkdirSync, rmSync, readFileSync, writeFileSync,
  existsSync, copyFileSync,
} from "node:fs";
import { join, basename, extname, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";

const SOFFICE = "/Applications/LibreOffice.app/Contents/MacOS/soffice";
const here = dirname(fileURLToPath(import.meta.url));
const CONTENT = join(here, "..", "content", "faculty.json");
const DOC_EXT = new Set([".doc", ".docx", ".pdf"]);
const RASTER = new Set([".png", ".jpg", ".jpeg", ".tif", ".tiff", ".bmp", ".ppm", ".pbm"]);
const DESIG_RE = /professor|lecturer|assistant|associate|principal|\bhead\b/i;

// ---- args ----
const argv = process.argv.slice(2);
const positional = [];
let stageDir = join(tmpdir(), "bec-faculty-stage");
let write = false, limit = Infinity;
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a === "--write") write = true;
  else if (a === "--stage") stageDir = argv[++i];
  else if (a === "--limit") limit = Number(argv[++i]);
  else if (a.startsWith("--")) { console.error(`unknown flag: ${a}`); process.exit(1); }
  else positional.push(a);
}
const [slug, assetSlug, ...sources] = positional;
if (!slug || !assetSlug || !sources.length) {
  console.error("usage: node scripts/build-faculty.mjs <dept-slug> <assetSlug> <source...> [--write] [--stage <dir>] [--limit N]");
  process.exit(1);
}

// ---- helpers ----
function walk(p) {
  const out = [];
  let st;
  try { st = statSync(p); } catch { return out; }
  if (st.isDirectory()) {
    for (const e of readdirSync(p)) {
      if (e.startsWith(".") || e.startsWith("~")) continue;
      out.push(...walk(join(p, e)));
    }
  } else if (DOC_EXT.has(extname(p).toLowerCase())) out.push(p);
  return out;
}

function docText(file) {
  const ext = extname(file).toLowerCase();
  try {
    if (ext === ".pdf") return execFileSync("pdftotext", ["-q", file, "-"], { encoding: "utf8", maxBuffer: 1e8 });
    return execFileSync("textutil", ["-convert", "txt", "-stdout", file], { encoding: "utf8", maxBuffer: 1e8 });
  } catch { return ""; }
}

const HONORIFIC = /^(dr|prof|professor|smt|sri|shri|mr|mrs|ms|kum|miss)(\.\s*|\s+)/i;
// Section headers that are never a person's name.
const NAME_BLACK = /^(education|experience|qualification|research|publication|award|contact|details|profile|about|department|summary|objective|teaching|professional|personal)\b/i;

// Photo placeholder field codes (linked INCLUDEPICTURE/EMBED images) render as
// text between the name and designation — skip them.
const JUNK = /INCLUDEPICTURE|MERGEFORMAT|EMBED|PBrush|please attach|professional photo/i;
// Bare section labels that are never a name/designation value.
const STOP = /^(contact|details|about(\s+name)?|name|designation|department|email|phone)\b:?\s*$/i;

/** Value after a "Label:" — inline after the colon, else the next content line. */
function valueAfterLabel(lines, labelRe) {
  for (let i = 0; i < lines.length; i++) {
    const m = labelRe.exec(lines[i]);
    if (!m) continue;
    const inline = lines[i].slice(m[0].length).replace(/^:\s*/, "").trim();
    if (inline) return inline;
    for (let j = i + 1; j < lines.length; j++) {
      const v = lines[j].replace(/^:\s*/, "").trim();
      if (v && v !== ":") return v;
    }
  }
  return "";
}

function parseProfile(text) {
  const lines = text.split(/\r?\n/).map((l) => l.trim());
  const hasContact = /contact\s+details/i.test(text);
  const idx = lines.findIndex((l) => /^about\b/i.test(l));
  // Candidate value lines after the "About" anchor (colon-prefixes & junk stripped).
  const cand = [];
  if (idx !== -1) {
    for (let i = idx + 1; i < lines.length && cand.length < 12; i++) {
      const l = lines[i].replace(/^:\s*/, "").trim();
      if (!l || l === ":" || JUNK.test(l) || /^[^A-Za-z]+$/.test(l)) continue;
      cand.push(l);
    }
  }
  // Designation: explicit "Designation: X" label, else a bare faculty-rank line.
  let designation = "", explicitDesig = false;
  for (const l of cand) { const m = /designation\s*:\s*(.+)/i.exec(l); if (m) { designation = m[1].trim(); explicitDesig = true; break; } }
  if (!designation) {
    for (const l of cand) { if (DESIG_RE.test(l) && !/department/i.test(l)) { designation = l; break; } }
  }
  // Name: explicit "Name: X" label, else the first person-like line.
  let name = "";
  for (const l of cand) { const m = /name\s*:\s*(.+)/i.exec(l); if (m && m[1].trim()) { name = m[1].trim(); break; } }
  if (!name) {
    for (const l of cand) {
      if (STOP.test(l) || l === designation) continue;
      if (/^(designation|department|email|phone|contact)/i.test(l)) continue;
      if (/\d{3,}|@/.test(l)) continue; // ids / emails / phones
      const words = l.split(/\s+/);
      if (words.length < 2 || words.length > 7) continue;
      name = l; break;
    }
  }
  // Fallback for the standalone-label template (no "About"): "Name"/"Designation"
  // labels on their own lines with the value following.
  if (!name) name = valueAfterLabel(lines, /^name\b/i);
  if (!designation) { const v = valueAfterLabel(lines, /^designation\b/i); if (v) { designation = v; explicitDesig = true; } }
  name = name.replace(/^name\s*:?\s*/i, "").trim();
  return { name, designation, hasContact, explicitDesig };
}

/** Title-case any ALL-CAPS word (>2 letters); leaves initials & honorifics. */
function titleName(n) {
  return n
    .split(/\s+/)
    .map((w) => {
      const letters = w.replace(/[^A-Za-z]/g, "");
      if (letters.length > 2 && w === w.toUpperCase()) return w.charAt(0) + w.slice(1).toLowerCase();
      return w;
    })
    .join(" ");
}

function normDesig(d) {
  return d
    .replace(/^designation\s*:?\s*/i, "")
    .replace(/^:\s*/, "")
    // combined abbreviations ("Asso.Prof.", "Asst.Prof")
    .replace(/asso(c)?\.?\s*prof(essor)?\.?/gi, "Associate Professor")
    .replace(/ass(is|t)\.?\s*prof(essor)?\.?/gi, "Assistant Professor")
    // standalone abbreviations / common typos
    .replace(/\basst\.?\b/gi, "Assistant")
    .replace(/\basso(c)?\.?\b/gi, "Associate")
    .replace(/\bprof\.?\b/gi, "Professor")
    .replace(/assiss?tant/gi, "Assistant")
    .replace(/porfessor|proffesor|proffessor/gi, "Professor")
    // canonical casing
    .replace(/(assistant|associate)(professor)/gi, "$1 $2")
    .replace(/assistant/gi, "Assistant")
    .replace(/associate/gi, "Associate")
    .replace(/professor/gi, "Professor")
    .replace(/principal/gi, "Principal")
    .replace(/\b(Assistant|Associate|Professor)\.(?=\s|$)/g, "$1")
    .replace(/\s*&\s*/g, " & ")
    .replace(/\s+/g, " ")
    .trim();
}

function slugify(name) {
  return name
    .replace(HONORIFIC, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function isFaculty(name, designation, hasContact, file, explicitDesig) {
  if (/template/i.test(basename(file))) return false;
  if (!name || name.length < 3) return false;
  if (NAME_BLACK.test(name)) return false;
  if (!hasContact) return false;
  // Accept a faculty-rank designation, or any value from an explicit "Designation:"
  // field (catches abbreviations/typos like "Asso.Prof." / "Assisstant Porfessor").
  if (!DESIG_RE.test(designation) && !explicitDesig) return false;
  const words = name.split(/\s+/);
  if (words.length > 7) return false; // a sentence, not a name
  if (/department|college|profile|engineering\s*$/i.test(name)) return false;
  return true;
}

function mkTmp() {
  const d = join(tmpdir(), `bec-fac-${Math.abs(hashStr(String(tmpCounter++)))}`);
  mkdirSync(d, { recursive: true });
  return d;
}
let tmpCounter = 0;
function hashStr(s) { let h = 0; for (const c of s) h = (h * 31 + c.charCodeAt(0)) | 0; return h; }

function toPdf(file, outPdf) {
  const ext = extname(file).toLowerCase();
  if (ext === ".pdf") { copyFileSync(file, outPdf); return true; }
  const tmp = mkTmp();
  try {
    execFileSync(SOFFICE, ["--headless", `-env:UserInstallation=file://${tmp}/profile`,
      "--convert-to", "pdf", "--outdir", tmp, file], { stdio: "ignore" });
    const made = join(tmp, basename(file).replace(/\.[^.]+$/, "") + ".pdf");
    if (!existsSync(made)) return false;
    copyFileSync(made, outPdf);
    return true;
  } catch { return false; } finally { rmSync(tmp, { recursive: true, force: true }); }
}

function dims(f) {
  try {
    const o = execFileSync("sips", ["-g", "pixelWidth", "-g", "pixelHeight", f], { encoding: "utf8" });
    return { w: +((/pixelWidth: (\d+)/.exec(o) || [])[1] || 0), h: +((/pixelHeight: (\d+)/.exec(o) || [])[1] || 0) };
  } catch { return { w: 0, h: 0 }; }
}

/** Extract the most portrait-like embedded image from a PDF; return its path or null. */
function extractPortrait(pdf, tmp) {
  try {
    execFileSync("pdfimages", ["-all", pdf, join(tmp, "img")], { stdio: "ignore" });
  } catch { return null; }
  const imgs = readdirSync(tmp).filter((f) => f.startsWith("img") && RASTER.has(extname(f).toLowerCase()));
  let best = null, bestArea = 0;
  for (const f of imgs) {
    const p = join(tmp, f);
    const { w, h } = dims(p);
    if (w < 120 || h < 120) continue;            // skip logos / icons
    const ar = w / h;
    if (ar < 0.4 || ar > 2.5) continue;          // skip banners / rules
    const area = w * h;
    if (area > bestArea) { bestArea = area; best = p; }
  }
  return best;
}

function toWebp(raw, outWebp) {
  const tmp = mkTmp();
  try {
    const png = join(tmp, "n.png");
    execFileSync("sips", ["-s", "format", "png", raw, "--out", png], { stdio: "ignore" });
    execFileSync("cwebp", ["-quiet", "-q", "82", png, "-o", outWebp], { stdio: "ignore" });
    return existsSync(outWebp);
  } catch { return false; } finally { rmSync(tmp, { recursive: true, force: true }); }
}

function rank(designation) {
  const d = designation.toLowerCase();
  if (/head/.test(d)) return 0;
  if (/principal/.test(d)) return 1;
  if (/\bprofessor\b/.test(d) && !/assistant|associate/.test(d)) return 2;
  if (/associate/.test(d)) return 3;
  if (/assistant/.test(d)) return 4;
  return 5;
}

// ---- run ----
const cvDir = join(stageDir, "departments", assetSlug, "faculty", "cv");
const photoDir = join(stageDir, "departments", assetSlug, "faculty");
mkdirSync(cvDir, { recursive: true });

const files = sources.flatMap(walk);
const entries = [];
const skipped = [];
const seen = new Set();
let n = 0;

for (const file of files) {
  if (n >= limit) break;
  const rel = basename(file);
  const { name, designation, hasContact, explicitDesig } = parseProfile(docText(file));
  if (!isFaculty(name, designation, hasContact, file, explicitDesig)) {
    skipped.push(`${rel}  (${name || "no name"} / ${designation || "no desig"})`);
    continue;
  }
  const sl = slugify(name);
  if (seen.has(sl)) { skipped.push(`${rel}  (duplicate of ${sl})`); continue; }
  seen.add(sl);
  n++;

  const entry = { name: titleName(name), designation: normDesig(designation) };
  const cvOut = join(cvDir, `${sl}.pdf`);
  const okPdf = toPdf(file, cvOut);
  if (okPdf) entry.cv = `departments/${assetSlug}/faculty/cv/${sl}.pdf`;

  // portrait from the generated PDF
  let photoOk = false;
  if (okPdf) {
    const tmp = mkTmp();
    const raw = extractPortrait(cvOut, tmp);
    if (raw && toWebp(raw, join(photoDir, `${sl}.webp`))) {
      entry.photo = `departments/${assetSlug}/faculty/${sl}.webp`;
      photoOk = true;
    }
    rmSync(tmp, { recursive: true, force: true });
  }

  entries.push(entry);
  console.log(`  ok  ${sl}  [${designation}]  cv:${okPdf ? "y" : "N"} photo:${photoOk ? "y" : "N"}  <- ${rel}`);
}

entries.sort((a, b) => rank(a.designation) - rank(b.designation) || a.name.localeCompare(b.name));

console.log(`\n${entries.length} faculty, ${skipped.length} skipped`);
if (skipped.length) console.log("skipped:\n  " + skipped.join("\n  "));
console.log(`\nstaged under: ${join(stageDir, "departments", assetSlug, "faculty")}`);

if (write) {
  const data = JSON.parse(readFileSync(CONTENT, "utf8"));
  data.departments[slug] = entries;
  writeFileSync(CONTENT, JSON.stringify(data, null, 2) + "\n");
  console.log(`\nwrote ${entries.length} entries -> content/faculty.json[${slug}]`);
} else {
  console.log("\n--- entries (use --write to save) ---");
  console.log(JSON.stringify(entries, null, 2));
}
