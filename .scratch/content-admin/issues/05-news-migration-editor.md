# News migration and first editor

Type: task (AFK)
Status: resolved
Blocked by: 02, 03, 04

## Question

The proving slice, end to end: migrate `src/data/home/news-announcements.ts` into `content/news.json` (two streams — News and Announcements, see CONTEXT.md; ISO dates rendered to display format; optional link field legitimizing today's `"#"` items as "no link"; keep `pinned`; preserve the results-portal link), Zod schema + loader + consuming pages switched over, and build the News/Announcements editor: list, add, edit, delete, pin, reorder-by-date, Publish. First real Publish through the pipeline proves the whole design.

## Answer

**BUILT** (uncommitted). `content/news.json` is live in the content layer, the old data module is gone, and `/admin/news` is the first section flipped to "ready".

### The date field: one field, two meanings

The ticket assumed ISO dates. Five of the sixteen entries are not dates at all — `"A.Y. 2026–27"`, `"2025–26 EVEN SEM"` — they are periods, and they are legitimate: a results notice belongs to a semester, not a day.

Two fields (`date` + `dateLabel`) would have forced an editor to know which one a "2025–26 EVEN SEM" notice goes in. Instead `date` is **one string that is either an ISO date or a period label**, and `formatNewsDate` renders `"2026-06-12"` as `"JUN 12, 2026"` and passes anything else through untouched. The editor picks the kind with a two-button toggle and gets a native date picker or a text box accordingly, with a live preview of exactly what the site will show.

Formatted by hand rather than through `Intl`/`Date`: `new Date("2026-06-12")` in a negative-offset timezone prints the 11th, and this site renders on whatever machine Vercel gives it.

### Ordering

Array order is the published order — what an editor arranges is what ships, rather than a sort the site quietly applies on top. Pinned items are held first by the rendering components, exactly as before. "Sort by date" is an **editor action**, not a render-time rule; it puts dated items newest-first and leaves period-labelled ones at the top in their existing order, because those are the evergreen notices ("Admissions open now") someone put there deliberately. New items are added at the top, which is where a new item almost always belongs.

### Migration

Done by script rather than by hand — sixteen titles carrying curly quotes, en dashes and `“…”` pairs are exactly the kind of thing that gets silently corrupted in transcription. The script imported the old module, converted, and asserted title-for-title, link-for-link and pin-for-pin equality. A second check re-rendered every migrated entry through `formatNewsDate` and compared it to the string the old data displayed:

```
rendered output is identical to the pre-migration data ✓
```

`href: "#"` — eleven of the sixteen — became **no `link` field at all**, which is what it always meant. The home page section used to wrap those in `<Link href="#">`; it now renders them as plain text, so the site stops shipping dead links to screen readers. The results-portal URL and `/admissions` survive as real links.

### Files

| File | Role |
| --- | --- |
| `content/news.json` | the two streams |
| `src/content/schema/news.ts` | Zod contract, registered in `contentFiles` and `dev-validate` |
| `src/content/news-date.ts` | `isIsoDate` / `formatNewsDate` / `sortByDateDesc` — pure |
| `src/content/news.ts` | loader; casts rather than parses (it reaches client chunks) |
| `src/lib/admin/news-rows.ts` | the editor's row model and the to/from-document conversions |
| `src/lib/admin/use-publish.ts` | publish → poll deploy → "live", reusable by every editor |
| `src/components/admin/publish-bar.tsx` | the bar every editor screen ends with |
| `src/components/admin/news-editor.tsx` | the editor |
| `src/app/admin/(authed)/news/page.tsx` | reads HEAD, renders the editor, handles the failure |

`src/data/home/news-announcements.ts` is deleted; `NewsList`, the home section, `/news` and `/announcements` all read the content layer.

The publish bar and the publish hook were built as shared pieces from the start — [15](15-static-editors.md) and [16](16-people-editors.md) need the same "saved ≠ live" reporting, and the alternative was writing it three times.

### Editor decisions worth keeping

- **No `id` in the JSON.** An id would be a second thing to keep unique for no reader's benefit. React needs a stable handle across reordering, so one is minted on load and thrown away on publish.
- **Empty link is dropped, not published as `""`.** `link: ""` is not a valid item; absence is the representation of "no link".
- **Publish is disabled while an item lacks a date or title**, naming the stream and position ("News item 2 still needs a date and a title") rather than failing at the server.
- **`beforeunload` warning while dirty.** Nothing autosaves and the audience is non-technical.
- **Delete asks first**, quoting the title.

### Verification

- `pnpm test` — 69 pass; 16 new over the date rules and 16 over the row/document conversions, including the exact display strings the site rendered before the migration.
- `validate-content`, `tsc --noEmit`, `pnpm build` — all clean; `/admin/news` builds; **no Zod in any client chunk** (checked: 0 chunks contain `ZodError`).
- Live route smoke test against the dev server (curl, no browser):

| Check | Result |
| --- | --- |
| `/admin/news` with no session | 307 → `/admin/login` |
| `GET /api/admin/content/home.json` no session | 401, "Your session has expired." |
| same with a session | 200, real content from repo HEAD |
| `GET …/content/secrets.json` | 404, "not an editable content file" |
| `PUT` an invalid document | 400 with three field-level issues, **no commit attempted** |
| `PUT` with no `data` | 400, "No content was submitted." |
| `GET /api/admin/deploy/<main head>` | 200, `success` + production URL |
| `GET /api/admin/deploy/not-a-sha` | 400, "Not a commit reference." |
| `main` head afterwards | unchanged — nothing was written |

- Editor render checked by temporarily pointing the page at the local file (reverted): 11 item cards, each with a date input, move up/down, delete and the link hint; the date preview showed "JUN 12, 2026"; the publish bar read "Everything here is published".

### Blocked on Pratik, and why it matters

**The first real Publish has not happened.** It writes to `main`, which needs explicit sign-off.

There is also an ordering trap: **`/admin/news` cannot load until `content/news.json` exists on `main`.** Every editor reads from repo HEAD by design (ADR 0001), so until the migration commit lands, the page shows its "could not be loaded" card — verified, and it fails gracefully, but it is not usable. Same for the content normalisation from [04](04-publish-pipeline.md): land it before anyone edits, or the first save carries a whole-file reformat.

Suggested order once reviewed: land the content normalisation + this migration together, then open `/admin/news`, change one title, Publish, and watch it go live.
