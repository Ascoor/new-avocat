# Legacy React App Analysis

This document provides an overview of the `old` folder which contains the original JavaScript version of **Afokat**.

## Main Entities

- **Clients / Unclients** – managed under `components/ClientsAndUnClients` with pages for lists and editing.
- **Lawyers** – CRUD operations and dashboard widgets in `components/Lawyers`.
- **Courts** – court and court type management under `components/Courts`.
- **Legal Cases** – case lists, details and tools under `components/LegalCases`.
- **Legal Services** – service catalog in `components/LegalServices`.
- **Procedures** – procedure types and steps in `components/Procedures`.
- **Sessions** – court session listing and filtering in `components/Sessions`.
- **Financial** – expense tracking modules in `components/Financially`.
- **Reports** – printable reports and search tools in `components/Reports`.
- **Authentication** – login and register forms in `components/auth`.

APIs for these entities live inside `services/api`. Each file exposes basic CRUD helpers using Axios (e.g. `clients.js`, `lawyers.js`, `legalCases.js`).

Context providers supply cross‑cutting state:

- `DataContext.jsx` fetches initial data for lawyers, cases, procedures, sessions and courts.
- `AlertContext.jsx`, `SidebarContext.jsx` and `SpinnerContext.jsx` control global UI behaviours.

## Entity Lifecycle

1. **Form Input** – Components such as `AddEditLegCase.jsx` collect data from the user.
2. **API Call** – Form submissions call service helpers from `services/api` to POST/PUT data to the backend (`axiosConfig.js` holds the base URL and token interceptor).
3. **State Update** – After a successful response, local state or context is updated. Some lists re‑fetch data through `DataContext`.
4. **Listing** – Tables like `TableComponent.jsx` display entity data with edit/delete actions.
5. **Details & Relations** – Tools inside `LegalCaseTools` link cases with courts, clients, sessions, ads and procedures.
6. **Status Changes** – APIs allow updating status fields (e.g. `updateClientStatus`). Components reflect these changes in real time.

## Observations

- Arabic labels and RTL styles are hard coded throughout components.
- Services return raw Axios promises without TypeScript typing.
- State management relies on local component state and React Context, making it difficult to scale.
- Repeated patterns in forms and tables could be abstracted.

This analysis guides the migration to a modern TypeScript structure.
