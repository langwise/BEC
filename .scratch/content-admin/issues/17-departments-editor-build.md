# Departments editor build

Type: task (AFK)
Status: resolved
Blocked by: 14, 21

## Question

Build the departments editor per the UX settled in [Departments editor UX](14-departments-editor-ux.md) and the refined schema from [Departments content shape study](13-departments-shape-study.md). Largest slice on the map — expect it to split into per-section-group tickets once the prototype lands (noted in the map's fog).

## Answer

Built, in one slice. `/admin/departments` and `/admin/departments/<key>`, the
fourteen tabs from [14](14-departments-editor-ux.md), every one of the
seventy-five schema fields editable.

### A dozen widgets, not seventy-five forms

The reason this did not split into per-section tickets: the schema has
seventy-five top-level fields nested five deep, but only about a dozen *shapes*.
A line of text. A bullet list. A captioned photo. A run of photos. A list of
PDFs. A free-form table. A map keyed by section id. `content-fields.tsx` is one
widget per shape, so a field becomes a line of declaration:

```tsx
<LinesField
  label="Research achievements"
  hint="Patents granted, best-paper awards — anything that is not a table."
  value={value.researchAchievements}
  onChange={(next) => set("researchAchievements", next)}
/>
```

Splitting by section would have produced fourteen tickets that each rebuilt the
same six widgets and drifted apart doing it.

Three of the widgets carry a decision worth naming:

- **`LinesField`** — a bullet list is a textarea, one bullet per line, not a
  list of boxes with a delete button each. Fifteen mission statements are
  fifteen delete buttons the other way; here reordering is dragging a line,
  which an Editor already knows how to do in the document they were sent.
- **`FlagField`** writes `true` or *nothing* — never `false`. The file says
  what is true of a department; a hundred `false`s would be noise in every
  diff.
- **`GroupItemsField`** draws the `string | {label, value?, image?}` union *as
  it is*. Converting the plain ones on load would rewrite every department that
  only ever used plain ones; instead a plain line grows the extra boxes when an
  Editor presses "Add a detail", and shrinks back when they press "Back to one
  line".

### The state is the document

Every other editor flattens its file into a typed form state and rebuilds it on
the way out — a mapper per field. Seventy-five of those would be the drift this
ticket was supposed to avoid, so here `toState` is the identity and the working
state *is* the department object. A tab nobody opened comes out byte-identical
because it was never taken apart, and a field added to the schema needs a
widget, not a mapper.

Two things make that safe, and both were built for it:

- **`normalize.ts`** applies once, to the whole tree, what the per-field
  mappers used to apply one at a time: trim strings, and drop a field an Editor
  emptied rather than writing `""` or `[]` for something the schema calls
  absent.
- **`row-id.ts`** keeps React's handle for a row in a `WeakMap` *beside* the
  row. The usual trick — spreading a `key` field onto each row — is what the
  other editors do, and it is unusable here: the departments schema already
  uses `key` for the asset key of a photo, so spreading would publish
  `"row-7"` where a photo key belongs. `ObjectList`/`ObjectTable` in
  `content-list.tsx` are `ListEditor`/`TableEditor` with that one difference.

### Publishing one department, not the file

`content/departments.json` is 750 KB; the largest department (`civil-engg`) is
87 KB and the median is 21 KB. Sending the whole file to the browser so
somebody can fix a vision statement, and sending it all back, is 35× the
payload for the same change — and any two Editors on different departments
would overwrite each other.

So the publish path grew a **scope**. The editor `PUT`s
`{ data: <one department>, scope: "civil-engg" }`; the server reads the
published file, merges the entry into its own place, and validates and commits
the whole document. Three properties, each tested:

- The entry is written **where it already was**, so the diff is one department
  rather than a reordered file.
- A scope the file does not already hold is refused —
  `Object.prototype.hasOwnProperty`, so `__proto__` and `constructor` are keys
  like any other and are rejected like any other.
- The merge does not mutate the document it was handed.

### The test that caught the real bug

Opening a department and pressing Publish without typing anything has to
produce a commit with no changed lines. A test asserts exactly that against
every department in the real file — and it failed on eight of them.

Most were harmless (`highlights: []`, `quantity: ""` — fields the schema calls
absent). One was not. `normalizeDocument` compacted arrays, and a table row is
an array:

```
civil-engg.achievementTables[1].rows[16]
  ["…", "", "Water Environment Research", "Feb 2024"]
  → ["…", "Water Environment Research", "Feb 2024"]
```

An empty cell in column three was dropped and **every later column shifted
left** — a journal name published under "Volume", a date published under
"Journal". Silent, and it would have reached the site the first time anyone
edited one of the three departments with a blank cell in a table.

The rule is now: *array entries are normalized where they stand and never taken
out.* Position is meaning inside an array. The same change stopped a second
silent loss — a row an Editor added and had not filled in used to be deleted on
the way to the file; now the schema names it in the Publish bar and they can
finish it or delete it themselves.

The remaining twenty-three differences were the harmless kind, and
`content/departments.json` has been normalized once so the round trip is now
exact for all eighteen departments.

### Verified

- `pnpm test` — 395 pass, 0 fail. 46 of them are this slice's:
  `department-doc` (21), `normalize` (11), `row-id` (7), and the scoped-merge
  half of `content-file` (7).
- `npx tsc --noEmit` clean; `eslint` clean over `src/components/admin`,
  `src/lib/admin`, `src/app/admin/(authed)/departments`, no suppressions.
- `pnpm build` — both routes build `ƒ` (dynamic), whole build green.
- Rendered against a real session on a dev server:
  `/admin/departments` **200** (all 25 departments listed, with their
  "nothing written yet" hints), `/admin/departments/civil-engg` **200**,
  `/admin/departments/pg/structural-engg` **200** — the slashed key the
  catch-all route exists for. `/admin/departments/nope`,
  `/admin/departments/__proto__` and `/admin/departments/constructor` all
  **404**.
- Civil's page payload holds Civil's content and no other department's — the
  scoped read does what it claims.
- A guard test walks `departmentSchema._zod.def.shape` and fails if any field
  is on no tab, has no Editor-facing name, or is named in no tab's source. All
  seventy-five pass.

### Left for Pratik

- **The Admin reads and writes GitHub `main`, and `main` is seven departments
  behind this working tree.** [21](21-departments-normalization.md) deleted the
  seven unrouted `pg/*` entries per your call in
  [20](20-orphaned-pg-departments.md), and that deletion is uncommitted — so
  the picker rendered above lists 25 departments, not 18. Publishing from the
  Admin before that lands would write into the pre-migration file and make the
  eventual merge a conflict. Land the working tree first.
- The round-trip guarantee is measured against the *local* file. It becomes
  true of what the Admin actually edits at the same moment.
- No commit path has been executed, here or in any earlier slice. Publishing
  for real is [18](18-v1-walkthrough.md)'s first act.
- The Layout tab is eighteen switches that move blocks between tabs. It is the
  part of this screen most likely to be wrong in wording, and the part an
  Editor can most easily use to make a department page look broken without
  breaking validation.
