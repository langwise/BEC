import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { test, describe } from "node:test";
import { serializeContentFile } from "../../content/format.ts";
import type { HomeContent } from "../../content/schema/home.ts";
import {
  DEFAULT_CARD_SIZE,
  firstProblem,
  newCampusCard,
  newHeroSlide,
  sizeOptions,
  toDocument,
  toState,
} from "./home-doc.ts";

const here = dirname(fileURLToPath(import.meta.url));
const webRoot = join(here, "..", "..", "..");
const raw = readFileSync(join(webRoot, "content", "home.json"), "utf8");
const content = JSON.parse(raw) as HomeContent;

describe("home round trip", () => {
  test("opening the screen and publishing it changes nothing", () => {
    // The property that matters most: an Editor who opens the home editor to
    // read it, then presses Publish, must produce a zero-line diff — not a
    // reformat, not a field appearing on every slide.
    assert.equal(serializeContentFile(toDocument(toState(content), content)), raw);
  });

  test("the real file survives with all its slides and cards", () => {
    const state = toState(content);
    assert.equal(state.hero.length, content.hero.length);
    assert.equal(state.campusLife.length, content.campusLife.length);
    assert.equal(state.about.slides.length, content.about.slides.length);
  });
});

describe("toState", () => {
  test("a missing fit reads as the default rather than as nothing", () => {
    const state = toState({
      hero: [{ image: "a/b.webp", title: "T", description: "D" }],
      about: { image: "a/c.webp", established: "1963", establishedLabel: "L", slides: [] },
      campusLife: [],
    });
    assert.equal(state.hero[0].fit, "cover");
  });

  test("a missing card size reads as empty, not as the default", () => {
    // An Editor should see what the file says; the select offers the choices.
    const state = toState({
      hero: [],
      about: { image: "a/c.webp", established: "1963", establishedLabel: "L", slides: [] },
      campusLife: [{ image: "a/d.webp", title: "T", description: "D" }],
    });
    assert.equal(state.campusLife[0].className, "");
  });
});

describe("toDocument", () => {
  const base = toState(content);

  test('"cover" is written as absence, "contain" is written', () => {
    const cover = toDocument(
      { ...base, hero: [{ ...base.hero[0], fit: "cover" }] },
      content,
    );
    assert.equal("fit" in cover.hero[0], false);

    const contain = toDocument(
      { ...base, hero: [{ ...base.hero[0], fit: "contain" }] },
      content,
    );
    assert.equal(contain.hero[0].fit, "contain");
  });

  test("an empty card size disappears instead of publishing an empty class", () => {
    const built = toDocument(
      { ...base, campusLife: [{ ...base.campusLife[0], className: "" }] },
      content,
    );
    assert.equal("className" in built.campusLife[0], false);
  });

  test("$schema stays first so the file keeps its autocomplete", () => {
    const built = toDocument(base, content);
    assert.equal(Object.keys(built)[0], "$schema");
  });

  test("surrounding whitespace is trimmed off titles and copy", () => {
    const built = toDocument(
      { ...base, hero: [{ ...base.hero[0], title: "  Padded  ", description: " D " }] },
      content,
    );
    assert.equal(built.hero[0].title, "Padded");
    assert.equal(built.hero[0].description, "D");
  });
});

describe("sizeOptions", () => {
  test("offers the two supported sizes", () => {
    assert.deepEqual(
      sizeOptions(DEFAULT_CARD_SIZE).map((option) => option.value),
      ["md:col-span-2 md:row-span-2", "md:col-span-1 md:row-span-1"],
    );
  });

  test("a hand-tuned span is offered back rather than quietly replaced", () => {
    const options = sizeOptions("md:col-span-3");
    assert.equal(options.length, 3);
    assert.equal(options[2].value, "md:col-span-3");
    assert.match(options[2].label, /Custom/);
  });

  test("an empty size adds no phantom option", () => {
    assert.equal(sizeOptions("").length, 2);
  });
});

describe("firstProblem", () => {
  test("the real file is publishable as it stands", () => {
    assert.equal(firstProblem(toState(content)), undefined);
  });

  test("names the slide that is missing an image", () => {
    const state = toState(content);
    assert.match(
      firstProblem({ ...state, hero: [...state.hero, { ...newHeroSlide(), key: "x" }] }) ?? "",
      new RegExp(`Hero slide ${state.hero.length + 1} needs a background image`),
    );
  });

  test("names the card that is missing a photo", () => {
    const state = toState(content);
    assert.match(
      firstProblem({
        ...state,
        campusLife: [{ ...newCampusCard(), key: "x" }],
      }) ?? "",
      /Student life card 1 needs a photo/,
    );
  });

  test("an About slide with no text blocks the publish", () => {
    const state = toState(content);
    assert.match(
      firstProblem({
        ...state,
        about: { ...state.about, slides: [{ key: "x", paragraphs: [] }] },
      }) ?? "",
      /About slide 1 has no text/,
    );
  });
});
