# Dashboard v2 migration plan

## Structure overview

New v2 code lives alongside v1 so routes can migrate incrementally:

```
frontend/src/app/v2/          # v2 route wrappers + placeholders
frontend/src/features/        # v2 domain features (dashboard/clients/cases/services)
frontend/src/layout/          # v2 shell components (AppShell, Sidebar, Topbar)
frontend/src/theme/           # branding + theming system
frontend/src/lib/             # shared utilities + API adapters
```

## Route strategy

* **v1 stays intact** under `/dashboard/*`.
* **v2 lives under** `/dashboard-v2/*` with a new AppShell and routing stack.
* New pages are migrated by:
  1. Implementing the v2 screen under `src/features/...`.
  2. Adding a route entry under `/dashboard-v2/*`.
  3. Verifying parity with v1, then redirecting the v1 route when approved.

## Migration steps

1. **Dashboard landing**
   * Build the v2 landing page and KPI cards.
   * Embed the new Search Hub and workspace.

2. **Search hub + workspace**
   * Replace mock data in v1 search with live API queries.
   * Stabilize selection state and caching.

3. **Cases & Services**
   * Move case/service lists into `features/cases` and `features/services`.
   * Swap v1 routes to render v2 components when ready.

4. **Global UX**
   * Align branding tokens + theme provider across v1/v2.
   * Replace v1 sidebars with the v2 layout shell.

## Decommission plan

* Once a v2 route is approved, redirect the v1 path to its v2 equivalent.
* Remove duplicate v1 components only after analytics confirm adoption.
