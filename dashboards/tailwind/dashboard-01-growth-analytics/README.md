# Dashboard 01 – Growth Analytics

## Structure
- **Layout**: Two-column grid with immersive gradient sidebar and flexible content column.
- **Content**: KPI highlights, dual async charts, acquisition table, experiment summary, task list, floating action button, modal.

## Sidebar toggle
Use a `data-open` attribute on the root `<aside>` and toggle `translate-x-full` for tablet/mobile overlays.

## Lazy loading
Charts are wrapped with `React.Suspense` and defined through inline `lazy` factories to emulate async loading.

## Notes
- Filters are rounded pills that respond to keyboard focus with `focus-visible:ring`.
- KPI counters animate via CSS transitions; JS hooks can add incremental counters on intersection.
