import React from 'react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface InfoItem {
  label: string;
  value?: string | React.ReactNode;
  icon?: LucideIcon;
}

const INFO_ACCENT_CLASSES = [
  'from-primary/20 via-primary/10 to-transparent',
  'from-sky-500/20 via-sky-500/10 to-transparent',
  'from-emerald-500/20 via-emerald-500/10 to-transparent',
  'from-amber-500/20 via-amber-500/10 to-transparent',
] as const;

interface InfoListProps {
  title?: string;
  items: InfoItem[];
  direction?: 'rtl' | 'ltr';
  columns?: 1 | 2;
}

export const InfoList: React.FC<InfoListProps> = ({
  title,
  items,
  direction = 'ltr',
  columns = 2,
}) => (
  <div className="space-y-4" dir={direction}>
    {title && (
      <h3 className="text-sm font-semibold uppercase tracking-wide text-text-muted">
        {title}
      </h3>
    )}
    <div
      className={cn('grid gap-3', columns === 2 && 'sm:grid-cols-2')}
    >
      {items.map((item, index) => (
        <motion.div
          key={`${item.label}-${index}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className={cn(
            'group relative overflow-hidden rounded-2xl border border-border/60 bg-surface-highlight/80 p-4 shadow-inner backdrop-blur-sm transition hover:border-primary/60',
            direction === 'rtl' ? 'text-right' : 'text-left',
          )}
        >
          <div
            className={cn(
              'pointer-events-none absolute inset-0 bg-gradient-to-br opacity-80',
              INFO_ACCENT_CLASSES[index % INFO_ACCENT_CLASSES.length],
            )}
          />
          <div className="relative flex items-center gap-3">
            {item.icon && (
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-background/80 text-primary shadow-card ring-1 ring-primary/20">
                <item.icon className="h-5 w-5" aria-hidden="true" />
              </span>
            )}
            <div className="flex flex-1 flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                {item.label}
              </span>
              <span
                className={cn(
                  'text-sm font-semibold text-text-strong',
                  direction === 'rtl' ? 'text-left' : 'text-right',
                )}
              >
                {item.value || '—'}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);
