# Orphaned PG departments

Type: grilling (HITL)
Status: resolved

## Question

7 of the 8 `pg/*` departments (~102 KB of authored content in `content/departments.json` — environmental, geo-technical, structural, machine-design, biotechnology, ECE, EEE, CSE minus the one routed) are commented out of `src/data/departments-catalog.ts:56-63`, so they have **no reachable URL** (found by [Departments content shape study](13-departments-shape-study.md)). Decide: (a) publish them (uncomment routes — was the comment-out deliberate, e.g. unverified content per the repo's prod-ready standard?), (b) keep them unpublished but editable in the Admin (staged content), or (c) delete them. Affects the department picker's "unrouted" warnings and how much content ships in v1.

## Answer

Resolved 2026-08-08 with Pratik: **(c) Delete them.** The 7 unrouted `pg/*` entries (~102 KB) are removed from `departments.json`, along with their `faculty.json` rosters and the commented-out lines in `departments-catalog.ts`. Execution lands in [Departments normalization migration](21-departments-normalization.md) so the deletion is visible in that ticket's diff; the one routed PG department (`pg/structural-engg` per catalog) stays. Admin's department picker therefore needs no "unrouted" warning state.
