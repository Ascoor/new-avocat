# new-avocat — Mono-Repo (Laravel Backend + React Frontend)

## نظرة عامة (AR)
مشروع لإدارة القضايا القانونية بمصادقة آمنة لواجهة SPA. الخادم Laravel 12 (PHP 8.2) مع Sanctum للجلسات وPassport للتكاملات الخارجية عند الحاجة. الواجهة React (قيد الإنشاء).

## Overview (EN)
Legal case management with secure SPA auth. Backend: Laravel 12 (PHP 8.2) with Sanctum; Passport optional for 3rd-party integrations. Frontend: React (placeholder).

---

## Directory Map
- `backend/` – Laravel API & assets (Sanctum + Passport). See `docs/backend/` for structure and troubleshooting.
- `frontend/` – React 18 + TS SPA. See `docs/frontend/` for layout and dev tips.
- `docs/` – Documentation index that links to backend/frontend guides.
- `scripts/` – Dev tooling (`scripts/dev.sh`) and dashboard asset generator.

## Quick Start
```bash
# run both apps
bash scripts/dev.sh

# or run individually
cd backend && cp .env.example .env && composer install && php artisan key:generate && php artisan migrate
npm install && npm run dev
php artisan serve

cd ../frontend && cp .env.example .env.local && npm install && npm run dev
```

## Authentication Paths
- **SPA:** Sanctum session cookies with CSRF (`/sanctum/csrf-cookie`)
- **External APIs:** Passport bearer tokens

See `docs/backend/` for auth and route details.

## Common Scripts
- `composer dev` – run Laravel server, queue, logs and Vite in parallel
- `composer test` – run Pest/PHPUnit suite
- `python scripts/generate_dashboard_assets.py` – rebuild the Tailwind dashboard catalog and assets (requires Pillow)

## Contributing
Please read [CONTRIBUTING.md](CONTRIBUTING.md) and follow Conventional Commits.


