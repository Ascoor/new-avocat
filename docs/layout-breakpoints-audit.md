# Layout & Tailwind Audit (Breakpoints + Collapse Causes)

## Key Containers & Width Constraints

1. **Double width constraint in dashboard**
   - `AppShell` wraps content with `shellContainer` (`max-w-screen-2xl`) inside `<main>`. `DashboardPage` wraps its content again with `shellContainer` and additional horizontal padding (`px-4 sm:px-6 lg:px-8`).
   - Result: nested `max-w-screen-2xl` + padding can compress the dashboard area further when results appear (especially if sidebars + `xl:px-40` are applied). This is a likely cause of the “dashboard shrinking” effect after search results render.

2. **`overflow-x-hidden` on multiple ancestors**
   - `body` and `#root` force `overflow-x-hidden` in `index.css`.
   - `AppShell` main also sets `overflow-x-hidden`.
   - Combined with wide tables or flex layouts, this can hide overflow instead of enabling scroll, making the UI feel “collapsed.”

3. **Collapsible sections with `overflow-hidden`**
   - `CaseSection` sets `overflow-hidden` at the section level and uses animated height transitions. When table contents exceed width/height, scroll wrappers need to be inside the content. Some sections correctly wrap with `overflow-x-auto`, but others use `DetailsTable` directly (which does not enforce an outer scroll container).

## Tailwind / CSS Conflicts

- **Custom CSS**: `styles/dashboard-shell.css` defines `.dashboard-shell` with `overflow: hidden`, and several layout classes with custom widths (`dashboard-inner` width `min(1200px, 100%)`). If the dashboard shell class is applied elsewhere, it can conflict with Tailwind `w-full`/`max-w-*` layouts.
- **Theme tokens**: `index.css` defines extra backgrounds and dark-mode gradients. If combined with `bg-*` classes, gradients can mask content contrast but not necessarily cause layout issues.

## Specific Layout Risks by Component

1. **Dashboard Search Panel**
   - Sticky search container (`sticky top-20`) + motion wrapper results table with `max-h-[320px]`. If the parent container is constrained, the table area can push the layout into a narrow column.

2. **Tables without explicit scroll wrappers**
   - `DetailsTable` expects to render inside a responsive container but is often used directly in page layouts without a `overflow-x-auto` parent. This becomes a problem on smaller widths.

3. **Grid layouts without `min-w-0`**
   - Grid layouts such as `lg:grid-cols-[280px_1fr]` do not include `min-w-0` on the right column, risking overflow when long strings or tables render.

## Root Causes for “Dashboard Shrink” (Likely)

- **Nested `shellContainer` + heavy padding** (AppShell + DashboardPage). The inner container has `max-w-screen-2xl`, and outer container adds `xl:px-40`, producing a narrow content column when combined with sidebar offsets.
- **Overflow hidden on body/root and main** prevents horizontal scroll for tables/search results, making the layout appear clipped.
- **Animated sections with `overflow-hidden`** (CaseSection) combined with heavy tables might exacerbate clipping during expand/collapse animations.

## Fix Checklist (Non-breaking)

- [ ] Remove `shellContainer` usage inside `DashboardPage` and rely on `AppShell` container.
- [ ] Add `min-w-0` to grid/column layouts that hold tables or long text.
- [ ] Ensure every table (DetailsTable or raw `<table>`) is wrapped with `overflow-x-auto` and has `min-w-full`.
- [ ] Audit and remove redundant `overflow-x-hidden` in layout ancestors when inner scroll is expected.


## Repro Steps (Expected)
1. Open dashboard after login.
2. Focus search input and type any client query.
3. Observe results dropdown render. Dashboard content width appears more constrained.
4. Select a client; the detail view renders with a two-column layout and scrollable table.
5. Resize window to smaller width; observe table clipping and horizontal overflow hidden.

