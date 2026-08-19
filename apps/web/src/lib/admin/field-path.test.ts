import assert from "node:assert/strict";
import { test, describe } from "node:test";
import { describeFieldPath, describeIssue, sentence, valueAt } from "./field-path.ts";

describe("sentence", () => {
  test("splits a camelCase field into words", () => {
    assert.equal(sentence("researchAreas"), "Research areas");
    assert.equal(sentence("bestPracticesList"), "Best practices list");
  });

  test("leaves a single lowercase word alone but for the capital", () => {
    assert.equal(sentence("overview"), "Overview");
  });

  test("a field with no hand-written label still comes out as English", () => {
    assert.equal(sentence("nbaAccredited"), "Nba accredited");
  });
});

describe("describeFieldPath", () => {
  test("names the root when the problem is the document itself", () => {
    assert.equal(describeFieldPath([]), "This page");
    assert.equal(describeFieldPath([], {}, "This department"), "This department");
  });

  test("prefers a hand-written label over the derived one", () => {
    assert.equal(
      describeFieldPath(["curriculumGroups"], { curriculumGroups: "Curriculum" }),
      "Curriculum",
    );
  });

  test("numbers rows from one, because that is how the form numbers them", () => {
    assert.equal(
      describeFieldPath(["curriculumGroups", 1, "file"], { curriculumGroups: "Curriculum" }),
      "Curriculum › item 2 › PDF",
    );
  });

  test("falls back to the derived wording for a field with no label", () => {
    assert.equal(describeFieldPath(["researchAreas", 0]), "Research areas › item 1");
  });

  test("names the nested field, not the top-level one that shares its name", () => {
    // `name` is a field on eight different kinds of row. Applying the
    // document's own labels at depth reported every one of them as the
    // department's name.
    assert.equal(
      describeFieldPath(["supportingStaff", 13, "name"], { name: "Department name" }),
      "Supporting staff › item 14 › Name",
    );
  });

  test("gives the machine-named fields the word the form prints", () => {
    assert.equal(
      describeFieldPath(["customSections", 0, "id"], { customSections: "Extra pages" }),
      "Extra pages › item 1 › Address",
    );
    assert.equal(
      describeFieldPath(["facilitiesGallery", 2, "images"]),
      "Facilities gallery › item 3 › Photos",
    );
    assert.equal(describeFieldPath(["hero", 0, "key"]), "Hero › item 1 › Photograph");
  });
});

describe("valueAt", () => {
  const doc = { announcements: [{ title: "One" }, {}] };

  test("reaches into arrays and objects", () => {
    assert.equal(valueAt(doc, ["announcements", 0, "title"]), "One");
  });

  test("returns undefined rather than throwing when the path leads nowhere", () => {
    assert.equal(valueAt(doc, ["announcements", 1, "title"]), undefined);
    assert.equal(valueAt(doc, ["nothing", "here"]), undefined);
    assert.equal(valueAt(null, ["anything"]), undefined);
  });
});

describe("describeIssue", () => {
  const doc = { announcements: [{ title: undefined, link: "not a url" }], areas: [] };

  test("a missing value is something to fill in, not a type error", () => {
    const message = describeIssue(
      { code: "invalid_type", path: ["announcements", 0, "title"], message: "Invalid input: expected string, received undefined" },
      doc,
    );
    assert.equal(message, "still needs to be filled in.");
  });

  test("an empty string is also something to fill in", () => {
    const message = describeIssue(
      { code: "too_small", path: ["announcements", 0, "title"], message: "Too small" },
      { announcements: [{ title: "" }] },
    );
    assert.equal(message, "still needs to be filled in.");
  });

  test("an empty list asks for an entry rather than for text", () => {
    const message = describeIssue({ code: "too_small", path: ["areas"], message: "Too small" }, doc);
    assert.equal(message, "needs at least one entry.");
  });

  test("a malformed value points at typing mistakes", () => {
    for (const code of ["invalid_format", "invalid_string"]) {
      assert.equal(
        describeIssue({ code, path: ["announcements", 0, "link"], message: "Invalid url" }, doc),
        "does not look right — check it for typing mistakes.",
      );
    }
  });

  test("a value of the wrong type is old content, not something to type into", () => {
    const message = describeIssue(
      { code: "invalid_type", path: ["photo"], message: "Invalid input: expected object, received string" },
      { photo: "departments/civil-engg/group.webp" },
    );
    assert.match(message, /older form/);
    assert.match(message, /tell the site administrator/);
  });

  test("a row that matches neither shape reads as blank when it is blank", () => {
    assert.equal(
      describeIssue({ code: "invalid_union", path: ["members", 0], message: "Invalid input" }, { members: [""] }),
      "still needs to be filled in.",
    );
    assert.match(
      describeIssue(
        { code: "invalid_union", path: ["members", 0], message: "Invalid input" },
        { members: [{ label: 1 }] },
      ),
      /older form/,
    );
  });

  test("an unrecognised key is the administrator's problem, and names the keys", () => {
    const message = describeIssue(
      {
        code: "unrecognized_keys",
        path: [],
        message: "Unrecognized key",
        keys: ["visionMissionOnHome", "sectionTitles"],
      },
      doc,
    );
    assert.match(message, /tell the site administrator/);
    assert.match(message, /visionMissionOnHome, sectionTitles/);
  });

  test("a fixed set of answers is listed rather than described", () => {
    assert.equal(
      describeIssue(
        {
          code: "invalid_value",
          path: ["width"],
          message: 'Invalid option: expected one of "narrow"|"wide"',
          values: ["narrow", "wide"],
        },
        { width: "huge" },
      ),
      "has to be one of: narrow, wide.",
    );
  });

  test("an unfamiliar code falls through to the message it came with", () => {
    const message = describeIssue(
      { code: "custom", path: ["areas"], message: "Pick at most three." },
      doc,
    );
    assert.equal(message, "Pick at most three.");
  });

  test("never leaks Zod's own vocabulary for the codes it does handle", () => {
    const messages = [
      describeIssue({ code: "invalid_type", path: ["missing"], message: "expected string, received undefined" }, doc),
      describeIssue({ code: "too_small", path: ["areas"], message: "Array must contain at least 1 element(s)" }, doc),
      describeIssue({ code: "invalid_format", path: ["announcements", 0, "link"], message: "Invalid url" }, doc),
    ];
    for (const message of messages) {
      assert.doesNotMatch(message, /expected|received|Array|Invalid input|undefined/);
    }
  });
});
