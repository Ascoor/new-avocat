import React from 'react';
import { Scale } from 'lucide-react';

interface BrandedLoaderProps {
  full?: boolean;
}

const BrandedLoader: React.FC<BrandedLoaderProps> = ({ full = false }) => {
  return (
    <div
      className={
        full
          ? 'fixed inset-0 z-50 grid place-items-center bg-background/60 backdrop-blur-sm'
          : 'flex items-center gap-3'
      }
      role="status"
      aria-live="polite"
    >
      <div className="relative h-12 w-12" aria-hidden="true">
        <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
        <div className="relative flex h-full w-full items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Scale className="h-6 w-6" />
        </div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default BrandedLoader;
