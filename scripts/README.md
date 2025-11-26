# scripts/

This folder groups developer tooling and dashboard demo generators.

## Development orchestrator
- `dev.sh` – Starts both apps from the repo root (React on port 3000, Laravel on 8000). Safe to run multiple times; re-installs dependencies when missing.

```bash
bash scripts/dev.sh
```

## Dashboard demo tooling
- `generate_dashboard_assets.py` → Creates the Tailwind/React dashboard bundles and updates the dashboard catalog JSON.
- `dashboards/` → Source templates for demo dashboards.

```bash
python scripts/generate_dashboard_assets.py
```

The generator will:
1. Rebuild dashboard JSX + Tailwind stubs inside `scripts/output/` (or the configured target).
2. Refresh the catalog manifest consumed by the frontend.
3. Render/overwrite thumbnails.

> ⚠️ Outputs are overwritten on each run. Commit any manual tweaks elsewhere before regenerating.

## Notes
- Keep any new demo tooling inside this folder so the repo maintains a single authoritative location for showcase assets.
- Frontend and backend packages should import generated data instead of shipping their own copies.
