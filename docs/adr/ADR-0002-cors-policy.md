# ADR-0002: CORS Policy

Context: SPA on `FRONTEND_URL` needs cookie-based auth.
Decision: Restrict CORS to `FRONTEND_URL`, allow credentials, expose `auth/*` and `sanctum/csrf-cookie`.
Consequences: Simplifies security review; other origins require explicit updates.

