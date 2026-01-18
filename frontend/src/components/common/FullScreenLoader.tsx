import React from 'react';
import { cn } from '@/lib/utils';

interface FullScreenLoaderProps {
  label?: string;
  className?: string;
}

const FullScreenLoader: React.FC<FullScreenLoaderProps> = ({
  label = 'Loading...',
  className,
}) => {
  return (
    <div
      className={cn(
        'flex min-h-screen w-full items-center justify-center bg-[hsl(var(--background))]',
        className,
      )}
    >
      <div className="flex flex-col items-center gap-3 text-sm text-muted-foreground">
        <span className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <span>{label}</span>
      </div>
    </div>
  );
};

export default FullScreenLoader;
