# Reconcile the working tree with main

Type: task (AFK)
Status: resolved
Blocked by: 21
Blocks: 18

## Question

Found while preparing [the v1 walkthrough](18-v1-walkthrough.md): the Admin was
built on `fix/legacy-url-redirects`, and

```
git rev-list --left-right --count origin/main...HEAD
8   0
```

— that branch is *contained* in `main`, which has moved eight commits past it.
Those commits are content: corrections BEC sent on 30 July and 4 August that are
live on becbgk.edu right now. Landing this working tree as it stands would
revert every one of them.

## Answer

All of it re-applied, onto the migrated shapes, as working-tree changes. Seven
things came across:

| From main | Where it went here |
|---|---|
| 3 new faculty — CSE Challagidad, EEE Suchitra & R. G. Patil | `faculty.json`, in position |
| EEE `intake: "60"`, `nbaAccredited: true` | `departments.json`, beside `established` |
| EEE hero → `hero-building-new.webp` | first entry of the merged `hero` array |
| EEE 3 new docs (Alumni Webinar Series, Course Project, Outreach Activities) | `bestPractices` |
| ISE graduating-batch photo + `galleryExclude` entry | `homeGroupPhoto` as a Photo pair |
| ISE staff name: G. B. Gadded → **D. S. Gadad** | `supportingStaff` |
| Anti-ragging Squad Coordinator → Dr. P. N. Kulkarni | `(site)/student-life/anti-ragging/contact` |

Nine asset keys were registered through **the Admin's own writer**
(`manifestCommitFiles`), not by hand, so `asset-manifest.ts` and
`asset-keys.json` came out exactly as a Publish would have written them. Two
more that main *references but never registered* — `g-suchitra.webp`,
`r-g-patil.webp` — turned out to be registered here already. All eleven objects
were confirmed present on R2 before anything referenced them.

### The one that needed code

Main's new announcement is a **pinned item made of two scanned pages** — a
graduation-day brochure and a programme card — carried by an `images?:
{src, alt}[]` field added to the old data module after this branch was cut.
[The news migration](05-news-migration-editor.md) had never seen that field, so
the schema it wrote could not hold the announcement and the editor had no way to
make another one. Landing without fixing that would have deleted a live
announcement *and* left the Admin unable to recreate it.

So `images` is now part of the contract:

- **Schema** — `{ key, alt }`, `alt` required. A picture nobody can describe is
  a picture a screen reader cannot announce, and the one time to ask for the
  description is while the person who chose it is looking at it.
- **Separate from `link`, and labelled to say so.** `link` is what a *click on
  the title* does; `images` are pages the item is partly made of. Confusing them
  gets you a PDF nobody sees or a poster nobody can open, so the field is called
  "Pictures" and its hint names the difference.
- **`toItems` drops a slot that was added and never filled** — that is not a
  picture yet. It keeps one that *was* chosen but has no description, and
  `firstIncompleteItem` blocks the publish with "Announcements item 1: picture 2
  still needs a description." Deleting it quietly would take away work the
  Editor can see on screen — the same rule [17](17-departments-editor-build.md)
  arrived at for half-filled rows.
- **No row handles, deliberately.** The field that would carry one is called
  `key`, and it is the asset key — the exact collision the departments editor
  needed a WeakMap for. An add-and-remove list of two or three does not need
  one, so position is the identity and it says so in a comment.

### Verified

- **Nothing lost.** Field names moved in [21](21-departments-normalization.md),
  so shapes cannot be compared; leaves can. Every string in all six of main's
  content files was checked for presence somewhere in the local ones:
  `nothing lost` for all six. The only whole entries missing are the seven
  `pg/*` departments and four `pg/*` faculty rosters
  [20](20-orphaned-pg-departments.md) deleted on purpose.
- **Nothing gained by accident.** `news.json` still round-trips byte-exact
  through the editor's mappers, and the eighteen-department round trip still
  passes.
- 401 tests (6 new), `tsc` and `eslint` clean, `validate-content` and
  `format-content` clean, `pnpm build` green.
- Read off the built HTML rather than trusted: the announcement and both scans
  are on `/announcements` and the home page with their alt text; EEE renders
  "B.E. Intake", "Accredited NBA", the new hero and all three new documents;
  ISE renders the graduating-batch banner and D. S. Gadad; all three new faculty
  render on their department pages.

### Left for Pratik

- This does not merge anything. `HEAD` is still eight commits behind
  `origin/main`; the working tree now merely *contains* what those commits say.
  Landing is still yours, and `main` is still where it goes.
- The two graduation-day scans are **JPEG, 483 KB and 219 KB**, in a bucket the
  rest of which is WebP. They were uploaded outside the pipeline. Converting
  them would change their keys, so they are left as they are — but the Admin's
  own upload path would have made them WebP, and at 8.36 GB of 10 GB that
  difference eventually matters.
