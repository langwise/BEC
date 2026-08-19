import assert from "node:assert/strict";
import { test, describe } from "node:test";
import {
  chunk,
  columnsForWidth,
  gridEntries,
  rowOf,
  TILE_GAP,
  TILE_MIN_WIDTH,
} from "./asset-grid.ts";

const KEYS = [
  "departments/civil-engg/faculty/anil-patil.webp",
  "departments/civil-engg/lab-01.webp",
  "departments/cse/faculty/sunita-rao.webp",
  "governance/principal.webp",
];

describe("gridEntries", () => {
  test("puts folders before the assets in a folder", () => {
    const entries = gridEntries(KEYS, "departments/civil-engg/", "");
    assert.deepEqual(
      entries.map((entry) => entry.type),
      ["folder", "asset"],
    );
  });

  test("browsing the root lists only top-level folders", () => {
    const entries = gridEntries(KEYS, "", "");
    assert.deepEqual(
      entries.map((entry) => (entry.type === "folder" ? entry.folder.name : entry.key)),
      ["departments", "governance"],
    );
  });

  test("a search replaces browsing and returns assets from anywhere", () => {
    const entries = gridEntries(KEYS, "governance/", "faculty");
    assert.deepEqual(
      entries.map((entry) => entry.type),
      ["asset", "asset"],
    );
  });

  test("a whitespace-only search still browses", () => {
    assert.deepEqual(gridEntries(KEYS, "", "   "), gridEntries(KEYS, "", ""));
  });

  test("ids are unique so React keys are stable", () => {
    const entries = gridEntries(KEYS, "departments/civil-engg/", "");
    assert.equal(new Set(entries.map((entry) => entry.id)).size, entries.length);
  });
});

describe("chunk", () => {
  test("splits into rows of the given size, last row short", () => {
    assert.deepEqual(chunk([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]);
  });

  test("an empty list has no rows", () => {
    assert.deepEqual(chunk([], 3), []);
  });

  test("a nonsense column count does not drop entries", () => {
    assert.deepEqual(chunk([1, 2], 0), [[1, 2]]);
  });
});

describe("columnsForWidth", () => {
  test("fits as many whole tiles as the width allows", () => {
    const four = 4 * TILE_MIN_WIDTH + 3 * TILE_GAP;
    assert.equal(columnsForWidth(four), 4);
    assert.equal(columnsForWidth(four - 1), 3);
  });

  test("never drops below two columns, whatever the width", () => {
    assert.equal(columnsForWidth(0), 2);
    assert.equal(columnsForWidth(100), 2);
    assert.equal(columnsForWidth(Number.NaN), 2);
  });

  test("caps out rather than drawing postage stamps on a wide screen", () => {
    assert.equal(columnsForWidth(4000), 8);
  });
});

describe("rowOf", () => {
  test("finds the row holding a key", () => {
    const entries = gridEntries(KEYS, "", "photo");
    assert.equal(rowOf(entries, "missing.webp", 3), -1);

    const search = gridEntries(KEYS, "", "faculty");
    assert.equal(rowOf(search, "departments/civil-engg/faculty/anil-patil.webp", 1), 1);
  });

  test("counts folder tiles, since they take grid slots too", () => {
    const entries = gridEntries(KEYS, "departments/civil-engg/", "");
    assert.equal(rowOf(entries, "departments/civil-engg/lab-01.webp", 1), 1);
  });
});
