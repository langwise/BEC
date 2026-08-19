# Admin shell and shared-password auth

Type: task (AFK)
Status: resolved

## Question

Stand up the `/admin` area inside `apps/web`: route group with its own layout (existing shadcn/Radix components), `noindex` + excluded from sitemap/robots, login screen checking `ADMIN_PASSWORD` (constant-time compare, httpOnly session cookie), and the post-login **name picker** whose choice is remembered in a cookie and stamped into every commit message (ADR 0002). Navigation shell listing the editor sections (greyed-out until their slices land).

## Answer

Resolved 2026-08-14. Left as uncommitted working-tree changes.

**Route restructure (prerequisite).** The root layout wrapped every page in the public Header/Footer, which the Admin had to escape. All 13 public page directories plus `page.tsx` / `opengraph-image.tsx` / `twitter-image.tsx` moved into a `(site)` route group (URLs unchanged, `git mv` so history follows); `app/layout.tsx` now holds only the `<html>/<body>` shell, fonts, globals and `metadataBase`, while `(site)/layout.tsx` owns Header, Footer, OrganizationJsonLd, analytics and all public SEO metadata. Two knock-ons handled: `sitemap.ts`'s walker *skipped* route-group directories entirely, so it now recurses through them without adding a URL segment (and skips `admin`/`api` via `UNLISTED_SEGMENTS`); and `not-found.tsx` stayed at the app root — where it also catches URLs matching no segment — so it renders the public chrome itself, with its client body extracted to `components/common/not-found-content.tsx`. Verified: build clean, sitemap still 354 URLs with no `/admin`, `robots.txt` disallows `/admin`.

**Auth.** `lib/admin/session-token.ts` (pure crypto, no `next/headers`): scrypt-derived signing key from `ADMIN_PASSWORD`, HMAC-SHA256 signed token carrying `{name, expires}`, 7-day TTL, constant-time password compare over SHA-256 digests. `lib/admin/session.ts` is the cookie half — httpOnly / sameSite=lax / secure-in-prod — exposing `getSession()` (null, for route handlers to 401) and `requireSession()` (redirects, for pages). `lib/admin/sign-in.ts` holds every sign-in decision as a pure function so the server action is just "evaluate, set cookie, redirect"; `lib/admin/login-throttle.ts` is a best-effort per-process lockout (10 failures / 15 min) behind a fixed 500ms delay per attempt.

**Screens.** `/admin/login` (name + password, per ADR 0002's amendment: name is typed, not picked from a list) and `/admin` dashboard, both under `app/admin/` with `noindex` metadata. The session guard lives in `app/admin/(authed)/layout.tsx` so the login page — outside that group — cannot redirect to itself. Chrome is a sidebar on desktop, a Sheet on mobile, driven by `lib/admin/sections.ts`, the single registry of the eight editor sections; all eight show greyed-out with a "Soon" chip until their slice flips them to `ready`.

**Tests.** Adopted Node's built-in test runner — no new dependency, `pnpm test` at the root via turbo. 18 tests over the token crypto and the sign-in decisions, including tamper/expiry/rotation rejection and the throttle. Test files sit next to their modules as `*.test.ts` and use `.ts` import extensions, matching the convention `src/content/schema/` already set.

**Verified end to end** against both `next dev` and `next start`: `/admin` with no cookie → 307 to `/admin/login`; with a tampered cookie → 307; with a validly minted cookie → 200 rendering the editor's name; login page carries `<meta name="robots" content="noindex, nofollow, nocache">`; `signOut` round-trips through the real server-action path and redirects to `/admin/login`.

**Not verified by machine**: the `useActionState` wiring of the *sign-in* form specifically — replaying Next 16's encrypted server-action payload over curl was not worth the effort once `signOut` proved the mechanism and `evaluateSignIn` was covered by tests. A ten-second browser check at the [v1 walkthrough](18-v1-walkthrough.md) settles it.

**Surprise, graduated to [Secrets and access](01-secrets-and-access.md)**: `ADMIN_PASSWORD` ended with `#`, which dotenv truncates as an inline comment — the correct password was being rejected locally while Vercel would have accepted it. Quoted in `.env.local`, warned about in `.env.example`.
