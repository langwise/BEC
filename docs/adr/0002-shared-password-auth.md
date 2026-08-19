# Shared-password auth for the Admin, deliberately not per-user

The Admin is gated by a single shared password (one env var); the Editor types their name on the login screen alongside the password, and that name is stamped into commit messages for honor-system attribution. Chosen over Google OAuth + allowlist to keep setup at zero moving parts for non-technical staff who may not have reliable Google accounts.

The name is typed rather than picked from a list (Pratik, 2026-08-14): a hardcoded roster would need maintaining as staff change, and under an honour-system scheme a list adds no integrity a free-text field does not. The name is carried inside the signed session token, not a cookie of its own, so it cannot be edited client-side between login and commit.

## Consequences

- Attribution is trust-based, not enforced — anyone with the password can claim any name.
- Session tokens are HMAC-signed with a key derived from the shared password via scrypt, so changing `ADMIN_PASSWORD` signs everyone out and a stolen cookie does not cheaply yield the password.
- Rate limiting is best-effort and per-process (no shared store under the $0 constraint), backed by a fixed delay on every attempt.
- Per-department edit *enforcement* is impossible under this scheme; if it's ever needed, that is a real auth migration (per-user identity), not a config change. This was accepted knowingly.
