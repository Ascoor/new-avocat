import React from 'react';
import { Badge } from '@/components/ui/badge';
import {
  Scale,
  Users,
  UserCheck,
  Briefcase,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  Calendar,
  FileText,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { AppCard } from '@/components/common/AppCard';

interface DashboardStat {
  title: string;
  value: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  trend: string;
  trendType: 'up' | 'neutral' | 'down';
}

interface ActivityItem {
  id: number;
  type: 'case' | 'session' | 'client' | 'procedure';
  title: string;
  description: string;
  time: string;
  status: 'new' | 'scheduled' | 'completed';
}

interface UpcomingTask {
  id: number;
  title: string;
  time: string;
  priority: 'high' | 'medium' | 'low';
}

const DashboardHome = () => {
  const { user } = useAuth();
  const { language, direction } = useLanguage();

  const dashboardStats: DashboardStat[] = [
    {
      title: language === 'ar' ? 'إجمالي القضايا' : 'Total Cases',
      value: '156',
      description: language === 'ar' ? 'قضية نشطة' : 'Active Cases',
      icon: Scale,
      trend: '+12%',
      trendType: 'up',
    },
    {
      title: language === 'ar' ? 'العملاء' : 'Clients',
      value: '89',
      description: language === 'ar' ? 'عميل مسجل' : 'Registered Clients',
      icon: Users,
      trend: '+5%',
      trendType: 'up',
    },
    {
      title: language === 'ar' ? 'المحامون' : 'Lawyers',
      value: '12',
      description: language === 'ar' ? 'محامي نشط' : 'Active Lawyers',
      icon: UserCheck,
      trend: '0%',
      trendType: 'neutral',
    },
    {
      title: language === 'ar' ? 'الخدمات' : 'Services',
      value: '24',
      description: language === 'ar' ? 'خدمة متاحة' : 'Available Services',
      icon: Briefcase,
      trend: '+8%',
      trendType: 'up',
    },
  ];

  const recentActivities: ActivityItem[] = [
    {
      id: 1,
      type: 'case',
      title: language === 'ar' ? 'قضية جديدة' : 'New Case',
      description:
        language === 'ar' ? 'قضية عقارات #2024-001' : 'Real Estate Case #2024-001',
      time: language === 'ar' ? 'منذ ساعتين' : '2 hours ago',
      status: 'new',
    },
    {
      id: 2,
      type: 'session',
      title: language === 'ar' ? 'جلسة محكمة' : 'Court Session',
      description:
        language === 'ar' ? 'جلسة مجدولة غداً' : 'Session scheduled tomorrow',
      time: language === 'ar' ? 'منذ 4 ساعات' : '4 hours ago',
      status: 'scheduled',
    },
    {
      id: 3,
      type: 'client',
      title: language === 'ar' ? 'عميل جديد' : 'New Client',
      description:
        language === 'ar' ? 'أحمد محمد - وكالة عامة' : 'Ahmad Mohammad - General Power',
      time: language === 'ar' ? 'أمس' : 'Yesterday',
      status: 'completed',
    },
    {
      id: 4,
      type: 'procedure',
      title: language === 'ar' ? 'إجراء مكتمل' : 'Procedure Completed',
      description:
        language === 'ar' ? 'تقديم الاستئناف' : 'Appeal Submission',
      time: language === 'ar' ? 'منذ 3 أيام' : '3 days ago',
      status: 'completed',
    },
  ];

  const upcomingTasks: UpcomingTask[] = [
    {
      id: 1,
      title:
        language === 'ar' ? 'جلسة محكمة - قضية #001' : 'Court Session - Case #001',
      time: language === 'ar' ? 'غداً 10:00 ص' : 'Tomorrow 10:00 AM',
      priority: 'high',
    },
    {
      id: 2,
      title: language === 'ar' ? 'موعد مع العميل' : 'Client Meeting',
      time: language === 'ar' ? 'اليوم 3:00 م' : 'Today 3:00 PM',
      priority: 'medium',
    },
    {
      id: 3,
      title: language === 'ar' ? 'تقديم الوثائق' : 'Document Submission',
      time: language === 'ar' ? 'خلال أسبوع' : 'In 1 week',
      priority: 'low',
    },
  ];

  const renderTrendBadge = (trendType: DashboardStat['trendType'], trend: string) => {
    if (trendType === 'up') {
      return (
        <Badge variant="default" className="flex items-center gap-1 text-xs">
          <TrendingUp className="h-3 w-3" />
          {trend}
        </Badge>
      );
    }

    const variant = trendType === 'down' ? 'destructive' : 'secondary';
    return (
      <Badge variant={variant} className="text-xs">
        {trend}
      </Badge>
    );
  };

  const renderActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'case':
        return <Scale className="h-5 w-5 text-brand-primary" />;
      case 'session':
        return <Calendar className="h-5 w-5 text-accent-amber" />;
      case 'client':
        return <Users className="h-5 w-5 text-accent-mint" />;
      case 'procedure':
        return <FileText className="h-5 w-5 text-brand-primary" />;
      default:
        return null;
    }
  };

  const renderTaskIcon = (priority: UpcomingTask['priority']) => {
    switch (priority) {
      case 'high':
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case 'medium':
        return <Clock className="h-4 w-4 text-warning" />;
      case 'low':
        return <CheckCircle className="h-4 w-4 text-success" />;
      default:
        return null;
    }
  };

  const getActivityStatusVariant = (status: ActivityItem['status']) => {
    switch (status) {
      case 'new':
        return 'default' as const;
      case 'scheduled':
        return 'secondary' as const;
      case 'completed':
        return 'outline' as const;
      default:
        return 'secondary' as const;
    }
  };

  const getActivityStatusLabel = (status: ActivityItem['status']) => {
    if (status === 'new') {
      return language === 'ar' ? 'جديد' : 'New';
    }

    if (status === 'scheduled') {
      return language === 'ar' ? 'مجدول' : 'Scheduled';
    }

    return language === 'ar' ? 'مكتمل' : 'Completed';
  };

  return (
    <div className="space-y-8" dir={direction}>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">
          {language === 'ar'
            ? `مرحباً، ${user?.name || 'مستخدم تجريبي'}`
            : `Welcome, ${user?.name || 'Demo User'}`}
        </h1>
        <p className="text-neutral-700 dark:text-neutral-200">
          {language === 'ar'
            ? 'نظرة عامة على أنشطة مكتبك اليوم'
            : "Here's an overview of your office activities today"}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {dashboardStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <AppCard key={stat.title}>
              <div className="flex items-start justify-between gap-3 pb-2">
                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-neutral-700 dark:text-neutral-200">
                    {stat.title}
                  </p>
                  <div className="text-3xl font-bold text-brand-primary">{stat.value}</div>
                </div>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                  <Icon className="h-5 w-5" />
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <p className="text-neutral-700 dark:text-neutral-200">{stat.description}</p>
                {renderTrendBadge(stat.trendType, stat.trend)}
              </div>
            </AppCard>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <AppCard className="lg:col-span-2">
          <div className="flex flex-row items-center justify-between pb-4">
            <div className="space-y-1">
              <p className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                {language === 'ar' ? 'النشاط الأخير' : 'Recent Activity'}
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-200">
                {language === 'ar'
                  ? 'تتبع آخر التحديثات على القضايا والجلسات'
                  : 'Track the latest updates on cases and sessions'}
              </p>
            </div>
            <Badge variant="secondary" className="rounded-full text-xs">
              {language === 'ar' ? 'محدث' : 'Updated'}
            </Badge>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-3 rounded-xl border border-white/10 bg-surface-raised/70 p-3 transition duration-base ease-smooth hover:-translate-y-0.5 hover:shadow-soft"
              >
                <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
                  {renderActivityIcon(activity.type)}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-neutral-900 dark:text-neutral-50">{activity.title}</h4>
                    <Badge variant={getActivityStatusVariant(activity.status)}>
                      {getActivityStatusLabel(activity.status)}
                    </Badge>
                  </div>
                  <p className="text-sm text-neutral-700 dark:text-neutral-200">
                    {activity.description}
                  </p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-300">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </AppCard>

        <AppCard>
          <div className="space-y-1 pb-4">
            <p className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
              {language === 'ar' ? 'المهام القادمة' : 'Upcoming Tasks'}
            </p>
            <p className="text-sm text-neutral-600 dark:text-neutral-200">
              {language === 'ar'
                ? 'أولوياتك للأيام القادمة'
                : 'Your priorities for the coming days'}
            </p>
          </div>
          <div className="space-y-3">
            {upcomingTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-surface-raised/70 p-3 transition duration-base ease-smooth hover:-translate-y-0.5 hover:shadow-soft"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
                  {renderTaskIcon(task.priority)}
                </span>
                <div className="flex-1">
                  <h4 className="font-semibold text-neutral-900 dark:text-neutral-50">{task.title}</h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-300">{task.time}</p>
                </div>
                <Badge
                  variant={
                    task.priority === 'high'
                      ? 'destructive'
                      : task.priority === 'medium'
                        ? 'default'
                        : 'secondary'
                  }
                >
                  {language === 'ar'
                    ? task.priority === 'high'
                      ? 'عالية'
                      : task.priority === 'medium'
                        ? 'متوسطة'
                        : 'منخفضة'
                    : task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </Badge>
              </div>
            ))}
          </div>
        </AppCard>
      </div>
    </div>
  );
};

export default DashboardHome;
