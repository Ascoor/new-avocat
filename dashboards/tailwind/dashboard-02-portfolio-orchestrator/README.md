# Dashboard 02 – Portfolio Orchestrator

## Structure
- **Layout**: Three-column grid (icon rail, command panel, workspace) optimized for wide desktops.
- **Content**: Project health meters, kanban lanes, async milestone timeline, milestone list, CTA footer.

## Sidebar toggle
On tablet/mobile add `data-open` attribute to the command panel and animate with `translate-x-full`.

## Lazy loading
`TimelineChart` is deferred via `React.lazy` with a shimmer fallback to emphasize streaming load.

## Notes
- Kanban items respond to hover and drag with Tailwind transitions.
- Filter button reveals slide-up drawer (see interactions list in manifest for classes).
