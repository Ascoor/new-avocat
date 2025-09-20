import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Users, UserX } from 'lucide-react';

import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

const subsections = [
  {
    key: 'clients',
    icon: Users,
    to: '/dashboard/clients',
    descriptionKey: 'clientManagement.clients.subtitle'
  },
  {
    key: 'unclients',
    icon: UserX,
    to: '/dashboard/clients/unclients',
    descriptionKey: 'clientManagement.unclients.subtitle'
  }
] as const;

const ClientManagementLayout = () => {
  const { t, isRTL } = useLanguage();
  const location = useLocation();

  return (
    <div className="space-y-6">
      <div className={cn('flex flex-col gap-2', isRTL ? 'text-right' : 'text-left')}>
        <h1 className="text-2xl font-semibold text-foreground">
          {t('clientManagement.title')}
        </h1>
        <p className="text-sm text-muted-foreground">{t('clientManagement.description')}</p>
      </div>

      <div
        className={cn(
          'grid gap-6',
          'lg:grid-cols-[260px_1fr]'
        )}
      >
        <Card className="h-fit border border-border/60 bg-card/60 p-4">
          <nav className="flex flex-col gap-2">
            {subsections.map(section => {
              const Icon = section.icon;
              const isActive = location.pathname.startsWith(section.to);

              return (
                <NavLink
                  key={section.key}
                  to={section.to}
                  className={({ isActive: navActive }) =>
                    cn(
                      'flex items-center gap-3 rounded-lg border border-transparent px-3 py-2 text-sm transition-colors',
                      isRTL ? 'flex-row-reverse text-right' : 'text-left',
                      'hover:bg-accent/50 hover:text-accent-foreground',
                      (isActive || navActive) && 'border-primary/40 bg-primary/10 text-primary'
                    )
                  }
                >
                  <Icon className="h-4 w-4" />
                  <div className={cn('flex flex-col', isRTL ? 'items-end text-right' : 'items-start text-left')}>
                    <span className="font-medium">{t(`clientManagement.${section.key}.title`)}</span>
                    <span className="text-xs text-muted-foreground">
                      {t(section.descriptionKey)}
                    </span>
                  </div>
                </NavLink>
              );
            })}
          </nav>
        </Card>

        <div className="space-y-6">
          <Separator className="lg:hidden" />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ClientManagementLayout;
