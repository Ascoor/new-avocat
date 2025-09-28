# Dashboard 19 – Content Studio

## Structure
- Header with filters, metric strip, async chart, twin panels, floating action button.
- Use `data-[state=open]` on overlays as needed for this dashboard type.

## Lazy loading
The main analytics widget is wrapped in `React.Suspense` with a pulse fallback.

## Notes
- Metric cards share the `.simple-card` Tailwind component class.
- Buttons inherit accent hover states from the manifest color palette.
