import { strict as assert } from "node:assert";
import { after, before, describe, it } from "node:test";
import {
  checkPassword,
  createSessionToken,
  SESSION_TTL_MS,
  verifySessionToken,
} from "./session-token.ts";

const PASSWORD = "correct horse battery staple";
const previous = process.env.ADMIN_PASSWORD;

before(() => {
  process.env.ADMIN_PASSWORD = PASSWORD;
});
after(() => {
  process.env.ADMIN_PASSWORD = previous;
});

describe("checkPassword", () => {
  it("accepts the configured password", () => {
    assert.equal(checkPassword(PASSWORD), true);
  });

  it("rejects a wrong, empty or partial password", () => {
    assert.equal(checkPassword("wrong"), false);
    assert.equal(checkPassword(""), false);
    assert.equal(checkPassword(PASSWORD.slice(0, -1)), false);
    assert.equal(checkPassword(PASSWORD + "x"), false);
  });

  it("rejects everything when no password is configured", () => {
    process.env.ADMIN_PASSWORD = "";
    assert.equal(checkPassword(""), false);
    assert.equal(checkPassword(PASSWORD), false);
    process.env.ADMIN_PASSWORD = PASSWORD;
  });
});

describe("session tokens", () => {
  it("round-trips the editor name", () => {
    const token = createSessionToken("Shivanand Kulkarni");
    assert.equal(verifySessionToken(token)?.name, "Shivanand Kulkarni");
  });

  it("rejects a tampered payload", () => {
    const token = createSessionToken("Shivanand Kulkarni");
    const forged =
      Buffer.from(
        JSON.stringify({ name: "Impostor", expires: Date.now() + 10_000 }),
      ).toString("base64url") + `.${token.split(".")[1]}`;
    assert.equal(verifySessionToken(forged), null);
  });

  it("rejects a corrupted signature", () => {
    const token = createSessionToken("Shivanand Kulkarni");
    assert.equal(
      verifySessionToken(token.slice(0, -2) + (token.endsWith("aa") ? "bb" : "aa")),
      null,
    );
  });

  it("rejects malformed tokens", () => {
    assert.equal(verifySessionToken(""), null);
    assert.equal(verifySessionToken("not-a-token"), null);
    assert.equal(verifySessionToken("only.two.segments"), null);
    assert.equal(verifySessionToken(createSessionToken("A B") + ".extra"), null);
  });

  it("expires after the TTL", () => {
    const token = createSessionToken("Shivanand Kulkarni");
    assert.equal(verifySessionToken(token, Date.now() + SESSION_TTL_MS - 5_000)?.name, "Shivanand Kulkarni");
    assert.equal(verifySessionToken(token, Date.now() + SESSION_TTL_MS + 5_000), null);
  });

  it("is invalidated by rotating the shared password", () => {
    const token = createSessionToken("Shivanand Kulkarni");
    process.env.ADMIN_PASSWORD = "a different password";
    assert.equal(verifySessionToken(token), null);
    process.env.ADMIN_PASSWORD = PASSWORD;
    assert.equal(verifySessionToken(token)?.name, "Shivanand Kulkarni");
  });
});
