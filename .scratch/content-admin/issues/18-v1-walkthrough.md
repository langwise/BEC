# v1 acceptance walkthrough

Type: task (HITL)
Status: prepared — the walk itself is Pratik's
Blocked by: 05, 07, 09, 11, 12, 15, 16, 17, 22

## Question

Pratik (and ideally one real staff member) walks every v1 flow on the live site: log in, post an announcement with a PDF, replace a faculty photo, add a gallery photo, run the cleanup screen, watch a Publish go live. Punchlist of rough edges becomes the final fixes; also settles the fogged "how staff learn the tool" question (in-app hints vs one-pager). Resolves when the punchlist is empty and staff can work unassisted.

## Answer

Everything that can be checked without a human has been checked, twice — so the
walk is about *judgement* (is this wording right, would a clerk find this
button) and about the three things a machine here cannot do: press a browser's
upload button, watch a production deploy, and decide the tool is usable.

### Already verified, so the walk need not re-test it

A 34-check sweep runs against a live server and passes 34/34
(`sweep.sh` in the session scratchpad — not a deliverable, but reproducible):

- **Every screen renders** signed in — the eleven of them, including
  `/admin/departments/pg/structural-engg`, the one key with a slash in it.
- **Every screen redirects to the login page** signed out; the login page
  itself does not.
- **Every API route refuses** without a session — all eight, including both
  upload transports and both cleanup phases.
- **A department key the file does not hold is a 404**, `nope`, `__proto__` and
  `constructor` alike.

Beyond the sweep: 425 tests, `tsc` and `eslint` clean, `pnpm build` green,
`validate-content` and `format-content` clean. Every editor is pinned by a
byte-exact round trip — open a file, publish it unchanged, get a zero-line diff
— which is what makes "an Editor opened the wrong tab" a non-event. The R2
write path (image convert + PUT, presigned PDF PUT, object delete) has been run
end to end against the real bucket and every test object deleted afterwards.

### Fixed while preparing this

Curling `/admin/news` against a real session returned 200 with none of the
editor on it: the page was showing its failure panel, because `news.json` is
not on `main` yet — the chicken-and-egg [05](05-news-migration-editor.md)
documented. The panel said *"The Admin could not reach the repository. Please
try again in a moment"*, which tells an Editor to retry something that can
never succeed.

Reads now tell the three cases apart, because the advice differs: **missing**
(not in the repository — retrying will not help), **unconfigured** (this
deployment was never given a token — the fix is on the administrator's side),
and **unreachable** (a bad minute at GitHub — try again). Unknown errors read
as `unreachable`, the honest default. The news page's private copy of that
panel — same wording, drifting separately — is deleted in favour of the shared
one, and all seven screens pass `loadFailure(error)`. Verified by curl: the
page now says the content is not in the repository, and the other ten screens
still render.

While in that copy: eight Editor-facing messages named "Pratik" directly, which
contradicts the dashboard's own escape hatch ("tell the site administrator",
with `ADMIN_CONTACT` naming who that is). They all say "the site
administrator" now; the comments still say Pratik, because those are for
whoever reads the code.

### Practice mode — walk it without touching becbgk.edu

`GITHUB_CONTENT_BRANCH` (`lib/admin/github.ts`, documented in
`.env.example`). Unset, everything reads and writes `main` exactly as before.
Set it on a Preview deployment and every read, every publish and every
deploy-poll moves to that branch — Vercel builds it as a Preview, so
"Saved → Live" still means something real — and an amber **Practice mode**
banner sits on every screen. **Never set it on Production.** Not a per-request
choice on purpose: an Editor must never be one dropdown away from publishing to
the wrong branch, and a screen that read one branch while saving to another
would silently discard their work.

A separate *data* repository was considered for this and rejected: one upload
commits `content/*.json`, `src/data/asset-manifest.ts` and
`content/_schema/asset-keys.json` atomically, and the site imports the JSON at
build time.

### Why every editor showed an error at the bottom on open

Not a schema bug and not an editor bug — the Admin reads GitHub, and `main`
still holds the **pre-migration** content shape while the schema in this tree
describes the post-migration one. Sixteen of the twenty-five departments on
`main` fail the current contract on open; the five `pg/*` entries are the only
ones that pass. `news.json` does not exist there at all, which is why
`/admin/news` shows the "not set up yet" panel.

It fixes itself the moment the working tree lands (step 1 below), or
immediately by pointing `GITHUB_CONTENT_BRANCH` at a branch that already has
it. Nothing in the schema or the editors needed changing for this symptom.

What *did* need changing is what those messages said. Six of the sixteen read
`Faculty & staff: Faculty group photo Invalid input: expected object, received
string` — Zod's own words, which `field-path.ts` exists to keep off the screen —
and the other ten named no field and marked no tab. Fixed, with the wrong-type,
wrong-shape, unknown-key and fixed-choice cases each getting a sentence that
says what to do (and, for an unknown key, *which* keys, since the instruction is
to tell the administrator). Alongside them, four faults the audit turned up that
were nothing to do with the branch:

- Every nested `name` was reported as **"Department name"** — the department's
  label table was being applied at every depth, and `name` is a field on eight
  different kinds of row. Labels now apply to the top-level field only, and the
  four machine-named leaves (`key`, `file`, `images`, `id`) say what the form
  says above the box: Photograph, PDF, Photos, Address.
- A department holding an unrecognised key marked **no tab**, because the issue
  has no path — the tab now comes from the key itself where one matches.
- Typing the **Milestones heading** before the first milestone blocked Publish
  on a field called "Items". `items` is optional now; a milestones block with
  none in it already renders nothing.
- A blank row added to a bullet list published as an **empty bullet** — the two
  list widgets seed `""` and the schema accepted it. `min(1)` on both, so the
  Publish bar names it like every other unfilled row.

Plus one content fix behind it: `photo()` now takes an optional `alt`, and
Biotechnology's Home group photo uses it. Its photograph is an industry
interaction, sitting in the block meant for a graduating batch, so a screen
reader was announcing a graduating batch that is not in the picture. Every
`PhotoField` offers the box now, worded for someone who has never heard the
words "alt text".

### The two fogged questions, settled

Both were on the map as "not yet specified"; both are now built rather than
described.

**What an Editor sees when a build fails for reasons unrelated to their edit.**
Three things, in this order: their work is safe, the site is not half-updated,
and pressing Publish again is not the fix — because the document already passed
the same Zod contract on the way in, so a retry publishes an identical commit
and fails identically (`use-publish.ts`).

**How staff learn the tool.** The dashboard *is* the one-pager. Four sentences
covering the four things no hint beside a field can say: publishing goes to the
live site under your name, there is no undo, uploaded files are kept for good,
and if nothing appears you tell someone rather than publishing again. A guide
handed out once is read once and goes stale the first time a screen changes; the
dashboard is on screen every time somebody signs in. `ADMIN_CONTACT` puts a
mailto under it, and a deployment that has not been told who to ask simply does
not print the line.

### Before the walk — three things only Pratik can do

1. **Land the working tree.** Now on `feat/content-admin`, re-based onto
   `origin/dev` — 178 changed paths. [22](22-reconcile-with-main.md) re-applied
   every commit `HEAD` was behind onto the migrated shapes and proved it
   leaf-by-leaf (`nothing lost` across all six content files). So the rule for
   landing is simply: **the tree on `main` must end up equal to this working
   tree**, and any conflict resolves in favour of this tree. How you get there is
   yours. Until this happens, every editor opens on old-shaped content and says
   so — see above.

2. **Add the four R2 write variables to Vercel** (Production *and* Preview):
   `R2_S3_ENDPOINT`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET`.
   `NEXT_PUBLIC_R2_BASE_URL`, `ADMIN_PASSWORD` and `GITHUB_CONTENT_TOKEN` are
   already there. Without these four, every screen still loads and every text
   edit still publishes — only uploads fail, with "The Admin cannot reach the
   photo storage on this deployment."

3. **Optionally set `ADMIN_CONTACT`** to whoever staff should actually email.

R2 bucket CORS is **not** on this list: the live policy was re-checked against
[01](01-secrets-and-access.md)'s spec and already matches, so the browser PUT
path is unblocked. Whether a browser actually completes it is step 3 below —
`curl` can prove the signature, not the preflight.

### The walk

Do them in this order; each one leans on the last.

**1 — Sign in.** `becbgk.edu/admin`. Type a name and the shared password. Try a
wrong password first: it should refuse without saying which of the two was
wrong. The name you type is what appears as the commit author on every publish
this session, so type the name you want in the history.

**2 — Read the dashboard.** This is the training material. If a sentence here
would not survive being read aloud to the office clerk who will use this, that
is punchlist item one.

**3 — Post an announcement with a PDF.** `/admin/news` → Announcements → Add.
Give it a date (the picker or the free-text box — "A.Y. 2026-27" is a legal
date here), a title, and under "when someone clicks it" choose **A PDF** and
upload one. *This is the single most important step of the walk*: the presigned
direct-to-R2 upload has been proved by `curl` but never by a browser, and a
browser is the only thing that can prove it. If it fails, it fails at the
preflight and the message will say so.

**4 — Publish it, and watch.** The bar goes **Saved** → **Live**. "Saved" means
the commit landed on `main`; "Live" means the production deploy carrying it
finished, roughly two minutes later. Then open `becbgk.edu/announcements` in a
normal tab and confirm the item is there. **This is the first commit the Admin
has ever made** — the write path has been built, tested against every refusal,
and deliberately never executed, because executing it means writing to `main`.

**5 — Replace a faculty photo.** `/admin/faculty` → a department → someone's
card → change the photo. Watch where the upload files it: the folder is read
off the keys that department already uses, not built from its slug, so a PG
department's photo should land beside its existing ones. The old photo stays on
R2 on purpose — that is what the dashboard's third sentence is about.

**6 — Add a gallery photo.** `/admin/gallery` → a gallery → upload → Publish.
The gallery *is* the manifest, so this publish is one commit to one generated
file. Nine folders are shown read-only (a hero, a portrait, Campus in Pictures'
curated set) — check that the reason reads as a reason and not as a bug.

**7 — Edit a department.** `/admin/departments` → one department → the fourteen
tabs. Change something on one tab, publish, and confirm the diff on GitHub
touches **one department** and nothing else. Try leaving a required field blank:
the Publish button should disable itself and name the problem *and its tab*.

**8 — Run the cleanup screen.** `/admin/cleanup` shows 8.36 GB of 10 GB
(81.6%), 2,957 files, 81 unused, 153.5 MB reclaimable, 0 broken references. All
81 candidates are still registered in the manifest, so today it offers step one
(the unregister commit) and **refuses step two by name**. That is the correct
first state; if step two is offered, stop and say so. Running step one is
optional on this walk — it is the last unexecuted code path in the Admin, and
it is revertible.

### Proved not to have broken the site

The Admin adds 178 changed paths to a tree that renders 397 pages, so "no
regressions" is a claim that had to be measured rather than asserted. Both
halves were checked by building `origin/dev` and this tree side by side outside
the repo and diffing the emitted HTML with the build id, chunk hashes and
whitespace normalised away.

**Content: nothing lost.** Zero missing leaves across all six content files
(the fifteen that move in `news.json` are ISO date re-encodings and the `"#"`
sentinel); the seven department and four faculty deletions are the intended
ones, with `pg/structural-engg` kept; all 1,115 asset references resolve in the
manifest; `asset-manifest.ts` is byte-identical to `origin/dev`; every file
round-trips byte-exact; `validate-content` clean.

**Markup: two intended text diffs and nothing else.** 360 pages differ by one
added JS chunk and nothing more. The two text diffs are the fixes this work
made on purpose — Civil's recovered research-achievement bullets and CSE's
repaired table. `index.html` also drops eight `href="#"` dead links.

**Two real regressions found this way, both fixed.** The 404 page had lost its
header and footer entirely (it renders outside the `(site)` group, which is
where the chrome lived) — now both share a `SiteChrome`. And moving
`opengraph-image.tsx` to the app root silently removed `og:image` and
`twitter:image` from *every* page: a segment's own `openGraph` replaces the
parent's resolved one, so a file-convention image declared above `(site)`
never reaches a public page. Both files exist in both places now, the root copy
keeping the unsuffixed URL that already-shared links point at.

Fourteen image `alt` texts still differ from `origin/dev`, deliberately: the
old code fell back to the photo's caption, which a screen reader then read
twice. The one case where the generic wording was actually *wrong* is fixed in
content (Biotechnology, above).

### Rough edges taken off before the walk

- **Leaving a screen with unpublished work** now asks first — `beforeunload`
  for the tab, and a confirm on every sidebar and cross-link click, since
  nothing here autosaves and there is no draft to come back to.
- **"See it on the site"** on every editor's Publish bar once the change is
  live, pointing at the page that edit changed.
- **An expired session** during Publish offers a sign-in link that opens in a
  new tab, because signing in on this one would take the unpublished work with
  it.
- The publish path now clears the reference cache, so the cleanup screen cannot
  call a photo unused for the minute after somebody moved it.

### Punchlist

Empty; fill it during the walk. Anything here becomes the final fixes.

### Known, and deliberately not fixed in v1

- **`home.json` still says "10 UG, 3 PG"** against the verified 11 UG / 8 PG.
  Left alone on purpose: it is now a one-field edit on `/admin/home`, which
  makes it a fine first real edit for whoever is being trained.
- **`scripts/upload-assets.mjs --prune`** is a far bigger bulk-deletion footgun
  than the cleanup screen — no cap, no confirm, no two phases. Out of the
  Admin's scope, but it is in the repo and it deletes from the same bucket.
- **The Alumni Mentorship copy** (~500 lines) is still hardcoded in
  `eee-mentorship.tsx`; content controls whether it renders, not what it says.
- **The two graduation-day scans are JPEG** (483 KB + 219 KB) in an otherwise
  WebP bucket, uploaded outside the pipeline. The Admin's own upload path would
  have made them WebP; at 81.6% of the free tier that difference compounds.
- **The login throttle is in memory**, so on Vercel it is per-instance: five
  wrong passwords lock out one lambda, not the deployment. Fine against a
  human at a keyboard, not against a script. A shared store (or Vercel's own
  rate limiting) is the v2 fix.
- **`infrastructureGallerySlug`** has a widget and a renderer and is set by no
  department, on `main` or here. Either it is the escape hatch nobody has
  needed yet, or it is dead — a content decision, so it stays until Pratik says.
- **The server's copy of a validation message** names the whole document path
  (`Departments › Civil-engg › Supporting staff › item 15 › Name`) where the
  editor's names just the field. The field wording is identical now, which is
  what matters; the prefix is honest, since the server is refusing a file and
  not a screen. Nobody normally sees it — the editor's own check runs first.
- **23 pre-existing eslint errors** on site pages this work never touched.
- **`../r2_keys.json`** is still an unencrypted credentials blob on disk —
  rotation declined, accepted risk ([01](01-secrets-and-access.md)).
