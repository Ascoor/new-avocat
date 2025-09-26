import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import LegalIcon from '@/components/common/LegalIcon';
import { getIconDesign } from '@/config/iconography';
import { cn } from '@/lib/utils';

export default function QuickActions() {
  const { t } = useTranslation();
  const actions = [
    { label: t('dashboard.new_case'), iconKey: 'cases' as const, to: '/cases/new', variant: 'default' as const },
    { label: t('dashboard.add_client'), iconKey: 'clients' as const, to: '/clients/new', variant: 'success' as const },
    { label: t('dashboard.schedule_session'), iconKey: 'sessions' as const, to: '/sessions/new', variant: 'info' as const },
    { label: t('dashboard.manage_services'), iconKey: 'services' as const, to: '/services', variant: 'warning' as const },
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {actions.map(action => {
        const design = getIconDesign(action.iconKey);
        const badgeStyle = {
          background: design.badgeGradient,
          boxShadow: design.shadow,
        } as const;
        return (
          <Button asChild key={action.label} variant={action.variant}>
            <Link to={action.to} className="flex items-center gap-3 rtl:flex-row-reverse">
              <span
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-2xl",
                  design.badgeClass ?? "text-white",
                )}
                style={badgeStyle}
              >
                <LegalIcon iconKey={action.iconKey} width={24} height={24} aria-hidden />
              </span>
              <span>{action.label}</span>
            </Link>
          </Button>
        );
      })}
    </div>
  );
}
