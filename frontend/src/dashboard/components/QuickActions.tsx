import { Button } from '@/components/ui/button';
import { Briefcase, Calendar, ClipboardList, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function QuickActions() {
  const { t } = useTranslation();
  const actions = [
    { label: t('dashboard.new_case'), icon: Briefcase, to: '/cases/new', color: 'bg-blue-500 hover:bg-blue-600' },
    { label: t('dashboard.add_client'), icon: UserPlus, to: '/clients/new', color: 'bg-green-500 hover:bg-green-600' },
    { label: t('dashboard.schedule_session'), icon: Calendar, to: '/sessions/new', color: 'bg-purple-500 hover:bg-purple-600' },
    { label: t('dashboard.manage_services'), icon: ClipboardList, to: '/services', color: 'bg-orange-500 hover:bg-orange-600' },
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {actions.map(action => {
        const Icon = action.icon;
        return (
          <Button asChild key={action.label} className={`${action.color} text-white`}>
            <Link to={action.to} className="flex items-center">
              <Icon className="h-4 w-4 mr-2" />
              {action.label}
            </Link>
          </Button>
        );
      })}
    </div>
  );
}
