# Architecture / الهيكلية

## Monorepo Layout
- `backend/` Laravel 12 API
- `frontend/` React 18 SPA (planned)
- Shared docs and workflows at repo root

## Request Flow
1. React app calls Laravel API
2. Sanctum provides session cookies
3. For external integrations, Passport issues bearer tokens

## Environments / البيئات
- **Development:** local PHP server + Vite dev servers
- **Production:** to be defined; ensure HTTPS and secure cookies

