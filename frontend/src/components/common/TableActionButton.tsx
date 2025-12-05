import type { ComponentProps } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Tone = 'view' | 'edit' | 'delete' | 'accent';

interface TableActionButtonProps extends Omit<ComponentProps<typeof Button>, 'variant' | 'size'> {
  /** A short accessible label used for screen readers. */
  label: string;
  /** Visual tone for quick recognition. */
  tone?: Tone;
}

const toneClasses: Record<Tone, string> = {
  view: 'text-sky-700 hover:text-sky-800 dark:text-sky-200 dark:hover:text-sky-100 border-sky-100/70 dark:border-sky-500/30 bg-sky-50/60 dark:bg-sky-500/10 hover:bg-sky-100/80 dark:hover:bg-sky-500/15',
  edit: 'text-amber-700 hover:text-amber-800 dark:text-amber-100 dark:hover:text-amber-50 border-amber-100/70 dark:border-amber-500/30 bg-amber-50/60 dark:bg-amber-500/10 hover:bg-amber-100/80 dark:hover:bg-amber-500/15',
  delete: 'text-rose-700 hover:text-rose-800 dark:text-rose-100 dark:hover:text-rose-50 border-rose-100/70 dark:border-rose-500/30 bg-rose-50/70 dark:bg-rose-500/10 hover:bg-rose-100/80 dark:hover:bg-rose-500/15',
  accent: 'text-primary border-primary/15 bg-primary/5 hover:bg-primary/10 dark:bg-primary/10 dark:hover:bg-primary/20',
};

/**
 * A compact icon-only button designed for table action cells with gentle color-coding.
 */
const TableActionButton = ({ label, tone = 'accent', className, children, ...props }: TableActionButtonProps) => (
  <Button
    type="button"
    size="icon"
    variant="ghost"
    aria-label={label}
    className={cn(
      'h-9 w-9 rounded-full border shadow-[0_6px_18px_-12px_rgba(0,0,0,0.45)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-18px_rgba(0,0,0,0.55)] focus-visible:ring-2 focus-visible:ring-offset-2',
      toneClasses[tone],
      className,
    )}
    {...props}
  >
    {children}
    <span className="sr-only">{label}</span>
  </Button>
);

export default TableActionButton;
