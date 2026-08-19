import assert from "node:assert/strict";
import { test, describe } from "node:test";
import {
  addableDepartments,
  commonFolder,
  departmentName,
  orderedKeys,
  type DepartmentOption,
} from "./departments.ts";

const options: DepartmentOption[] = [
  { key: "civil-engg", name: "Civil Engineering", assetSlug: "civil" },
  { key: "mba", name: "Master of Business Administration (MBA)", assetSlug: "mba" },
  { key: "pg/biotechnology", name: "M.Tech. in Food Biotechnology" },
];

describe("departmentName", () => {
  test("gives the name an Editor would recognise", () => {
    assert.equal(departmentName("civil-engg", options), "Civil Engineering");
  });

  test("a key the catalogue has never heard of shows as itself", () => {
    // A department renamed out of the catalogue must stay visible in the file
    // that still holds it, or it silently disappears from the screen.
    assert.equal(departmentName("old-dept", options), "old-dept");
  });
});

describe("orderedKeys", () => {
  test("catalogue order, whatever order the file used", () => {
    assert.deepEqual(orderedKeys(["mba", "civil-engg"], options), ["civil-engg", "mba"]);
  });

  test("a key the catalogue does not have goes last rather than vanishing", () => {
    assert.deepEqual(orderedKeys(["old-dept", "mba"], options), ["mba", "old-dept"]);
  });

  test("catalogue entries the file does not hold are not invented", () => {
    assert.deepEqual(orderedKeys(["mba"], options), ["mba"]);
  });
});

describe("addableDepartments", () => {
  test("offers only what the file does not already have", () => {
    assert.deepEqual(
      addableDepartments(["mba"], options).map((option) => option.key),
      ["civil-engg", "pg/biotechnology"],
    );
  });

  test("nothing left to add is an empty list, not a duplicate", () => {
    assert.deepEqual(addableDepartments(options.map((o) => o.key), options), []);
  });
});

describe("commonFolder", () => {
  test("the folder the keys agree on", () => {
    assert.equal(
      commonFolder(["departments/civil/faculty/a.webp", "departments/civil/faculty/b.webp"]),
      "departments/civil/faculty",
    );
  });

  test("one outlier does not become the folder", () => {
    // Two departments have a single HoD portrait filed under governance/.
    // Filing every new photo beside that outlier would be wrong.
    assert.equal(
      commonFolder([
        "governance/hod/eee/x.webp",
        "departments/eee/faculty/a.webp",
        "departments/eee/faculty/b.webp",
      ]),
      "departments/eee/faculty",
    );
  });

  test("a tie goes to the first folder seen, not to Map ordering luck", () => {
    assert.equal(commonFolder(["a/one.webp", "b/two.webp"]), "a");
  });

  test("blank and top-level keys contribute nothing", () => {
    assert.equal(commonFolder([undefined, "", "loose.webp"]), undefined);
    assert.equal(commonFolder([]), undefined);
  });
});
