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

### CMS tables (pages, content blocks, revisions)
If you see a 503 from the website pages API complaining about missing `pages` or `content_blocks` tables, run the migrations that ship with the project:

```bash
php artisan migrate --path=database/migrations/2024_02_10_000100_create_pages_table.php \
    --path=database/migrations/2024_02_10_000200_create_content_blocks_table.php \
    --path=database/migrations/2024_02_10_001100_create_page_revisions_table.php \
    --path=database/migrations/2024_02_10_001000_add_workflow_fields_to_pages_table.php
```

This aligns the API responses with the frontend pages for contact, footer, and other CMS-managed routes.

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

