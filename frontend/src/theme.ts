export const brandTheme = {
  colors: {
    primary: 'hsl(var(--primary))',
    accent: 'hsl(var(--accent))',
    background: 'hsl(var(--background))',
  },
  gradients: {
    primary: 'var(--gradient-primary)',
    hero: 'var(--gradient-hero)',
  },
  fonts: {
    brand: '"Cairo", sans-serif',
  },
};

export type BrandTheme = typeof brandTheme;
