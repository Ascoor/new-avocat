# Frontend Component Map (Post-Auth)

> Scope: components used after authentication (dashboard shell, search, clients, legal cases, services, lawyers). Landing/admin-only pages are excluded unless shared.

## Layout & Routing Shell

### `AppShell`
- **Path**: `frontend/src/components/layout/AppShell.tsx`
- **Props**: `children`, `title?`, `className?`, `layoutVariant?`, `showSidebarToggle?`
- **State**: none (reads sidebar + language context)
- **Dependencies**: `Sidebar`, `MobileDrawer`, `Header`, `useSidebar`, `useLanguage`, `shellContainer`, `shellSectionSpacing`.
- **Usage**: wraps all dashboard pages via `pages/Dashboard.tsx` and router layout.

### `Sidebar`
- **Path**: `frontend/src/components/layout/Sidebar.tsx`
- **Props**: none
- **State**: internal collapse state via `SidebarContext`.
- **Dependencies**: `useSidebar`, icons, nav config.
- **Usage**: persistent dashboard navigation.

### `Header`
- **Path**: `frontend/src/components/layout/Header.tsx`
- **Props**: `title?`, `showSidebarToggle?`, `sidebarWidth`, `sidebarSide`
- **State**: none
- **Dependencies**: `NotificationBell`, `LanguageToggle`, `ThemeToggle`, `useLanguage`, `useSidebar`.
- **Usage**: top bar for dashboard.

### `MobileDrawer`
- **Path**: `frontend/src/components/layout/MobileDrawer.tsx`
- **Props**: none
- **State**: drawer open state via `SidebarContext`.
- **Dependencies**: `Sidebar` content + `Sheet` UI.
- **Usage**: mobile navigation for dashboard.

### `AuthLayout`
- **Path**: `frontend/src/components/layout/AuthLayout.tsx`
- **Props**: `children`, `title?`, `subtitle?`, `actions?`
- **State**: none
- **Dependencies**: layout classes, `BrandLogo`.
- **Usage**: login/signup pages (pre-auth).

### `ProtectedRoute` / `AdminRoute`
- **Path**: `frontend/src/components/ProtectedRoute.tsx`, `frontend/src/components/AdminRoute.tsx`
- **Props**: `children`
- **State**: none
- **Dependencies**: `AuthContext`, `Navigate`.
- **Usage**: route guards after authentication.

## Dashboard & Search

### `DashboardPage`
- **Path**: `frontend/src/pages/dashboard/DashboardPage.tsx`
- **Props**: none
- **State**:
  - `query`, `clients`, `loadingClients`, `clientsError`
  - `selectedClient`, `activeResultIndex`
  - `viewState` (section/case/service/subtab)
- **Dependencies**: `QuickActions`, `DashboardStatCard`, `CasesByStatusChart`, `RecentCases`, `DashboardActivityItem`, `DashboardTaskItem`, `PageHeader`, `AppCard`, `Card`, `GlobalSpinner`, `useLanguage`, mock data from `pages/dashboard/api`.
- **Usage**: main post-auth landing. Provides search + detail layout.

### `ClientTreeNav` (inline)
- **Path**: `frontend/src/pages/dashboard/DashboardPage.tsx`
- **Props**: `client`, `viewState`, `isArabic`, `onChangeSection`, `onSelectItem`
- **State**: none
- **Dependencies**: uses in-file mock cases/services.
- **Usage**: left column “tree” in dashboard details view.

### `ClientDetailsView` (inline)
- **Path**: `frontend/src/pages/dashboard/DashboardPage.tsx`
- **Props**: `client`, `viewState`, `isArabic`, `onChangeSubTab`
- **State**: none
- **Dependencies**: local tab state from parent.
- **Usage**: right column for cases/services detail tabs.

### `QuickActions`
- **Path**: `frontend/src/components/dashboard/QuickActions.tsx`
- **Props**: `actions: Action[]`
- **State**: none
- **Dependencies**: `Action` model, icons, `Link`.
- **Usage**: dashboard shortcuts.

### `DashboardStatCard`
- **Path**: `frontend/src/components/dashboard/DashboardStatCard.tsx`
- **Props**: stat payload (title/value/icon/trend)
- **State**: none
- **Dependencies**: `Card`.
- **Usage**: KPI tiles on dashboard.

### `RecentCases`
- **Path**: `frontend/src/components/dashboard/RecentCases.tsx`
- **Props**: `title`, `cases`
- **State**: none
- **Dependencies**: `Card`, `CaseSummaryCard` UI.
- **Usage**: dashboard case list.

### `CasesByStatusChart`
- **Path**: `frontend/src/components/dashboard/CasesByStatusChart.tsx`
- **Props**: `data`, `title`
- **State**: none
- **Dependencies**: `recharts` + chart UI.
- **Usage**: dashboard chart panel.

### `DashboardActivityItem` / `DashboardTaskItem`
- **Path**: `frontend/src/components/dashboard/DashboardActivityItem.tsx`, `frontend/src/components/dashboard/DashboardTaskItem.tsx`
- **Props**: activity/task payload + formatting helpers
- **State**: none
- **Dependencies**: `Badge`, icons.
- **Usage**: dashboard activity + task list.

## Clients & Unclients

### `ClientsPage`
- **Path**: `frontend/src/pages/ClientsPage.tsx`
- **Props**: none
- **State**: none
- **Dependencies**: `ClientsSection`, `PageHeader`, `GlobalSpinner`.
- **Usage**: route `/dashboard/clients`.

### `ClientsSection`
- **Path**: `frontend/src/components/clientsAndUnclients/Clients/index.tsx`
- **Props**: none
- **State**: `open` (collapsible)
- **Dependencies**: `Collapsible`, `ClientsTable`.
- **Usage**: expandable wrapper around clients table.

### `ClientsTable`
- **Path**: `frontend/src/components/clientsAndUnclients/ClientsTable.tsx`
- **Props**: none
- **State**: dialog + selection state (`dialogOpen`, `dialogMode`, `selectedClient`, `confirmDelete`)
- **Dependencies**: `DetailsTable`, `ClientFormDialog`, `ConfirmDialog`, `useClients`, `useDeleteClient`, `updateClient`, `react-query`.
- **Usage**: main client list with CRUD and local search.

### `ClientFormDialog`
- **Path**: `frontend/src/components/clientsAndUnclients/ClientFormDialog.tsx`
- **Props**: `open`, `mode`, `initialData?`, `onOpenChange`, `onSaved?`
- **State**: form state + loading
- **Dependencies**: `createClient`, `updateClient`, `useAuth`, `react-hook-form`.
- **Usage**: create/edit/view client modal.

### `UnClientsPage` / `UnClientsSection` / `UnclientsTable`
- **Paths**: `frontend/src/pages/UnClientsPage.tsx`, `frontend/src/components/clientsAndUnclients/UnClients/index.tsx`, `frontend/src/components/clientsAndUnclients/UnclientsTable.tsx`
- **Props**: mostly none (internal CRUD state similar to clients)
- **State**: dialog + selection state
- **Dependencies**: `useUnclients`, `UnclientFormDialog`, `DetailsTable`.
- **Usage**: prospects list and CRUD.

### `UnclientFormDialog`
- **Path**: `frontend/src/components/clientsAndUnclients/UnclientFormDialog.tsx`
- **Props**: `open`, `mode`, `initialData?`, `onOpenChange`, `onSaved?`
- **State**: form state + loading
- **Dependencies**: `createUnclient`, `updateUnclient`, `useAuth`.
- **Usage**: create/edit/view unclient modal.

## Legal Cases

### `LegalCasesPage`
- **Path**: `frontend/src/pages/LegalCasesPage.tsx`
- **Props**: none
- **State**: `isModalOpen`, `selectedCase`
- **Dependencies**: `DetailsTable`, `useLegalCases`, `useDeleteLegalCase`, `AddEditLegalCaseModal`.
- **Usage**: case list (table + CRUD).

### `AddEditLegalCaseModal`
- **Path**: `frontend/src/components/legalCases/AddEditLegalCaseModal.tsx`
- **Props**: `isOpen`, `onClose`, `initialData?`
- **State**: form state, lookups, selected clients/courts/lawyers
- **Dependencies**: legal-case API, `useAuth`, `Dialog` UI.
- **Usage**: create/edit case modal.

### `LegalCaseDetails`
- **Path**: `frontend/src/components/legalCases/Details/LegalCaseDetails.tsx`
- **Props**: none (uses URL params)
- **State**: `activeTab`, `overviewExpanded`
- **Dependencies**: `CaseSummaryCard`, `ClientsSection`, `CourtsSection`, `ProceduresSection`, `SessionsSection`, `AdsSection`, `useLegalCase`.
- **Usage**: case detail view with tabs.

### `CaseSummaryCard`
- **Path**: `frontend/src/components/cases/CaseSummaryCard.tsx`
- **Props**: `legCase`, `expanded`, `onToggleExpanded`
- **State**: none
- **Dependencies**: `EntitySummaryCard`, `InfoList`.
- **Usage**: case detail summary header.

### `CaseSection`
- **Path**: `frontend/src/components/legalCases/Details/CaseSection.tsx`
- **Props**: `icon`, `title`, `subtitle?`, `actions?`, `children`, `open?`, `onOpenChange?`, `className?`, `contentClassName?`
- **State**: internal open/close when uncontrolled
- **Dependencies**: `framer-motion`, `useLanguage`.
- **Usage**: reusable collapsible card for case/service sections.

### `ClientsSection` (case detail)
- **Path**: `frontend/src/components/legalCases/Details/ClientsSection.tsx`
- **Props**: `caseId`, `clients`, `onChanged`
- **State**: `allClients`, `searchTerm`, `pendingClients`, `confirmDelete`, `sectionOpen`
- **Dependencies**: `getClients`, `addLegalCaseClients`, `removeLegalCaseClient`, `ConfirmDialog`, `Input`.
- **Usage**: link/unlink clients to case.

### `CourtsSection`
- **Path**: `frontend/src/components/legalCases/Details/CourtsSection.tsx`
- **Props**: `caseId`, `courts`, `onChanged`
- **State**: `availableCourts`, `newCourts`, `confirmDelete`, `sectionOpen`
- **Dependencies**: `getCourts`, `addLegalCaseCourts`, `removeLegalCaseCourt`, `Input`.
- **Usage**: link/unlink courts to case.

### `ProceduresSection`
- **Path**: `frontend/src/components/legalCases/Details/ProceduresSection.tsx`
- **Props**: `caseId`, `onChanged`
- **State**: `procedures`, `loading`, `modalOpen`, `editingProcedure`, `confirmDelete`, `sectionOpen`
- **Dependencies**: `getProceduresByLegCaseId`, `deleteProcedure`, `ProcedureModal`.
- **Usage**: procedure list + modal for case.

### `SessionsSection`
- **Path**: `frontend/src/components/legalCases/Details/SessionsSection.tsx`
- **Props**: `caseId`, `onChanged`
- **State**: `sessions`, `loading`, `modalOpen`, `editingSession`, `confirmDelete`, `sectionOpen`
- **Dependencies**: `getSessionsByLegCaseId`, `deleteSession`, `SessionModal`.
- **Usage**: sessions list + modal for case.

### `AdsSection`
- **Path**: `frontend/src/components/legalCases/Details/AdsSection.tsx`
- **Props**: `caseId`, `onChanged`
- **State**: `ads`, `loading`, `modalOpen`, `editingAd`, `confirmDelete`, `sectionOpen`
- **Dependencies**: `getLegalAdsByLegCaseId`, `deleteLegalAd`, `LegalAdModal`.
- **Usage**: ads list + modal for case.

### `ProcedureModal`, `SessionModal`, `LegalAdModal`
- **Paths**: `frontend/src/components/legalCases/Details/ProcedureModal.tsx`, `SessionModal.tsx`, `LegalAdModal.tsx`
- **Props**: `open`, `onClose`, `caseId`, `initialData?`, `onSuccess`
- **State**: form state, lookup lists, loading
- **Dependencies**: respective API services and `Dialog` UI.
- **Usage**: CRUD modals in case detail.

## Services

### `ServicesPage`
- **Path**: `frontend/src/pages/ServicesPage.tsx`
- **Props**: none
- **State**: `dialogOpen`, `dialogMode`, `selectedService`, `confirmOpen`
- **Dependencies**: `DetailsTable`, `ServiceFormDialog`, `getServices`, `deleteService`.
- **Usage**: service list + CRUD.

### `ServiceDetails`
- **Path**: `frontend/src/components/services/ServiceDetails.tsx`
- **Props**: none (uses URL params)
- **State**: `overviewExpanded`
- **Dependencies**: `ServiceSummaryCard`, `CaseSection`, `useService`.
- **Usage**: service detail view.

### `ServiceSummaryCard`
- **Path**: `frontend/src/components/services/ServiceSummaryCard.tsx`
- **Props**: `service`, `expanded`, `onToggleExpanded`
- **State**: none
- **Dependencies**: `EntitySummaryCard`, `InfoList`.
- **Usage**: summary header in service detail.

### `ServiceFormDialog`
- **Path**: `frontend/src/components/services/ServiceFormDialog.tsx`
- **Props**: `open`, `mode`, `serviceId?`, `onOpenChange`, `onSaved?`
- **State**: `formState`, `serviceTypes`, `clients`, `unclients`, `associationType`, `loading`, `isFetching`
- **Dependencies**: `getServiceTypes`, `getClients`, `getUnclients`, `createService`, `updateService`, `getServiceById`, `useAuth`.
- **Usage**: create/edit/view service modal.

## Lawyers

### `LawyersPage`
- **Path**: `frontend/src/pages/LawyersPage.tsx`
- **Props**: none
- **State**: none
- **Dependencies**: `LawyersList`, `PageHeader`.
- **Usage**: lawyer list route.

### `LawyersList`
- **Path**: `frontend/src/components/lawyers/LawyersList.tsx`
- **Props**: none
- **State**: `dialogOpen`, `dialogMode`, `selectedLawyer`, `confirmDelete`
- **Dependencies**: `getLawyers`, `deleteLawyer`, `LawyerFormDialog`, `LawyerSummaryCard`.
- **Usage**: list and CRUD for lawyers.

### `LawyerSummaryCard` / `LawyerDetails`
- **Paths**: `frontend/src/components/lawyers/LawyerSummaryCard.tsx`, `LawyerDetails.tsx`
- **Props**: summary card uses `lawyer` + callbacks, details uses URL params
- **State**: detail view has `overviewExpanded`
- **Dependencies**: `EntitySummaryCard`, `InfoList`.
- **Usage**: lawyer detail view.

## Shared UI & Common Components

### `DetailsTable`
- **Path**: `frontend/src/components/common/DetailsTable.tsx`
- **Props**: `data`, `columns`, `renderActions?`, `enableSearch?`, `enableSorting?`, `enablePagination?`, `enableExport?`, `enableRowSelection?`, etc.
- **State**: `searchTerm`, `sortKey`, `sortDirection`, `page`, `expandedRowId`, selection state.
- **Dependencies**: `Table`, `Input`, `Select`, `Checkbox`, `useLanguage`.
- **Usage**: all list views (clients, services, cases, sessions).

### `ConfirmDialog`
- **Path**: `frontend/src/components/common/ConfirmDialog.tsx`
- **Props**: `open`, `title`, `description`, `confirmLabel`, `cancelLabel`, `onConfirm`, `onClose`
- **State**: none
- **Dependencies**: `AlertDialog` UI.
- **Usage**: delete confirmations.

### `PageHeader`
- **Path**: `frontend/src/components/common/PageHeader.tsx`
- **Props**: `iconKey`, `title`, `subtitle?`, `actions?`
- **State**: none
- **Dependencies**: `LegalIcon`.
- **Usage**: headers for all pages.

### `GlobalSpinner`
- **Path**: `frontend/src/components/common/GlobalSpinner.tsx`
- **Props**: none
- **State**: none
- **Dependencies**: `Spinner` UI.
- **Usage**: Suspense fallback and loading.

### Other Shared
- **`EntitySummaryCard`** (`frontend/src/components/entity/EntitySummaryCard.tsx`): summary card container.
- **`InfoList`** (`frontend/src/components/entity/InfoList.tsx`): label/value lists.
- **`AppCard`, `KpiCard`, `TableActionButton`, `NotificationBell`, `ScrollToTopButton`** for shared UI patterns.

## UI Primitives

- **Path**: `frontend/src/components/ui/*`
- **Notes**: Shadcn-based primitives (`button`, `dialog`, `tabs`, `table`, `select`, etc.) used across dashboards, modals, and tables.

