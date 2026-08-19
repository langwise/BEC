import assert from "node:assert/strict";
import { test, describe } from "node:test";
import { paragraphsToText, textToParagraphs } from "./paragraphs.ts";

describe("paragraphs", () => {
  test("round-trips prose an Editor did not touch", () => {
    const paragraphs = ["First paragraph.", "Second one."];
    assert.deepEqual(textToParagraphs(paragraphsToText(paragraphs)), paragraphs);
  });

  test("a blank line is the separator", () => {
    assert.deepEqual(textToParagraphs("one\n\ntwo"), ["one", "two"]);
  });

  test("a single newline stays inside one paragraph", () => {
    // Wrapping a long sentence must not silently split it in two on the site.
    assert.deepEqual(textToParagraphs("one\ntwo"), ["one\ntwo"]);
  });

  test("extra blank lines and trailing Enters do not publish empty paragraphs", () => {
    assert.deepEqual(textToParagraphs("one\n\n\n\ntwo\n\n"), ["one", "two"]);
    assert.deepEqual(textToParagraphs("   \n\n  "), []);
  });

  test("a line of spaces between paragraphs still separates them", () => {
    assert.deepEqual(textToParagraphs("one\n   \ntwo"), ["one", "two"]);
  });

  test("empty in, empty out", () => {
    assert.equal(paragraphsToText([]), "");
    assert.deepEqual(textToParagraphs(""), []);
  });
});
