import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { test, describe } from "node:test";
import { serializeContentFile } from "../../content/format.ts";
import type { PlacementsContent } from "../../content/schema/placements.ts";
import {
  firstProblem,
  newChart,
  newDepartment,
  newPoint,
  newYear,
  toDocument,
  toState,
} from "./placements-doc.ts";

const here = dirname(fileURLToPath(import.meta.url));
const webRoot = join(here, "..", "..", "..");
const raw = readFileSync(join(webRoot, "content", "placements.json"), "utf8");
const content = JSON.parse(raw) as PlacementsContent;

const label = (key: string) => key;
const find = (state: ReturnType<typeof toState>, key: string) => {
  const row = state.departments.find((department) => department.department === key);
  assert.ok(row, `${key} missing from state`);
  return row;
};

describe("placements round trip", () => {
  test("opening the screen and publishing it changes nothing", () => {
    assert.equal(serializeContentFile(toDocument(toState(content), content)), raw);
  });

  test("a department keeps the section order the file wrote it in", () => {
    // CSE writes offersChart before yearWise; Civil writes it after. Emitting
    // one fixed order would rewrite whichever department disagreed.
    const state = toState(content);
    find(state, "computer-science-and-engg").yearWise[0].placed = "75";
    const built = toDocument(state, content);
    assert.deepEqual(
      Object.keys(built.departments["computer-science-and-engg"]),
      Object.keys(content.departments["computer-science-and-engg"]),
    );
  });

  test("every batch arrives with its recruiters and students", () => {
    const state = toState(content);
    const cse = find(state, "computer-science-and-engg");
    assert.equal(cse.batches?.length, 3);
    assert.equal(cse.batches?.[0].students.length, 132);
    assert.equal(cse.batches?.[0].companies.length, 31);
  });
});

describe("sections a department does or does not publish", () => {
  test("an empty batches list is kept, because the file has the key", () => {
    // Three departments carry `batches: []`. Dropping it on publish would be a
    // diff in a file nobody edited.
    const state = toState(content);
    assert.deepEqual(find(state, "civil-engg").batches, []);
    const built = toDocument(state, content);
    assert.equal("batches" in built.departments["civil-engg"], true);
  });

  test("a department without the key does not gain one", () => {
    const state = toState(content);
    assert.equal(find(state, "ai-and-ml").batches, null);
    const built = toDocument(state, content);
    assert.equal("batches" in built.departments["ai-and-ml"], false);
  });

  test("a department without a chart does not gain one", () => {
    const state = toState(content);
    assert.equal(find(state, "mba").chart, null);
    assert.equal("offersChart" in toDocument(state, content).departments.mba, false);
  });

  test("turning a chart on writes it", () => {
    const state = toState(content);
    const mba = find(state, "mba");
    mba.chart = { ...newChart(), title: "Placements", points: [{ ...newPoint(), key: "p", year: "2024", placed: "38" }] };
    const built = toDocument(state, content).departments.mba.offersChart;
    assert.equal(built?.title, "Placements");
    assert.deepEqual(built?.points, [{ year: "2024", placed: 38 }]);
  });
});

describe("figures", () => {
  test("a column a department does not publish stays absent", () => {
    // MBA publishes four of the eight columns; the site drops the empty ones.
    const built = toDocument(toState(content), content);
    assert.deepEqual(Object.keys(built.departments.mba.yearWise[0]), [
      "year",
      "students",
      "placed",
      "percent",
    ]);
  });

  test("a chart figure is written as a number, not as text", () => {
    const state = toState(content);
    find(state, "civil-engg").chart!.points[0].placed = "82";
    const point = toDocument(state, content).departments["civil-engg"].offersChart?.points[0];
    assert.equal(point?.placed, 82);
  });

  test("a cleared chart figure disappears instead of becoming zero", () => {
    const state = toState(content);
    find(state, "civil-engg").chart!.points[0].higherStudy = "";
    const point = toDocument(state, content).departments["civil-engg"].offersChart?.points[0];
    assert.equal("higherStudy" in (point ?? {}), false);
  });

  test("an unparseable chart figure is left out rather than written as null", () => {
    const state = toState(content);
    find(state, "civil-engg").chart!.points[0].placed = "eighty";
    const point = toDocument(state, content).departments["civil-engg"].offersChart?.points[0];
    assert.equal("placed" in (point ?? {}), false);
  });

  test("…and the publish is blocked so it is not lost silently", () => {
    const state = toState(content);
    find(state, "civil-engg").chart!.points[0].placed = "eighty";
    assert.match(firstProblem(state, label) ?? "", /“eighty” in chart bar 1 is not a number/);
  });

  test("a year-wise figure stays text, because it is printed not plotted", () => {
    const built = toDocument(toState(content), content);
    assert.equal(built.departments["computer-science-and-engg"].yearWise[0].percent, "72.55");
  });
});

describe("firstProblem", () => {
  test("the real file is publishable as it stands", () => {
    assert.equal(firstProblem(toState(content), label), undefined);
  });

  test("a summary row with no year blocks the publish", () => {
    const state = toState(content);
    find(state, "mba").yearWise.push({ ...newYear(), key: "x" });
    assert.match(firstProblem(state, label) ?? "", /mba: row 8 of the summary table needs a year/);
  });

  test("a batch with no name blocks the publish", () => {
    const state = toState(content);
    const cse = find(state, "computer-science-and-engg");
    cse.batches![0].batch = "";
    assert.match(firstProblem(state, label) ?? "", /batch 1 needs a name/);
  });

  test("a recruiter with no company name blocks the publish", () => {
    const state = toState(content);
    const cse = find(state, "computer-science-and-engg");
    cse.batches![0].companies[2].company = " ";
    assert.match(firstProblem(state, label) ?? "", /recruiter 3 needs a company name/);
  });

  test("a brand-new department is publishable while it is still empty", () => {
    const state = toState(content);
    state.departments.push({ ...newDepartment("mca"), key: "new" });
    assert.equal(firstProblem(state, label), undefined);
  });
});
