# Avocat Migration Progress

This document tracks the migration of legacy React code from the `old` folder into the new TypeScript based project structure.

## Completed

- **Created `fakeData.ts`**
  - Converted `old/Data.js` to TypeScript interfaces and exported dataset for demo components.
- **Migrated `HomeCards` component**
  - Added `src/components/common/HomeCards.tsx` with typed props and modern React hooks. 
  - Uses the new `fakeData` module.
 
- **Added `CaseDashboard` page**
  - New route `/cases/:id` rendering `CaseDashboard` with sample tables.
  - Includes view action from cases list.
- **Fixed actions icons**
  - Updated `Cases` and `Sessions` pages to pass React elements instead of icon
    components, resolving runtime errors. 
- **Migrated Add/Edit forms**
  - Added initial forms under `src/components/forms` using React Hook Form.

- **Case details pages**
  - Created type-safe tables and modals for courts, clients, sessions, procedures and ads using React Hook Form with Zod.
  - Added new services `ads.ts` and forms `AddEditProcedureForm`, `AddEditAdForm`.
  - Integrated routes `/procedures/legal` and `/procedures/announcements`.

## Pending

- Analysis of remaining components under `old/components` (~150 files).
- Review and expand typed API service modules.
- Integration of legacy pages with React Router and Zustand state management.
- Adding i18n keys for all Arabic strings.
- RTL layout review and style cleanup.
- Complete migration of complex forms (services, procedures) and field mapping.
=======
- **Legacy analysis documented**
  - Added `docs/old-analysis.md` summarizing entities and lifecycle of the `old` folder.
- **Created typed API layer**
  - New `src/services/apiClient.ts` with Axios instance and token interceptor.
  - Added `clients.ts`, `lawyers.ts` and `legalServices.ts` typed service helpers.
  - Updated `clientsStore` to use the new services.
======= 
## Pending

- Migrate remaining components under `old/components` (~150 files).
- Convert all API utilities to TypeScript and adopt React Query hooks.
- Integrate legacy pages with React Router and Zustand state management.
- Add i18n keys for Arabic strings and implement full RTL support.
- Write unit tests for new services and forms. 

## Notes

This is an initial step to demonstrate the migration approach. Further work is required to replace legacy contexts and class components with hooks, and to ensure full TypeScript coverage across all modules.
