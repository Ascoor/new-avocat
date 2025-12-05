import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { cn } from '@/lib/utils';

export interface EntitySummaryBadge {
  label: string;
  variant?: 'default' | 'secondary' | 'outline' | 'destructive';
}

export interface EntitySummarySection {
  title?: string;
  content: React.ReactNode;
}

interface EntitySummaryCardProps {
  icon?: LucideIcon;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  primaryBadge?: EntitySummaryBadge;
  secondaryBadges?: EntitySummaryBadge[];
  isRTL?: boolean;
  expanded?: boolean;
  onToggleExpanded?: () => void;
  overviewSections?: EntitySummarySection[];
  descriptionTitle?: string;
  descriptionText?: string;
}

export const EntitySummaryCard: React.FC<EntitySummaryCardProps> = ({
  icon: Icon,
  eyebrow,
  title,
  subtitle,
  primaryBadge,
  secondaryBadges,
  isRTL,
  expanded = true,
  onToggleExpanded,
  overviewSections = [],
  descriptionTitle,
  descriptionText,
}) => {
  const OverviewToggleIcon = expanded
    ? ChevronDown
    : isRTL
    ? ChevronLeft
    : ChevronRight;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <GlassCard
        variant="primary"
        hover="glow"
        className="relative overflow-hidden border border-border/60 bg-surface-muted/80 p-6 md:p-8"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_var(var(--gradient-primary)))] from-primary/10 via-transparent to-transparent" />
        <div className="relative flex flex-col gap-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex gap-3">
              {Icon && (
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-brand-primary/10 to-gold/10">
                  <Icon className="h-5 w-5 text-accent" />
                </div>
              )}
              <div className="space-y-2">
                {eyebrow && (
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    {eyebrow}
                  </p>
                )}
                <h2 className="text-2xl font-bold text-foreground">{title}</h2>
                {subtitle && (
                  <p className="text-sm text-muted-foreground">{subtitle}</p>
                )}
                <div className="flex flex-wrap items-center gap-2">
                  {primaryBadge && (
                    <Badge
                      variant={primaryBadge.variant ?? 'outline'}
                      className="border-primary/40 bg-primary/10 text-primary"
                    >
                      {primaryBadge.label}
                    </Badge>
                  )}
                  {secondaryBadges?.map((badge, idx) => (
                    <Badge
                      key={`${badge.label}-${idx}`}
                      variant={badge.variant ?? 'outline'}
                      className={cn(
                        'border-border/60 bg-surface-highlight/70 text-foreground',
                        badge.variant === 'secondary' && 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-300',
                      )}
                    >
                      {badge.label}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {onToggleExpanded && (
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={onToggleExpanded}
                aria-label={expanded ? 'Collapse' : 'Expand'}
                className="h-10 w-10 rounded-full border border-border/60 bg-background/60 text-muted-foreground transition hover:border-primary/60 hover:bg-primary/10 hover:text-primary"
              >
                <OverviewToggleIcon className="h-4 w-4" />
              </Button>
            )}
          </div>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                key="overview-content"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                className="overflow-hidden space-y-6"
              >
                {overviewSections.length > 0 && (
                  <div className="grid gap-8 md:grid-cols-2">
                    {overviewSections.map((section, idx) => (
                      <div key={idx}>{section.content}</div>
                    ))}
                  </div>
                )}

                {descriptionText && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, delay: 0.1 }}
                    className="rounded-2xl border border-border/60 bg-surface-highlight/80 p-5 shadow-inner"
                  >
                    {descriptionTitle && (
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-text-muted">
                        {descriptionTitle}
                      </h3>
                    )}
                    <p className="mt-2 text-sm leading-relaxed text-text-strong">
                      {descriptionText}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </GlassCard>
    </motion.div>
  );
};
