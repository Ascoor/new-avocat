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

## UI State & Navigation

Theme and sidebar visibility are managed via `UiProvider` in `src/contexts/UiContext.tsx`. The provider persists the `theme` and `sidebarOpen` preferences to `localStorage` and applies the `dark` class on the document element.

`LanguageProvider` updates the document `dir` and `lang` attributes so the layout flips instantly when switching languages.

To add navigation items, edit `src/components/layout/Sidebar.tsx` and include a new `<Link>` with a translation key. Provide matching entries in `src/i18n/locales/en.json` and `src/i18n/locales/ar.json` under the `sidebar` namespace.

