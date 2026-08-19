# Faculty and placements editors

Type: task (AFK)
Status: resolved
Blocked by: 02, 03, 04

## Question

Editors for `content/faculty.json` (21 departments of profiles — per-department list view, profile form with photo picking) and `content/placements.json` (per-department batches/chart data — tabular number entry that a non-technical Editor can't malform). These two are joined into department pages by the transform, so edits here must be verified against a department page render.

## Answer

Both screens are built. They are the first two files keyed by *department*, so
what came out of this slice besides the editors is the department switcher and
the table primitive — both of which [17](17-departments-editor-build.md) needs.

### `/admin/faculty` — 198 profiles, 21 departments

A department picker, then that department's roster as [15]'s card list. The
whole file publishes in one commit: switching department is not a save point,
and the Publish button reports what is unpublished across all of them.

Each profile has a photo and a profile PDF, both through the [07] picker. That
made the picker's document mode real for the first time — [09] built the
presigned PDF transport but only wired it into the News attachment field, so
the picker's own upload button was still switched off for documents. It is on
now: one button, two transports (`upload-image.ts` through the function,
`upload-pdf.ts` presigned direct to R2), chosen by `kind`.

**Where an upload goes is read off the keys the department already uses**, not
assembled from its slug. Two reasons, both real in this data: the four PG
departments have no `assetSlug` at all yet file their photos neatly under
`departments/pg-ece/faculty`, and two departments have a single HoD portrait
sitting under `governance/` — so the *most common* folder wins, or every new
Civil photo would be filed beside that one outlier.

### `/admin/placements` — the tables

Three sections per department, and a department publishes only the ones it has
figures for. "Optional" is literal here: `ai-and-ml` has no `batches` key,
three departments have `batches: []`, and four have no chart. Publishing must
not invent a key for the first, delete it from the next three, or write an
empty chart for the last four — so presence is state (`null` vs `[]`), not a
value.

Two kinds of figure sit side by side and are not interchangeable. The year-wise
table holds **strings** ("72.55", "2023-2024") because they are printed; the
chart holds **numbers** because they are plotted. Everything is text in the
editor, and `optionalNumber` re-applies the distinction on the way out — a
cleared box disappears rather than becoming `0`, and a typo is left out
*and blocks the publish by name* rather than being written as `NaN`, which
`JSON.stringify` turns into `null` and the schema then rejects with a message
about the wrong type instead of about the typo.

Which columns a department fills in varies — MBA publishes four of the eight,
CSE publishes all eight — and the site already drops empty columns. So the
editor shows all eight and lets absence mean absence.

### The table primitive, and why it is not a card list

[15]'s card list is right for a slide or a person. It is wrong for five short
columns repeated 192 times: the columns stop lining up and a typo takes four
scrolls to find. `TableEditor` is a real table, with the three things that
scale:

- **A filter**, past twelve rows.
- **Paste from a spreadsheet.** The placement office hands over a sheet with
  130 students on it, not a form. Excel and Sheets put tab-separated text on
  the clipboard, a saved CSV arrives comma-separated, and either can quote a
  cell containing the delimiter — so both are parsed properly rather than
  split. The sheet's own header row is recognised and dropped; cells past the
  last column are counted and reported rather than silently lost.
- **Rows that re-render only when they change.** CSE's 2021-22 batch is 192
  students × 5 boxes; a keystroke that re-rendered all 960 would be felt. The
  row is memoized and the callbacks are identity-stable, reading current items
  through a ref that is only ever touched inside an event handler.

Table rows delete without a confirm, unlike cards: a row is five short boxes an
Editor can see all of, deleting one is obvious the instant it happens, nothing
reaches the site until Publish — and a confirm on every row of a 192-row table
would be its own hazard.

### The property both editors are tested on

The same byte-exact round trip as [15], and it earned its keep twice more:

- **108 of the 198 faculty profiles write `cv` before `photo`.** Emitting
  schema order would have rewritten every one of them on the first publish
  that fixed a single designation.
- **CSE writes `offersChart` before `yearWise`; Civil writes it after.** Same
  problem one level up, same fix — `inOrderOf` on the department object.

A third was caught by the round trip immediately: `DepartmentRoster` was first
written with a field called `key`, which `withKey` spreads over — so
`"civil-engg"` became `"row-7"` and the whole file published under invented
department names. Renamed to `department`. A type-level guard was tried and
reverted: `Keyed<T>` collapses to `never` the moment `T` forbids `key`, which
costs casts through every generic list. The rule is now written on `Keyed`
itself, and the round-trip test is what enforces it.

### Verified

- `pnpm test` — 264 pass, 0 fail (63 new: rows/departments/paste-rows/
  faculty-doc/placements-doc).
- `npx tsc --noEmit` clean; `eslint src/components/admin src/lib/admin
  src/app/admin src/content` clean, no suppressions.
- `pnpm --filter web build` — both routes build `ƒ` (dynamic).
- Both pages rendered against a real session (200, with real content in the
  payload: CSE's roster on `/admin/faculty`, all three CSE batches and the
  chart on `/admin/placements`). Batches render collapsed, so the 451 student
  rows are in the data but not in the DOM.
- `POST /api/admin/upload/presign` with `departments/civil/faculty/cv`
  returns a key and a URL signing content-type and content-length — the CV
  upload path works for the folder the faculty editor files into. Nothing was
  uploaded; presigning mints a URL and stores nothing.
- The 900 KB departments catalogue does **not** cross to the browser: the page
  passes `listDepartments()` — key, name, assetSlug — and the client chunk has
  no trace of the catalogue's own fields.

### Left for Pratik

- The bucket CORS policy from [01](01-secrets-and-access.md) now blocks CV
  uploads as well as News attachments — same one policy, more of the Admin
  waiting on it.
- `/admin/placements` sends the whole 129 KB file to the browser, as every
  editor does. It is fine over a desktop connection behind auth; if the file
  doubles, splitting the payload per department is the change to make.
