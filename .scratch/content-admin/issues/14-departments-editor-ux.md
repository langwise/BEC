# Departments editor UX

Type: prototype (HITL)
Status: resolved
Blocked by: 03, 13

## Question

How does a non-technical Editor navigate 25 departments × ~36 fields without drowning? Build a cheap clickable prototype of the information architecture recommended by [Departments content shape study](13-departments-shape-study.md) (likely: pick department → section tabs mirroring the public page's sections → focused forms), react to it with Pratik, settle the layout before the real build. Also decides whether [the build](17-departments-editor-build.md) splits into multiple tickets.

## Answer

No throwaway prototype was built. A clickable mock of this IA is most of the
work of the real screen — the hard part is not the tab strip, it is that
seventy-five fields need seventy-five widgets — and a mock made of dead boxes
would have answered none of the questions that turned out to matter. The IA
below was settled by building it, and it is [17](17-departments-editor-build.md)
that is up for review. What follows is what the shape of the screen is and why,
so there is something to react *to* at [18](18-v1-walkthrough.md).

### Picker → department → fourteen tabs

`/admin/departments` lists the eighteen departments the file holds, in the
catalogue's own order, each with what it is still missing ("Nothing written yet
for Vision, Mission and Contact"). `/admin/departments/<key>` opens one.

The key is the address — a catch-all route, because five keys have a slash in
them (`pg/structural-engg`) and inventing a second spelling would mean a
mapping table nobody would remember to update.

The fourteen tabs are **the department page's own sections**, not the schema's
grouping:

    Basics · Home · About · Academics · Curriculum · Faculty & staff
    Research · Facilities · Activities · Students & alumni
    Placements · Contact · Extra pages · Layout

An Editor who came to fix the vision statement looks under About, because that
is where it is on the site. Every one of the seventy-five schema fields is
assigned to exactly one tab, and a test walks `departmentSchema._zod.def.shape`
and fails if a field is on no tab, has no Editor-facing name, or is named in no
tab's source — so a field added to the schema cannot quietly become uneditable.

Two tabs deviate from the public page, on purpose:

- **Basics** is not a section of the site. It is the banner, the slug, the row
  of facts — the things that appear on *every* tab of the department, which
  therefore belong to none of them.
- **Layout** is the study's "expert panel": eighteen booleans that move a block
  from one tab to another, plus the four `Record<string,…>` overrides. Nothing
  on it changes a word the department says. Each flag is written out in a
  sentence ("Research achievements inside the Research tab — the Ph.D.,
  scholars and grants tables move into Research; no separate Research
  Achievements tab is made") because "achievementsUnderResearch" is not a
  thing an Editor can be asked to reason about.

### What was rejected

- **A screen per section.** Fourteen routes, fourteen publishes, and a
  department that is half-saved. One document, one Publish button.
- **Everything on one long page.** Seventy-five fields, several thousand rows
  of content; the browser and the Editor both lose.
- **Radix tabs.** Fourteen labels do not fit a tab bar on a laptop, let alone a
  phone. It is a wrapping strip of pills, and only the open tab is rendered.
- **Checkboxes over resolved images for `galleryExclude`**, as the study
  suggested. The field is a list of *substrings*, not keys — one entry hides a
  whole run of photos — so it is a picker that appends an exact key plus the
  raw list, with the substring rule stated.

### Where the problems are reported

The Publish button is disabled while the department does not validate, and the
reason is the *first* problem, phrased for an Editor and located:

> Curriculum: Curriculum › item 2 › PDF still needs to be filled in.

The tab that holds it carries a marker in the strip. The check is the same Zod
contract the server enforces and the build gate runs, so the button cannot
disagree with what happens when it is pressed. Only the first problem is
reported: a half-filled row usually causes several, and "fix this one thing" is
the instruction that gets followed.

### Not split into per-section tickets

The map's fog expected [17](17-departments-editor-build.md) to split. It did
not need to, because the fields collapse into about a dozen recurring *shapes*
rather than seventy-five bespoke forms — see that ticket. Splitting by section
would have produced fourteen tickets that each rebuilt the same six widgets.

## Left for Pratik

The whole of it, at [18](18-v1-walkthrough.md) — this is the screen with the
most surface area and the least review. The specific things to disagree with:
the fourteen tab names, the Layout tab's wording, and whether Basics should
exist at all or be folded into Home.
