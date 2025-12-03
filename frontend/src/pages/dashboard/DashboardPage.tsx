import QuickActions from '@/components/dashboard/QuickActions';
import DashboardStatCard from '@/components/dashboard/DashboardStatCard';
import DashboardActivityItem from '@/components/dashboard/DashboardActivityItem';
import DashboardTaskItem from '@/components/dashboard/DashboardTaskItem';
import CasesByStatusChart from '@/components/dashboard/CasesByStatusChart';
import RecentCases from '@/components/dashboard/RecentCases';

import { AppCard } from '@/components/common/AppCard';

import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';
import { Bell, Briefcase, Calendar, DollarSign, Users } from 'lucide-react';

export default function DashboardPage() {
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  // -------------------------
  // Dashboard Stats
  // -------------------------
  const dashboardStats = [
    {
      title: t('dashboard.total_cases'),
      value: '124',
      description: t('dashboard.active'),
      icon: Briefcase,
      trendType: 'up',
      trend: '+12%',
    },
    {
      title: t('dashboard.active_clients'),
      value: '89',
      description: t('dashboard.active'),
      icon: Users,
      trendType: 'up',
      trend: '+8%',
    },
    {
      title: t('dashboard.upcoming_sessions'),
      value: '23',
      description: t('dashboard.pending'),
      icon: Calendar,
      trendType: 'neutral',
      trend: '+0%',
    },
    {
      title: t('dashboard.total_revenue'),
      value: '$54K',
      description: t('dashboard.revenue'),
      icon: DollarSign,
      trendType: 'up',
      trend: '+5%',
    },
  ];

  const renderTrendBadge = (trendType: string, trend: string) => {
    const color =
      trendType === 'up'
        ? 'text-green-600'
        : trendType === 'down'
        ? 'text-red-600'
        : 'text-gray-600';

    return <span className={color}>{trend}</span>;
  };

  // -------------------------
  // Recent Activity
  // -------------------------
  const recentActivities = [
    {
      id: 1,
      title: language === 'ar' ? 'قضية جديدة' : 'New Case Opened',
      description: language === 'ar' ? 'نزاع تجاري' : 'Commercial dispute',
      time: language === 'ar' ? 'منذ ساعة' : '1 hour ago',
      status: 'new',
      type: 'case',
    },
    {
      id: 2,
      title: language === 'ar' ? 'جلسة قادمة' : 'Upcoming court session',
      description: language === 'ar' ? 'محكمة الاستئناف' : 'Court of Appeal',
      time: language === 'ar' ? 'قبل 3 ساعات' : '3 hours ago',
      status: 'pending',
      type: 'session',
    },
  ];

  // Status variants
  const getActivityStatusVariant = (status: string) => {
    if (status === 'new') return 'success';
    if (status === 'pending') return 'warning';
    return 'default';
  };

  const getActivityStatusLabel = (status: string) => {
    if (language === 'ar') {
      if (status === 'new') return 'جديد';
      if (status === 'pending') return 'قيد الانتظار';
    }
    return status;
  };

  const renderActivityIcon = (type: string) => {
    const Icon = type === 'case' ? Briefcase : Calendar;
    return <Icon className="h-5 w-5" />;
  };

  // -------------------------
  // Tasks List
  // -------------------------
  const upcomingTasks = [
    {
      id: 1,
      title: language === 'ar' ? 'مراجعة عقد الشراكة' : 'Review partnership contract',
      time: language === 'ar' ? 'اليوم' : 'Today',
      priority: 'high',
    },
    {
      id: 2,
      title: language === 'ar' ? 'تحضير المذكرة' : 'Prepare defense memo',
      time: language === 'ar' ? 'غداً' : 'Tomorrow',
      priority: 'medium',
    },
  ];

  const renderTaskIcon = (priority: string) => {
    return <Bell className="h-4 w-4" />;
  };

  return (
    <div className="space-y-10">

      {/* 🌟 Quick Actions */}
      <QuickActions />

      {/* 🌟 Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {dashboardStats.map((stat) => (
          <DashboardStatCard
            key={stat.title}
            {...stat}
            renderTrendBadge={renderTrendBadge}
          />
        ))}
      </div>

      {/* 🌟 Main Grid: Activity + Tasks */}
      <div className="grid gap-6 lg:grid-cols-3">

        {/* Recent Activity */}
        <AppCard className="lg:col-span-2">
          <div className="flex items-center justify-between pb-4">
            <div className="space-y-1">
              <p className="text-lg font-semibold">{t('dashboard.recentActivity')}</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">
                {language === 'ar'
                  ? 'تتبع آخر التحديثات على القضايا والجلسات'
                  : 'Track the latest updates on cases and sessions'}
              </p>
            </div>
            <Badge variant="secondary" className="rounded-full text-xs">
              {language === 'ar' ? 'محدّث' : 'Updated'}
            </Badge>
          </div>

          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <DashboardActivityItem
                key={activity.id}
                {...activity}
                language={language}
                renderActivityIcon={renderActivityIcon}
                getActivityStatusVariant={getActivityStatusVariant}
                getActivityStatusLabel={getActivityStatusLabel}
              />
            ))}
          </div>
        </AppCard>

        {/* Tasks */}
        <AppCard>
          <div className="space-y-1 pb-4">
            <p className="text-lg font-semibold">
              {language === 'ar' ? 'المهام القادمة' : 'Upcoming Tasks'}
            </p>
            <p className="text-sm text-neutral-600 dark:text-neutral-300">
              {language === 'ar'
                ? 'أولوياتك للأيام القادمة'
                : 'Your priorities for the coming days'}
            </p>
          </div>

          <div className="space-y-3">
            {upcomingTasks.map((task) => (
              <DashboardTaskItem
                key={task.id}
                {...task}
                language={language}
                renderTaskIcon={renderTaskIcon}
              />
            ))}
          </div>
        </AppCard>
      </div>

      {/* 🌟 Case Status Chart + Recent Cases */}
      <div className="grid gap-6 lg:grid-cols-3">
        <CasesByStatusChart />
        <RecentCases />
      </div>
    </div>
  );
}
