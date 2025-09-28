# new-avocat — Mono-Repo (Laravel Backend + React Frontend)

## نظرة عامة (AR)
مشروع لإدارة القضايا القانونية بمصادقة آمنة لواجهة SPA. الخادم Laravel 12 (PHP 8.2) مع Sanctum للجلسات وPassport للتكاملات الخارجية عند الحاجة. الواجهة React (قيد الإنشاء).

## Overview (EN)
Legal case management with secure SPA auth. Backend: Laravel 12 (PHP 8.2) with Sanctum; Passport optional for 3rd-party integrations. Frontend: React (placeholder).

---

## Directory Map
- `backend/` – Laravel API & assets (Sanctum + Passport)
- `frontend/` – React 18 + TS (placeholder)
- `docs/` – Architecture, auth, security and more
- `dashboards/tailwind/` – Generated Tailwind dashboard packages (JSX, CSS, thumbnails, manifest)
- `scripts/` – Tooling including the dashboard asset generator

## Quick Start
```bash
# backend
cd backend && cp .env.example .env && composer install && php artisan key:generate && php artisan migrate
npm i && npm run dev
php artisan serve

# frontend (future)
cd ../frontend && cp .env.example .env && npm i && npm run dev
```

## Authentication Paths
- **SPA:** Sanctum session cookies with CSRF (`/sanctum/csrf-cookie`)
- **External APIs:** Passport bearer tokens

See `docs/auth.md` and ADRs in `docs/adr/` for details.

## Common Scripts
- `composer dev` – run Laravel server, queue, logs and Vite in parallel
- `composer test` – run Pest/PHPUnit suite
- `python scripts/generate_dashboard_assets.py` – rebuild the Tailwind dashboard catalog and assets (requires Pillow)

### Tailwind Dashboard Generator
- Regenerates 20 unique dashboard bundles in `dashboards/tailwind/dashboard-XX-*` (JSX sample, Tailwind CSS stub, README, 512×320 thumbnail).
- Updates `dashboards/tailwind/dashboard-catalog.json` with layout specs, color palettes, responsive and accessibility notes, and asset paths.
- Overwrites existing generated files—commit manual adjustments elsewhere before running.

## Contributing
Please read [CONTRIBUTING.md](CONTRIBUTING.md) and follow Conventional Commits.


