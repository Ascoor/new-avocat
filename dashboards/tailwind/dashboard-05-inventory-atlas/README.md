# Dashboard 05 – Inventory Atlas

## Structure
- **Layout**: Header filter bar, sticky vertical tabs, stock cards, async heatmap, restock table, modal.
- **Content**: SKU overview, heatmap of utilization, restock priorities, supplier invite.

## Tabs
Tabs rely on `role="tablist"` with `aria-selected` for accessibility; toggle `translate-x-full` when converting to drawer.

## Lazy loading
`WarehouseHeatmap` uses `React.lazy` to defer heavy SVG/Canvas logic until visible.

## Notes
- CTA button centered at bottom for quick restock actions.
- Table becomes cards with `grid` utilities on narrow screens (documented in README guidance).
