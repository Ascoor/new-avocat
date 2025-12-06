'use client';

import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  Calendar,
  ClipboardList,
  DollarSign,
  Sparkles,
  Users,
} from 'lucide-react';

import QuickActions, { type Action } from '@/components/dashboard/QuickActions';
import DashboardActivityItem from '@/components/dashboard/DashboardActivityItem';
import DashboardStatCard from '@/components/dashboard/DashboardStatCard';
import DashboardTaskItem from '@/components/dashboard/DashboardTaskItem';
import RecentCases from '@/components/dashboard/RecentCases';
import CasesByStatusChart from '@/components/dashboard/CasesByStatusChart';
import PageHeader from '@/components/common/PageHeader';
import { AppCard } from '@/components/common/AppCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { shellContainer } from '@/components/layout/layout-classes';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

const RECENT_CASES = [
  { id: 1, title: 'Commercial Contract Dispute', client: 'Ahmed Ali', category: 'Corporate', statusColor: 'bg-emerald-500' },
  { id: 2, title: 'Employment Appeal', client: 'Sara Ibrahim', category: 'Labor', statusColor: 'bg-amber-500' },
  { id: 3, title: 'Property Fraud', client: 'Global Corp', category: 'Criminal', statusColor: 'bg-rose-500' },
];

export default function DashboardPage() {
  const { t, language } = useLanguage();
  const isArabic = language === 'ar';

  const quickActions = useMemo<Action[]>(
    () => [
      { label: t('dashboard.new_case'), to: '/dashboard/cases', iconKey: 'cases', variant: 'premium' },
      { label: t('dashboard.add_client'), to: '/dashboard/clients', iconKey: 'clients', variant: 'secondary' },
      { label: t('dashboard.schedule_session'), to: '/dashboard/sessions', iconKey: 'sessions', variant: 'outline' },
      { label: t('dashboard.manage_services'), to: '/dashboard/services', iconKey: 'services', variant: 'ghost' },
    ],
    [t],
  );

  const stats = useMemo(
    () => [
      {
        title: t('dashboard.kpis.openCases'),
        value: '80',
        description: t('dashboard.total_cases'),
        icon: Briefcase,
        trend: '+8%',
        trendColor: 'text-green-600 dark:text-emerald-400',
      },
      {
        title: t('dashboard.kpis.activeClients'),
        value: '120',
        description: t('dashboard.active_clients'),
        icon: Users,
        trend: '+5%',
        trendColor: 'text-green-600 dark:text-emerald-400',
      },
      {
        title: t('dashboard.upcoming_sessions'),
        value: '18',
        description: isArabic ? 'هذا الشهر' : 'This month',
        icon: Calendar,
        trend: '+3',
        trendColor: 'text-brand-primary',
      },
      {
        title: t('dashboard.total_revenue'),
        value: '$240k',
        description: isArabic ? 'إيرادات هذا الربع' : 'Quarter to date',
        icon: DollarSign,
        trend: '+12%',
        trendColor: 'text-green-600 dark:text-emerald-400',
      },
    ],
    [isArabic, t],
  );

  const casesByStatus = useMemo(
    () => [
      { name: t('dashboard.active'), value: 45 },
      { name: t('dashboard.pending'), value: 22 },
      { name: t('dashboard.closed'), value: 15 },
      { name: t('dashboard.on_hold'), value: 9 },
    ],
    [t],
  );

  const recentActivity = useMemo(
    () => [
      {
        title: isArabic ? 'تمت إضافة قضية جديدة' : 'New case added',
        description: isArabic ? 'قضية تحكيم تجاري للعميل فهد الصالح' : 'Commercial arbitration case for Fahd Al-Saleh',
        status: 'success',
        time: '09:30',
        type: 'case',
      },
      {
        title: isArabic ? 'جلسة قادمة' : 'Upcoming session',
        description: isArabic ? 'جلسة استئناف - شركة الندى' : 'Appeal session - Al Nada Co.',
        status: 'warning',
        time: '13:00',
        type: 'session',
      },
      {
        title: isArabic ? 'مستند موقّع' : 'Document signed',
        description: isArabic ? 'اتفاقية تسوية مع العميل سارة' : 'Settlement agreement with client Sara',
        status: 'info',
        time: '16:10',
        type: 'document',
      },
    ],
    [isArabic],
  );

  const tasks = useMemo(
    () => [
      {
        title: isArabic ? 'إعداد مذكرة دفاع' : 'Prepare defense memo',
        time: isArabic ? 'اليوم - 5 مساءً' : 'Today - 5 PM',
        priority: 'high' as const,
      },
      {
        title: isArabic ? 'متابعة مع العميل' : 'Follow up with client',
        time: isArabic ? 'غداً - 11 صباحاً' : 'Tomorrow - 11 AM',
        priority: 'medium' as const,
      },
      {
        title: isArabic ? 'مراجعة عقد شراكة' : 'Review partnership agreement',
        time: isArabic ? 'الجمعة - 3 مساءً' : 'Friday - 3 PM',
        priority: 'low' as const,
      },
    ],
    [isArabic],
  );

  const renderActivityIcon = (type: string) => {
    switch (type) {
      case 'case':
        return <Briefcase className="h-5 w-5" />;
      case 'session':
        return <Calendar className="h-5 w-5" />;
      case 'document':
        return <ClipboardList className="h-5 w-5" />;
      default:
        return <Sparkles className="h-5 w-5" />;
    }
  };

  const getActivityStatusVariant = (status: string) => {
    if (status === 'success') return 'default';
    if (status === 'warning') return 'destructive';
    return 'secondary';
  };

  const getActivityStatusLabel = (status: string) => {
    if (status === 'success') return isArabic ? 'مكتمل' : 'Completed';
    if (status === 'warning') return isArabic ? 'قادمة' : 'Upcoming';
    return isArabic ? 'معلومة' : 'Info';
  };

  const renderTaskIcon = (priority: string) => {
    if (priority === 'high') return <Sparkles className="h-4 w-4" />;
    if (priority === 'medium') return <ClipboardList className="h-4 w-4" />;
    return <Calendar className="h-4 w-4" />;
  };

  return (
    <div className={cn(shellContainer, 'space-y-8 px-4 sm:px-6 lg:px-8')}>
      <PageHeader
        iconKey="dashboard"
        title={t('dashboard.title')}
        subtitle={isArabic ? 'لمحة سريعة عن سير العمل والأداء' : "Quick snapshot of today's workload"}
        actions={
          <Link
            to="/dashboard/reports"
            className="rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
          >
            {isArabic ? 'عرض التقارير' : 'View reports'}
          </Link>
        }
      />

      <Card>
        <CardHeader>
          <CardTitle>{t('dashboard.quick_actions')}</CardTitle>
        </CardHeader>
        <CardContent>
          <QuickActions actions={quickActions} />
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <DashboardStatCard key={item.title} {...item} />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CasesByStatusChart data={casesByStatus} title={t('dashboard.cases_by_status')} />
        </div>
        <RecentCases
          title={t('dashboard.recent_cases')}
          cases={RECENT_CASES.map((item) => ({
            ...item,
            title: isArabic
              ? item.title.replace('Commercial', 'تجاري').replace('Employment', 'عمالي')
              : item.title,
            client: isArabic ? `${item.client} (عميل)` : item.client,
            category: isArabic ? `${item.category} • ${t('dashboard.active')}` : item.category,
          }))}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-brand-primary" />
              {t('dashboard.recentActivity')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivity.map((activity) => (
              <DashboardActivityItem
                key={activity.title}
                language={language}
                renderActivityIcon={renderActivityIcon}
                getActivityStatusLabel={getActivityStatusLabel}
                getActivityStatusVariant={getActivityStatusVariant}
                {...activity}
              />
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-brand-primary" />
              {isArabic ? 'مهامك' : 'Your tasks'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {tasks.map((task) => (
              <DashboardTaskItem
                key={task.title}
                language={language}
                renderTaskIcon={renderTaskIcon}
                {...task}
              />
            ))}
          </CardContent>
        </Card>
      </div>

      <AppCard className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{isArabic ? 'أقرب جلسة قادمة' : 'Nearest upcoming session'}</p>
          <h3 className="text-xl font-bold text-foreground">{isArabic ? 'قضية استئناف - المحكمة التجارية' : 'Appeal hearing - Commercial court'}</h3>
          <p className="text-sm text-muted-foreground">{isArabic ? 'الخميس، 5 ديسمبر - 10:30 صباحاً' : 'Thursday, Dec 5 - 10:30 AM'}</p>
        </div>
        <Link
          to="/dashboard/sessions"
          className="inline-flex items-center gap-2 rounded-lg bg-brand-primary px-4 py-2 text-sm font-semibold text-white shadow-soft hover:opacity-90"
        >
          {isArabic ? 'عرض الجدول' : 'View schedule'}
        </Link>
      </AppCard>
    </div>
  );
}
