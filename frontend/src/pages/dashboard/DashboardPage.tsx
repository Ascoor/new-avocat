import { motion } from 'framer-motion';
import {
  Briefcase,
  Clock,
  CheckSquare,
  Receipt,
  Plus,
  Upload,
  FileText,
  ArrowUpRight,
  TrendingUp,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  Legend,
} from 'recharts';
import { useLanguage } from '@/contexts/LanguageContext';
import { KPICard } from '@/components/common/KPICard';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Button } from '@/components/ui/button';
import {
  mockCases,
  mockTasks,
  mockActivities,
  casesByStatusData,
  deadlinesTimelineData,
  revenueData,
  teamWorkloadData,
} from '@/data/mockData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Dashboard() {
  const { t, language, direction } = useLanguage();
  const isRTL = direction === 'rtl';

  const activeCases = mockCases.filter(c => c.status === 'active' || c.status === 'urgent').length;
  const urgentDeadlines = mockCases.filter(c => c.status === 'urgent').length;
  const openTasks = mockTasks.filter(t => t.status !== 'done').length;
  const outstandingInvoices = '$178,500';

  const quickActions = [
    { icon: Plus, label: language === 'ar' ? 'قضية جديدة' : 'New Case', path: '/cases/new' },
    { icon: Upload, label: language === 'ar' ? 'رفع مستند' : 'Upload Doc', path: '/documents' },
    { icon: CheckSquare, label: language === 'ar' ? 'مهمة جديدة' : 'New Task', path: '/tasks' },
    { icon: FileText, label: language === 'ar' ? 'تقرير' : 'Report', path: '/reports' },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Page Header */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            {t('dashboard.title')}
          </h1>
          <p className="text-muted-foreground mt-1">
            {t('dashboard.welcome')}, Sarah Mitchell
          </p>
        </div>
        <div className="flex gap-2">
          {quickActions.slice(0, 2).map((action) => (
            <Button key={action.path} variant="outline" size="sm" asChild>
              <Link to={action.path} className="flex items-center gap-2">
                <action.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{action.label}</span>
              </Link>
            </Button>
          ))}
        </div>
      </motion.div>

      {/* KPI Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title={t('dashboard.activeCases')}
          value={activeCases}
          icon={Briefcase}
          trend={{ value: 12, isPositive: true }}
          variant="accent"
        />
        <KPICard
          title={t('dashboard.urgentDeadlines')}
          value={urgentDeadlines}
          icon={Clock}
          description={language === 'ar' ? 'خلال 7 أيام' : 'Next 7 days'}
          variant="warning"
        />
        <KPICard
          title={t('dashboard.openTasks')}
          value={openTasks}
          icon={CheckSquare}
          trend={{ value: 5, isPositive: false }}
          variant="default"
        />
        <KPICard
          title={t('dashboard.outstandingInvoices')}
          value={outstandingInvoices}
          icon={Receipt}
          trend={{ value: 8, isPositive: true }}
          variant="success"
        />
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cases by Status */}
        <motion.div variants={itemVariants} className="glass-card rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            {t('dashboard.casesByStatus')}
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={casesByStatusData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis 
                  dataKey={language === 'ar' ? 'statusAr' : 'status'} 
                  type="category" 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12}
                  width={80}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="count" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Deadlines Timeline */}
        <motion.div variants={itemVariants} className="glass-card rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            {t('dashboard.deadlinesTimeline')}
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={deadlinesTimelineData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey={language === 'ar' ? 'dateAr' : 'date'} 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12} 
                />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="hsl(var(--accent))"
                  fill="hsl(var(--accent) / 0.2)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Second Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue vs Billed */}
        <motion.div variants={itemVariants} className="glass-card rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            {t('dashboard.revenueVsBilled')}
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={revenueData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey={language === 'ar' ? 'monthAr' : 'month'} 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12} 
                />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => `$${value.toLocaleString()}`}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  name={language === 'ar' ? 'الإيرادات' : 'Revenue'}
                  stroke="hsl(var(--success))"
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--success))' }}
                />
                <Line
                  type="monotone"
                  dataKey="billed"
                  name={language === 'ar' ? 'المفوتر' : 'Billed'}
                  stroke="hsl(var(--secondary))"
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--secondary))' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Team Workload */}
        <motion.div variants={itemVariants} className="glass-card rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            {t('dashboard.teamWorkload')}
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={teamWorkloadData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey={language === 'ar' ? 'nameAr' : 'name'} 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12} 
                />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Bar 
                  dataKey="cases" 
                  name={language === 'ar' ? 'القضايا' : 'Cases'}
                  fill="hsl(var(--accent))" 
                  radius={[4, 4, 0, 0]} 
                />
                <Bar 
                  dataKey="tasks" 
                  name={language === 'ar' ? 'المهام' : 'Tasks'}
                  fill="hsl(var(--secondary))" 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Bottom Row - Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <motion.div variants={itemVariants} className="lg:col-span-2 glass-card rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">
              {t('dashboard.recentActivity')}
            </h3>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/reports" className="flex items-center gap-1">
                {t('common.viewAll')}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="space-y-4">
            {mockActivities.slice(0, 5).map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  {activity.type === 'document_upload' && <Upload className="h-5 w-5 text-accent" />}
                  {activity.type === 'case_update' && <Briefcase className="h-5 w-5 text-accent" />}
                  {activity.type === 'invoice_issued' && <Receipt className="h-5 w-5 text-accent" />}
                  {activity.type === 'task_completed' && <CheckSquare className="h-5 w-5 text-accent" />}
                  {activity.type === 'note_added' && <FileText className="h-5 w-5 text-accent" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    {language === 'ar' ? activity.titleAr : activity.title}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {language === 'ar' ? activity.descriptionAr : activity.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {activity.user} • {new Date(activity.timestamp).toLocaleTimeString(language === 'ar' ? 'ar' : 'en', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants} className="glass-card rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            {t('dashboard.quickActions')}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => (
              <Link
                key={action.path}
                to={action.path}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-muted/50 hover:bg-accent/10 hover:text-accent transition-colors group"
              >
                <div className="p-3 rounded-xl bg-background group-hover:bg-accent/10 transition-colors">
                  <action.icon className="h-6 w-6" />
                </div>
                <span className="text-xs font-medium text-center">{action.label}</span>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

}
