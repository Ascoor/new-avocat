# ADR-0001: Choose Sanctum for SPA; Keep Passport for external APIs

Context: Monorepo with React SPA + Laravel backend. We prioritize first-party browser security.
Decision: SPA uses Sanctum (cookies + CSRF). Passport remains only for external machine clients.
Consequences: Clarify CORS/CSRF config, document dual-mode auth in README, ensure routes split.

