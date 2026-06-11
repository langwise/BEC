export const meta = {
  name: 'verify-departments',
  description: 'READ-ONLY fabrication audit: diff each dept\'s applied research/grant/PhD/MoU lists against real sources',
  whenToUse: 'After bulk dept generation, to catch fabricated or misattributed structured data before trusting it.',
  phases: [{ title: 'Audit', detail: 'One auditor per dept: verify each structured entry traces to a real source' }],
}

// Depts that have fabrication-prone structured lists (grants/phds/scholars/mous), with their sources.
// CSE (UG) is hand-verified gold -> still audited as a control.
const DEPTS = [
  { key: 'computer-science-and-engg', providedDir: 'data/new-provided/CSE', liveCode: 'CSE' },
  { key: 'civil-engg', providedDir: 'data/new-provided/CVE', liveCode: 'CIVIL' },
  { key: 'electronics-and-communication-engg', providedDir: 'data/new-provided/ECE', liveCode: 'ECE' },
  { key: 'electrical-and-electronics-engg', providedDir: 'data/new-provided/EEE', liveCode: 'EEE' },
  { key: 'industrial-and-production-engg', providedDir: null, liveCode: 'IP' },
  { key: 'information-science-and-engg', providedDir: null, liveCode: 'ISE' },
  { key: 'ai-and-ml', providedDir: 'data/new-provided/AIML', liveCode: 'AI' },
  { key: 'automobile-engg', providedDir: 'data/new-provided/AU', liveCode: 'AUTO' },
  { key: 'physics', providedDir: 'data/new-provided/Phy', liveCode: 'PHY' },
  { key: 'mba', providedDir: 'data/new-provided/MBA', liveCode: 'MBA' },
  { key: 'pg/computer-science-and-engg', providedDir: 'data/new-provided/CSE', liveCode: 'PGCSE' },
  { key: 'pg/electronics-and-communication-engg', providedDir: 'data/new-provided/ECE', liveCode: 'PG_EC' },
  { key: 'pg/electrical-and-electronics-engg', providedDir: 'data/new-provided/EEE', liveCode: 'PG_EE' },
  { key: 'pg/environmental-engg', providedDir: 'data/new-provided/CVE', liveCode: 'PG_ENV_CIVIL' },
  { key: 'pg/geo-technical-engg', providedDir: 'data/new-provided/CVE', liveCode: 'PG_GT_CIVIL' },
  { key: 'pg/structural-engg', providedDir: 'data/new-provided/CVE', liveCode: 'PG_STR_CIVIL' },
]

const VERDICT_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['key', 'fieldsAudited', 'suspectEntries', 'overallVerdict', 'recommendedRemovals', 'notes'],
  properties: {
    key: { type: 'string' },
    fieldsAudited: { type: 'array', items: { type: 'string' } },
    suspectEntries: {
      type: 'array',
      description: 'entries that could NOT be corroborated in any real source',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['field', 'entry', 'reason', 'severity'],
        properties: {
          field: { type: 'string' },
          entry: { type: 'string', description: 'short identifier of the applied entry' },
          reason: { type: 'string' },
          severity: { type: 'string', enum: ['fabricated', 'misattributed', 'uncertain'] },
        },
      },
    },
    overallVerdict: { type: 'string', enum: ['clean', 'minor-issues', 'serious-issues'] },
    recommendedRemovals: { type: 'array', items: { type: 'string' }, description: 'field paths or entries to delete' },
    notes: { type: 'string' },
  },
}

function auditPrompt(d) {
  return `READ-ONLY fabrication audit for BEC department contentKey="${d.key}". DO NOT edit any file.

Read the applied entry:
  node -e "console.log(JSON.stringify(require('./apps/web/content/departments.json').departments['${d.key}'],null,1))"

Audit ONLY these structured fields if present: researchGrants, phdsAwarded, researchScholars, mous,
committeeGroups, supportingStaff, infrastructureItems. For EACH entry, decide whether it is corroborated
by a REAL source:
  - Provided docs: ${d.providedDir ?? 'NONE'} (parse with textutil/pdftotext/python-docx-xml as needed; grep for names/amounts/titles).
  - Live: https://www.becbgk.edu/${d.liveCode}/ and its section .php files (WebFetch; ToolSearch "select:WebFetch" if needed).
  - For PG/M.Tech depts the data may legitimately be the parent department's research-centre data — that is
    ACCEPTABLE (note it as shared, not fabricated), but a grant/PhD/MoU that appears in NO provided doc and
    NO live page is FABRICATED.

Flag as:
  - "fabricated": entry (grant title, amount, PhD scholar/title, MoU partner) found in NO source.
  - "misattributed": real data attached to the wrong dept/person/guide.
  - "uncertain": plausible but you could not locate the source this pass.

Pay special attention to research GRANT amounts and agencies, and MoU partner names — these are the
highest fabrication risk. Quote the source location when an entry IS corroborated is not needed; only
report SUSPECT entries. Return the structured verdict.`
}

phase('Audit')
log(`Auditing ${DEPTS.length} departments (read-only fabrication check)`)

const verdicts = await parallel(
  DEPTS.map((d) => () =>
    agent(auditPrompt(d), { label: `audit:${d.key}`, phase: 'Audit', agentType: 'general-purpose', schema: VERDICT_SCHEMA }),
  ),
)

const ok = verdicts.filter(Boolean)
const serious = ok.filter((v) => v.overallVerdict === 'serious-issues')
const allSuspect = ok.flatMap((v) => (v.suspectEntries || []).map((s) => ({ key: v.key, ...s })))
log(`Audited ${ok.length}/${DEPTS.length}. serious:${serious.length}, total suspect entries:${allSuspect.length}`)

return {
  audited: ok.length,
  seriousDepts: serious.map((v) => v.key),
  fabricated: allSuspect.filter((s) => s.severity === 'fabricated'),
  misattributed: allSuspect.filter((s) => s.severity === 'misattributed'),
  uncertain: allSuspect.filter((s) => s.severity === 'uncertain'),
  perDept: ok.map((v) => ({ key: v.key, verdict: v.overallVerdict, suspects: (v.suspectEntries || []).length, removals: v.recommendedRemovals, notes: v.notes })),
}
