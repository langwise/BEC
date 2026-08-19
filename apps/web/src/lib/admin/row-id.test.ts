import { strict as assert } from "node:assert";
import { describe, it } from "node:test";
import { carryId, patchRow, replaceRow, rowId } from "./row-id.ts";
import { move, removeAt } from "./rows.ts";

describe("rowId", () => {
  it("is stable for one object and different between objects", () => {
    const a = { name: "A" };
    const b = { name: "A" };
    assert.equal(rowId(a), rowId(a));
    assert.notEqual(rowId(a), rowId(b));
  });

  it("never touches the object, so nothing reaches the document", () => {
    const row = { key: "departments/civil/group.webp", caption: "Faculty" };
    rowId(row);
    assert.deepEqual(Object.keys(row), ["key", "caption"]);
    assert.equal(JSON.stringify(row), '{"key":"departments/civil/group.webp","caption":"Faculty"}');
  });
});

describe("patchRow", () => {
  it("keeps the edited row's handle, so its text box keeps focus", () => {
    const rows = [{ name: "A" }, { name: "B" }];
    const before = rowId(rows[1]);
    const next = patchRow(rows, 1, { name: "B2" });
    assert.equal(rowId(next[1]), before);
    assert.equal(next[1].name, "B2");
  });

  it("leaves the other rows as the very same objects", () => {
    const rows = [{ name: "A" }, { name: "B" }];
    const next = patchRow(rows, 1, { name: "B2" });
    assert.equal(next[0], rows[0]);
  });
});

describe("replaceRow", () => {
  it("carries the handle onto a row rebuilt from scratch", () => {
    const rows = [{ title: "Scheme", documents: [] as string[] }];
    const before = rowId(rows[0]);
    const next = replaceRow(rows, 0, { title: "Scheme", documents: ["a.pdf"] });
    assert.equal(rowId(next[0]), before);
  });
});

describe("reordering", () => {
  it("moves and deletes without disturbing handles", () => {
    const rows = [{ n: 1 }, { n: 2 }, { n: 3 }];
    const ids = rows.map(rowId);
    assert.deepEqual(move(rows, 0, 2).map(rowId), [ids[1], ids[2], ids[0]]);
    assert.deepEqual(removeAt(rows, 1).map(rowId), [ids[0], ids[2]]);
  });
});

describe("carryId", () => {
  it("mints nothing for an object that was never identified", () => {
    const next = carryId({ n: 1 }, { n: 2 });
    assert.equal(typeof rowId(next), "string");
  });
});
