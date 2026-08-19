# Departments normalization migration

Type: task (AFK)
Status: resolved
Blocked by: 02, 20

## Question

Apply the shape normalizations from [the departments report](../assets/13-departments-shape-report.md) so the editor builds on a sane document, following its de-risking order: (1) delete the 5 dead flags + their unreachable transform branches; (2) fix the `asset()`/`resolveDocuments()` guard contract so missing assets fail loudly instead of shipping broken URLs; (3) regenerate the stale `asset-keys.json`; (4) migrate `departments.json` + loader + transform to the refined Zod schema — Photo pairs, hero merge, string|object union coercion, explicit `kind`, layout quarantined under `layout`, em-dash and regex conventions made explicit fields; (5) execute the [Orphaned PG departments](20-orphaned-pg-departments.md) decision: **delete** the 7 unrouted `pg/*` entries from `departments.json`, their `faculty.json` rosters, and the commented-out `departments-catalog.ts` lines (keep `pg/structural-engg`, the routed one). Also remove the placeholder fallbacks (violate the repo's no-placeholder rule) and the hardcoded civil/EEE slug checks in the renderer where the schema can express them. Site must render pixel-identically after (except deliberately removed placeholders) — verify with a build + spot-check of every section type.

## Answer

Done, in eight verified stages. Across the whole migration the site's **visible
text changed on exactly one page** and **no link anywhere changed**.

### The verification harness

A spot-check of "every section type" would not have been evidence for a
1,400-line transform, so each stage was measured against the previous build at
four levels: byte-exact HTML (with Next's per-build ID normalised out), visible
text, every `href`/`src` in the DOM, and the full DOM (tags + text, scripts and
styles stripped). Snapshots live in the session scratchpad as `t21-before`
(origin) through `t21-s8`.

**Origin → now, over 384 prerendered pages: 1 page changed on screen, 0 pages
changed links, 14 pages changed DOM.** Everything in that gap is listed below.

### 1–3, 5 — dead flags, the guard contract, stale keys, orphaned PG

- Five never-set flags and their transform branches deleted, along with
  `consolidateResearch`, `defaultHighlights`, `titleCase`, `foldPublications`
  and every "will be updated soon" string. All of it was unreachable — except
  `consolidateResearch`, which is why **civil's Research Achievements page
  gained 8 authored bullets** (patents, best-paper awards) that had been
  written years ago and never rendered. That is the one visible change.
- `asset()` kept its lenient fallback; `assetUrl()` is the new strict half that
  returns nothing for a key the manifest lacks. Callers that needed to *know*
  (portraits, `resolveDocuments`) moved to it — the old test,
  `asset(key).startsWith("http")`, was true for every key including typos.
- A build gate now walks each content file against its Zod schema and fails on
  any `assetKey`-marked string R2 does not have
  (`scripts/validate-content.mjs`, `src/content/schema/asset-fields.ts`).
  Proved by breaking it: a `.webp-typo` key produced
  `$.hero[0].image: "…campus-front.webp-typo" is not on R2`.
- `asset-keys.json` regenerated (2,948 keys). The 7 unrouted `pg/*`
  departments, their 4 faculty rosters and the catalog's commented-out lines
  are gone; catalog ↔ content is now exactly 18 ↔ 18, and a catalog entry with
  no content throws by name instead of rendering an invented department.

### 4 — the schema reshape

- **Photo pairs.** Eight `xImage` + `xImageCaption` pairs became one
  `{ key, caption?, width? }` object (`photo()` in `content/schema/shared.ts`),
  24 sites migrated. The transform's eight copies of the same ternary collapsed
  into one `sectionImage()` helper. `overviewImage`→`overviewPhoto`,
  `aboutImage`→`aboutPhoto`; "Image" now means a bare key, "Photo" an object.
  The union form was deliberately *not* offered — one shape means the editor
  has one widget, the JSON-Schema stays honest, and the asset walker can see
  through it, none of which survives a Zod `.transform()`.
- **Hero merge.** `heroImage` + `heroImages` → one `hero: string[]`; one image
  renders still, two or more roll. Both departments that set both had the
  single image as element 0 of the array already, so nothing was dropped.
- **Explicit `degree`.** `intakeLabel()` sniffed `pg/` prefixes and compared
  against `"mca"`/`"mba"`; departments now declare `degree` ("B.E." /
  "M.Tech." / "MCA" / "MBA"), and the label is `${degree} Intake`. The Science
  & Humanities departments award none and leave it unset.
- **The other two `pg/` sniffs were dead** — both gallery loaders already
  return nothing for a department with no asset folder, which is how
  `pg/structural-engg` opts out. Deleted.
- **Conventions made fields.** Committee positions authored as
  `"Chairman — Professor, IIT Bombay"` are now `position` + `affiliation` (254
  split); a group renders three columns when anyone in it has an affiliation.
  Supporting staff were classified into "Technical" and "Supporting" by
  `/peon|helper|attender|sweeper|driver|watch|garden|clean/i` against their
  designation — they now carry an explicit `role` (22 tagged).
- **Layout quarantined.** 18 layout booleans + the 4 section maps moved under
  `layout`, leaving the top level to facts. `nbaAccredited` and
  `alumniMentorship` stayed out: they say what is true of the department, not
  where to draw it.

### The hardcoded slug checks

All five are gone.

- Two civil width checks became `width` on the photo itself
  (`narrow`/`medium`/`wide`/`full` → the max-width the layout applies).
- `slug === "electrical-and-electronics-engg"` became `alumniMentorship` in
  content.
- Two more were **dead**: the About tab's second group-photo block required
  `visionMissionOnHome`, which neither department that reaches it sets. It
  emitted an empty `<div class="space-y-8 pt-4">` on two pages and nothing
  else. Deleted — that is the second DOM change.

### The 14 DOM changes

1. `departments/ug/civil-engg/research-achievements` — the 8 recovered bullets
   (the only visible change).
2. Civil and EEE About — the empty div above.
3. Eleven photos whose `alt` stopped repeating their caption. A caption renders
   in the `<figcaption>` right there, so an alt that duplicated it said the
   same words twice and described the image not at all; they now read
   "Civil Engineering — teaching faculty" instead of "Teaching Faculty".

### Left for Pratik

- **The Alumni Mentorship block's copy is still hardcoded** in
  `components/academics/departments/eee-mentorship.tsx` — ~500 lines of
  bespoke layout with EEE's stats, cohort table and mentor rosters inline.
  Content now controls *whether* it renders, not what it says. Expressing it
  properly needs a richer block type than any section type we have; it is the
  one place in the departments tree where page text lives outside
  `content/*.json`.
- 23 pre-existing eslint errors remain across untouched site pages
  (`no-explicit-any`, `react/no-unescaped-entities`, `no-html-link-for-pages`).
  None is in a file this ticket touched.
