# Dashboard 03 – Payments Hub

## Structure
- **Layout**: Compact sidebar + analytics stage with dual charts, settlement table, and compliance feed panel.
- **Content**: Balance summary, async revenue chart, volume bars, settlement queue, bottom drawer filters, FAB.

## Sidebar toggle
Convert sidebar to overlay on tablet using `lg:hidden` fallback and `fixed inset-y-0` with translate transforms.

## Lazy loading
`RevenueChart` and `VolumeChart` lazy factories simulate heavy chart bundles; wrap them with `Suspense` for skeleton fallback.

## Notes
- Table rows highlight using Tailwind transitions, ready for row selection.
- Filter drawer uses `data-[state=open]:translate-y-0` to slide into view.
