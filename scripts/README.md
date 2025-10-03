# scripts/ — Dashboard Demo Tooling

This directory contains the only source of truth for dashboard demos, gallery thumbnails, and manifest generators. All previous copies under `backend/` have been removed: regenerate artifacts from here instead.

## Contents
- `generate_dashboard_assets.py` → Creates the Tailwind/React dashboard bundles and updates the dashboard catalog JSON.
- `manifests/` & `thumbnails/`   → Generated outputs used by the landing page showcase.

## Usage
```bash
python scripts/generate_dashboard_assets.py
```

The script will:
1. Rebuild dashboard JSX + Tailwind stubs inside `scripts/output/` (or the configured target).
2. Refresh the catalog manifest consumed by the frontend.
3. Render/overwrite thumbnails.

> ⚠️ Outputs are overwritten on each run. Commit any manual tweaks elsewhere before regenerating.

## Notes
- Keep any new demo tooling inside this folder so the repo maintains a single authoritative location for showcase assets.
- Frontend and backend packages should import generated data instead of shipping their own copies.
