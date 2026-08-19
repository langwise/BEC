import { createHash, createHmac, scryptSync, timingSafeEqual } from "node:crypto";

/**
 * Password check and session-token crypto for the Admin (ADR 0002: one shared
 * password, no per-user identity).
 *
 * Deliberately free of `next/headers` so it can be exercised on its own; the
 * cookie layer that uses it lives in `session.ts`.
 *
 * The Editor's name is carried *inside* the signed token rather than in a
 * cookie of its own, so it cannot be edited client-side before it is stamped
 * into a Publish commit message. Attribution stays honour-system — anyone with
 * the password can type any name — but it is the name they logged in with.
 */

export const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export type AdminSession = {
  /** Editor name typed at login, stamped into commit messages. */
  name: string;
  /** Epoch ms; the token is rejected after this even if the cookie survives. */
  expires: number;
};

export class AdminNotConfiguredError extends Error {
  constructor() {
    super("ADMIN_PASSWORD is not set on this deployment.");
    this.name = "AdminNotConfiguredError";
  }
}

export function isAdminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

let cachedKey: { password: string; key: Buffer } | null = null;

/**
 * Signing key for session tokens, derived from the shared password so that
 * changing the password invalidates every live session. scrypt rather than a
 * bare HMAC of the password: the input is a human-chosen secret, and scrypt
 * makes recovering it from a stolen cookie expensive instead of instant.
 * Derived once per process (~100ms on a cold start).
 */
function signingKey(): Buffer {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) throw new AdminNotConfiguredError();
  if (cachedKey?.password !== password) {
    cachedKey = { password, key: scryptSync(password, "bec-admin-session/v1", 32) };
  }
  return cachedKey.key;
}

function sha256(value: string): Buffer {
  return createHash("sha256").update(value).digest();
}

function equalConstantTime(a: Buffer, b: Buffer): boolean {
  return a.length === b.length && timingSafeEqual(a, b);
}

function sign(payload: string): Buffer {
  return createHmac("sha256", signingKey()).update(payload).digest();
}

/** True if `candidate` is the configured shared password. */
export function checkPassword(candidate: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  // Hash both sides first so the comparison is fixed-width and the timing-safe
  // compare never short-circuits on a length mismatch.
  return equalConstantTime(sha256(candidate), sha256(expected));
}

export function createSessionToken(
  name: string,
  now: number = Date.now(),
): string {
  const payload = Buffer.from(
    JSON.stringify({ name, expires: now + SESSION_TTL_MS }),
  ).toString("base64url");
  return `${payload}.${sign(payload).toString("base64url")}`;
}

export function verifySessionToken(
  token: string,
  now: number = Date.now(),
): AdminSession | null {
  const [payload, signature, ...rest] = token.split(".");
  if (!payload || !signature || rest.length > 0) return null;
  if (!equalConstantTime(Buffer.from(signature, "base64url"), sign(payload))) {
    return null;
  }
  try {
    const decoded: unknown = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    );
    if (typeof decoded !== "object" || decoded === null) return null;
    const { name, expires } = decoded as Partial<AdminSession>;
    if (typeof name !== "string" || typeof expires !== "number") return null;
    return expires > now ? { name, expires } : null;
  } catch {
    return null;
  }
}
