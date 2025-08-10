# Security Notes / الملاحظات الأمنية

## CORS
Configured in `backend/config/cors.php` to allow `FRONTEND_URL`, support credentials, and expose `auth/*` and `sanctum/csrf-cookie` paths.

## CSRF & Cookies
- SPA must call `/sanctum/csrf-cookie` before mutating requests.
- Sessions stored in HTTP-only cookies.

## Headers
`X-XSRF-TOKEN` automatically managed by Axios.

## Rate Limiting
Laravel default throttling applies; customize as needed.

## Secrets
Use `.env` files; never commit real secrets.

