# Backend (Laravel) / الواجهة الخلفية

Laravel 12 application using Sanctum for SPA auth and Passport for external APIs. Built with PHP 8.2, Vite and Tailwind.

## Setup
```bash
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate
npm install
npm run dev
```

## Running
- `php artisan serve` to start the HTTP server
- `npm run dev` for Vite assets
- `composer dev` runs server, queue worker, logs and Vite together

## Testing
`composer test`

## CORS & CSRF
CORS limited to `FRONTEND_URL` with credentials enabled.
Call `/sanctum/csrf-cookie` once before mutating requests.

## Auth Modes
- **Sanctum:** session cookies for SPA
- **Passport:** bearer tokens for third parties

