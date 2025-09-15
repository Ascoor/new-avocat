 
import CasesByStatusChart from './CasesByStatusChart'
import QuickActions from './QuickActions'
import RecentCases from './RecentCases'
import { useTranslation } from 'react-i18next'
import StatsCards from './StatsCards';
export default function DashboardHome() {
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
        <RecentCases />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4">{t('dashboard.quick_actions')}</h2>
        <QuickActions />
      </div>
    </div>
  )
}
