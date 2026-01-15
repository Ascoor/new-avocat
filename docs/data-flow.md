# Data Flow Analysis (Post-Auth)

## High-Level Flow (Search → Client → Case/Service)

```mermaid
flowchart LR
  A[Search Input (DashboardPage.query)] --> B[Client List (Client.list mock)]
  B --> C[Filtered Clients (useMemo)]
  C --> D[Results Table]
  D -->|Select client| E[Selected Client]
  E --> F[ViewState: section/case/service/subtab]
  F --> G[ClientTreeNav]
  F --> H[ClientDetailsView]
  H --> I[SubTab: procedures/sessions/ads]
```

## Detailed Flow (Legal Case Details)

```mermaid
flowchart TD
  A[LegalCasesPage] -->|useLegalCases| B[Legal Case List]
  B -->|row click| C[LegalCaseDetails route]
  C -->|useLegalCase(id)| D[LegalCase data]
  D --> E[CaseSummaryCard]
  D --> F[ClientsSection]
  D --> G[CourtsSection]
  D --> H[Tabs -> Procedures/Sessions/Ads]
  H --> I[ProcedureModal / SessionModal / LegalAdModal]
```

## Current State Ownership & Reset Behavior

### Dashboard Search
- **Parent-owned state**: `query`, `clients`, `selectedClient`, `viewState`, `activeResultIndex` in `DashboardPage`.
- **Child view**: `ClientTreeNav` + `ClientDetailsView` are pure renderers with state passed in.
- **Reset points**:
  - `handleSelectClient` resets `viewState` and `activeResultIndex`.
  - `useEffect` resets `activeResultIndex` whenever `query` changes.
  - `Clear search` resets `query` and `selectedClient`.

### Legal Case Details
- **Parent-owned**: `LegalCaseDetails` manages `activeTab`, `overviewExpanded` and holds `legCase` data.
- **Child state**:
  - Each section (`ClientsSection`, `CourtsSection`, `ProceduresSection`, `SessionsSection`, `AdsSection`) has its own `sectionOpen` + modal state.
  - Each section triggers `onChanged()` to refetch parent data and re-render summary.

### Services
- **Parent-owned**: `ServicesPage` holds dialog state.
- **Child state**: `ServiceFormDialog` holds fetch + form state, resolved from `serviceId`.

## Observed Risks & Redundancies

1. **Front-end filtering only**: search in `DashboardPage` and `DetailsTable` is client-side. No backend search for dashboard client selection.
2. **Mixed state resets**: sections independently hold `sectionOpen`, but `onChanged()` causes parent re-fetch + re-render → collapsing states may unexpectedly reset if data refetch leads to rerender/mount.
3. **Search term contention**: `ClientsSection` inside case detail uses a single `searchTerm` for multiple pending rows. Typing in one row affects dropdown results in all rows (shared state).
4. **Mock data in dashboard**: `pages/dashboard/api.ts` uses in-memory arrays; real API integration will alter flow and caching assumptions.

## Re-render & Race Conditions

- **Dashboard search**: `filteredClients` uses `query` and `clients`. Rapid typing + `setQuery` will re-render table each keystroke. If `Client.list()` becomes real network calls, consider debouncing.
- **Case detail tabs**: each tab unmounts on switch (content toggled by `TabsContent`), which re-runs `useEffect` + data fetch in sections upon switching.
- **Section modals**: open/edit flows trigger parent refetch + local fetch; combine to reduce duplication.

## Duplication Hotspots

- **Table logic**: `DetailsTable` search/sort logic replicated in multiple screens (clients, cases, services). If server pagination is added later, a single data controller should own search/sort.
- **Case/Service summary**: both use `EntitySummaryCard` with similar layout but separate mapping logic; standardize summary adapters.

## Proposed Fix Plan (Non-breaking)

### Phase 1: Layout & Wrapper Stabilization
- Remove nested width constraints (avoid double `shellContainer` usage).
- Ensure all tables sit inside overflow wrappers and use `min-w-full`.
- Normalize responsive grid breakpoints in dashboard search and detail layout.

### Phase 2: State & Navigation Harmonization
- Introduce a single view state machine for client → case/service → subtab selection.
- Keep `sectionOpen` state in parent if persistence across refetches is needed.
- Debounce search inputs (dashboard + details table search) to avoid render spikes.

### Phase 3: Navigation & Experience Enhancements
- Build a unified tree navigation component with virtualization for large lists.
- Persist last-selected case/service via URL params (shareable deep links).
- Add keyboard navigation for tab/tree and search results.

## Suggested “1/3 Results + 2/3 Details” Layout

- **Left (1/3)**: Search input + results table (clients) with a fixed max height and internal scroll.
- **Right (2/3)**: Selected client details (tree + detail view). Keep detail view scrollable and independent.
- **Behavior**: When no selection, right panel shows empty state. Avoid collapsing the overall container width on result expansion.

