import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { test, describe } from "node:test";
import { serializeContentFile } from "../../content/format.ts";
import type { FacultyContent } from "../../content/schema/faculty.ts";
import type { DepartmentOption } from "./departments.ts";
import {
  firstProblem,
  newProfile,
  newRoster,
  toDocument,
  toState,
  uploadFolders,
} from "./faculty-doc.ts";

const here = dirname(fileURLToPath(import.meta.url));
const webRoot = join(here, "..", "..", "..");
const raw = readFileSync(join(webRoot, "content", "faculty.json"), "utf8");
const content = JSON.parse(raw) as FacultyContent;

const label = (key: string) => key;

describe("faculty round trip", () => {
  test("opening the screen and publishing it changes nothing", () => {
    assert.equal(serializeContentFile(toDocument(toState(content), content)), raw);
  });

  test("a profile keeps the field order the file wrote it in", () => {
    // 108 of the 198 profiles write `cv` before `photo`. Emitting schema order
    // would rewrite all of them on the first publish that fixed one typo.
    const state = toState(content);
    const roster = state.departments.find((row) => row.department === "civil-engg");
    assert.ok(roster);
    roster.profiles[0].designation = "Professor";
    const built = toDocument(state, content);
    assert.deepEqual(
      Object.keys(built.departments["civil-engg"][0]),
      Object.keys(content.departments["civil-engg"][0]),
    );
  });

  test("every department arrives with its full roster", () => {
    const state = toState(content);
    assert.equal(state.departments.length, Object.keys(content.departments).length);
    for (const roster of state.departments) {
      assert.equal(roster.profiles.length, content.departments[roster.department].length);
    }
  });
});

describe("editing one department", () => {
  test("a rename in one department leaves the others byte-identical", () => {
    const state = toState(content);
    const roster = state.departments.find((row) => row.department === "mca");
    assert.ok(roster);
    roster.profiles[0].name = "Dr. Someone Else";
    const built = toDocument(state, content);
    assert.equal(built.departments.mca[0].name, "Dr. Someone Else");
    assert.deepEqual(built.departments["mechanical-engg"], content.departments["mechanical-engg"]);
  });

  test("a cleared photo disappears rather than failing the schema", () => {
    const state = toState(content);
    const roster = state.departments.find((row) => row.department === "mca");
    assert.ok(roster);
    roster.profiles[0].photo = "";
    const built = toDocument(state, content);
    assert.equal("photo" in built.departments.mca[0], false);
  });

  test("a department added by the Editor is appended, not sorted in", () => {
    const state = toState(content);
    const before = state.departments.length;
    state.departments.push({ ...newRoster("pg/structural-engg"), key: "new" });
    const built = toDocument(state, content);
    const keys = Object.keys(built.departments);
    assert.equal(keys.length, before + 1);
    assert.equal(keys[keys.length - 1], "pg/structural-engg");
  });
});

describe("uploadFolders", () => {
  const options: DepartmentOption[] = [
    { key: "civil-engg", name: "Civil Engineering", assetSlug: "civil" },
    { key: "pg/structural-engg", name: "M.Tech. Structural", assetSlug: "pg-structural" },
  ];

  test("reads the folder off the keys the department already uses", () => {
    const state = toState(content);
    const roster = state.departments.find((row) => row.department === "civil-engg");
    assert.ok(roster);
    const folders = uploadFolders(roster, options);
    assert.equal(folders.photo, "departments/civil/faculty");
    assert.equal(folders.cv, "departments/civil/faculty/cv");
  });

  test("a stray portrait filed elsewhere does not become the folder", () => {
    // Two departments have one HoD portrait under governance/. The *common*
    // folder wins, not the first one seen.
    const state = toState(content);
    const roster = state.departments.find((row) => row.department === "electrical-and-electronics-engg");
    assert.ok(roster);
    assert.equal(uploadFolders(roster, options).photo, "departments/eee/faculty");
  });

  test("a department with no assetSlug still resolves from its keys", () => {
    // `electronics-and-computer-engg` files its portraits under `ecs/`, which
    // no convention would derive from that slug. The keys are the only source.
    const state = toState(content);
    const roster = state.departments.find((row) => row.department === "electronics-and-computer-engg");
    assert.ok(roster);
    assert.equal(uploadFolders(roster, options).photo, "departments/ecs/faculty");
  });

  test("a department with no assets yet falls back to the convention", () => {
    const roster = newRoster("pg/structural-engg");
    assert.deepEqual(uploadFolders(roster, options), {
      photo: "departments/pg-structural/faculty",
      cv: "departments/pg-structural/faculty/cv",
    });
  });

  test("and to nothing at all when even the slug is unknown", () => {
    assert.deepEqual(uploadFolders(newRoster("brand-new"), options), {
      photo: undefined,
      cv: undefined,
    });
  });
});

describe("firstProblem", () => {
  test("the real file is publishable as it stands", () => {
    assert.equal(firstProblem(toState(content), label), undefined);
  });

  test("a blank profile blocks the publish and says where it is", () => {
    const state = toState(content);
    const roster = state.departments.find((row) => row.department === "mca");
    assert.ok(roster);
    roster.profiles.push({ ...newProfile(), key: "x" });
    assert.match(firstProblem(state, label) ?? "", /mca: profile 7 needs a name and a designation/);
  });

  test("a designation alone is not enough", () => {
    const state = toState(content);
    const roster = state.departments.find((row) => row.department === "mca");
    assert.ok(roster);
    roster.profiles[0].name = "  ";
    assert.match(firstProblem(state, label) ?? "", /profile 1 needs a name/);
  });
});
