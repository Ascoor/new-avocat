import { memo, type ReactNode } from 'react';
import { motion, cubicBezier } from 'framer-motion';

import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  badge?: string | null;
  title: string | null;
  subtitle?: string | null;
  align?: 'left' | 'center' | 'right';
  eyebrowIcon?: ReactNode;
}

const premiumEase = cubicBezier(0.22, 1, 0.36, 1);

const badgeMotion = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: premiumEase } },
};

const titleMotion = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: premiumEase,
    },
  },
};

const subtitleMotion = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: premiumEase,
      delay: 0.1,
    },
  },
};

const alignClasses: Record<'left' | 'center' | 'right', string> = {
  left: 'text-left',
  center: 'text-center mx-auto',
  right: 'text-right ml-auto',
};

const SectionHeader: React.FC<SectionHeaderProps> = memo(({ badge, title, subtitle, align = 'center', eyebrowIcon }) => {
  if (!title && !badge && !subtitle) {
    return null;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      className={cn('section-header-frame max-w-3xl space-y-4', alignClasses[align])}
    >
      {badge ? (
        <motion.div
          variants={badgeMotion}
          className={cn(
            'inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/90 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground shadow-inner-glow backdrop-blur-sm dark:border-border/40 dark:bg-background/40 dark:text-foreground/80',
            align === 'center' ? 'justify-center' : 'justify-start',
          )}
        >
          {eyebrowIcon ? <span className="text-primary dark:text-primary-light">{eyebrowIcon}</span> : null}
          <span>{badge}</span>
        </motion.div>
      ) : null}

      {title ? (
        <motion.h2
          variants={titleMotion}
          className="text-balance font-display text-4xl font-semibold tracking-tight text-foreground transition-colors duration-500 md:text-5xl"
        >
          <span className="headline-neon" data-title={title ?? ''}>
            {title}
          </span>
        </motion.h2>
      ) : null}

      {subtitle ? (
        <motion.p
          variants={subtitleMotion}
          className="text-lg leading-relaxed text-muted-foreground/90 dark:text-muted-foreground/75 md:text-xl"
        >
          {subtitle}
        </motion.p>
      ) : null}
    </motion.div>
  );
});

SectionHeader.displayName = 'SectionHeader';

export default SectionHeader;
