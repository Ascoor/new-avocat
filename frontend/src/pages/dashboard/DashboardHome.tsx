import React from 'react';
import { BarChart3, Users, Gavel, Calendar, TrendingUp, AlertCircle } from 'lucide-react';
import { GlassCard, GlassCardContent, GlassCardDescription, GlassCardHeader, GlassCardTitle } from '@/components/ui/glass-card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

const DashboardHome: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const { user } = useAuth();

  const stats = [
    {
      title: isRTL ? 'إجمالي القضايا' : 'Total Cases',
      value: '124',
      change: '+12%',
      icon: Gavel,
      color: 'text-primary'
    },
    {
      title: isRTL ? 'العملاء النشطون' : 'Active Clients',
      value: '89',
      change: '+8%',
      icon: Users,
      color: 'text-accent'
    },
    {
      title: isRTL ? 'الجلسات المقبلة' : 'Upcoming Sessions',
      value: '23',
      change: '+5%',
      icon: Calendar,
      color: 'text-success'
    },
    {
      title: isRTL ? 'معدل النجاح' : 'Success Rate',
      value: '94%',
      change: '+3%',
      icon: TrendingUp,
      color: 'text-warning'
    }
  ];

  const recentActivities = [
    {
      title: isRTL ? 'قضية جديدة: نزاع تجاري' : 'New Case: Commercial Dispute',
      time: isRTL ? 'منذ ساعة واحدة' : '1 hour ago',
      type: 'case'
    },
    {
      title: isRTL ? 'جلسة محكمة مجدولة' : 'Court Session Scheduled',
      time: isRTL ? 'منذ 3 ساعات' : '3 hours ago',
      type: 'session'
    },
    {
      title: isRTL ? 'عميل جديد مسجل' : 'New Client Registered',
      time: isRTL ? 'منذ يوم واحد' : '1 day ago',
      type: 'client'
    },
    {
      title: isRTL ? 'تقرير شهري جاهز' : 'Monthly Report Ready',
      time: isRTL ? 'منذ يومين' : '2 days ago',
      type: 'report'
    }
  ];

  const urgentTasks = [
    {
      title: isRTL ? 'مراجعة عقد الشراكة' : 'Review Partnership Contract',
      deadline: isRTL ? 'اليوم' : 'Today',
      priority: 'high'
    },
    {
      title: isRTL ? 'تحضير مرافعة الدفاع' : 'Prepare Defense Plea',
      deadline: isRTL ? 'غداً' : 'Tomorrow',
      priority: 'high'
    },
    {
      title: isRTL ? 'متابعة قضية العقارات' : 'Follow up Real Estate Case',
      deadline: isRTL ? 'الأسبوع المقبل' : 'Next Week',
      priority: 'medium'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
          {t('common.welcome')}, {user?.name}
        </h1>
        <p className="text-muted-foreground">
          {isRTL ? 'نظرة عامة على أحدث الأنشطة والإحصائيات' : 'Overview of your latest activities and statistics'}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <GlassCard
            key={index}
            variant="primary"
            hover="glow"
            className="animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <GlassCardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="text-sm text-success flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1 rtl:ml-1 rtl:mr-0" />
                    {stat.change}
                  </p>
                </div>
                <div className={`h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </GlassCardContent>
          </GlassCard>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <GlassCard variant="primary" hover="lift">
          <GlassCardHeader>
            <GlassCardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-accent" />
              {isRTL ? 'الأنشطة الحديثة' : 'Recent Activities'}
            </GlassCardTitle>
            <GlassCardDescription>
              {isRTL ? 'آخر التحديثات والأنشطة في النظام' : 'Latest updates and activities in the system'}
            </GlassCardDescription>
          </GlassCardHeader>
          <GlassCardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/10 transition-colors">
                  <div className="h-2 w-2 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCardContent>
        </GlassCard>

        {/* Urgent Tasks */}
        <GlassCard variant="primary" hover="lift">
          <GlassCardHeader>
            <GlassCardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-warning" />
              {isRTL ? 'المهام العاجلة' : 'Urgent Tasks'}
            </GlassCardTitle>
            <GlassCardDescription>
              {isRTL ? 'المهام التي تحتاج إلى اهتمام فوري' : 'Tasks that need immediate attention'}
            </GlassCardDescription>
          </GlassCardHeader>
          <GlassCardContent>
            <div className="space-y-4">
              {urgentTasks.map((task, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/10 transition-colors">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{task.title}</p>
                    <p className="text-xs text-muted-foreground">{task.deadline}</p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    task.priority === 'high' 
                      ? 'bg-destructive/20 text-destructive' 
                      : 'bg-warning/20 text-warning'
                  }`}>
                    {task.priority === 'high' 
                      ? (isRTL ? 'عاجل' : 'High') 
                      : (isRTL ? 'متوسط' : 'Medium')
                    }
                  </div>
                </div>
              ))}
            </div>
          </GlassCardContent>
        </GlassCard>
      </div>
    </div>
  );
};

export default DashboardHome;