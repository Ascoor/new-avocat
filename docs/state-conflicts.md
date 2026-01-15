# Modals / Tabs / Tree State Conflicts Audit

## Findings (Potential Issues)

### 1) Dashboard: Search → Client → Tree
- **State shape**: `selectedClient` + `viewState` in parent.
- **Issue**: when `query` changes, `activeResultIndex` resets but `selectedClient` remains until cleared manually. If a user types a new query while a client is selected, the results panel is hidden (`selectedClient` truthy), so they cannot see new matches without explicitly “Back to search.”
- **Impact**: perceived stale state, confusion when switching clients quickly.

### 2) Tabs inside `LegalCaseDetails`
- **State shape**: `activeTab` stored in parent; section components re-mount on tab change.
- **Issue**: each tab’s component fetches on mount. Switching tabs causes repeated network calls and resets internal state like `sectionOpen`, `editing` state.
- **Impact**: user loses expanded/collapsed preferences when tab toggles; unnecessary re-fetching.

### 3) `ClientsSection` (case detail) shared search term
- **State shape**: `searchTerm` single state for all pending rows.
- **Issue**: multiple pending rows share the same search input value, meaning typing in one row updates dropdowns for all rows and can lead to incorrect selections if multiple rows are open.
- **Impact**: selection collisions and confusion on multi-row add.

### 4) `CaseSection` controlled/uncontrolled toggle
- **State shape**: `CaseSection` can be controlled or uncontrolled; in sections it is controlled via `sectionOpen` state.
- **Issue**: local state resets to default (`true`) when parent re-mounts sections (e.g., tab changes), losing collapsed state even if user toggles.
- **Impact**: inconsistent UX in case/service detail views.

### 5) `ServiceFormDialog` association type
- **State shape**: `associationType` + `client_id`/`unclient_id`.
- **Issue**: toggling association type zeroes the opposite field, but on edit it depends on fetched data. If the user switches type and cancels, the next open can retain previous state if form reset path is missed.
- **Impact**: potential stale values and confusing defaults when re-opening dialog.

## Recommendations

- Persist `viewState` in URL params to avoid hidden search results and enable back/forward navigation.
- Use `keepMounted` or `TabsContent` with `forceMount` and internal caching to avoid re-fetching on every tab switch.
- Convert `ClientsSection` search state to per-row (`searchTermByRow` keyed by index or row id).
- Lift `sectionOpen` to parent or persist it in context so collapses survive re-renders.
- Ensure dialogs reset local state in `onOpenChange(false)` handlers and rely on a shared `resetForm()`.

