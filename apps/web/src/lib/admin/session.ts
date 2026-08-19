import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  createSessionToken,
  isAdminConfigured,
  SESSION_TTL_MS,
  verifySessionToken,
  type AdminSession,
} from "./session-token.ts";

/**
 * The cookie half of Admin auth. The crypto lives in `session-token.ts`;
 * this module is server-only by virtue of `next/headers`.
 */

const COOKIE = "bec_admin";

export {
  checkPassword,
  isAdminConfigured,
  AdminNotConfiguredError,
  type AdminSession,
} from "./session-token.ts";

export async function startSession(name: string): Promise<void> {
  (await cookies()).set(COOKIE, createSessionToken(name), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
  });
}

export async function endSession(): Promise<void> {
  (await cookies()).delete(COOKIE);
}

/**
 * The current session, or null. Never throws — use in route handlers to 401.
 *
 * The cookie is read *before* anything can short-circuit, because reading it is
 * what marks the calling page dynamic. Checking `isAdminConfigured()` first made
 * that bailout conditional on an environment variable: a build that could not
 * see `ADMIN_PASSWORD` never reached `cookies()`, so `/admin` was prerendered as
 * static, and the same route then hit `cookies()` at runtime — where the
 * password *is* set — and died with DYNAMIC_SERVER_USAGE. A page's rendering
 * mode must not depend on which env vars happened to exist at build time.
 */
export async function getSession(): Promise<AdminSession | null> {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!isAdminConfigured()) return null;
  return token ? verifySessionToken(token) : null;
}

/** The current session, redirecting to the login screen if there is none. */
export async function requireSession(): Promise<AdminSession> {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}
