/**
 * Best-effort brute-force brake on the shared password.
 *
 * State is per-process, so on Vercel it is per warm lambda rather than global —
 * a determined attacker spreading attempts across cold starts gets more tries
 * than the numbers below suggest. Shared state would mean a KV store, which the
 * $0 constraint rules out; combined with the fixed delay the sign-in action
 * applies to every attempt, this is enough to make online guessing impractical
 * without pretending to be a real rate limiter.
 */

const MAX_FAILURES = 10;
const LOCKOUT_MS = 15 * 60 * 1000;

const failures = new Map<string, { count: number; firstAt: number }>();

function currentWindow(key: string) {
  const entry = failures.get(key);
  if (!entry) return null;
  if (Date.now() - entry.firstAt > LOCKOUT_MS) {
    failures.delete(key);
    return null;
  }
  return entry;
}

/** Milliseconds remaining in the lockout, or 0 if the key may try again. */
export function lockoutRemaining(key: string): number {
  const entry = currentWindow(key);
  if (!entry || entry.count < MAX_FAILURES) return 0;
  return entry.firstAt + LOCKOUT_MS - Date.now();
}

export function registerFailure(key: string): void {
  const entry = currentWindow(key);
  if (entry) entry.count += 1;
  else failures.set(key, { count: 1, firstAt: Date.now() });
}

export function clearFailures(key: string): void {
  failures.delete(key);
}
