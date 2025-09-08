import StatsCards from './components/StatsCards';
import CasesByStatusChart from './components/CasesByStatusChart';
import CasesByCategoryChart from './components/CasesByCategoryChart';
import QuickActions from './components/QuickActions';
import RecentCases from './components/RecentCases';
import UpcomingSessions from './components/UpcomingSessions';
import { useTranslation } from 'react-i18next';

export default function DashboardPage() {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t('dashboard.welcome_title')}</h1>
        <p className="text-muted-foreground">{t('dashboard.welcome_subtitle')}</p>
      </div>
      <StatsCards />
      <div className="grid gap-4 lg:grid-cols-2">
        <CasesByStatusChart />
        <CasesByCategoryChart />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4">{t('dashboard.quick_actions')}</h2>
        <QuickActions />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <RecentCases />
        <UpcomingSessions />
      </div>
    </div>
  );
}
