import assert from "node:assert/strict";
import { test, describe } from "node:test";
import {
  breadcrumbs,
  childFolders,
  fileNameOf,
  filesIn,
  folderLabel,
  folderOf,
  labelFor,
  parentOf,
  searchKeys,
  SEARCH_RESULT_LIMIT,
} from "./asset-tree.ts";

const KEYS = [
  "departments/civil-engg/faculty/anil-patil.webp",
  "departments/civil-engg/faculty/sunita-rao.webp",
  "departments/civil-engg/lab-01.webp",
  "departments/cse/faculty/anil-patil.webp",
  "governance/principal.webp",
  "institute/campus/campus-front.webp",
  "readme.webp",
];

describe("folderOf / fileNameOf", () => {
  test("splits a nested key", () => {
    assert.equal(folderOf("a/b/c.webp"), "a/b/");
    assert.equal(fileNameOf("a/b/c.webp"), "c.webp");
  });

  test("a root-level key has no folder", () => {
    assert.equal(folderOf("c.webp"), "");
    assert.equal(fileNameOf("c.webp"), "c.webp");
  });
});

describe("labelFor", () => {
  test("turns a slug back into words", () => {
    assert.equal(labelFor("institute/campus/campus-front.webp"), "Campus front");
    assert.equal(labelFor("a/anil_patil.webp"), "Anil patil");
  });

  test("keeps the file name when there is nothing left to show", () => {
    assert.equal(labelFor("a/.webp"), ".webp");
  });

  test("folder names get the same treatment", () => {
    assert.equal(folderLabel("civil-engg"), "Civil engg");
  });
});

describe("childFolders", () => {
  test("lists immediate subfolders only", () => {
    assert.deepEqual(
      childFolders(KEYS, "departments/").map((folder) => folder.name),
      ["civil-engg", "cse"],
    );
  });

  test("counts everything beneath a folder, not just its top level", () => {
    const [civil] = childFolders(KEYS, "departments/");
    assert.equal(civil.count, 3);
    assert.equal(civil.prefix, "departments/civil-engg/");
  });

  test("lists the top level from the root", () => {
    assert.deepEqual(
      childFolders(KEYS, "").map((folder) => folder.name),
      ["departments", "governance", "institute"],
    );
  });
});

describe("filesIn", () => {
  test("returns assets directly in the folder, not in its subfolders", () => {
    assert.deepEqual(filesIn(KEYS, "departments/civil-engg/"), [
      "departments/civil-engg/lab-01.webp",
    ]);
  });

  test("returns root-level assets from the root", () => {
    assert.deepEqual(filesIn(KEYS, ""), ["readme.webp"]);
  });
});

describe("breadcrumbs / parentOf", () => {
  test("walks the trail down to the folder", () => {
    assert.deepEqual(breadcrumbs("departments/civil-engg/faculty/"), [
      { name: "departments", prefix: "departments/", count: 0 },
      { name: "civil-engg", prefix: "departments/civil-engg/", count: 0 },
      { name: "faculty", prefix: "departments/civil-engg/faculty/", count: 0 },
    ]);
  });

  test("the root has no trail and no parent", () => {
    assert.deepEqual(breadcrumbs(""), []);
    assert.equal(parentOf(""), null);
  });

  test("goes up one level at a time, ending at the root", () => {
    assert.equal(parentOf("departments/civil-engg/faculty/"), "departments/civil-engg/");
    assert.equal(parentOf("departments/"), "");
  });
});

describe("searchKeys", () => {
  test("an empty query matches nothing rather than everything", () => {
    assert.deepEqual(searchKeys(KEYS, "   "), []);
  });

  test("every word must appear somewhere in the key", () => {
    assert.deepEqual(searchKeys(KEYS, "civil lab"), ["departments/civil-engg/lab-01.webp"]);
    assert.deepEqual(searchKeys(KEYS, "civil nothing"), []);
  });

  test("finds an asset without the editor knowing the folder layout", () => {
    assert.deepEqual(searchKeys(KEYS, "campus front"), [
      "institute/campus/campus-front.webp",
    ]);
  });

  test("a file-name match outranks a folder-name match", () => {
    const keys = [
      "principal-photos/group-01.webp",
      "principal-photos/group-02.webp",
      "governance/principal.webp",
    ];
    assert.equal(searchKeys(keys, "principal")[0], "governance/principal.webp");
  });

  test("is case-insensitive", () => {
    assert.deepEqual(searchKeys(KEYS, "PRINCIPAL"), ["governance/principal.webp"]);
  });

  test("caps the result count instead of returning thousands of tiles", () => {
    const many = Array.from({ length: 900 }, (_, i) => `gallery/photo-${i}.webp`);
    assert.equal(searchKeys(many, "photo").length, SEARCH_RESULT_LIMIT);
  });
});
