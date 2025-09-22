import { AnimatePresence, motion } from 'framer-motion';
import { type LucideIcon } from 'lucide-react';
import { type ReactNode, useEffect, useState } from 'react';

import { Switch } from '@/components/ui/switch';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface CaseSectionProps {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  toggleLabel?: string;
}

const CaseSection = ({
  icon: Icon,
  title,
  subtitle,
  actions,
  children,
  className,
  contentClassName,
  open = true,
  onOpenChange,
  toggleLabel,
}: CaseSectionProps) => {
  const isControlled = typeof onOpenChange === 'function';
  const [internalOpen, setInternalOpen] = useState(open);
  const { isRTL } = useLanguage();

  useEffect(() => {
    if (!isControlled) {
      setInternalOpen(open);
    }
  }, [open, isControlled]);

  const isOpen = isControlled ? open : internalOpen;

  const handleToggle = (nextState?: boolean) => {
    const targetState = typeof nextState === 'boolean' ? nextState : !isOpen;
    if (isControlled) {
      onOpenChange?.(targetState);
      return;
    }
    setInternalOpen(targetState);
  };

  return (
    <section
      dir={isRTL ? 'rtl' : 'ltr'}
      className={cn(
        'relative overflow-hidden rounded-3xl border border-border/70 bg-card/60 p-6 shadow-card backdrop-blur',
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-70" />
      <div className="relative flex flex-col gap-4">
        <div className="flex flex-col gap-4 border-b border-border/60 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 text-primary">
              <Icon className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-foreground">{title}</h2>
              {subtitle && (
                <p className="text-sm text-muted-foreground">{subtitle}</p>
              )}
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-2">
            {actions}
            {(toggleLabel || isControlled) && (
              <div className="flex items-center gap-3 rounded-full border border-border/50 bg-surface-highlight/70 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <button
                  type="button"
                  onClick={() => handleToggle()}
                  className="cursor-pointer select-none text-current"
                >
                  {toggleLabel ?? (isOpen ? 'Collapse' : 'Expand')}
                </button>
                <Switch
                  checked={isOpen}
                  onCheckedChange={(value) => handleToggle(value)}
                  aria-label={toggleLabel ?? (isOpen ? 'Collapse' : 'Expand')}
                  className="data-[state=checked]:bg-primary"
                />
              </div>
            )}
          </div>
        </div>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="case-section-content"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="overflow-hidden"
            >
              <div className={cn('mt-1 space-y-4', contentClassName)}>{children}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CaseSection;
