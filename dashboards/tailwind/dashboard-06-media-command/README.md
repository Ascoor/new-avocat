# Dashboard 06 – Media Command

## Structure
- **Layout**: Schedule rail, live control canvas, engagement column, moderation feed, modal.
- **Content**: Live preview, async engagement chart, clip grid, go-live FAB, upload modal.

## Schedule
Schedule rail toggles into overlay on tablet using `fixed inset-0` and `translate-x-full` classes controlled via JS.

## Lazy loading
`EngagementChart` is lazy-evaluated to simulate heavy analytics library.

## Notes
- Clip grid uses `group-hover` for subtle scaling.
- Moderation feed simple cards ready for virtualization when messages grow.
