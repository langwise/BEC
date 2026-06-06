# Build Progress Tracker

Living status of the content-population + revamp sprint, page by page. Updated 2026-06-07.
Legend: ✅ done · 🟡 partial / needs data · ⛔ not started.

---

## Administration tab — 🟡 mostly done

The whole **Administration** menu (`data/navigation.ts`) and its routes have been revamped onto the shared UI system. Detail below.

### Done ✅
- **Governance Overview** (`/administration/governance`) — fully rebuilt on the JSON content model (`content/governance.json` + `governance.schema.json` + `src/content/governance.ts`). Sections: Leadership (Principal) · Deans · Key Officers · B.V.V. Sangha · Board of Governors · Org chart · HOD directory · Documents.
- **Principal** (`/administration/principal`) — real R2 portrait (Dr. B. R. Hiremath) + revamped via `LeadershipMessage`.
- **Director** (`/administration/director`) — real R2 portrait (Dr. R. N. Herkal, `governance/director/cine9670.webp`) + `LeadershipMessage`.
- **Chairperson** (`/administration/chairperson`) — layout revamped via `LeadershipMessage` (image/name still pending — see below).
- **Board of Governors** (`#bog`) — real 14-member data, `FilterChips` category filter, photos for the 2 members that have them (Dr. V. B. Pagi, Dr. B. R. Hiremath).
- **Deans / Key Officers** (`#deans`) — Academic & Placement deans confirmed; Controller of Examinations, Librarian, Admission Section officers added with photos.
- **HOD directory** (`#hods`) — 15 of 17 departments have head + R2 portrait.
- **Shared UI system** built + documented in `.cursor/rules/DESIGN.mdc`: `PersonCard`/`PersonGrid`, `SectionHeading`, `FilterChips`, `LeadershipMessage` (in `src/components/common/`). All admin people-listings use them.
- Removed external `becbgk.edu` images from Principal & Director (now on R2).

### Missing / needs data 🟡
- **Chairperson photo + name** — page still uses an external `becbgk.edu` image and the name *Dr. Veeranna Charantimath* (unconfirmed). Marked with a `TODO` in the file. Need the current chairman's identity + an R2 photo.
- **The Senate** (`/administration/governing/senate`) — still 100% placeholder (7 placeholder roles, no names/photos). Needs the official Senate notification/PDF.
- **Dean R&D / Dean QA** — name↔role mapping is a best-guess (Bharati Meti → R&D, Mahabaleshwar S.K. → QA); both flagged "To confirm" in-page.
- **B.V.V. Sangha members** — exact names/designations unconfirmed (roles read "B.V.V. Sangha Office Bearer"; "Shri Omkar" is a partial name). Flagged "To confirm".
- **HODs without a portrait** — Physics & Automobile Engineering (no photo in the delivered set) render as placeholders.
- **BoG photos** — 12 of 14 members have no photo (industry/nominee/IIT invitees/govt/student reps are not in the asset set).

### To improve later 🔧
- **Rotated portraits** — several HOD/Dean photos are stored sideways (EXIF orientation not applied in conversion). You said you'll flag which to rotate manually.
- **Org chart** is text-only cards — could be a nicer visual diagram.
- **Governance "Documents & links"** still points to `becbgk.edu` pages/PDFs — backlink the PDFs to R2 per the asset pipeline.
- **Inline text vs JSON** — Principal/Chairman/Director/Senate keep their copy inline (not JSON). JSON-ify if department/coordinator editing is wanted.
- **Admin `[[...slug]]` catch-all** still imports the legacy `data/governance/*` files — consolidate onto `content/governance` to remove the duplicate data source.
- **RTI** (`/administration/disclosures/rti`) — verify disclosure PDF links resolve; host/backlink to R2 if needed.

---

## Home — 🟡 partial
Hero, About, Campus-life already on the JSON model (`content/home.json`) with R2 images. Remaining home sections (placements stats, ranking, news/events) not yet wired.

## Programs / Departments — ⛔ not started
144-image department set ready in R2; pages still use placeholder/dummy data.

## Placements · Alumni · Community gallery — ⛔ not started
Per `docs/plan.md`.
