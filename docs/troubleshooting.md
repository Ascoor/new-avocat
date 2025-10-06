# Troubleshooting admin API errors

When you open the web admin UI without an authenticated admin session you will see the browser console fill up with messages like:

```
Failed to load resource: the server responded with a status of 401 (Unauthorized)
GET http://127.0.0.1:8000/api/admin/auth/me 401 (Unauthorized)
GET http://127.0.0.1:8000/api/admin/website/pages 401 (Unauthorized)
GET http://127.0.0.1:8000/api/admin/website/testimonials 404 (Not Found)
```

These errors originate from the frontend calling Laravel Sanctum-protected endpoints. The relevant routes are defined in [`backend/routes/api.php`](../backend/routes/api.php) and all `/api/admin/...` routes require an authenticated Sanctum token that belongs to a user with the `admin` role. Until you log in, the interceptor in [`frontend/src/api/axiosConfig.ts`](../frontend/src/api/axiosConfig.ts) has no bearer token to attach, so Sanctum responds with `401 Unauthorized`.

To resolve the issue:

1. Log in through the normal authentication flow (`/api/auth/login`). The response contains an `access_token` that the frontend stores in `sessionStorage`.
2. After a successful login refresh, the axios interceptor sends the `Authorization: Bearer <token>` header, allowing requests such as `/api/admin/auth/me` and `/api/admin/website/pages` to succeed.

If you are logged in as a non-admin user, the same calls will still fail with `403 Forbidden` because of the `role:admin` middleware on those routes. Switch to an account whose `role` value maps to `admin`.

The `404 Not Found` responses for `/api/admin/website/testimonials` and `/api/admin/website/articles` occur because the backend only exposes `team`, `achievements`, and `articles` CRUD endpoints inside the `/api/website` prefix. There is currently no `/api/admin/website/testimonials` route, so the frontend call returns `404`. Fetch testimonials from the page content instead, or add the missing backend route before calling it.

In short, authenticate with an admin account before visiting the admin dashboard and avoid calling routes that are not implemented on the backend.
