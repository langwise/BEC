import { checkPassword, isAdminConfigured } from "./session-token.ts";
import { clearFailures, lockoutRemaining, registerFailure } from "./login-throttle.ts";

/**
 * Every decision the sign-in action makes, with no I/O — so the action itself
 * is just "evaluate, then set a cookie and redirect", and this can be exercised
 * directly.
 */

export const MAX_NAME_LENGTH = 60;

export type SignInOutcome =
  | { ok: true; name: string }
  | { ok: false; error: string };

export function evaluateSignIn(input: {
  name: string;
  password: string;
  /** Throttle bucket — the caller's IP, or "unknown" behind a bare proxy. */
  clientKey: string;
}): SignInOutcome {
  if (!isAdminConfigured()) {
    return {
      ok: false,
      error:
        "The Admin is not configured on this deployment. Ask the site administrator to set ADMIN_PASSWORD.",
    };
  }

  const name = input.name.replace(/\s+/g, " ").trim();
  if (name.length < 2) {
    return {
      ok: false,
      error: "Please enter your name — it is recorded with every change you publish.",
    };
  }
  if (name.length > MAX_NAME_LENGTH) {
    return {
      ok: false,
      error: `Please use a shorter name (under ${MAX_NAME_LENGTH} characters).`,
    };
  }

  const lockedFor = lockoutRemaining(input.clientKey);
  if (lockedFor > 0) {
    return {
      ok: false,
      error: `Too many incorrect attempts. Try again in ${Math.ceil(lockedFor / 60000)} minutes.`,
    };
  }

  if (!checkPassword(input.password)) {
    registerFailure(input.clientKey);
    return { ok: false, error: "That password is not correct." };
  }

  clearFailures(input.clientKey);
  return { ok: true, name };
}
