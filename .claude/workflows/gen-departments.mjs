export const meta = {
  name: 'gen-departments',
  description: 'Generate prod-ready content for all remaining BEC departments (CSE-parity): provided docs first, then live-site fill',
  whenToUse: 'Replicate the UG-CSE department treatment across every other department.',
  phases: [
    { title: 'Gather', detail: 'One agent per dept: parse provided docs + reconcile live sidebar -> stage fragments' },
    { title: 'Apply', detail: 'Merge fragments into departments.json/placements.json, upload docs to R2, build' },
  ],
}

// ---------------------------------------------------------------------------
// Work-list. contentKey = the departments.json key (slug, except mba/mca).
// providedDir = data/new-provided/<...> root for that dept (null = none).
// liveCode = best-guess becbgk.edu/<code>/ path stem (agent CONFIRMS by probing).
// ---------------------------------------------------------------------------
const DEPTS = [
  // --- UG (done in runs 1+2) ---
  { slug: 'civil-engg', type: 'ug', key: 'civil-engg', name: 'Civil Engineering', assetSlug: 'civil', providedDir: 'data/new-provided/CVE', liveCode: 'CIVIL', done: true },
  { slug: 'electronics-and-communication-engg', type: 'ug', key: 'electronics-and-communication-engg', name: 'Electronics & Communication Engineering', assetSlug: 'ece', providedDir: 'data/new-provided/ECE', liveCode: 'ECE', done: true },
  { slug: 'electrical-and-electronics-engg', type: 'ug', key: 'electrical-and-electronics-engg', name: 'Electrical & Electronics Engineering', assetSlug: 'eee', providedDir: 'data/new-provided/EEE', liveCode: 'EEE', done: true },
  { slug: 'ai-and-ml', type: 'ug', key: 'ai-and-ml', name: 'Artificial Intelligence & Machine Learning', assetSlug: 'aiml', providedDir: 'data/new-provided/AIML', liveCode: 'AI', done: true },
  { slug: 'automobile-engg', type: 'ug', key: 'automobile-engg', name: 'Automobile Engineering', assetSlug: 'au', providedDir: 'data/new-provided/AU', liveCode: 'AUTO', done: true },
  { slug: 'electronics-and-computer-engg', type: 'ug', key: 'electronics-and-computer-engg', name: 'Electronics & Computer Engineering', assetSlug: 'ecs', providedDir: 'data/new-provided/ECS', liveCode: 'ECS', done: true },
  { slug: 'information-science-and-engg', type: 'ug', key: 'information-science-and-engg', name: 'Information Science & Engineering', assetSlug: 'ise', providedDir: null, liveCode: 'ISE', done: true },
  { slug: 'industrial-and-production-engg', type: 'ug', key: 'industrial-and-production-engg', name: 'Industrial & Production Engineering', assetSlug: 'ip', providedDir: null, liveCode: 'IP', done: true },
  // --- Science & Humanities: physics/mechanical/humanities already solid; re-pass the thin two ---
  { slug: 'mathematics', type: 'regular', key: 'mathematics', name: 'Mathematics', assetSlug: 'maths', providedDir: 'data/new-provided/Maths', liveCode: 'MATHS' },
  { slug: 'chemistry', type: 'regular', key: 'chemistry', name: 'Chemistry', assetSlug: 'chemistry', providedDir: 'data/new-provided/Chemistry', liveCode: 'CHE' },
  { slug: 'physics', type: 'regular', key: 'physics', name: 'Physics', assetSlug: 'physics', providedDir: 'data/new-provided/Phy', liveCode: 'PHY', done: true },
  { slug: 'mechanical-engg', type: 'regular', key: 'mechanical-engg', name: 'Mechanical Engineering', assetSlug: 'mechanical', providedDir: null, liveCode: 'MECH', done: true },
  { slug: 'humanities', type: 'regular', key: 'humanities', name: 'Humanities', assetSlug: 'hss', providedDir: null, liveCode: 'HSS', done: true },
  // --- PG taught masters (done) ---
  { slug: 'mca', type: 'pg', key: 'mca', name: 'Master of Computer Applications (MCA)', assetSlug: 'mca', providedDir: 'data/new-provided/MCA', liveCode: 'MCA', done: true },
  { slug: 'mba', type: 'pg', key: 'mba', name: 'Master of Business Administration (MBA)', assetSlug: 'mba', providedDir: 'data/new-provided/MBA', liveCode: 'MBA', done: true },
  // --- PG M.Tech specializations (THIS RUN): no provided folder, sourced from the hidden PG_* live pages ---
  { slug: 'computer-science-and-engg', type: 'pg', key: 'pg/computer-science-and-engg', name: 'M.Tech — Computer Science & Engineering', assetSlug: 'pg-cse', providedDir: 'data/new-provided/CSE', liveCode: 'PGCSE' },
  { slug: 'biotechnology', type: 'pg', key: 'pg/biotechnology', name: 'M.Tech — Food Biotechnology', assetSlug: 'pg-biotechnology', providedDir: null, liveCode: 'PG_BT' },
  { slug: 'electronics-and-communication-engg', type: 'pg', key: 'pg/electronics-and-communication-engg', name: 'M.Tech — Digital Communication Engineering', assetSlug: 'pg-ece', providedDir: 'data/new-provided/ECE', liveCode: 'PG_EC' },
  { slug: 'electrical-and-electronics-engg', type: 'pg', key: 'pg/electrical-and-electronics-engg', name: 'M.Tech — Energy Science & Technology', assetSlug: 'pg-eee', providedDir: 'data/new-provided/EEE', liveCode: 'PG_EEE' },
  { slug: 'environmental-engg', type: 'pg', key: 'pg/environmental-engg', name: 'M.Tech — Environmental Engineering', assetSlug: 'pg-environmental', providedDir: 'data/new-provided/CVE', liveCode: 'PG_ENV_CIVIL' },
  { slug: 'geo-technical-engg', type: 'pg', key: 'pg/geo-technical-engg', name: 'M.Tech — Geo-Technical Engineering', assetSlug: 'pg-geotechnical', providedDir: 'data/new-provided/CVE', liveCode: 'PG_GT_CIVIL' },
  { slug: 'structural-engg', type: 'pg', key: 'pg/structural-engg', name: 'M.Tech — Structural Engineering', assetSlug: 'pg-structural', providedDir: 'data/new-provided/CVE', liveCode: 'PG_STR_CIVIL' },
  { slug: 'machine-design', type: 'pg', key: 'pg/machine-design', name: 'M.Tech — Machine Design', assetSlug: 'pg-machine-design', providedDir: null, liveCode: 'PG_ME' },
].filter((d) => !d.done) // 'done' = already applied in prior runs; this run = 8 PG M.Tech + maths/chemistry re-pass

const SCHEMA_DOC = `
FIELDS you may populate in the content fragment (all OPTIONAL; emit ONLY fields you have
real, source-verified data for). These match src/content/departments.ts DepartmentContent:
- overview (string), vision (string), mission (string[])  -> ONLY if currently missing/weak; otherwise OMIT to preserve existing curation.
- programsOffered (string[]), peos ([{code,text}]), psos ([{code,text}])  -> same "only if missing" rule.
- highlights (string[])
- researchAreas ([{supervisor, area, university?}])
- phdsAwarded ([{scholar, guide, title, year}])
- researchScholars ([{scholar, usn?, guide, title, status}])
- researchGrants ([{title, agency, year, amount, investigators}])
- supportingStaff ([{name, designation}])
- committeeGroups ([{title, members:[{name, position}]}])   // Board of Studies / Board of Examiners
- mous ([{partner, location?, since?}])
- infrastructureItems ([{name, specification?, quantity?}])  // dept's own equipment SUMMARY, not asset register
- softwareItems ([{name, version?, usage?}])
- activities ([{title, date?, description?}])
- associations ([{name, about?, coordinators?:[]}])
- contact ({name?, designation?, phone?, email?})
- additionalContacts ([{name, designation?, phone?, email?}])
- documents ([{title, file}])   // file = R2 KEY you stage, e.g. "departments/<assetSlug>/docs/<clean>.pdf"

PLACEMENTS fragment (separate file) shape:
{ "yearWise": [{year,students,offers,onCampus,offCampus,placed,percent,companies}],
  "batches": [{ "batch":"2023-2024", "companies":[{company,package,count}], "students":[{name,usn,mode,company,lpa}] }] }
`

const RULES = `
DATA PRECEDENCE (resolve every field in this order; do NOT invent):
  1) Provided new data in the dept folder (authoritative, most current).
  2) Scraped mirror data/scraped/site/becbgk.edu/ (if present).
  3) LIVE becbgk.edu pages (fetch for anything still missing).
  If a value is in none of these -> OMIT it and note it in "warnings".

REPLICATE THE UG-CSE TREATMENT. The additive sections we want for every dept (when data exists):
Supporting Staff, Board of Studies / Examiners members, MoUs, Infrastructure equipment summary,
Research achievements (Ph.D.s awarded / registered scholars / sponsored grants), Activities & associations,
Placements (year-wise + recruiters + full student tables), and extra documents (course plans, publications, best practices, syllabus, BoS proceedings).

EXCLUDE (do NOT publish):
- Offer-letter reference numbers / Superset IDs in placement data (drop that column).
- Procurement / asset registers with cost, bill numbers, supplier names (internal financial data).
- Personal phone/email of CV referees (only official @becbgk.edu + the person's own id).
- Live sidebar sections that are EMPTY placeholders ("to be updated") -> omit + note.
- Transient yearly student office-bearer name lists.

PARSING TOOLKIT (run via Bash):
- docx/doc TABLES: python3 with xml.etree over word/document.xml (unzip docx; for .doc convert first).
  Walk w:tbl/w:tr/w:tc; forward-fill blank name/USN cells in multi-offer placement rows.
- prose .doc/.docx: 'textutil -convert txt -stdout <file>'.  PDFs: 'pdftotext <file> -' (poppler).
- convert .doc/.docx -> .pdf for staging:  soffice --headless --convert-to pdf --outdir <dir> <file>
- DO NOT touch faculty rosters (content/faculty.json) — faculty photos/CVs are a separate pipeline. Skip faculty.

FACULTY NOTE: omit the 'faculty' work entirely. Only produce DEPARTMENT content + placements + docs.
`

const GATHER_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['slug', 'contentKey', 'wroteContentFragment', 'fieldsProduced', 'placements', 'docsStaged', 'liveSectionsPorted', 'excluded', 'warnings', 'confidence', 'notes'],
  properties: {
    slug: { type: 'string' },
    contentKey: { type: 'string' },
    liveCodeConfirmed: { type: 'string', description: 'The becbgk.edu/<code>/ stem that actually worked, or "none"' },
    wroteContentFragment: { type: 'boolean' },
    fieldsProduced: { type: 'array', items: { type: 'string' } },
    placements: { type: 'boolean' },
    docsStaged: { type: 'array', items: { type: 'string' }, description: 'R2 keys staged' },
    liveSectionsPorted: { type: 'array', items: { type: 'string' } },
    excluded: { type: 'array', items: { type: 'string' }, description: 'data found but deliberately not published, with reason' },
    warnings: { type: 'array', items: { type: 'string' } },
    confidence: { type: 'string', enum: ['high', 'medium', 'low'] },
    notes: { type: 'string' },
  },
}

function gatherPrompt(d) {
  const safe = d.key.replace(/\//g, '__')
  return `You are enriching the Basaveshwar Engineering College (BEC) department page for **${d.name}**.
Repo root is the current working directory. The web app is in apps/web/.

TARGET
  slug=${d.slug}  type=${d.type}  contentKey="${d.key}"  assetSlug="${d.assetSlug}"
  provided data folder: ${d.providedDir ?? 'NONE (live-only)'}
  live path stem guess: becbgk.edu/${d.liveCode}/  (CONFIRM by fetching the directory listing; try variants like ${d.liveCode}, ${d.slug.toUpperCase()} if it 404s)

GOAL: produce the same comprehensive, source-verified content we built for UG-CSE.

${RULES}

${SCHEMA_DOC}

STEP 1 — PROVIDED DATA (precedence #1)
  If a provided folder exists: 'find "<folder>" -type f' to inventory it. Parse EVERY relevant doc
  (department profile, PO/PSO, BoS/BoE, infrastructure, activities/associations, placements, publications,
  best practices, syllabus, regulations). Extract structured data using the parsing toolkit above.

STEP 2 — LIVE RECONCILIATION (precedence #3, for gaps only)
  WebFetch https://www.becbgk.edu/${d.liveCode}/ to list the left-sidebar sections and the per-section
  .php files (pattern <code>_<Section>.php, e.g. <code>_Supporting.php, <code>_BOS.php, <code>_MOU.php,
  <code>_Associations.php, <code>_Infrastructure.php). WebFetch each section that the provided docs did NOT
  already cover, and port its real data. (If WebFetch is not directly available, run
  ToolSearch with query "select:WebFetch" first.)
  NOTE for PG / M.Tech pages (liveCode starts with "PG"): these hidden pages use DIFFERENT section-file
  naming — fetch the directory listing of becbgk.edu/${d.liveCode}/ and enumerate WHATEVER .php files it
  shows (e.g. Faculty_<code>.php, Associations.php, "Board of Examiners", BOS, Infrastructure, Placements,
  Publications). Port real data from each. The PG entry already has overview/vision/peos/programsOffered/
  highlights/contact — focus on ADDITIVE sections (research achievements, MoUs, activities, more documents,
  placements, supporting staff) and do NOT overwrite the existing prose fields.

STEP 3 — WRITE STAGING FILES (do NOT edit any file under apps/web/ — staging only)
  CRITICAL: other agents share /tmp/dept-gen/ concurrently. NEVER run 'rm', 'rm -rf', or any delete/reset
  on /tmp/dept-gen or its content/, placements/, or r2/ subtrees — doing so destroys peers' work. ONLY
  'mkdir -p' the exact subpaths you need and write YOUR OWN files (named by this dept's key). Do not clean up.
  a) Content fragment -> /tmp/dept-gen/content/${safe}.json
     A single JSON object with ONLY the fields you have real data for (see SCHEMA_DOC). Remember the
     "only if missing/weak" rule for overview/vision/mission/peos/psos (read the current value first:
     node -e "console.log(JSON.stringify(require('./apps/web/content/departments.json').departments['${d.key}']||{},null,1))").
  b) Placements fragment (if any) -> /tmp/dept-gen/placements/${safe}.json  (shape in SCHEMA_DOC).
  c) Stage extra documents: convert/copy each PDF to
     /tmp/dept-gen/r2/departments/${d.assetSlug}/docs/<clean-kebab-name>.pdf
     and reference the matching R2 key "departments/${d.assetSlug}/docs/<clean>.pdf" in documents[].
     (mkdir -p the dirs first.) Only stage docs that genuinely exist; never fabricate a documents[] entry.
  Validate your content fragment parses: 'node -e "JSON.parse(require(\\'fs\\').readFileSync(\\'/tmp/dept-gen/content/${safe}.json\\'))"'.

Return the structured summary. Be honest in confidence/warnings: mark medium/low when data came
only from a live WebFetch (summarizer-read, single source) or when you cleaned/consolidated text.`
}

// ===========================================================================
phase('Gather')
log(`Gathering ${DEPTS.length} departments (provided-data-first, live fill)`)

const results = await parallel(
  DEPTS.map((d) => () =>
    agent(gatherPrompt(d), {
      label: `gather:${d.slug}`,
      phase: 'Gather',
      agentType: 'general-purpose',
      schema: GATHER_SCHEMA,
    }).then((r) => (r ? { ...r, _d: d } : null)),
  ),
)

const ok = results.filter(Boolean)
log(`Gathered ${ok.length}/${DEPTS.length}. With content: ${ok.filter((r) => r.wroteContentFragment).length}, with placements: ${ok.filter((r) => r.placements).length}`)

// ===========================================================================
phase('Apply')

const applyPrompt = `You are applying the staged department content fragments produced by the Gather phase.
Repo root is the working directory; web app in apps/web/.

INPUTS (staging):
  /tmp/dept-gen/content/*.json     -> per-dept content objects, filename = contentKey with "/" => "__"
  /tmp/dept-gen/placements/*.json  -> per-dept placements objects (same filename convention)
  /tmp/dept-gen/r2/...             -> document PDFs staged under departments/<assetSlug>/docs/

GATHER SUMMARIES (for cross-check): ${JSON.stringify(ok.map((r) => ({ key: r.contentKey, fields: r.fieldsProduced, placements: r.placements, docs: r.docsStaged, warnings: r.warnings, confidence: r.confidence })))}

DO THESE STEPS, IN ORDER, and STOP + report if any step fails:

1) MERGE CONTENT. Write a python script that loads apps/web/content/departments.json, and for each
   /tmp/dept-gen/content/<f>.json overlays its keys onto departments['<contentKey>'] (contentKey = filename
   with "__" -> "/"). OVERLAY semantics: a field present in the fragment REPLACES that field on the existing
   entry; fields absent from the fragment are LEFT UNCHANGED (never delete existing curation). Preserve JSON
   indent=2, ensure_ascii=False. Print a per-dept list of which fields were overlaid.

2) MERGE PLACEMENTS. Load apps/web/content/placements.json (create {"departments":{}} if absent). For each
   /tmp/dept-gen/placements/<f>.json set departments['<contentKey>'] = its contents. Save indent=2.

3) UPLOAD DOCS (only if /tmp/dept-gen/r2 has files): from apps/web run
   'node scripts/upload-assets.mjs /tmp/dept-gen/r2'  (NEVER pass --prune). Then verify the new keys
   appear in src/data/asset-manifest.ts.

4) VALIDATE. From apps/web: 'rm -rf .next/types && npx tsc --noEmit 2>&1 | grep -v "\\.next/" | head' then
   'pnpm build 2>&1 | grep -iE "compiled|error" | head'. The build MUST report "Compiled successfully".
   If it fails, report the error and which dept fragment likely caused it; do NOT attempt risky rewrites.

5) SPOT-CHECK. For 2-3 departments, grep the prerendered HTML under
   apps/web/.next/server/app/departments/<type>/<slug>.html for a distinctive new value (a staff name,
   a recruiter, a BoS member) to confirm it serialized.

REPORT a concise markdown table: per dept -> fields added, placements y/n, docs uploaded, live sections
ported, exclusions, confidence, and any warnings. End with the build result.`

const applyReport = await agent(applyPrompt, {
  label: 'apply:merge+upload+build',
  phase: 'Apply',
  agentType: 'general-purpose',
})

return {
  gathered: ok.length,
  ofTotal: DEPTS.length,
  perDept: ok.map((r) => ({ key: r.contentKey, fields: r.fieldsProduced, placements: r.placements, docs: r.docsStaged.length, confidence: r.confidence, warnings: r.warnings })),
  applyReport,
}
