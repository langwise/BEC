# Conventions — how to add content & code

## Data files

- Content lives in `apps/web/src/data/**.ts` as **typed, exported consts**. Always type against the interfaces in `src/types/` (`navigation.ts`, `faculty.ts`) or the local types a data file defines.
- `pnpm build` type-checks these. A wrong shape = build failure, not a runtime surprise — lean on it.
- When you fill placeholder data, **remove the `placeholder: true` flag** so the UI stops rendering the "coming soon" state.
- Prefer editing an existing file over adding a new one. New content kinds get a new file under the right folder (see [content-model.md](content-model.md)).

## Assets — the one hard rule

Never write a raw URL (`becbgk.edu/...`, `/Documents/...`, a Drive link) into a data file or component.

```ts
import { asset } from "@/lib/assets";
photo: asset("departments/cse/faculty/veerappa-b-pagi.webp")
```

`asset(key)` resolves the key against the generated manifest → R2 URL (with a `/public/` fallback during transition). To add a new asset, run the pipeline ([asset-pipeline.md](asset-pipeline.md)); don't reference files that aren't in the manifest.

When using `next/image` with an R2 URL, the R2 host must be in `next.config.ts` `images.remotePatterns`.

## Departments

Edit `data/department/department.ts`. Build pages from the existing `sections[]` union (`content` | `faculty-list` | `stats` | `gallery`) — the renderer already handles each type. Don't add bespoke layout per department; extend the section types if a genuinely new layout is needed.

## People / faculty

Two distinct kinds of "person":
- **Governance people** (leadership, deans, HoDs, BoG, Sangha) live in `data/governance/*` and render with the shared `PersonCard`/`PersonGrid`.
- **Department faculty** live in `content/faculty.json` keyed by department slug — minimal records `{ name, designation, photo?, cv? }` where `photo`/`cv` are R2 asset keys. `src/content/faculty.ts` resolves them to `FacultyMember`; `FacultyCard` shows a photo card that opens the profile/CV PDF in a modal. We no longer transcribe per-faculty detail — see [faculty-extraction.md](faculty-extraction.md).

## Pages & routes

- App Router under `apps/web/src/app/`. A folder + `page.tsx` = a route.
- `[[...slug]]` catch-alls render a "content coming soon" placeholder so nothing 404s. Replace with a real `page.tsx` only where content is ready; leave the catch-all for the rest.
- Section landing pages (research, student-life) derive their sidebar from `navigation.ts` — keep that data accurate.

## Components & styling

- **Reuse first.** `components/ui/` = shadcn primitives (card, carousel, dialog, sheet, tabs…). `components/{home,governance,placements,library,programs}/` = composed sections. Check before building new.
- Tailwind v4 with theme tokens in `app/globals.css` (OKLCH vars). Use semantic classes (`text-primary`, `bg-secondary`, `text-accent`) over hardcoded hex. Primary = burnt orange `#bf5700`.
- Merge classes with `cn()` from `lib/utils.ts`.
- Icons from `lucide-react`. Animations via `motion`.

## Workflow

- Run `pnpm dev` and eyeball the changed route before committing.
- Keep `pnpm build` and `pnpm lint` green.
- Code formatter (Prettier/Biome) is **deferred** — match surrounding style by hand for now.
- Branch off `main`; don't commit/push unless asked.
