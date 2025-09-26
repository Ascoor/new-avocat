# Legal Icon System

This directory contains the canonical icon library for the Avocat frontend. It includes outline SVG masters, placeholders for filled/3D assets, and build-ready exports.

## Directory structure

```
icons/
  svg/
    outline/        # Optimised SVG masters (24×24 view box)
    filled/         # Reserved for filled icons (TBD)
  png/
    16/ 24/ 32/ 64/ # Raster exports for legacy contexts
  webp/             # Modern raster exports
  README.md
src/
  icons/
    system/
      design-tokens.ts
      icon-manifest.json
      IconRegistry.ts
      ai-prompts.json
```

## Design tokens

See `src/icons/system/design-tokens.ts` and `src/styles/icon-tokens.css` for a maintained set of color, stroke, and shadow variables. These provide a single source of truth for icon styling.

## Manifest

`icon-manifest.json` lists every icon id, stroke weight, size support, and file path. Update this file when adding or replacing icons. Use the same `id` across SVG/PNG/WebP exports.

## React usage

Use the shared `<LegalIcon iconKey="cases" />` component to render icons with consistent gradients and sizing, or import raw SVGs from `IconRegistry` for specialized use cases.

## Export workflow

1. Generate or design new icons following the prompts in `ai-prompts.json`.
2. Optimise SVGs with `svgo` prior to committing (`npx svgo icons/svg/outline/*.svg`).
3. Export 16/24/32/64px PNG & WebP assets for each icon using your design tool or automation pipeline.
4. Update `icon-manifest.json` and run `npm run lint` to ensure TypeScript references remain valid.

## QA checklist

- ✅ Legible at 16px, 24px, 32px.
- ✅ Stroke weight matches design tokens (1.5px at 24px baseline).
- ✅ Contrast ratios meet WCAG 2.1 guidelines (≥4.5:1 for interactive icons).
- ✅ RTL-safe (no asymmetric details unless mirrored intentionally).
- ✅ Metadata updated (manifest, React wrapper, changelog).

