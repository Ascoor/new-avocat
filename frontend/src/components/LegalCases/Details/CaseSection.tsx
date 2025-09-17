import { type LucideIcon } from 'lucide-react';
import { type ReactNode, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
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

  useEffect(() => {
    if (!isControlled) {
      setInternalOpen(open);
    }
  }, [open, isControlled]);

  const isOpen = isControlled ? open : internalOpen;

  const handleToggle = () => {
    if (isControlled) {
      onOpenChange?.(!isOpen);
      return;
    }
    setInternalOpen((previous) => !previous);
  };

  return (
    <section
      className={cn(
        'rounded-2xl border border-border/60 bg-card/60 p-6 shadow-sm backdrop-blur',
        className,
      )}
    >
      <div className="flex flex-col gap-4 border-b border-border/60 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">{title}</h2>
            {subtitle && (
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {actions}
          {(toggleLabel || isControlled) && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleToggle}
              aria-expanded={isOpen}
              className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
            >
              {toggleLabel ?? (isOpen ? 'Collapse' : 'Expand')}
            </Button>
          )}
        </div>
      </div>

      {isOpen && (
        <div className={cn('mt-4 space-y-4', contentClassName)}>{children}</div>
      )}
    </section>
  );
};

export default CaseSection;
