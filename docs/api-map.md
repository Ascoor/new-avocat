# API Map (Frontend Calls)

> Source of truth: `frontend/src/api/*.ts` + hooks. All endpoints are called through the shared Axios instance with auth/refresh logic.

## Axios Instance & Auth
- **Base URL**: `http://127.0.0.1:8000` (configurable in `frontend/src/config/config.ts`).
- **Default headers**: `Accept: application/json`, `Content-Type: application/json`.
- **Auth**: bearer token is read from `sessionStorage` key `token` and injected into every request. Token is refreshed via `POST /api/auth/refresh` on `401`/`419` responses (except auth endpoints). If refresh fails, client broadcasts `auth:unauthorized`.

## Authentication
- `POST /api/auth/login`
  - **Payload**: `{ email, password }`.
  - **Response**: `{ user, access_token }`.
- `POST /api/auth/register`
  - **Payload**: `{ name, email, password, password_confirmation, role }`.
  - **Response**: `{ user, access_token }`.
- `GET /api/auth/profile`
  - **Response**: `ApiUser`.
- `POST /api/auth/refresh`
  - **Response**: `{ access_token? }`.

## Clients
- `GET /api/clients`
  - **Response**: `Client[]` or `{ clients: Client[] }` or `{ data: Client[] }` (normalized in `clients.service.ts`).
- `GET /api/clients/:id`
  - **Response**: `Client`.
- `POST /api/clients`
  - **Payload**: `Partial<Client>`.
  - **Response**: created `Client`.
- `PUT /api/clients/:id`
  - **Payload**: `Partial<Client>`.
  - **Response**: updated `Client`.
- `DELETE /api/clients/:id`
  - **Response**: empty/204.

## Unclients (Prospects)
- `GET /api/unclients`
  - **Response**: `Unclient[]` or `{ unclients: Unclient[] }` or `{ data: Unclient[] }` (normalized).
- `GET /api/unclients/:id`
  - **Response**: `Unclient`.
- `POST /api/unclients`
  - **Payload**: `Partial<Unclient>`.
  - **Response**: created `Unclient`.
- `PUT /api/unclients/:id`
  - **Payload**: `Partial<Unclient>`.
  - **Response**: updated `Unclient`.
- `DELETE /api/unclients/:id`
  - **Response**: empty/204.

## Legal Cases
- `GET /api/legal-cases`
  - **Response**: `LegalCase[]`.
- `GET /api/legal-cases/:id`
  - **Response**: `{ leg_case: LegalCase }`.
- `POST /api/legal-cases`
  - **Payload**: `LegalCaseCreateDTO`.
  - **Response**: created `LegalCase`.
- `PUT /api/legal-cases/:id`
  - **Payload**: `LegalCaseUpdateDTO`.
  - **Response**: updated `LegalCase`.
- `DELETE /api/legal-cases/:id`
  - **Response**: empty/204.
- `GET /api/legal-case-search?query=...`
  - **Response**: `LegalCase[]`.

### Legal Case Relations
- `POST /api/legal-cases/:caseId/add_clients`
  - **Payload**: `{ clients: [{ client_id: string }] }`.
- `DELETE /api/legal-cases/:caseId/clients/:clientId`
  - **Response**: empty/204.
- `POST /api/legal-cases/add_courts`
  - **Payload**: `{ leg_case_id: string, courts: [{ case_number, case_year, court_level_id, court_id }] }`.
- `DELETE /api/leg-case/remove-court`
  - **Payload**: `{ leg_case_id: string, court_id: string }` (sent in body).

### Legal Case Metadata
- `GET /api/case_types` | `GET /api/case_types/:id` | `POST /api/case_types` | `PUT /api/case_types/:id` | `DELETE /api/case_types/:id`
- `GET /api/case_sub_types` | `GET /api/case_sub_types/:id` | `POST /api/case_sub_types` | `PUT /api/case_sub_types/:id` | `DELETE /api/case_sub_types/:id`

## Procedures
- `GET /api/procedures`
- `GET /api/procedures/:id`
- `POST /api/procedures`
- `PUT /api/procedures/:id`
- `DELETE /api/procedures/:id`
- `GET /api/procedures/leg-case/:legCaseId`
- `GET /api/procedure_types`
- `GET /api/procedure_place_types`

## Sessions
- `GET /api/legal_sessions`
- `GET /api/legal_sessions/leg-case/:legCaseId`
  - **Response**: `{ data: LegalSession[] }`.
- `GET /api/legal_session_types/`
- `GET /api/legal_sessions/court/:courtId`
- `GET /api/legal_sessions/lawyer/:lawyerId`
- `POST /api/legal_sessions`
- `PUT /api/legal_sessions/:id`
- `DELETE /api/legal_sessions/:id`

## Legal Ads
- `GET /api/legal-ads`
- `GET /api/legal-ads/:legCaseId`
- `GET /api/legal_ad_types`
- `POST /api/legal-ads`
- `PUT /api/legal-ads/:id`
- `DELETE /api/legal-ads/:id`
- `POST /api/legal_ad_types`

## Courts
- `GET /api/courts`
- `GET /api/courts/:id`
- `POST /api/courts`
- `PUT /api/courts/:id`
- `DELETE /api/courts/:id`

## Lawyers
- `GET /api/lawyers`
- `GET /api/lawyers/:id`
- `POST /api/lawyers`
- `PUT /api/lawyers/:id`
- `DELETE /api/lawyers/:id`

## Services
- `GET /api/services`
  - **Response**: `{ services: ServiceRecord[] }`.
- `GET /api/services/:id`
  - **Response**: `{ service: ServiceRecord }`.
- `POST /api/services`
  - **Payload**: `ServiceFormInput`.
- `PUT /api/services/:id`
  - **Payload**: `ServiceFormInput`.
- `DELETE /api/services/:id`
- `GET /api/service-types`
  - **Response**: `{ data: ServiceTypeOption[] }`.

## Office Settings
- `GET /api/expense_categories`
- `POST /api/expense_categories`
- `PUT /api/expense_categories/:id`
- `DELETE /api/expense_categories/:id`
- `GET /api/office/branding`
- `POST /api/office/branding` (multipart/form-data)

## Admin Website (CMS)
- `GET /api/admin/auth/me`
- `GET /api/admin/website/pages`
- `GET /api/admin/website/pages/:slug`
- `PUT /api/admin/website/pages/:slug`
- `POST /api/admin/website/pages/:slug/preview`
- `POST /api/admin/website/pages/:slug/publish`
- `POST /api/admin/website/pages/publish-all`
- `POST /api/admin/website/pages/:slug/request-approval`
- `POST /api/admin/website/pages/:slug/approve`
- `POST /api/admin/website/pages/:slug/schedule`
- `DELETE /api/admin/website/pages/:slug/schedule`
- `GET /api/admin/website/pages/publishing-queue`
- `GET /api/admin/website/pages/:slug/history`
- `POST /api/website/upload` (multipart/form-data)
- `GET /api/admin/website/report`
- `GET /api/admin/website/activity` (fallback to `GET /api/website/activity` on auth errors)
- `GET /api/admin/website/team`
- `POST /api/admin/website/team`
- `PUT /api/admin/website/team/:id`
- `DELETE /api/admin/website/team/:id`
- `GET /api/admin/website/achievements`
- `POST /api/admin/website/achievements`
- `PUT /api/admin/website/achievements/:id`
- `DELETE /api/admin/website/achievements/:id`
- `GET /api/admin/website/articles`
- `POST /api/admin/website/articles`
- `PUT /api/admin/website/articles/:id`
- `DELETE /api/admin/website/articles/:id`
- `GET /api/admin/website/testimonials`
- `POST /api/admin/website/testimonials`
- `PUT /api/admin/website/testimonials/:id`
- `DELETE /api/admin/website/testimonials/:id`

## Error Codes & Behaviors (Observed)
- **401/419**: triggers token refresh (`/api/auth/refresh`) if not already retried.
- **401** (non-auth endpoints) after refresh failure: broadcasts `auth:unauthorized` and clears token.
- **403** (admin activity log): falls back to public activity endpoint.

## Caching / Pagination
- **Caching**: React Query caches lists by key (`clients`, `services`, `legal-cases`, etc.).
- **Pagination**: handled client-side in `DetailsTable`. No server-side pagination in current calls.
