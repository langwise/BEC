import assert from "node:assert/strict";
import { test, describe } from "node:test";
import {
  inOrderOf,
  isNumberText,
  move,
  newRowKey,
  optional,
  optionalFlag,
  optionalNumber,
  patchAt,
  removeAt,
  withKey,
  withKeys,
} from "./rows.ts";

describe("keys", () => {
  test("every row gets a distinct handle", () => {
    const rows = withKeys([{ a: 1 }, { a: 2 }, { a: 3 }]);
    assert.equal(new Set(rows.map((row) => row.key)).size, 3);
  });

  test("a handle is never reused across calls", () => {
    assert.notEqual(newRowKey(), newRowKey());
    assert.notEqual(withKey({ a: 1 }).key, withKey({ a: 1 }).key);
  });

  test("the item's own fields survive untouched", () => {
    const row = withKey({ name: "Anil", photo: undefined });
    assert.equal(row.name, "Anil");
    assert.ok("photo" in row);
  });
});

describe("move", () => {
  test("moves an item and shifts the rest", () => {
    assert.deepEqual(move(["a", "b", "c"], 0, 2), ["b", "c", "a"]);
    assert.deepEqual(move(["a", "b", "c"], 2, 0), ["c", "a", "b"]);
  });

  test("an out-of-range target loses nothing", () => {
    assert.deepEqual(move(["a", "b"], 0, -1), ["a", "b"]);
    assert.deepEqual(move(["a", "b"], 1, 2), ["a", "b"]);
    assert.deepEqual(move(["a", "b"], 5, 0), ["a", "b"]);
  });

  test("does not mutate the input", () => {
    const items = ["a", "b"];
    move(items, 0, 1);
    assert.deepEqual(items, ["a", "b"]);
  });
});

describe("patchAt and removeAt", () => {
  test("patch merges into one item only", () => {
    const rows = [
      { name: "a", role: "x" },
      { name: "b", role: "y" },
    ];
    assert.deepEqual(patchAt(rows, 1, { role: "z" }), [
      { name: "a", role: "x" },
      { name: "b", role: "z" },
    ]);
  });

  test("removeAt drops exactly one", () => {
    assert.deepEqual(removeAt(["a", "b", "c"], 1), ["a", "c"]);
  });
});

describe("optional", () => {
  test("a filled value becomes a field", () => {
    assert.deepEqual(optional("email", "a@b.c"), { email: "a@b.c" });
  });

  test("blank, whitespace and undefined all become nothing at all", () => {
    // Absent, not empty: `photo: ""` fails the schema and `email: ""` would
    // render an empty mailto link on the site.
    assert.deepEqual(optional("photo", ""), {});
    assert.deepEqual(optional("photo", "   "), {});
    assert.deepEqual(optional("photo", undefined), {});
  });

  test("surrounding space is trimmed off the value it keeps", () => {
    assert.deepEqual(optional("name", "  Dr. A. B. Patil "), { name: "Dr. A. B. Patil" });
  });

  test("spreading an empty result adds no key", () => {
    const built = { role: "Dean", ...optional("photo", "") };
    assert.deepEqual(Object.keys(built), ["role"]);
  });
});

describe("inOrderOf", () => {
  test("puts the keys back in the order they arrived", () => {
    const built = { name: "A", role: "Dean", photo: "p.webp" };
    assert.deepEqual(Object.keys(inOrderOf(built, ["role", "name", "photo"])), [
      "role",
      "name",
      "photo",
    ]);
  });

  test("a field the order does not mention is appended, not dropped", () => {
    const built = { role: "Dean", name: "A", focus: "New" };
    const ordered = inOrderOf(built, ["role", "name"]);
    assert.deepEqual(Object.keys(ordered), ["role", "name", "focus"]);
    assert.equal(ordered.focus, "New");
  });

  test("an order naming a field that is gone does not resurrect it", () => {
    const ordered = inOrderOf({ role: "Dean" }, ["role", "email"]);
    assert.deepEqual(Object.keys(ordered), ["role"]);
  });

  test("no order at all leaves the builder's own order alone", () => {
    assert.deepEqual(Object.keys(inOrderOf({ b: 1, a: 2 }, [])), ["b", "a"]);
  });

  test("values are carried across untouched", () => {
    assert.deepEqual(inOrderOf({ a: 1, b: [2, 3] }, ["b", "a"]), { a: 1, b: [2, 3] });
  });
});

describe("optionalFlag", () => {
  test("only true is written", () => {
    assert.deepEqual(optionalFlag("pinned", true), { pinned: true });
    assert.deepEqual(optionalFlag("pinned", false), {});
    assert.deepEqual(optionalFlag("pinned", undefined), {});
  });
});

describe("optionalNumber", () => {
  test("text that reads as a number becomes one", () => {
    assert.deepEqual(optionalNumber("offers", "132"), { offers: 132 });
    assert.deepEqual(optionalNumber("percent", " 72.55 "), { percent: 72.55 });
    assert.deepEqual(optionalNumber("delta", "-4"), { delta: -4 });
  });

  test("zero is a figure, not an absence", () => {
    assert.deepEqual(optionalNumber("placed", "0"), { placed: 0 });
  });

  test("a cleared box disappears rather than becoming zero", () => {
    assert.deepEqual(optionalNumber("offers", ""), {});
    assert.deepEqual(optionalNumber("offers", "  "), {});
    assert.deepEqual(optionalNumber("offers", undefined), {});
  });

  test("a typo is left out rather than written as null", () => {
    // NaN serialises to `null`, which the schema then rejects with a message
    // about the wrong type instead of about the typo. The editor's own check
    // blocks the publish and names the value.
    assert.deepEqual(optionalNumber("offers", "eighty"), {});
    assert.deepEqual(optionalNumber("offers", "12a"), {});
  });

  test("isNumberText agrees with what optionalNumber writes", () => {
    for (const value of ["132", "0", " 7 ", "-4", "1e3"]) {
      assert.equal(isNumberText(value), true, value);
    }
    for (const value of ["", "  ", "eighty", "12a", undefined]) {
      assert.equal(isNumberText(value), false, String(value));
    }
  });
});
