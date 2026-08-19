import assert from "node:assert/strict";
import { test, describe } from "node:test";
import {
  firstIncompleteItem,
  move,
  newRowKey,
  rowsFromContent,
  toContent,
  toItems,
  toRows,
  today,
} from "./news-rows.ts";

const CONTENT = {
  $schema: "./news.schema.json",
  news: [{ date: "2026-06-12", title: "A thing happened" }],
  announcements: [
    { date: "A.Y. 2026-27", title: "Admissions open", link: "/admissions", pinned: true },
  ],
};

describe("toRows / toItems", () => {
  test("round-trips a document unchanged", () => {
    const rows = rowsFromContent(CONTENT);
    assert.deepEqual(toContent(rows, CONTENT.$schema), CONTENT);
  });

  test("gives every row a distinct key", () => {
    const rows = toRows([
      { date: "2026-01-01", title: "One" },
      { date: "2026-01-01", title: "One" },
    ]);
    assert.notEqual(rows[0].key, rows[1].key);
    assert.notEqual(newRowKey(), newRowKey());
  });

  test("an empty link is dropped, not published as an empty string", () => {
    const [item] = toItems([
      { key: "k", date: "2026-01-01", title: "One", link: "   ", pinned: false, images: [] },
    ]);
    assert.equal("link" in item, false);
  });

  test("an unpinned item carries no pinned field", () => {
    const [item] = toItems([
      { key: "k", date: "2026-01-01", title: "One", link: "", pinned: false, images: [] },
    ]);
    assert.equal("pinned" in item, false);
  });

  test("trims stray whitespace an editor pasted in", () => {
    const [item] = toItems([
      { key: "k", date: " 2026-01-01 ", title: "  One  ", link: " /a ", pinned: true, images: [] },
    ]);
    assert.deepEqual(item, { date: "2026-01-01", title: "One", link: "/a", pinned: true });
  });

  test("keeps key order stable so the published diff stays minimal", () => {
    const document = toContent(rowsFromContent(CONTENT), CONTENT.$schema);
    assert.deepEqual(Object.keys(document), ["$schema", "news", "announcements"]);
    assert.deepEqual(Object.keys(document.announcements[0]), ["date", "title", "link", "pinned"]);
  });

  test("omits $schema when the file had none", () => {
    const document = toContent(rowsFromContent(CONTENT), undefined);
    assert.equal("$schema" in document, false);
  });

  test("round-trips an item that carries scans", () => {
    const withImages = {
      ...CONTENT,
      announcements: [
        {
          date: "2026-08-01",
          title: "16th Graduation Day",
          pinned: true,
          images: [
            { key: "announcements/brochure.jpeg", alt: "Brochure cover" },
            { key: "announcements/schedule.jpeg", alt: "Programme schedule" },
          ],
        },
      ],
    };
    assert.deepEqual(toContent(rowsFromContent(withImages), withImages.$schema), withImages);
  });

  test("a picture added but never chosen does not travel", () => {
    const [item] = toItems([
      {
        key: "k",
        date: "2026-08-01",
        title: "One",
        link: "",
        pinned: false,
        images: [
          { key: "announcements/brochure.jpeg", alt: "Brochure cover" },
          { key: "  ", alt: "" },
        ],
      },
    ]);
    assert.deepEqual(item.images, [
      { key: "announcements/brochure.jpeg", alt: "Brochure cover" },
    ]);
  });

  test("an item with no pictures carries no images field", () => {
    const [item] = toItems([
      { key: "k", date: "2026-08-01", title: "One", link: "", pinned: false, images: [] },
    ]);
    assert.equal("images" in item, false);
  });

  test("a chosen picture with no description still travels, for the schema to refuse", () => {
    // Silently dropping it would take away a photo the Editor can see on screen;
    // `firstIncompleteItem` stops the publish before it gets here anyway.
    const [item] = toItems([
      {
        key: "k",
        date: "2026-08-01",
        title: "One",
        link: "",
        pinned: false,
        images: [{ key: "announcements/brochure.jpeg", alt: "  " }],
      },
    ]);
    assert.deepEqual(item.images, [{ key: "announcements/brochure.jpeg", alt: "" }]);
  });
});

describe("move", () => {
  const items = ["a", "b", "c"];

  test("moves an item up", () => {
    assert.deepEqual(move(items, 2, 1), ["a", "c", "b"]);
  });

  test("moves an item down", () => {
    assert.deepEqual(move(items, 0, 2), ["b", "c", "a"]);
  });

  test("an out-of-range target loses nothing", () => {
    assert.deepEqual(move(items, 0, -1), items);
    assert.deepEqual(move(items, 2, 3), items);
    assert.deepEqual(move(items, 5, 0), items);
  });

  test("does not mutate its input", () => {
    move(items, 0, 2);
    assert.deepEqual(items, ["a", "b", "c"]);
  });
});

describe("today", () => {
  test("uses local calendar fields, not UTC", () => {
    // 00:30 IST on 1 Jan is still 31 Dec in UTC; the editor must offer 1 Jan.
    const localNewYear = new Date(2026, 0, 1, 0, 30);
    assert.equal(today(localNewYear), "2026-01-01");
  });

  test("zero-pads months and days", () => {
    assert.equal(today(new Date(2026, 8, 5)), "2026-09-05");
  });
});

describe("firstIncompleteItem", () => {
  test("passes a complete document", () => {
    assert.equal(firstIncompleteItem(rowsFromContent(CONTENT)), undefined);
  });

  test("names the stream and the 1-based position of a blank title", () => {
    const rows = rowsFromContent(CONTENT);
    rows.news.push({ key: "k", date: "2026-01-01", title: "  ", link: "", pinned: false, images: [] });
    assert.equal(firstIncompleteItem(rows), "News item 2 still needs a date and a title.");
  });

  test("catches a blank date in the announcements stream too", () => {
    const rows = rowsFromContent(CONTENT);
    rows.announcements[0].date = "";
    assert.equal(firstIncompleteItem(rows), "Announcements item 1 still needs a date and a title.");
  });

  test("names the picture that still needs a description", () => {
    const rows = rowsFromContent(CONTENT);
    rows.announcements[0].images = [
      { key: "announcements/brochure.jpeg", alt: "Brochure cover" },
      { key: "announcements/schedule.jpeg", alt: "" },
    ];
    assert.equal(
      firstIncompleteItem(rows),
      "Announcements item 1: picture 2 still needs a description.",
    );
  });

  test("an empty picture slot is not a problem — it just does not get published", () => {
    const rows = rowsFromContent(CONTENT);
    rows.announcements[0].images = [{ key: "", alt: "" }];
    assert.equal(firstIncompleteItem(rows), undefined);
  });
});
