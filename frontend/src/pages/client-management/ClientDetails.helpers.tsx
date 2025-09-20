import type { ComponentType } from 'react';

import { cn } from '@/lib/utils';

export interface DetailRowProps {
  label: string;
  value?: string | null;
  icon?: ComponentType<{ className?: string }>;
  align?: 'start' | 'center';
}

export const DetailRow = ({ label, value, icon: Icon, align = 'start' }: DetailRowProps) => (
  <div className="flex flex-col gap-1">
    <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
      {label}
    </span>
    <span
      className={cn(
        'flex items-center gap-2 text-sm text-foreground',
        align === 'center' && 'items-center'
      )}
    >
      {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      {value && value !== '' ? value : '—'}
    </span>
  </div>
);
