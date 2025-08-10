# Runbooks / أدلة التشغيل

## Development
- `cp backend/.env.example backend/.env`
- `composer install && php artisan migrate`
- `npm install && npm run dev`

## Production
- Set `APP_ENV=production`
- Run migrations and asset build
- Ensure HTTPS and secure cookies

## Environment Keys
Refer to `.env.example` files for required variables.

