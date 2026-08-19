# Content edits are git commits, not a database

The Admin has no database and no CMS backend: a Publish is a commit to `main` on `langwise/BEC` via the GitHub API, which triggers the Vercel build that makes the change live (~2 min). We chose this because the content already lives as JSON files read at build time, so a commit is the only write path that keeps one source of truth — and it gives audit trail, revert, and hosting for free within the existing Vercel setup ($0 constraint).

## Considered Options

- Hosted git-based CMS (Pages CMS / Sveltia): rejected — duplicate field config alongside the Zod contract, and media handling that conflicts with the R2 pipeline.
- Headless CMS or database (Sanity, Payload, Postgres): rejected — would demote `content/*.json` from source of truth and add cost/infrastructure.

## Consequences

- Saves race last-write-wins; there is deliberately no conflict detection or draft state (accepted for a small editor pool).
- Edits are only visible on the live site after a successful build; the Admin reads current content from the GitHub API (repo HEAD), never from its own deployed bundle, to avoid staleness between commit and deploy.
