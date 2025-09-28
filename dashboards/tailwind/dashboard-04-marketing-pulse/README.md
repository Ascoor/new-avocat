# Dashboard 04 – Marketing Pulse

## Structure
- **Layout**: Filter glass bar, metrics shelf, dual async charts, channel table, and actions sidebar.
- **Content**: Spend metrics, attribution donut, conversion trend, channel list, segment widgets, modal.

## Sidebar toggle
Sidebar hides below `lg` and can appear as overlay by toggling `fixed inset-0` with `translate-x-full` on the container.

## Lazy loading
`AttributionDonut` and `ConversionTrend` are lazy-defined for simulated heavy chart libs.

## Notes
- Filter chips use Tailwind transitions for hover + focus clarity.
- Table rows convert to cards on small screens via utility classes defined in README guidance.
