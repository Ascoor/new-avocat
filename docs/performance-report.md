# Performance & Stability Report

## Observations

### 1) Large Tables without Virtualization
- `DetailsTable` renders full datasets in the DOM (clients, services, cases). For large datasets, rendering all rows + selection + details card will cause slow initial render and heavy reflows.
- **Recommendation**: introduce virtualization (e.g., `react-virtual` or `react-window`) and limit rows per page if server pagination isn’t available.

### 2) Repeated Fetch on Tab Switch
- In `LegalCaseDetails`, tab contents unmount/mount when switching tabs, causing `useEffect` fetches in `ProceduresSection`, `SessionsSection`, and `AdsSection` to fire repeatedly.
- **Recommendation**: keep tab panels mounted or cache data in parent; also consider React Query for these lists to avoid refetching.

### 3) Dashboard Search Re-render Pressure
- `DashboardPage` uses `useMemo` for filtering but re-renders a large results table on every keystroke. With real data, this can trigger unnecessary rendering.
- **Recommendation**: debounce input + memoize row renderers; consider server-side search if dataset is large.

### 4) Framer Motion Layout Animations
- `CaseSection` animates height with `framer-motion` and `overflow-hidden`. When nested tables are large, layout thrashing can occur.
- **Recommendation**: disable animations for large tables or use CSS transitions with `max-height` and reduced animation frequency.

### 5) State Duplication & Invalidations
- Several modals refetch parent data via `onChanged` + local refetch, which can cause double re-renders.
- **Recommendation**: consolidate data fetching and use React Query to manage invalidation in a single place.

## Memoization Targets

- **`DetailsTable` row rendering**: memoize rows or split into smaller memoized components.
- **`DashboardPage` search results**: memoize rows and highlight logic.
- **`ServiceDetails` procedures list**: extract rows into memoized components.

## Stability Improvements

- Add input debouncing for search fields.
- Use `AbortController` or React Query for in-flight requests on rapid tab switches.
- Prefer server pagination for large datasets.

