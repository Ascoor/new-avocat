import { ReactNode } from 'react';
import { HeaderBar } from '@/components/layout/HeaderBar';
import { Sidebar } from '@/components/layout/Sidebar';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

export const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const { isRTL } = useLanguage();
  return (
    <div className={cn('flex min-h-screen bg-background', isRTL && 'flex-row-reverse')}>
      <Sidebar />
      <div className="flex flex-col flex-1">
        <HeaderBar />
        <main className="pt-16 pb-10 px-4 container mx-auto animate-scale-in">
          {children}
        </main>
      </div>
    </div>
  );
};
