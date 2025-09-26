import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import LegalIcon from '@/components/common/LegalIcon';
import { getIconDesign } from '@/config/iconography';
import { cn } from '@/lib/utils';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const DashboardHome = () => {
  const { language } = useLanguage();

  // Sample data for charts
  const caseData = [
    { month: language === 'ar' ? 'يناير' : 'Jan', cases: 65, revenue: 12000 },
    { month: language === 'ar' ? 'فبراير' : 'Feb', cases: 59, revenue: 15000 },
    { month: language === 'ar' ? 'مارس' : 'Mar', cases: 80, revenue: 18000 },
    { month: language === 'ar' ? 'أبريل' : 'Apr', cases: 81, revenue: 22000 },
    { month: language === 'ar' ? 'مايو' : 'May', cases: 56, revenue: 19000 },
    { month: language === 'ar' ? 'يونيو' : 'Jun', cases: 95, revenue: 25000 },
  ];

  const caseStatusData = [
    { name: language === 'ar' ? 'نشطة' : 'Active', value: 45, color: 'hsl(var(--primary))' },
    { name: language === 'ar' ? 'مكتملة' : 'Completed', value: 30, color: 'hsl(var(--success))' },
    { name: language === 'ar' ? 'معلقة' : 'Pending', value: 15, color: 'hsl(var(--warning))' },
    { name: language === 'ar' ? 'مؤجلة' : 'On Hold', value: 10, color: 'hsl(var(--muted-foreground))' },
  ];

  const stats = [
    {
      title: language === 'ar' ? 'إجمالي القضايا' : 'Total Cases',
      value: '247',
      change: '+12%',
      iconKey: 'cases' as const,
    },
    {
      title: language === 'ar' ? 'العملاء النشطون' : 'Active Clients',
      value: '89',
      change: '+8%',
      iconKey: 'clients' as const,
    },
    {
      title: language === 'ar' ? 'الإيرادات الشهرية' : 'Monthly Revenue',
      value: '$25,000',
      change: '+15%',
      iconKey: 'reports' as const,
    },
    {
      title: language === 'ar' ? 'المواعيد القادمة' : 'Upcoming Appointments',
      value: '12',
      change: '+3',
      iconKey: 'sessions' as const,
    },
  ];

  const recentActivities = [
    {
      id: 1,
      action: language === 'ar' ? 'قضية جديدة مُضافة' : 'New case added',
      client: language === 'ar' ? 'شركة الخليج' : 'Gulf Corporation',
      time: language === 'ar' ? 'منذ 2 ساعة' : '2 hours ago',
      status: 'new',
    },
    {
      id: 2,
      action: language === 'ar' ? 'تم إكمال المستند' : 'Document completed',
      client: language === 'ar' ? 'أحمد المحمدي' : 'Ahmed Al-Mohammadi',
      time: language === 'ar' ? 'منذ 4 ساعات' : '4 hours ago',
      status: 'completed',
    },
    {
      id: 3,
      action: language === 'ar' ? 'موعد مجدول' : 'Appointment scheduled',
      client: language === 'ar' ? 'شركة النور' : 'Al-Noor Company',
      time: language === 'ar' ? 'منذ 6 ساعات' : '6 hours ago',
      status: 'scheduled',
    },
  ];

  return (
    <div className="space-y-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Welcome Section */}
      <div className="rounded-xl bg-gradient-to-r from-primary to-primary-light p-4 text-primary-foreground sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold mb-2">
              {language === 'ar' ? 'مرحباً بك في لوحة التحكم' : 'Welcome to Your Dashboard'}
            </h1>
            <p className="text-primary-foreground/80">
              {language === 'ar' 
                ? 'إليك نظرة عامة على أداءك القانوني اليوم' 
                : 'Here\'s an overview of your legal practice today'
              }
            </p>
          </div>
          <LegalIcon iconKey="dashboard" width={48} height={48} />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const design = getIconDesign(stat.iconKey);
          return (
            <Card key={index} className="card-premium">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-text-strong">
                      {stat.value}
                    </p>
                    <Badge variant="secondary" className="mt-1">
                      {stat.change}
                    </Badge>
                  </div>
                  <div
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-2xl",
                      design.badgeClass ?? "text-white",
                    )}
                    style={{
                      background: design.badgeGradient,
                      boxShadow: design.shadow,
                    }}
                  >
                    <LegalIcon iconKey={stat.iconKey} width={28} height={28} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cases & Revenue Chart */}
        <Card className="card-premium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              {language === 'ar' ? 'القضايا والإيرادات' : 'Cases & Revenue'}
            </CardTitle>
            <CardDescription>
              {language === 'ar' 
                ? 'نظرة عامة على الأداء الشهري' 
                : 'Monthly performance overview'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={caseData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="cases" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Case Status Distribution */}
        <Card className="card-premium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LegalIcon iconKey="cases" width={20} height={20} />
              {language === 'ar' ? 'توزيع حالة القضايا' : 'Case Status Distribution'}
            </CardTitle>
            <CardDescription>
              {language === 'ar' 
                ? 'التوزيع الحالي للقضايا حسب الحالة' 
                : 'Current distribution of cases by status'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={caseStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                >
                  {caseStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {caseStatusData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-muted-foreground">{item.name}</span>
                  <Badge variant="outline">{item.value}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <Card className="lg:col-span-2 card-premium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              {language === 'ar' ? 'الأنشطة الأخيرة' : 'Recent Activities'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 bg-surface-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.status === 'new' ? 'bg-primary' :
                      activity.status === 'completed' ? 'bg-success' : 'bg-warning'
                    }`} />
                    <div>
                      <p className="font-medium text-text-strong">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.client}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="card-premium">
          <CardHeader>
            <CardTitle>
              {language === 'ar' ? 'إجراءات سريعة' : 'Quick Actions'}
            </CardTitle>
          </CardHeader>
         <CardContent className="space-y-3">
            <Button className="w-full justify-start gap-2 btn-premium">
              <LegalIcon iconKey="cases" width={20} height={20} />
              {language === 'ar' ? 'قضية جديدة' : 'New Case'}
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2">
              <LegalIcon iconKey="clients" width={20} height={20} />
              {language === 'ar' ? 'إضافة عميل' : 'Add Client'}
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2">
              <LegalIcon iconKey="sessions" width={20} height={20} />
              {language === 'ar' ? 'جدولة موعد' : 'Schedule Meeting'}
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2">
              <LegalIcon iconKey="documents" width={20} height={20} />
              {language === 'ar' ? 'إنشاء مستند' : 'Create Document'}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Task Progress */}
      <Card className="card-premium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            {language === 'ar' ? 'تقدم المهام' : 'Task Progress'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">
                  {language === 'ar' ? 'مراجعة الوثائق' : 'Document Review'}
                </span>
                <span className="text-sm text-muted-foreground">75%</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">
                  {language === 'ar' ? 'متابعة العملاء' : 'Client Follow-up'}
                </span>
                <span className="text-sm text-muted-foreground">60%</span>
              </div>
              <Progress value={60} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">
                  {language === 'ar' ? 'إعداد التقارير' : 'Report Preparation'}
                </span>
                <span className="text-sm text-muted-foreground">90%</span>
              </div>
              <Progress value={90} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardHome;
