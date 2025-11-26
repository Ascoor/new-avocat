# Frontend guide (React + Vite)

This document orients contributors to the SPA located in `../frontend`.

## Layout
- `src/api/` – Axios clients and hooks used to call the Laravel API.
- `src/components/` – shadcn/ui components and layout primitives.
- `src/pages/` – Route-level pages (landing, dashboard shell, auth views).
- `src/utils/` – Cross-cutting helpers (i18n, scrolling, asset helpers).
- `public/` – Static assets served by Vite.

## Local development
```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

Point `VITE_API_URL` at your running Laravel server. Linting and unit tests are available via `npm run lint` and `npm run test`.
