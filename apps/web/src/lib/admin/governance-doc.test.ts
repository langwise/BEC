import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { test, describe } from "node:test";
import { serializeContentFile } from "../../content/format.ts";
import type { GovernanceContent } from "../../content/schema/governance.ts";
import { firstProblem, newBogMember, newPerson, toDocument, toState } from "./governance-doc.ts";

const here = dirname(fileURLToPath(import.meta.url));
const webRoot = join(here, "..", "..", "..");
const raw = readFileSync(join(webRoot, "content", "governance.json"), "utf8");
const content = JSON.parse(raw) as GovernanceContent;

describe("governance round trip", () => {
  test("opening the screen and publishing it changes nothing", () => {
    assert.equal(serializeContentFile(toDocument(toState(content), content)), raw);
  });

  test("a person keeps the field order the file wrote them in", () => {
    // `deans` and `officers` put `role` before `name`; a builder that always
    // emitted `name` first would reshuffle six leadership entries on the first
    // publish that changed one email address.
    const state = toState(content);
    state.deans[0].email = "changed@becbgk.edu";
    const built = toDocument(state, content);
    assert.deepEqual(Object.keys(built.deans[0]), Object.keys(content.deans[0]));
  });

  test("every list arrives intact", () => {
    const state = toState(content);
    assert.equal(state.deans.length, content.deans.length);
    assert.equal(state.officers.length, content.officers.length);
    assert.equal(state.hods.length, content.hods.length);
    assert.equal(state.bog.length, content.bog.length);
    assert.equal(state.sangha.members.length, content.sangha.members.length);
    assert.equal(state.sangha.council.length, content.sangha.council.length);
  });
});

describe("fields the editor does not show", () => {
  const withExtras: GovernanceContent = {
    ...content,
    deans: [
      {
        name: "Dr. Someone",
        role: "Dean (Test)",
        link: { href: "/academics", label: "Academics" },
        roleBadges: [{ label: "IQAC" }],
        verify: true,
      },
    ],
  };

  test("link, roleBadges and verify survive a round trip untouched", () => {
    // These are structural or Pratik's own markers. An Editor who opens the
    // screen and publishes must not silently delete them.
    const built = toDocument(toState(withExtras), withExtras);
    assert.deepEqual(built.deans[0].link, { href: "/academics", label: "Academics" });
    assert.deepEqual(built.deans[0].roleBadges, [{ label: "IQAC" }]);
    assert.equal(built.deans[0].verify, true);
  });

  test("they survive an edit to a field beside them", () => {
    const state = toState(withExtras);
    state.deans[0].focus = "Curriculum";
    const built = toDocument(state, withExtras);
    assert.equal(built.deans[0].focus, "Curriculum");
    assert.deepEqual(built.deans[0].roleBadges, [{ label: "IQAC" }]);
  });
});

describe("clearing a field", () => {
  const state = toState(content);

  test("an emptied email disappears rather than publishing an empty link", () => {
    const built = toDocument(
      { ...state, principal: { ...state.principal, email: "" } },
      content,
    );
    assert.equal("email" in built.principal, false);
  });

  test("an emptied photo disappears rather than failing the schema", () => {
    const built = toDocument(
      { ...state, hods: [{ ...state.hods[0], photo: "" }] },
      content,
    );
    assert.equal("photo" in built.hods[0], false);
  });

  test("a flag left off is not written", () => {
    const built = toDocument(
      { ...state, hods: [{ ...state.hods[0], placeholder: false }] },
      content,
    );
    assert.equal("placeholder" in built.hods[0], false);
  });

  test("a flag turned on is written as true", () => {
    const built = toDocument(
      { ...state, hods: [{ ...state.hods[0], placeholder: true }] },
      content,
    );
    assert.equal(built.hods[0].placeholder, true);
  });
});

describe("firstProblem", () => {
  test("the real file is publishable as it stands", () => {
    assert.equal(firstProblem(toState(content)), undefined);
  });

  test("a dean with no role blocks the publish, because the card is titled by it", () => {
    const state = toState(content);
    assert.match(
      firstProblem({ ...state, deans: [{ ...newPerson(), key: "x" }] }) ?? "",
      /Dean 1 needs a role/,
    );
  });

  test("a board member needs a name, a role and an affiliation", () => {
    const state = toState(content);
    assert.match(
      firstProblem({ ...state, bog: [{ ...newBogMember(), key: "x" }] }) ?? "",
      /Board member 1 needs a name, a role and an affiliation/,
    );
  });

  test("a new board member is not filed under Chairman by default", () => {
    assert.equal(newBogMember().category, "nominee");
  });
});
