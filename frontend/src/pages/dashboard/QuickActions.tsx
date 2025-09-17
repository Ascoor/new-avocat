import { Button } from '@/components/ui/button';
import { Briefcase, Calendar, ClipboardList, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function QuickActions() {
  const { t } = useTranslation();
  const actions = [
    { label: t('dashboard.new_case'), icon: Briefcase, to: '/cases/new', variant: 'default' as const },
    { label: t('dashboard.add_client'), icon: UserPlus, to: '/clients/new', variant: 'success' as const },
    { label: t('dashboard.schedule_session'), icon: Calendar, to: '/sessions/new', variant: 'info' as const },
    { label: t('dashboard.manage_services'), icon: ClipboardList, to: '/services', variant: 'warning' as const },
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {actions.map(action => {
        const Icon = action.icon;
        return (
          <Button asChild key={action.label} variant={action.variant}>
            <Link to={action.to} className="flex items-center gap-2 rtl:flex-row-reverse">
              <Icon className="h-4 w-4" />
              <span>{action.label}</span>
            </Link>
          </Button>
        );
      })}
    </div>
  );
}
