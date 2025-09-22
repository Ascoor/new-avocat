import { AnimatePresence, motion } from 'framer-motion';
import { type LucideIcon } from 'lucide-react';
import { type ReactNode, useEffect, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react'; // استيراد الأسهم المناسبة

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
      className={`relative overflow-hidden rounded-3xl border border-border/70 bg-card/60 p-6 shadow-card backdrop-blur ${className}`}
    >
      <div className="relative flex flex-col gap-4">
        <div className="flex flex-col gap-4 border-b border-border/60 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 text-primary">
              <Icon className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-foreground">{title}</h2>
              {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* زر العرض/إخفاء مع السهم */}
            <button
              type="button"
              onClick={() => handleToggle()}
              className="flex items-center gap-2 text-sm font-semibold text-muted-foreground"
            >
              {isOpen ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
              {isOpen ? 'Collapse' : 'Expand'}
            </button>
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
              <div className={contentClassName}>{children}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CaseSection;
