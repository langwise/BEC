# BEC Website — Docs

Knowledge base for the Basaveshwar Engineering College (BEC) website. The root [`AGENTS.md`](../AGENTS.md) is the quick "change X → edit Y" router; these docs are the detail behind it.

| Doc | Purpose |
|-----|---------|
| [context.md](context.md) | Why this project exists — background, stakeholders, deadline, the 4 workstreams, known gotchas |
| [content-model.md](content-model.md) | Map of where every kind of content lives (nav, people, departments, home, placements, alumni, gallery) |
| [conventions.md](conventions.md) | How to add content & code: data-file patterns, naming, asset usage, component reuse, pages/routes |
| [asset-pipeline.md](asset-pipeline.md) | How images/PDFs flow: scrape → R2 → manifest → `asset()` helper. Read before touching any asset |
| [plan.md](plan.md) | The dated action plan to ship by 2026-06-15 |
| [progress.md](progress.md) | Living page-by-page build status — what's done, missing, and to improve |

## TL;DR for a new contributor

1. Read [context.md](context.md) (5 min) — understand it's a static, typed-TS-data Next.js site.
2. Find your task in [`AGENTS.md`](../AGENTS.md)'s routing table.
3. Follow the linked doc, edit the named `src/data/*.ts` file, run `pnpm dev` to verify.
4. Never hardcode an asset URL — see [asset-pipeline.md](asset-pipeline.md).
