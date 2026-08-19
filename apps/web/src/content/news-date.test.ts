import assert from "node:assert/strict";
import { test, describe } from "node:test";
import { formatNewsDate, isIsoDate, sortByDateDesc } from "./news-date.ts";

describe("isIsoDate", () => {
  test("accepts a real calendar date", () => {
    assert.equal(isIsoDate("2026-06-12"), true);
  });

  test("rejects period labels", () => {
    assert.equal(isIsoDate("A.Y. 2026-27"), false);
    assert.equal(isIsoDate("2025-26 EVEN SEM"), false);
  });

  test("rejects a day that does not exist", () => {
    assert.equal(isIsoDate("2026-02-31"), false);
    assert.equal(isIsoDate("2026-13-01"), false);
  });

  test("accepts a leap day and rejects it in a common year", () => {
    assert.equal(isIsoDate("2028-02-29"), true);
    assert.equal(isIsoDate("2026-02-29"), false);
  });

  test("rejects unpadded input", () => {
    assert.equal(isIsoDate("2026-6-12"), false);
  });
});

describe("formatNewsDate", () => {
  // These are the exact strings the site rendered before the migration; a change
  // here is a visible change on the home page.
  test("reproduces the display format the hardcoded data used", () => {
    assert.equal(formatNewsDate("2026-06-12"), "JUN 12, 2026");
    assert.equal(formatNewsDate("2026-05-04"), "MAY 04, 2026");
    assert.equal(formatNewsDate("2026-03-13"), "MAR 13, 2026");
    assert.equal(formatNewsDate("2026-07-13"), "JUL 13, 2026");
  });

  test("passes period labels through untouched", () => {
    assert.equal(formatNewsDate("A.Y. 2026-27"), "A.Y. 2026-27");
    assert.equal(formatNewsDate("2025-26 EVEN SEM"), "2025-26 EVEN SEM");
  });

  test("does not shift the day across timezones", () => {
    // Jan 1 is the case that would slip to Dec 31 if this went through `Date`.
    assert.equal(formatNewsDate("2026-01-01"), "JAN 01, 2026");
    assert.equal(formatNewsDate("2026-12-31"), "DEC 31, 2026");
  });

  test("leaves an impossible date alone rather than inventing a month", () => {
    assert.equal(formatNewsDate("2026-02-31"), "2026-02-31");
  });
});

describe("sortByDateDesc", () => {
  test("puts the newest dated item first", () => {
    const sorted = sortByDateDesc([
      { date: "2026-03-13" },
      { date: "2026-06-12" },
      { date: "2026-05-04" },
    ]);
    assert.deepEqual(
      sorted.map((item) => item.date),
      ["2026-06-12", "2026-05-04", "2026-03-13"],
    );
  });

  test("keeps period-labelled items at the top in their existing order", () => {
    const sorted = sortByDateDesc([
      { date: "2026-06-20" },
      { date: "A.Y. 2026-27" },
      { date: "2025-26 EVEN SEM" },
      { date: "2026-07-13" },
    ]);
    assert.deepEqual(
      sorted.map((item) => item.date),
      ["A.Y. 2026-27", "2025-26 EVEN SEM", "2026-07-13", "2026-06-20"],
    );
  });

  test("does not mutate its input", () => {
    const items = [{ date: "2026-01-01" }, { date: "2026-02-01" }];
    sortByDateDesc(items);
    assert.deepEqual(
      items.map((item) => item.date),
      ["2026-01-01", "2026-02-01"],
    );
  });
});
