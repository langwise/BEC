# Publish pipeline

Type: task (AFK)
Status: resolved
Blocked by: 01

## Question

The write path every editor uses (ADR 0001): server routes that (a) read a content file from repo HEAD via the GitHub API (never the deployed bundle), (b) validate a submitted document with the same Zod schema the build enforces, (c) commit it to `main` with the editor's name stamp in the message, and (d) surface deploy status ("live in ~2 minutes" → confirmed live / build failed) — cheapest mechanism, likely GitHub commit statuses/checks that Vercel posts, read with the same PAT. Last-write-wins by design: fetch current SHA at save time, no staleness check.

## Answer

**BUILT** (uncommitted). Reads come from repo HEAD, writes go out as one atomic commit, and the deploy signal comes from Vercel's *Production* GitHub deployment.

### The write path

`src/lib/admin/github.ts` — the only module that talks to GitHub.

- **Git Data API, not Contents API.** Blobs → tree → commit → ref update. The Contents API can only write one file per call, and [upload pipeline](08-upload-pipeline.md) has to land an R2 manifest entry, an asset-keys entry and the content file that references the new asset in a *single* commit, or a half-applied deploy ships a broken image. Building the multi-file path now means uploads are a caller change, not a rewrite.
- **Last-write-wins, implemented as a retry.** `commitFiles` reads the head sha, builds the commit on it, and PATCHes the ref. If someone commits in between, GitHub rejects the non-fast-forward with 422 and we rebuild on the new head (3 attempts). Our version of the files we touched wins; files we did not touch keep their newer content. No conflict UX — ADR 0001's accepted trade-off.
- **Every fetch is `cache: "no-store"`.** An editor who publishes and immediately reopens the form must see their own edit, not a cached view of the repo.

`src/lib/admin/publish.ts` — read, validate, commit.

- Validates with the *same* `contentFiles` registry the build gate uses, so an editor cannot save a document that would fail `next build`. A publish can make the content wrong; it cannot make the site fail to build.
- Commits **what was submitted, not Zod's parse output** — the parse rebuilds objects in schema key order, which would rewrite the whole file on every save.
- **No-op publishes do not commit.** Publishing a document byte-identical to HEAD returns `{ unchanged: true, commit: null }`. Opening a page to look at it and pressing Publish is common; committing that would put an empty commit in the audit trail and spend a two-minute deploy saying nothing.

`src/lib/admin/content-file.ts` — pure and directly testable: the allowlist path resolver (an unknown `file` is simply not a thing an editor can publish — no traversal to sanitise), the commit-message shape, and the editor-name flattening that stops a name injecting extra lines or a fake trailer into the message.

### Routes

| Route | Does |
| --- | --- |
| `GET /api/admin/content/[file]` | file as it stands at repo HEAD, plus its blob sha |
| `PUT /api/admin/content/[file]` | validate → commit → `{ commit, unchanged }` |
| `GET /api/admin/deploy/[sha]` | `pending` \| `success` \| `failure`, with the live URL |

All three 401 without a session. `apiError` maps GitHub failures to messages an editor can act on rather than leaking API text.

### Deploy status: deployments, not commit statuses

The ticket guessed commit statuses. Probing the real repo showed why that would have been wrong: **a commit on `main` gets two Vercel deployments — a Preview and a Production one** — and the combined commit status would cheerfully hand the editor a preview URL nobody else can see. `getDeployStatus` instead finds the commit's `Production` deployment and reads its latest deployment status. Verified live:

```
a7bdb2a9 (main head) → {"state":"success","deployUrl":"https://becbgk-…vercel.app","description":"Deployment has completed"}
924d6b22 (dev head)  → {"state":"pending","description":"Waiting for the deployment to start."}
```

No Vercel API token, no extra service, and the 5000/hr core rate limit is untouched (0 used).

### Branch, confirmed rather than assumed

The repo's GitHub **default branch is `dev`**, not `main` — so "publish to the default branch" would have been a silent bug. The deployments API settles it: every `Production` deployment in the last 30 is a `main` commit; `dev` heads get `Preview`/`staging`. `BRANCH = "main"` is correct, and now for a checked reason.

### The formatting problem this ticket uncovered

A read-only probe re-serialised each content file from HEAD and compared it byte-for-byte with what the publish path would write. **Four of five did not match**, for three different reasons: a stray whitespace-only line in `home.json`, prettier-style inline objects in `governance.json`, and **CRLF line endings** in `faculty.json` and `departments.json`. Left alone, the first publish of each file would have been a whole-file reformat with the editor's actual change buried inside it — which defeats ADR 0001's premise that the git history *is* the audit trail and the undo mechanism.

Fixed as a one-time normalisation plus a permanent gate:

- `src/content/format.ts` — the single definition of the canonical format (2-space indent, LF, trailing newline). Both writers go through it: the publish path and the script.
- `scripts/format-content.mjs` — rewrites all five files canonically; `--check` mode reports drift instead.
- `scripts/validate-content.mjs` — now also fails on an unformatted file, so drift cannot come back through the build gate.
- `.gitattributes` — `*.json text eol=lf`, so a Windows editor cannot reintroduce CRLF behind the gate's back.
- 13 new tests, including one asserting every checked-in content file passes the gate.

The normalisation touches ~41K lines of `departments.json` and ~2.4K of `faculty.json`. **Data verified identical to HEAD** by deep-equality against `git show HEAD:…` for all four files — the diff is whitespace and line endings only.

**Ordering constraint for Pratik:** minimal publish diffs only start once the normalisation commit is on `main`. If an editor publishes before it lands, that first save carries the reformat.

### Verification

- `pnpm --filter web validate-content` — 5 files valid and canonically formatted.
- `pnpm test` — 41 pass (13 new in `src/content/format.test.ts`).
- `npx tsc --noEmit -p apps/web` — clean.
- `pnpm --filter web build` — clean; `/admin`, `/admin/login`, `/api/admin/content/[file]`, `/api/admin/deploy/[sha]` all present; sitemap holds 354 URLs with no `/admin` or `/api` entry.
- Live read-only probe against `langwise/BEC`: token reads content, `permissions.push: true`, deploy status resolves correctly for both a deployed and an undeployed commit.

### Not verified, and why

The **commit path has never been executed** — running it would push to `main`, which the standing constraint forbids without explicit sign-off. Token write capability is confirmed (`permissions.push: true`); the blob→tree→commit→ref sequence itself is verified only by construction and types. First real publish happens in [news migration and first editor](05-news-migration-editor.md), where it can be done deliberately with a trivial edit and reverted with one `git revert`.

Branch protection on `main` could not be read — the fine-grained token gets 403 on that endpoint. If protection exists, the ref PATCH will fail at publish time with a clear GitHub message; worth a glance during the [v1 walkthrough](18-v1-walkthrough.md).
