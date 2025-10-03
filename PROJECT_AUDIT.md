# Repository Audit – new-avocat

## Executive Summary
- **Monorepo structure:** Laravel backend (`backend/`) paired with a React + Vite frontend (`frontend/`), plus assorted scripts and CI configuration.
- **Key risks:** Version-controlled build artefacts (`backend/node_modules/`), committed environment secrets (`frontend/.env`), duplicate/unused React showcase files under both `backend/` and `scripts/`, and stale documentation referring to non-existent `docs/` and `dashboards/tailwind/` directories.
- **Recommended focus:** Remove generated assets from source control, consolidate duplicated dashboard/gallery demos, clean stray files (`update.patch`, `backend/[*,]`), and align READMEs with the current code layout.

## Root Directory
| Path | Role | Status & Recommendations |
| --- | --- | --- |
| `.gitignore` | Standard ignore rules for both apps. | Already excludes `node_modules/` and env files, but existing tracked copies (e.g. `frontend/.env`, `backend/node_modules/`) need manual removal to take effect. |
| `LICENSE` | MIT license stub. | OK. |
| `README.md` | Bilingual project overview. | Mentions `docs/` and `dashboards/tailwind/` trees that are absent—update or restore the referenced material. |
| `run_pro.sh` | Convenience script to start both apps. | Useful locally but Linux/macOS-specific (`lsof`, background jobs). Consider moving to `/scripts` and documenting Windows alternative. |
| `update.patch` | Git patch for API controllers. | Stale temporary artefact—remove after merging upstream changes. |
| `backend/` | Laravel 12 API service. | See [Backend Audit](#backend-audit). |
| `frontend/` | React 18 + TS client. | See [Frontend Audit](#frontend-audit). |
| `scripts/` | Dashboard generator + demo React files. | Duplicates of frontend showcase components—see [Scripts](#scripts). |
| `.github/` | Issue/PR templates and CI workflow. | Active. |

## Backend Audit
### Top-Level Items
| Path | Notes | Action |
| --- | --- | --- |
| `Gallery.tsx`, `Index.tsx` | React components living in Laravel root; duplicate of `/scripts/Gallery.tsx` and a placeholder landing page. | Remove or relocate to frontend if still needed. |
| `[*,]` | Zero-byte file with symbolic name. | Delete—likely an artefact from mis-generated scaffolding. |
| `dashboards/` | Ten dashboard demo components identical to `/scripts/dashboards`. | Deduplicate and host in a single location. |
| `node_modules/` | 80+ tracked dependencies. | Should be removed from VCS (`rm -rf` + add to `.gitignore` already in place). |
| `package.json` | Defines Vite/Tailwind pipeline for Laravel. | Active. |
| `composer.json` / `composer.lock` | Laravel dependencies (Pest, Passport, Sanctum, etc.). | Active but verify packages match PHP 8.2 baseline. |
| `storage/` | Contains `app/public`, logs, cache; currently empty skeleton. | Keep but ensure log/cache subpaths ignored (already in `.gitignore`). |

### `app/`
- Standard Laravel structure (Controllers, Models, Policies, Providers, etc.).
- API controllers for website (e.g. `ArticleController`, `TeamController`) align with pending patch in `update.patch`; merge patch or discard file.
- Check for unused scaffolding (e.g. policies/resources without routes) once routing inventory is complete.

### `database/`
- **Migrations:** Extensive set covering legal case domain plus future-dated records (e.g. `2025_09_09_010600_add_metadata_columns_to_articles_table.php`). Confirm these dates reflect backlog work or adjust to chronological order before running migrations in production.
- **Seeders:** Large catalogue of domain seeds; review necessity of `MyCustomSeeder.php` and other bespoke seeds, and consider grouping repeated logic.

### `routes/`
- Contains standard `api.php`, `web.php`, etc. Review to ensure dashboard/gallery demo endpoints are either wired or removed.

### `tests/`
- Pest test bootstrap present, but actual `Feature/` & `Unit/` suites appear sparse—expand coverage alongside backend stabilization.

## Frontend Audit
### Configuration & Meta
| Path | Notes | Action |
| --- | --- | --- |
| `.env` | Committed env file with placeholders (API URL, JWT secret). | Remove from repo; rely on `.env.example` + local overrides. Last line lacks newline (`VITE_ENABLE_LOGGING=trueroot...`) causing prompt glitches. |
| `.env.example` | Clean example configuration. | Keep in sync after removing real `.env`. |
| `README.md` | Describes module map that no longer matches `src/` (mentions `auth/`, `dashboard/` roots). | Update to reflect actual directories (`api/`, `config/`, `data/`, etc.). |
| `package.json` / `package-lock.json` | Vite + Tailwind + shadcn stack. | Active—verify dependency freshness. |

### `src/`
- **Entry & Layout:** `main.tsx`, `App.tsx`, `index.css` with Tailwind base. Ensure unused imports removed.
- **Config:** `config/`, `providers/`, `contexts/`, `hooks/` directories are populated—document interplay in README.
- **Components:** `components/ui/` mirrors shadcn library; confirm all widgets are referenced to avoid shipping dead code.
- **Icons & Data:** `icons/` and `data/` include JSON manifests (`ai-prompts.json`, `icons-manifest.json`)—validate consumers exist or prune.
- **Pages:** `pages/` contains domain-specific routes; check for duplicates vs backend placeholders (e.g. `Index.tsx` vs landing page assets).
- **i18n:** Locale JSON files reference dashboard gallery strings despite gallery page living outside `src/pages`—remove if not used.

### `public/`
- Branding assets (logos) plus base `index.html`. Ensure dark/light variants referenced by UI components.

## Scripts
| Path | Notes | Action |
| --- | --- | --- |
| `generate_dashboard_assets.py` | Generates dashboard demo bundles. | Document prerequisites (Pillow) and expected output directories. |
| `Gallery.tsx`, `Index.tsx`, `dashboards/*.tsx` | React demos duplicated under `backend/`. | Keep a single source of truth (prefer `/scripts` for generation templates) and delete Laravel copies. |

## CI / Templates (`.github/`)
- `workflows/ci.yml` sets up CI; ensure jobs cover both PHP and Node stacks.
- Issue/PR templates exist; align with Conventional Commits as README suggests.

## Suggested Cleanup Checklist
1. Delete tracked artefacts: `frontend/.env`, `backend/node_modules/`, `update.patch`, `backend/[*,]`, duplicate dashboard/demo files under `backend/`.
2. Update READMEs to match actual structure and move `run_pro.sh` into a documented developer tooling area.
3. Review migrations dated in the future; adjust ordering or annotate rationale.
4. Audit `frontend/src/components/ui/` and locale strings for unused exports; remove dead code to lighten bundle size.
5. Expand automated tests (`backend/tests`, potential `frontend` unit/Vitest setup) to cover critical workflows.
