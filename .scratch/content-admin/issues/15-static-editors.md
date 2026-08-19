# Home and governance editors

Type: task (AFK)
Status: resolved
Blocked by: 02, 03, 04

## Question

Editors for `content/home.json` (hero slides, about, campus life — list add/remove/reorder with image picking) and `content/governance.json` (principal, deans, officers, HoDs, sangha, BoG — people lists with photos). Follows the patterns proven by the news editor; image fields use the picker.

## Answer

Both screens are built, and the news editor was rebuilt on top of the same
pieces so there is one pattern in the codebase rather than three.

### The shared base, extracted first

The news editor had one of everything — one key minter, one reorder, one
dirty-tracker, one row card. [15] needs six lists of people and three lists of
slides, [16] needs four more and [17] needs one per department. Writing those
bespoke would mean thirty near-copies of the same three bugs. So the reusable
half came out first, and news moved onto it:

- `lib/admin/rows.ts` — `withKeys`/`move`/`patchAt`/`removeAt`, plus `optional`
  and `optionalFlag` for building documents where *cleared* means the field is
  absent, and `inOrderOf` (see the bug below). `news-rows.ts` now re-exports
  from here instead of carrying its own copies.
- `lib/admin/use-editor-doc.ts` — load → edit → dirty → publish → reset, in one
  hook. Takes `toState`/`toDocument` as module-level functions and uses them
  directly as memo deps, so no refs and no lint suppressions.
- `components/admin/row-card.tsx` — the numbered card with up/down, delete
  behind a confirm, and optional collapse.
- `components/admin/list-editor.tsx` — add/reorder/remove around any row
  renderer. Lists longer than six collapse by default with expand-all.
- `components/admin/fields.tsx` — `TextField`, `TextAreaField`,
  `ParagraphsField`, `ChoiceField`, `EditorSection`, `FieldRow`.
- `lib/admin/paragraphs.ts` — `string[]` ⇄ one textarea separated by blank
  lines, which is how an Editor actually thinks about a paragraph break.

Reordering is up/down buttons, not drag-and-drop: it works on a phone, it works
with a keyboard, and it cannot half-drop a board member into the wrong list.

### The two screens

`/admin/home` is three sections in page order — Hero, About BEC, Student life —
so the screen reads top-to-bottom like the page it edits. Hero and campus cards
take an image through the [07] picker (folders `institute/campus`,
`institute/group-photos`, `student-life`) and a `cover`/`contain` choice. The
campus grid's `className` spans are offered as two named sizes ("Large (2×2)",
"Small (1×1)"); a hand-tuned span already in the file is offered back as
`Custom (…)` rather than being silently replaced by the nearest named one.

`/admin/governance` is four tabs — Leadership, Heads of Department, B.V.V.
Sangha, Board of Governors. Board seats pick their category from the ten the
schema allows; a new member defaults to `nominee`, never `chair`, so adding
someone cannot quietly reorder the page.

`lib/admin/sections.ts` flips both from `planned` to `ready`.

### The property both editors are tested on

Each mapper has a byte-exact round trip:

```ts
assert.equal(serializeContentFile(toDocument(toState(content), content)), raw)
```

Opening a screen, reading it, and pressing Publish must produce a zero-line
diff. Not a reformat, not `fit: "cover"` sprouting on every slide, not a field
Pratik set by hand disappearing. `link`, `roleBadges`, `verify` and
`placeholder` have no controls, so they are carried through `extra` verbatim.

That test earned its keep immediately. `governance.json` writes `role` before
`name` in `deans` and `officers`; the builder emitted `name` first. Six
leadership entries would have reshuffled their keys on the first publish that
changed one email address — a diff Pratik would have had to read past to find
the real edit. Fixed by recording each person's arrival order and rebuilding
through `inOrderOf`, which appends genuinely-new fields rather than dropping
them.

### Verified

- `pnpm test` — 201 pass, 0 fail (rows 20, paragraphs 8, home-doc 14,
  governance-doc 13 are new).
- `npx tsc --noEmit` clean; `eslint src/components/admin src/lib/admin
  src/app/admin src/content` clean, no suppressions added.
- `pnpm --filter web build` — `/admin/home` and `/admin/governance` both build
  as `ƒ` (dynamic), as the authed group requires.

### Noticed, not fixed

`content/home.json`'s first About slide says "10 UG, 3 PG, and 10 Research
Centers". The figures verified for the Institute tab are 11 UG and 8 PG. That
is a content correction, not an editor change, so it is left for Pratik — and
it is now a one-field edit on `/admin/home` rather than a code change, which is
the point of the whole project.
