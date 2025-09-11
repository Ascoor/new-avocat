# Frontend (React) / الواجهة الأمامية

Stack:
- React 18 + TypeScript + Vite
- Tailwind CSS
- Axios (`withCredentials: true`)
- React Hook Form + Zod
- i18next with RTL support

## Project Structure

The codebase follows a feature-first layout:

```
src/
├── components/        # UI and common components
├── features/          # domain features (auth, dashboard, etc.)
├── pages/             # route components
├── utils/             # shared utilities (e.g. errorHandler)
└── context/           # global contexts such as theme & language
```

## Development

1. Create a `.env` file with `VITE_API_URL` pointing to the backend.
2. Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

## Testing

Run all unit tests with:

```bash
npm test
```

## Branding

The `BrandLogo` component automatically swaps logos based on the active theme (light/dark) and language direction (LTR/RTL).

