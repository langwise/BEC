import { strict as assert } from "node:assert";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import {
  departmentSchema,
  type DepartmentContent,
} from "../../content/schema/departments.ts";
import {
  FIELD_LABELS,
  FIELD_TAB,
  TABS,
  describePath,
  firstProblem,
  missingEssentials,
  toDocument,
  uploadFolder,
} from "./department-doc.ts";

/** Every top-level field the schema declares. */
function schemaFields(): string[] {
  const shape = (departmentSchema as unknown as { _zod: { def: { shape: Record<string, unknown> } } })
    ._zod.def.shape;
  return Object.keys(shape);
}

/** The editor's own source — the shell and the tabs it splits into. */
const editorSource = ["departments-editor.tsx", "departments-editor-tabs.tsx"]
  .map((file) =>
    readFileSync(fileURLToPath(new URL(`../../components/admin/${file}`, import.meta.url)), "utf8"),
  )
  .join("\n");

describe("every schema field is reachable", () => {
  it("is assigned to a tab", () => {
    const unassigned = schemaFields().filter((field) => !FIELD_TAB[field]);
    assert.deepEqual(
      unassigned,
      [],
      `these fields are on no tab, so nobody can edit them: ${unassigned.join(", ")}`,
    );
  });

  it("has a name an Editor would recognise", () => {
    const unnamed = schemaFields().filter((field) => !FIELD_LABELS[field]);
    assert.deepEqual(unnamed, [], `no label for: ${unnamed.join(", ")}`);
  });

  it("is named in the editor's source, so a tab actually draws it", () => {
    // Crude on purpose, and the same trick the gallery registry guard uses: a
    // hand-maintained table rots, and the failure here — a field the site
    // renders that no screen can change — is invisible any other way.
    const undrawn = schemaFields().filter(
      (field) => !new RegExp(`\\b${field}\\b`).test(editorSource),
    );
    assert.deepEqual(undrawn, [], `no widget draws: ${undrawn.join(", ")}`);
  });

  it("puts every field on a tab that exists", () => {
    const ids = new Set(TABS.map((tab) => tab.id));
    for (const [field, tab] of Object.entries(FIELD_TAB)) {
      assert.ok(ids.has(tab), `${field} points at an unknown tab "${tab}"`);
    }
  });

  it("leaves no tab empty", () => {
    const used = new Set(Object.values(FIELD_TAB));
    for (const tab of TABS) assert.ok(used.has(tab.id), `nothing is edited on "${tab.id}"`);
  });
});

describe("firstProblem", () => {
  it("passes a department the schema accepts", () => {
    assert.equal(firstProblem({ name: "Civil Engineering" }), undefined);
  });

  it("names the field, in the Editor's words, and the tab it is on", () => {
    const problem = firstProblem({} as never);
    assert.deepEqual(problem, {
      tab: "basics",
      where: "Department name",
      message: "still needs to be filled in.",
    });
  });

  it("points into a list by position", () => {
    const problem = firstProblem({
      name: "Civil",
      curriculumGroups: [{ title: "Scheme" }, { documents: [] }],
    } as never);
    assert.equal(problem?.tab, "curriculum");
    assert.equal(problem?.where, "Curriculum › item 2 › Title");
  });

  it("names the choices when a field only accepts a few", () => {
    const problem = firstProblem({ name: "Civil", degree: "B.Tech." } as never);
    assert.equal(problem?.tab, "basics");
    assert.equal(problem?.where, "Degree");
    assert.equal(problem?.message, "has to be one of: B.E., M.Tech., MCA, MBA.");
  });

  it("sends a value of the wrong kind to the administrator, not to the Editor", () => {
    const problem = firstProblem({ name: "Civil", overviewPhoto: "a-key.webp" } as never);
    assert.match(problem?.message ?? "", /older form.*tell the site administrator/);
  });

  it("names the keys of a setting it does not know, and finds their tab if it can", () => {
    const problem = firstProblem({ name: "Civil", facultyCompact: true } as never);
    assert.equal(problem?.where, "This department");
    assert.match(problem?.message ?? "", /facultyCompact/);
  });

  /**
   * The symptom this guards is the one an Editor actually hits: a department
   * that cannot be published the moment it is opened, before they have typed
   * anything. It means the file and the schema have drifted apart.
   */
  it("opens all eighteen real departments with nothing to fix", () => {
    const file = JSON.parse(
      readFileSync(fileURLToPath(new URL("../../../content/departments.json", import.meta.url)), "utf8"),
    ) as { departments: Record<string, DepartmentContent> };

    const blocked = Object.entries(file.departments)
      .map(([key, department]) => [key, firstProblem(toDocument(department))] as const)
      .filter(([, problem]) => problem !== undefined)
      .map(([key, problem]) => `${key}: ${problem?.where} ${problem?.message}`);

    assert.deepEqual(blocked, [], "these departments cannot be published as they stand");
  });
});

describe("describePath", () => {
  it("falls back to a readable name for a field with no label", () => {
    assert.equal(describePath(["someNewField"]), "Some new field");
  });

  it("says something for the document itself", () => {
    assert.equal(describePath([]), "This department");
  });
});

describe("toDocument", () => {
  it("hands back a department it has nothing to fix, unchanged byte for byte", () => {
    const department = {
      name: "Civil Engineering",
      tagline: "Building the state",
      hero: ["departments/civil/hero.webp"],
      overviewPhoto: { key: "departments/civil/group.webp", caption: "Teaching Faculty" },
      layout: { hideResearchTab: true },
    };
    assert.equal(JSON.stringify(toDocument(department)), JSON.stringify(department));
  });

  it("drops what an Editor emptied rather than writing it as blank", () => {
    assert.deepEqual(toDocument({ name: "Civil", tagline: "  ", mission: [] } as never), {
      name: "Civil",
    });
  });

  /**
   * The one that matters. Opening a department and pressing Publish without
   * typing anything has to produce a commit with no changed lines — otherwise
   * every visit rewrites parts of a 750 KB file nobody touched, and the diff an
   * Editor's change is supposed to be reviewable in is buried.
   */
  it("round-trips all eighteen real departments byte for byte", () => {
    const file = JSON.parse(
      readFileSync(fileURLToPath(new URL("../../../content/departments.json", import.meta.url)), "utf8"),
    ) as { departments: Record<string, DepartmentContent> };

    const changed = Object.entries(file.departments).filter(
      ([, department]) => JSON.stringify(toDocument(department)) !== JSON.stringify(department),
    );

    assert.deepEqual(
      changed.map(([key]) => key),
      [],
      "publishing these departments untouched would still rewrite them",
    );
  });
});

describe("missingEssentials", () => {
  it("names what a department page reads oddly without", () => {
    assert.deepEqual(missingEssentials({ name: "Civil", overview: "Something" }), [
      "About the department",
      "Vision",
      "Mission",
      "Contact",
    ]);
  });

  it("is empty for a department that has them all", () => {
    assert.deepEqual(
      missingEssentials({
        name: "Civil",
        overview: "a",
        about: "b",
        vision: "c",
        mission: ["d"],
        contact: { name: "e" },
      }),
      [],
    );
  });
});

describe("uploadFolder", () => {
  it("reads the folder off the keys the department already uses", () => {
    assert.equal(
      uploadFolder({
        name: "Civil",
        assetSlug: "civil",
        hero: ["departments/civil/hero-1.webp", "departments/civil/hero-2.webp"],
      }),
      "departments/civil",
    );
  });

  it("climbs out of a leaf folder, so department photos do not land under faculty/", () => {
    assert.equal(
      uploadFolder({
        name: "PG ECE",
        supportingStaff: [
          { name: "A", designation: "x", photo: "departments/pg-ece/faculty/a.webp" },
          { name: "B", designation: "y", photo: "departments/pg-ece/faculty/b.webp" },
        ],
      }),
      "departments/pg-ece",
    );
  });

  it("falls back to the slug for a department with no photos yet", () => {
    assert.equal(uploadFolder({ name: "New", assetSlug: "new" }), "departments/new");
  });

  it("has nothing to suggest for a department with neither", () => {
    assert.equal(uploadFolder({ name: "New" }), undefined);
  });

  it("files into a subfolder when asked", () => {
    assert.equal(uploadFolder({ name: "New", assetSlug: "new" }, "docs"), "departments/new/docs");
  });
});
