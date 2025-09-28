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
  Cell
} from 'recharts';
import { 
  Users, 
  UserPlus, 
  Calendar, 
  Award,
  Clock,
  CheckCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardSidebar } from '@/components/shared/DashboardSidebar';
import { KPICard } from '@/components/shared/KPICard';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { LanguageToggle } from '@/components/shared/LanguageToggle';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '@/contexts/AppContext';

// HR Management Data
const employeeData = [
  { month: 'Jan', hires: 12, departures: 8, performance: 85 },
  { month: 'Feb', hires: 15, departures: 6, performance: 87 },
  { month: 'Mar', hires: 8, departures: 10, performance: 83 },
  { month: 'Apr', hires: 18, departures: 5, performance: 89 },
  { month: 'May', hires: 22, departures: 7, performance: 91 },
  { month: 'Jun', hires: 16, departures: 9, performance: 88 },
];

const departmentData = [
  { name: 'Engineering', value: 45, color: '#dc2626' },
  { name: 'Sales', value: 25, color: '#ea580c' },
  { name: 'Marketing', value: 15, color: '#ca8a04' },
  { name: 'HR', value: 15, color: '#dc2626' },
];

export default function Dashboard6() {
  const { t } = useTranslation();
  const { direction } = useAppContext();

  return (
    <div className="flex min-h-screen bg-background dashboard-6">
      <DashboardSidebar variant="collapsible" theme="ocean" />
      
      <main className="flex-1 overflow-x-hidden">
        {/* Header */}
        <header className="bg-card border-b border-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {t('hr')}
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage your team and human resources effectively
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <KPICard
              title="Total Employees"
              value="324"
              change="+5.2% from last month"
              changeType="positive"
              icon={<Users className="h-5 w-5" />}
              variant="crimson"
              className="animate-fade-in"
            />
            <KPICard
              title="New Hires"
              value="16"
              change="+12% from last month"
              changeType="positive"
              icon={<UserPlus className="h-5 w-5" />}
              variant="crimson"
              className="animate-fade-in"
              style={{ animationDelay: '100ms' }}
            />
            <KPICard
              title="Departures"
              value="9"
              change="-3% from last month"
              changeType="negative"
              icon={<Clock className="h-5 w-5" />}
              variant="crimson"
              className="animate-fade-in"
              style={{ animationDelay: '200ms' }}
            />
            <KPICard
              title="Performance Score"
              value="88%"
              change="+2.5% from last month"
              changeType="positive"
              icon={<Award className="h-5 w-5" />}
              variant="crimson"
              className="animate-fade-in"
              style={{ animationDelay: '300ms' }}
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Hiring Trends */}
            <Card className="animate-slide-up">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5 text-primary" />
                  Hiring vs Departures
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={employeeData}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis 
                        dataKey="month" 
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis 
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                      />
                      <Bar 
                        dataKey="hires" 
                        fill="hsl(var(--primary))"
                        radius={[4, 4, 0, 0]}
                        name="New Hires"
                      />
                      <Bar 
                        dataKey="departures" 
                        fill="hsl(var(--secondary))"
                        radius={[4, 4, 0, 0]}
                        name="Departures"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Performance Trend */}
            <Card className="animate-slide-up" style={{ animationDelay: '200ms' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Performance Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={employeeData}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis 
                        dataKey="month" 
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis 
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="performance" 
                        stroke="hsl(var(--primary))"
                        strokeWidth={3}
                        dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 6 }}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Department Distribution */}
            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle>Department Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={departmentData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {departmentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2">
                  {departmentData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm font-medium">{item.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card className="lg:col-span-2 animate-scale-in" style={{ animationDelay: '200ms' }}>
              <CardHeader>
                <CardTitle>Recent HR Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: 'Sarah Johnson hired as Senior Developer', time: '1 hour ago', type: 'hire' },
                    { action: 'Performance review completed for Marketing team', time: '3 hours ago', type: 'review' },
                    { action: 'John Smith submitted resignation', time: '5 hours ago', type: 'departure' },
                    { action: 'Team building event scheduled for next Friday', time: '8 hours ago', type: 'event' },
                    { action: 'Quarterly training program launched', time: '1 day ago', type: 'training' },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.type === 'hire' ? 'bg-green-500' :
                          activity.type === 'review' ? 'bg-blue-500' :
                          activity.type === 'departure' ? 'bg-red-500' :
                          activity.type === 'event' ? 'bg-purple-500' :
                          'bg-orange-500'
                        }`} />
                        <span className="font-medium">{activity.action}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}