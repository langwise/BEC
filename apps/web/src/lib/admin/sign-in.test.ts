import { strict as assert } from "node:assert";
import { after, before, describe, it } from "node:test";
import { evaluateSignIn, MAX_NAME_LENGTH } from "./sign-in.ts";

const PASSWORD = "correct horse battery staple";
const previous = process.env.ADMIN_PASSWORD;

before(() => {
  process.env.ADMIN_PASSWORD = PASSWORD;
});
after(() => {
  process.env.ADMIN_PASSWORD = previous;
});

/** Each test gets its own throttle bucket so failures do not leak between them. */
let bucket = 0;
const nextKey = () => `test-${bucket++}`;

const signIn = (name: string, password: string, clientKey = nextKey()) =>
  evaluateSignIn({ name, password, clientKey });

describe("evaluateSignIn", () => {
  it("accepts a name and the shared password", () => {
    assert.deepEqual(signIn("Shivanand Kulkarni", PASSWORD), {
      ok: true,
      name: "Shivanand Kulkarni",
    });
  });

  it("collapses whitespace in the name it will stamp on commits", () => {
    const outcome = signIn("  Shivanand   Kulkarni  ", PASSWORD);
    assert.equal(outcome.ok && outcome.name, "Shivanand Kulkarni");
  });

  it("requires a usable name before it checks the password", () => {
    for (const name of ["", " ", "S"]) {
      const outcome = signIn(name, PASSWORD);
      assert.equal(outcome.ok, false);
      assert.match(outcome.ok ? "" : outcome.error, /your name/);
    }
    // A blank name is reported even when the password is also wrong.
    const both = signIn("", "wrong");
    assert.match(both.ok ? "" : both.error, /your name/);
  });

  it("bounds the name length", () => {
    assert.equal(signIn("x".repeat(MAX_NAME_LENGTH), PASSWORD).ok, true);
    assert.equal(signIn("x".repeat(MAX_NAME_LENGTH + 1), PASSWORD).ok, false);
  });

  it("rejects a wrong password", () => {
    const outcome = signIn("Shivanand Kulkarni", "nope");
    assert.equal(outcome.ok, false);
    assert.equal(outcome.ok ? "" : outcome.error, "That password is not correct.");
  });

  it("locks a client out after repeated failures, correct password included", () => {
    const key = nextKey();
    for (let i = 0; i < 9; i++) signIn("Test Editor", "nope", key);
    assert.equal(signIn("Test Editor", PASSWORD, key).ok, true, "9 failures must not lock");

    for (let i = 0; i < 10; i++) signIn("Test Editor", "nope", key);
    const locked = signIn("Test Editor", PASSWORD, key);
    assert.equal(locked.ok, false);
    assert.match(locked.ok ? "" : locked.error, /^Too many incorrect attempts/);
  });

  it("keeps lockouts per client", () => {
    const key = nextKey();
    for (let i = 0; i < 12; i++) signIn("Test Editor", "nope", key);
    assert.equal(signIn("Test Editor", PASSWORD, key).ok, false);
    assert.equal(signIn("Test Editor", PASSWORD, nextKey()).ok, true);
  });

  it("resets the failure count on a successful sign-in", () => {
    const key = nextKey();
    for (let i = 0; i < 5; i++) signIn("Test Editor", "nope", key);
    assert.equal(signIn("Test Editor", PASSWORD, key).ok, true);
    for (let i = 0; i < 9; i++) signIn("Test Editor", "nope", key);
    assert.equal(signIn("Test Editor", PASSWORD, key).ok, true);
  });

  it("reports a deployment with no password configured", () => {
    process.env.ADMIN_PASSWORD = "";
    const outcome = signIn("Shivanand Kulkarni", PASSWORD);
    assert.equal(outcome.ok, false);
    assert.match(outcome.ok ? "" : outcome.error, /ADMIN_PASSWORD/);
    process.env.ADMIN_PASSWORD = PASSWORD;
  });
});
