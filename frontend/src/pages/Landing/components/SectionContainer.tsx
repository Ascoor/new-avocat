import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';
import SectionLoader from './SectionLoader';

interface SectionContainerProps {
  loading?: boolean;
  className?: string;
  children: ReactNode;
  loaderLabel?: string;
}

const SectionContainer: React.FC<SectionContainerProps> = ({ loading = false, className, children, loaderLabel }) => {
  return (
    <div className={cn('relative rounded-[2.5rem] border border-border/40 bg-card/40 p-6 shadow-2xl shadow-primary/5 backdrop-blur transition-all duration-500 md:p-10', className)}>
      <SectionLoader loading={loading ?? false} label={loaderLabel} />
      <div className={cn(loading ? 'pointer-events-none opacity-40 blur-[1px]' : 'opacity-100 transition-opacity')}>{children}</div>
    </div>
  );
};

export default SectionContainer;
