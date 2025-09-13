# Frontend (React) / الواجهة الأمامية

Stack:
- React 18 + TypeScript + Vite
- Tailwind CSS
- Axios (`withCredentials: true`)
- React Hook Form + Zod
- i18next with RTL support

## Project Structure

The codebase organizes domain modules at the top level:

```
src/
├── auth/              # authentication logic and guards
├── dashboard/         # dashboard state and components
├── notifications/     # notifications state
├── components/        # UI and common components
├── pages/             # route components
├── services/          # API services
├── utils/             # shared utilities (e.g. errorHandler)
└── contexts/          # global contexts such as theme & language
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

