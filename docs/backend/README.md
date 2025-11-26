# Backend guide (Laravel 12)

Use this document as the canonical landing page for backend contributors. Keep the operational notes inside `backend/README.md` for quick reference; use this file for structure and conventions.

## Layout
- `app/` – Domain code (controllers, models, policies, providers).
- `config/` – Framework and package configuration.
- `database/` – Migrations and seeders for legal case data.
- `resources/` – Blade templates, mail views, and Vite entrypoints.
- `routes/` – HTTP API definitions (`api.php`, `web.php`).
- `tests/` – Pest/PHPUnit suite. Expand coverage alongside new endpoints.

## Setup recap
Most workflows mirror the quick start in `backend/README.md`:

```bash
cd backend
cp .env.example .env
composer install && php artisan key:generate && php artisan migrate
npm install && npm run dev
php artisan serve
```

## Troubleshooting
- Authentication failures on admin routes are documented in [`troubleshooting.md`](./troubleshooting.md).
- When adding middleware-protected routes, confirm your Sanctum + role guards are wired in `routes/api.php`.
