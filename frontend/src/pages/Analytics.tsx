
import { useState, useEffect, type ComponentType } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../hooks/useLanguage';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { Progress } from '../components/ui/progress';
import { 
  Users, 
  Briefcase, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Plus,
  FileText,
  Clock,
  Scale,
  Gavel
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { formatThousands } from '@/lib/utils';

// Mock data
const monthlyData = [
  { month: 'Jan', cases: 12, clients: 8, revenue: 15000 },
  { month: 'Feb', cases: 15, clients: 12, revenue: 18000 },
  { month: 'Mar', cases: 18, clients: 15, revenue: 22000 },
  { month: 'Apr', cases: 22, clients: 18, revenue: 25000 },
  { month: 'May', cases: 25, clients: 22, revenue: 28000 },
  { month: 'Jun', cases: 28, clients: 25, revenue: 32000 }
];

const caseStatusData = [
  { name: 'Active', value: 45, color: '#3B82F6' },
  { name: 'Pending', value: 30, color: '#F59E0B' },
  { name: 'Closed', value: 20, color: '#10B981' },
  { name: 'On Hold', value: 5, color: '#EF4444' }
];

const recentActivities = [
  { id: 1, type: 'case', title: 'New case filed: Smith vs. Johnson', time: '2 hours ago' },
  { id: 2, type: 'client', title: 'Client meeting scheduled with Maria Garcia', time: '4 hours ago' },
  { id: 3, type: 'document', title: 'Contract review completed', time: '1 day ago' },
  { id: 4, type: 'session', title: 'Court hearing attended', time: '2 days ago' }
];

export const Analytics = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const [animatedValues, setAnimatedValues] = useState({
    cases: 0,
    clients: 0,
    sessions: 0,
    revenue: 0
  });

  // Animate numbers on mount
  useEffect(() => {
    const targets = { cases: 156, clients: 89, sessions: 24, revenue: 32500 };
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      
      setAnimatedValues({
        cases: Math.floor(targets.cases * progress),
        clients: Math.floor(targets.clients * progress),
        sessions: Math.floor(targets.sessions * progress),
        revenue: Math.floor(targets.revenue * progress)
      });

      if (step >= steps) {
        clearInterval(timer);
        setAnimatedValues(targets);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, []);

  interface StatCardProps {
    title: string;
    value: number | string;
    icon: ComponentType<{ className?: string }>;
    trend?: 'up' | 'down';
    trendValue?: number;
    color?: string;
    gradient?: string;
  }

  const StatCard = ({ title, value, icon: Icon, trend, trendValue, color = "blue", gradient }: StatCardProps) => (
    <Card className={`hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${gradient} border-l-4 border-l-${color}-500 animate-scale-in`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {title}
        </CardTitle>
        <div className={`p-2 rounded-full bg-${color}-100 dark:bg-${color}-900/20`}>
          <Icon className={`h-5 w-5 text-${color}-600 dark:text-${color}-400`} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-gray-900 dark:text-white">
          {typeof value === 'number' ? formatThousands(value) : value}
        </div>
        {trend && (
          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-2">
            {trend === 'up' ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
            <span className={trend === 'up' ? 'text-green-500 font-medium' : 'text-red-500 font-medium'}>
              {trendValue}%
            </span>
            <span>from last month</span>
          </p>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <Scale className="h-8 w-8 text-blue-600" />
            {t('dashboard.welcome')}, Avocat! ⚖️
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1 text-lg">
            Here's what's happening with your legal practice today.
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg">
            <Plus className="h-4 w-4 mr-2" />
            {t('dashboard.add_case')}
          </Button>
          <Button variant="outline" size="sm" className="shadow-md">
            <Calendar className="h-4 w-4 mr-2" />
            {t('dashboard.schedule_session')}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title={t('dashboard.total_cases')}
          value={animatedValues.cases}
          icon={Briefcase}
          trend="up"
          trendValue={12}
          color="blue"
          gradient="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20"
        />
        <StatCard
          title={t('dashboard.active_clients')}
          value={animatedValues.clients}
          icon={Users}
          trend="up"
          trendValue={8}
          color="green"
          gradient="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20"
        />
        <StatCard
          title={t('dashboard.pending_sessions')}
          value={animatedValues.sessions}
          icon={Calendar}
          trend="down"
          trendValue={3}
          color="orange"
          gradient="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20"
        />
        <StatCard
          title={t('dashboard.monthly_revenue')}
          value={animatedValues.revenue}
          icon={DollarSign}
          trend="up"
          trendValue={15}
          color="purple"
          gradient="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Trend */}
        <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
              <Gavel className="h-5 w-5 text-blue-500" />
              Legal Revenue Trend
            </CardTitle>
            <CardDescription>Monthly revenue performance over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb', 
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="url(#colorRevenue)"
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 5 }}
                  activeDot={{ r: 7, stroke: '#3b82f6', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Case Status Distribution */}
        <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
              <Scale className="h-5 w-5 text-indigo-500" />
              Case Status Distribution
            </CardTitle>
            <CardDescription>Current status breakdown of all legal cases</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={caseStatusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {caseStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 shadow-xl">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-500" />
              {t('dashboard.recent_activity')}
            </CardTitle>
            <CardDescription>Latest updates from your legal practice</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={activity.id} className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/50">
                    {activity.type === 'case' && <Briefcase className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
                    {activity.type === 'client' && <Users className="h-5 w-5 text-green-600 dark:text-green-400" />}
                    {activity.type === 'document' && <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />}
                    {activity.type === 'session' && <Calendar className="h-5 w-5 text-orange-600 dark:text-orange-400" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {activity.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
                      <Clock className="h-3 w-3" />
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
              <Gavel className="h-5 w-5 text-purple-500" />
              {t('dashboard.quick_actions')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start shadow-md hover:shadow-lg transition-shadow" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              {t('dashboard.add_client')}
            </Button>
            <Button variant="outline" className="w-full justify-start shadow-md hover:shadow-lg transition-shadow" size="sm">
              <Briefcase className="h-4 w-4 mr-2" />
              {t('dashboard.add_case')}
            </Button>
            <Button variant="outline" className="w-full justify-start shadow-md hover:shadow-lg transition-shadow" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              {t('dashboard.schedule_session')}
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full justify-start shadow-md hover:shadow-lg transition-shadow"
              size="sm"
            >
              <Link to="/reports">
                <FileText className="h-4 w-4 mr-2" />
                Generate Legal Report
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
