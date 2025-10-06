import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
        return <Scale className="h-5 w-5 text-blue-500" />;
      case 'session':
        return <Calendar className="h-5 w-5 text-orange-500" />;
      case 'client':
        return <Users className="h-5 w-5 text-green-500" />;
      case 'procedure':
        return <FileText className="h-5 w-5 text-purple-500" />;
      default:
        return null;
    }
  };

  const renderTaskIcon = (priority: UpcomingTask['priority']) => {
    switch (priority) {
      case 'high':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'medium':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'low':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
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
    <div className="space-y-6" dir={direction}>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold font-cairo">
          {language === 'ar'
            ? `مرحباً، ${user?.name || 'مستخدم تجريبي'}`
            : `Welcome, ${user?.name || 'Demo User'}`}
        </h1>
        <p className="text-muted-foreground font-cairo">
          {language === 'ar'
            ? 'نظرة عامة على أنشطة مكتبك اليوم'
            : "Here's an overview of your office activities today"}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {dashboardStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.title}
              className="transition-shadow duration-200 hover:shadow-card"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium font-cairo">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs text-muted-foreground gap-2 rtl:space-x-reverse">
                  <span className="font-cairo">{stat.description}</span>
                  {renderTrendBadge(stat.trendType, stat.trend)}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-cairo">
              {language === 'ar' ? 'الأنشطة الأخيرة' : 'Recent Activities'}
            </CardTitle>
            <CardDescription className="font-cairo">
              {language === 'ar' ? 'آخر التحديثات في مكتبك' : 'Latest updates in your office'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 rtl:space-x-reverse"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {renderActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-medium font-cairo">
                        {activity.title}
                      </p>
                      <Badge
                        variant={getActivityStatusVariant(activity.status)}
                        className="text-xs"
                      >
                        {getActivityStatusLabel(activity.status)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground font-cairo">
                      {activity.description}
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-cairo">
              {language === 'ar' ? 'المهام القادمة' : 'Upcoming Tasks'}
            </CardTitle>
            <CardDescription className="font-cairo">
              {language === 'ar'
                ? 'المواعيد والمهام المهمة'
                : 'Important appointments and tasks'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-start gap-3 rtl:space-x-reverse"
                >
                  <div className="flex-shrink-0 mt-1">
                    {renderTaskIcon(task.priority)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium font-cairo">{task.title}</p>
                    <p className="text-xs text-muted-foreground font-cairo">
                      {task.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHome;
