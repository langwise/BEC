import { strict as assert } from "node:assert";
import { describe, it } from "node:test";
import { normalizeDocument, normalizeEntry } from "./normalize.ts";

describe("normalizeDocument", () => {
  it("trims strings", () => {
    assert.equal(normalizeDocument("  Civil Engineering  "), "Civil Engineering");
  });

  it("drops a field an Editor cleared", () => {
    assert.deepEqual(normalizeDocument({ name: "Civil", tagline: "   " }), { name: "Civil" });
  });

  it("keeps a blank cell where it is, so the row after it does not shift left", () => {
    // The bug this exists to stop: a table with an empty cell in column four
    // used to publish with every later column moved one place to the left.
    assert.deepEqual(
      normalizeDocument({
        rows: [
          ["Paper", "", "Water Environment Research", "Feb 2024"],
          ["Paper", "IEEE", "  ", "March 2024"],
        ],
      }),
      {
        rows: [
          ["Paper", "", "Water Environment Research", "Feb 2024"],
          ["Paper", "IEEE", "", "March 2024"],
        ],
      },
    );
  });

  it("keeps a half-filled entry rather than deleting it — the schema will name it", () => {
    // Silently dropping it would take away work an Editor can see on screen.
    assert.deepEqual(normalizeDocument({ labs: [{ name: "Soils" }, { name: "  " }] }), {
      labs: [{ name: "Soils" }, {}],
    });
  });

  it("drops an array with nothing in it at all — the schema calls that absent", () => {
    assert.equal(normalizeDocument({ hero: [] }), undefined);
  });

  it("drops an object whose every field is blank", () => {
    assert.equal(normalizeDocument({ quickFacts: { facts: [], researchAreas: [] } }), undefined);
  });

  it("keeps null, which one field is allowed to be", () => {
    assert.deepEqual(normalizeDocument({ years: [{ year: null, items: ["A paper"] }] }), {
      years: [{ year: null, items: ["A paper"] }],
    });
  });

  it("keeps false and zero", () => {
    assert.deepEqual(normalizeDocument({ nbaAccredited: false, programsOfferedCount: 0 }), {
      nbaAccredited: false,
      programsOfferedCount: 0,
    });
  });

  it("leaves a already-clean document byte-identical", () => {
    const document = {
      name: "Civil Engineering",
      hero: ["departments/civil/hero.webp"],
      overviewPhoto: { key: "departments/civil/group.webp", caption: "Teaching Faculty" },
      mission: ["One", "Two"],
      layout: { hideResearchTab: true },
    };
    assert.equal(JSON.stringify(normalizeDocument(document)), JSON.stringify(document));
  });

  it("keeps the document's own key order, not the schema's", () => {
    const out = normalizeDocument({ tagline: "b", name: "a", established: "c" }) as object;
    assert.deepEqual(Object.keys(out), ["tagline", "name", "established"]);
  });
});

describe("normalizeEntry", () => {
  it("keeps an emptied department as an object rather than nothing", () => {
    assert.deepEqual(normalizeEntry({ name: "   " }), {});
  });
});
