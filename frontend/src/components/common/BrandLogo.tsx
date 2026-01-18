import { Scale } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BrandLogoProps {
  variant?: 'icon' | 'text';
  lang: 'en' | 'ar';
  dark?: boolean;
  className?: string;
}

export const BrandLogo = ({ variant = 'text', lang, dark = false, className }: BrandLogoProps) => {
  const wordmark = lang === 'ar' ? 'أفوكات' : 'AVOCAT';

  return (
    <div
      className={cn(
        'flex items-center gap-3 font-[var(--font-display)] tracking-[0.22em] uppercase',
        dark ? 'text-[hsl(var(--primary-foreground))]' : 'text-[hsl(var(--foreground))]',
        className,
      )}
    >
      <span
        className={cn(
          'grid h-10 w-10 place-items-center rounded-2xl border border-[hsl(var(--gold)/0.4)]',
          dark ? 'bg-[hsl(var(--primary)/0.6)]' : 'bg-[hsl(var(--card))]',
        )}
        style={{ boxShadow: 'var(--shadow-gold)' }}
      >
        <Scale className="h-5 w-5 text-[hsl(var(--gold))]" />
      </span>
      {variant === 'text' && (
        <span className={cn('text-sm font-semibold', lang === 'ar' && 'tracking-[0.12em]')}>{wordmark}</span>
      )}
    </div>
  );
};

export default BrandLogo;
