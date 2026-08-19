# Gallery folder management

Type: task (AFK)
Status: resolved
Blocked by: 08

## Question

The Admin's "gallery folders" screen (Q8 decision: keep prefix galleries): list the live gallery folders (from the study in [Orphan detection study](10-orphan-detection-study.md)'s prefix enumeration or a maintained registry), show each folder's photos, upload into a folder (manifest commit makes it appear on the site — ADR 0003), delete a photo from a folder. No ordering, no captions (alphabetical-by-key is the contract; explicit-list galleries are out of scope).

## Answer

`/admin/gallery` is built. It is the only editor screen with no document
behind it: the gallery **is** the manifest. A page calls `assetsUnder(prefix)`
and draws whatever comes back, so *registering* a key is what puts a photo on
the site and *unregistering* it is what takes it off. Both halves of this
screen are therefore one commit to one generated file, published one gallery
at a time.

Nothing is destroyed here. A removed photo keeps its bytes on R2 — which is
precisely the two-phase delete [10](10-orphan-detection-study.md) asked for:
the reversible half (a git commit anyone can revert) lives here, the
irreversible half (deleting objects) lives on [12](12-cleanup-usage-screen.md).
The worst an Editor can do on this screen is take a picture off a page, and
undoing that is finding it in the picker again.

### The registry, and the test that keeps it honest

`lib/admin/galleries.ts` names all 39 galleries — 12 site galleries, 10 NAIN
project folders, and one per department that has a gallery folder, derived at
request time from the departments catalogue. Each entry carries the page it
feeds, so the screen can link "See it on the site".

A registry that is hand-maintained rots the first time somebody adds a gallery
to a page. So the check is not a convention, it is a test: `galleries.test.ts`
walks `src/{app,content,components,data}`, regexes every `assetsUnder(...)`
call with a literal prefix, and fails if one is missing from the registry. The
four call sites that pass a variable are named in a `KNOWN_INDIRECT`
allowlist — deliberately by hand, so adding a fifth is a decision somebody
makes rather than a gap that opens quietly.

### "In the folder but not in the gallery"

Nine of the folders hold photos the gallery does not show: a hero the page
draws at the top, a portrait beside the text, and — on Campus in Pictures — a
curated exclude list of 18. The page filters them; so does this screen, and it
shows them anyway in a collapsed *"photos in this folder the gallery does not
show"* block, read-only.

Both halves matter. Hiding them entirely would have an Editor upload a second
copy of a picture already on the page. Letting them be removed would
unregister a key the page still uses — which does not break the page today
(`asset()` falls back to the plain R2 URL) but breaks it the moment [12]
deletes an object nothing references. The server refuses those keys too, not
just the UI: `galleryChangeProblem` is the same function on both sides.

### Recursive, because the site is

`assetsUnder` is recursive, and one gallery relies on it: NAIN v1 files one
photo per event folder (`cells/nain/gallery/2-hackathon/1.webp`). A first cut
listed direct children only and reported that gallery empty while the page
drew eight pictures. Fixed by walking the whole subtree — and by labelling a
nested photo with its folder ("2 hackathon — 1"), since eight tiles all named
"1" would have been worse than none.

### Publishing

One PUT per gallery, `{prefix, add, remove}`. `manifestCommitFiles` grew a
`removals` argument and now rewrites both manifest files, returning "no files
changed" when the merge is a no-op — so removing a key that was never
registered is silently nothing rather than an empty commit. Every addition
must exist on R2 (`assetExists`) before it can be registered: the manifest
never points at bytes that are not there.

Uploads go through the function (`uploadImages`, 3 at a time, one failure
never cancels the rest), so the R2 CORS gap that blocks News attachments and
faculty CVs does not affect this screen.

Marks are pending until published, `beforeunload` warns on unpublished work,
and a gallery with pending changes is listed by name from every *other*
gallery — switching folders is not a save point, and an Editor should not be
able to lose an edit by clicking away from it.

### Numbers, against the real manifest

762 manageable photos across the 39 galleries; 22 held back. Largest is
`departments/aiml/gallery/` at 340, which is why the grid is **not**
virtualized — the picker draws ~2,950 entries and needs it, 340 does not, and
`next/image` lazy-loads the tiles that are off screen. (`useVirtualizer` also
trips the React Compiler's `react-hooks/incompatible-library` rule here.)

### Verified

297 tests, `tsc --noEmit` clean, eslint clean, `pnpm --filter web build` shows
`/admin/gallery` and `/api/admin/gallery` as `ƒ`. The screen renders against a
real session with all 39 galleries in the payload and none of the 900 KB
departments catalogue crossing to the browser. The API's refusal paths were
exercised end to end without ever committing: outside-the-folder,
used-elsewhere, not-a-gallery, empty change, a key that does not exist on R2,
a malformed body, and no session.

### Left for Pratik

- The commit path still has not been executed by anything (it writes to `main`).
- Four `departments/pg-*/gallery/` folders hold photos no page can show — PG
  programmes have no `assetSlug`. They are not in the registry;
  [21](21-departments-normalization.md) owns that.
