export type HslColor = { h: number; s: number; l: number };

const clamp = (value: number, min = 0, max = 100) => Math.min(Math.max(value, min), max);

export const hexToHsl = (hex: string): HslColor | null => {
  const normalized = hex.replace('#', '').trim();
  if (![3, 6].includes(normalized.length)) {
    return null;
  }

  const expanded =
    normalized.length === 3
      ? normalized
          .split('')
          .map((char) => char + char)
          .join('')
      : normalized;

  const r = parseInt(expanded.slice(0, 2), 16) / 255;
  const g = parseInt(expanded.slice(2, 4), 16) / 255;
  const b = parseInt(expanded.slice(4, 6), 16) / 255;

  if ([r, g, b].some((value) => Number.isNaN(value))) {
    return null;
  }

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h = 0;
  if (delta !== 0) {
    if (max === r) {
      h = ((g - b) / delta) % 6;
    } else if (max === g) {
      h = (b - r) / delta + 2;
    } else {
      h = (r - g) / delta + 4;
    }
    h = Math.round(h * 60);
    if (h < 0) {
      h += 360;
    }
  }

  const l = (max + min) / 2;
  const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
};

export const hslToString = (color: HslColor) => `${color.h} ${color.s}% ${color.l}%`;

export const shiftLightness = (color: HslColor, delta: number) => ({
  ...color,
  l: clamp(color.l + delta),
});

export const getReadableForeground = (color: HslColor) =>
  color.l > 60 ? '225 45% 12%' : '0 0% 100%';
