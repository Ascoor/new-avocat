# SPA Authentication / المصادقة

**SPA path:** Laravel Sanctum (stateful, HTTP-only cookies, CSRF via `/sanctum/csrf-cookie`).
**3rd-party path:** Passport (Bearer tokens). Use only for external API consumers.

Decision captured in ADR-0001; React client must call `GET /sanctum/csrf-cookie` before any POST and send `withCredentials: true`.

