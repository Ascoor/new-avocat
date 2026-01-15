import { useEffect, type ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';

import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { getOfficeBrandingSettings } from '@/api/officeSettings.service';
import { getReadableForeground, hexToHsl, hslToString, shiftLightness } from '@/lib/color';

interface BrandingProviderProps {
  children: ReactNode;
}

const applyBrandingTokens = (
  themeMode: 'light' | 'dark',
  branding?: Awaited<ReturnType<typeof getOfficeBrandingSettings>>,
) => {
  if (typeof window === 'undefined' || !branding) {
    return;
  }

  const theme = branding.theme?.[themeMode];
  if (!theme) {
    return;
  }

  const primary = hexToHsl(theme.primary);
  const surface = hexToHsl(theme.surface);
  const accent = hexToHsl(theme.accent);

  if (!primary || !surface || !accent) {
    return;
  }

  const muted = shiftLightness(surface, themeMode === 'dark' ? 6 : -6);
  const border = shiftLightness(surface, themeMode === 'dark' ? 12 : -12);
  const foreground = getReadableForeground(surface);
  const primaryForeground = getReadableForeground(primary);
  const accentForeground = getReadableForeground(accent);

  const root = window.document.documentElement;

  root.style.setProperty('--color-primary', hslToString(primary));
  root.style.setProperty('--color-surface', hslToString(surface));
  root.style.setProperty('--color-accent', hslToString(accent));
  root.style.setProperty('--color-muted', hslToString(muted));
  root.style.setProperty('--color-border', hslToString(border));

  root.style.setProperty('--brand-primary', hslToString(primary));
  root.style.setProperty('--primary', hslToString(primary));
  root.style.setProperty('--primary-foreground', primaryForeground);
  root.style.setProperty('--accent', hslToString(accent));
  root.style.setProperty('--accent-foreground', accentForeground);

  root.style.setProperty('--surface', hslToString(surface));
  root.style.setProperty('--surface-raised', hslToString(shiftLightness(surface, themeMode === 'dark' ? 4 : -4)));
  root.style.setProperty('--background', hslToString(surface));
  root.style.setProperty('--card', hslToString(surface));
  root.style.setProperty('--muted', hslToString(muted));
  root.style.setProperty('--border', hslToString(border));
  root.style.setProperty('--foreground', foreground);
  root.style.setProperty('--ring', hslToString(accent));
};

const BrandingProvider = ({ children }: BrandingProviderProps) => {
  const { isAuthenticated } = useAuth();
  const { resolvedTheme } = useTheme();

  const { data } = useQuery({
    queryKey: ['office-branding'],
    queryFn: getOfficeBrandingSettings,
    enabled: isAuthenticated,
    staleTime: 10 * 60 * 1000,
  });

  useEffect(() => {
    applyBrandingTokens(resolvedTheme, data);
  }, [data, resolvedTheme]);

  return children;
};

export default BrandingProvider;
