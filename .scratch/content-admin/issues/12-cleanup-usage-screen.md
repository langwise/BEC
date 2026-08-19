# Cleanup and usage screen

Type: task (AFK)
Status: resolved
Blocked by: 08, 10

## Question

The R2 stewardship screen: bucket usage readout against the 10GB free tier, orphan list per the algorithm from [Orphan detection study](10-orphan-detection-study.md) with thumbnail + "where last used" context, and delete (R2 delete + manifest entry removal, committed). Deletion is the one destructive act in the Admin — confirm step required.

## Answer

`/admin/cleanup` is built, and against the real bucket it reads:
**8.36 GB of 10 GB (81.6%), 2,957 files, 81 unused, 153.5 MB reclaimable,
0 broken references.**

The unused list is almost entirely superseded PDFs under `documents/` —
annexures, old regulations, last year's calendars — which is exactly what [10]
predicted the intended target would be.

### Answering "is this file used?" from a deployed function

The reference scan has to read the site's own code, and a function on Vercel
has no source tree. So the scan runs at **build time**
(`scripts/build-asset-references.mjs` → `src/data/asset-references.ts`, 467
literal keys) and the screen reads the frozen result — the same arrangement as
`content/_schema/asset-keys.json`.

At request time the *referenced* set is the union of three sources, so a key
only has to be seen once to be safe:

1. those 467 literal keys from the code;
2. the content files **this deployment shipped** — free, already in memory;
3. the content files **at repo HEAD** — an Editor who publishes a photo at
   10:00 has changed HEAD, and the deploy carrying it does not exist for
   another two minutes. Without this read, that photo is unreferenced for
   exactly as long as the deploy takes.

Keys are recognised by shape and set-membership, never by field name: a new
unschema'd field holding a photo would otherwise silently unprotect it.

### What no scan can see, and the guard that fails the build

Two kinds of reference are unreadable. `assetsUnder("cells/step/")` means the
*folder* is the reference and the individual keys appear nowhere; and
`` asset(`facilities/hostels/${block}/${key}.webp`) `` means the key does not
exist as text at all — 80 live files are referenced that way.

Both are covered by folder protection in `lib/admin/protected-prefixes.ts`,
17 entries, each carrying the reason it cannot be scanned. And because a
hand-maintained list of that kind is one refactor from being wrong, the same
scanner runs as **a build step and a test**: a new `assetsUnder(...)` whose
folder is unprotected, or a new file that builds a key from a template
literal, fails `pnpm build` and `pnpm test` with the file name and what to add.
Proved by adding both kinds of call site and watching the build refuse.

`departments/` is protected wholesale rather than per-slug. That hides perhaps
123 deletable objects — accepted, because the per-slug version means the day
somebody renames an `assetSlug`, 1,944 keys become deletable at once.

### Failing towards keeping the file

- **A scan that came back too small is a broken scan, not an unused site.**
  Under 1,000 references, `findOrphans` throws rather than reports, and the
  screen says so instead of showing an empty, reassuring list.
- **30 days' grace.** Bytes land on R2 before the Publish that references them
  ([08]), so anything uploaded recently is held back — an Editor who uploads
  on Friday and publishes on Monday must not find the file gone.
- **Extensionless keys are folder markers**, never objects to delete.
- **Nothing the browser sends is a reason to delete.** Both mutating steps
  recompute the unused set from a fresh sweep and accept only keys on it; the
  request says *which* of the offered files, never *that* they are removable.
- Cap of 25 per operation, and never more than 5% of the bucket.

### The two phases, as two buttons

Deleting is the only irreversible thing in the Admin, so [10]'s two-phase
delete is the shape of the screen:

1. **Take out of the site's index** — a commit removing the manifest entries
   (reusing [11]'s `removals`). The site stops listing them, and the mistake is
   a `git revert`. It ends in the same "saved → live" wait as every other
   publish, because the wait is the point.
2. **Delete permanently** — the bytes, behind a confirm dialog, and **only for
   keys the manifest no longer mentions**. A still-registered key is refused by
   name rather than quietly unregistered first: a deploy has to go out between
   the phases so somebody can see the site without those photos while the
   originals still exist.

All 81 of today's candidates are registered, so the screen currently offers
step one and refuses step two — which is the correct first state.

### Usage, and the second list

Nothing records object sizes — the manifest holds keys and URLs — so the
free-tier gauge, the reclaimable figure and the 30-day grace all come from one
`ListObjectsV2` sweep (~2,950 objects, three round-trips, whole report in 3.4s
including the GitHub reads). The same sweep gives drift in both directions:
bucket ∖ referenced is the unused list, and **manifest ∖ bucket is a separate,
louder card** — an entry with no bytes behind it is a live page drawing a
broken image, which is the more urgent bug. There are none today.

### Verified

329 tests, `tsc --noEmit` clean, eslint clean, `pnpm --filter web build` shows
`/admin/cleanup` and `/api/admin/cleanup` as `ƒ` with the protection check
running in the build.

- **The orphan list was checked against a naive grep of every source and
  content file: 0 of the 81 keys is referenced anywhere.** Four share a *file
  name* with something in use and all four are genuine —
  `documents/iqac/aqar-2017-18-18-03-2020.pdf` is a second copy of the one the
  TEQIP page draws from `documents/teqip/`, and three `gallery/gymkhana/*.webp`
  are the photos that page did not pick.
- Refusal paths exercised against the running route: no session (401),
  unknown step, malformed body, a key that is in use, a real orphan that is
  still registered, 26 at once, and an empty selection — all refused before any
  commit or delete.
- **The R2 delete path was executed end to end** on a throwaway object:
  uploaded, found in the sweep with its size and age, deleted through
  `deleteObjects`, confirmed gone. The bucket is back to 2,957 objects.

`kindOf` moved from `lib/admin/asset-index.ts` (which reaches GitHub) into the
Node-free `lib/asset-key-shape.ts` on the way, so a client component that only
wants to know whether to draw a thumbnail does not pull the GitHub client in
behind it.

### Left for Pratik

- **The unregister commit has never been executed** — it writes to `main`, like
  every other publish path in this project.
- `scripts/upload-assets.mjs --prune` remains a bigger bulk-deletion footgun
  than this screen: no cap, no confirm, no two phases. Worth deleting the flag.
- 81.6% of the free tier is close enough that the 153.5 MB here is worth
  taking, but the real lever is the ~1.9 GB of `documents/` PDFs that have
  never been through any compression.
