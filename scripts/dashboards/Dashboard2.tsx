import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  RadialBarChart,
  RadialBar,
  Legend
} from 'recharts';
import { 
  Target, 
  TrendingUp, 
  Users2, 
  Award,
  Calendar,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardSidebar } from '@/components/shared/DashboardSidebar';
import { KPICard } from '@/components/shared/KPICard';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { LanguageToggle } from '@/components/shared/LanguageToggle';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

// Sample data
const salesTrendData = [
  { month: 'Jan', target: 50000, actual: 48000, team: 45000 },
  { month: 'Feb', target: 55000, actual: 58000, team: 52000 },
  { month: 'Mar', target: 60000, actual: 62000, team: 59000 },
  { month: 'Apr', target: 58000, actual: 55000, team: 57000 },
  { month: 'May', target: 65000, actual: 71000, team: 68000 },
  { month: 'Jun', target: 70000, actual: 74000, team: 72000 },
];

const teamPerformance = [
  { name: 'Alice Johnson', sales: 95000, target: 90000, achievement: 105 },
  { name: 'Bob Smith', sales: 87000, target: 85000, achievement: 102 },
  { name: 'Carol Davis', sales: 76000, target: 80000, achievement: 95 },
  { name: 'David Wilson', sales: 92000, target: 88000, achievement: 104 },
];

const goalProgress = [
  { name: 'Q1 Goal', value: 85, fill: '#22c55e' },
  { name: 'Q2 Goal', value: 70, fill: '#3b82f6' },
  { name: 'Q3 Goal', value: 45, fill: '#f59e0b' },
  { name: 'Q4 Goal', value: 20, fill: '#ef4444' },
];

export default function Dashboard2() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen bg-background dashboard-2">
      <DashboardSidebar variant="collapsible" theme="forest" />
      
      <main className="flex-1 overflow-x-hidden">
        {/* Header */}
        <header className="bg-card border-b border-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {t('sales')}
              </h1>
              <p className="text-muted-foreground mt-1">
                Track your sales performance and team goals
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                This Month
              </Button>
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
              title="Monthly Revenue"
              value="$124,430"
              change="+18.2% from last month"
              changeType="positive"
              icon={<TrendingUp className="h-5 w-5" />}
              variant="forest"
              className="animate-fade-in"
            />
            <KPICard
              title="Team Performance"
              value="102%"
              change="+5% above target"
              changeType="positive"
              icon={<Users2 className="h-5 w-5" />}
              variant="forest"
              className="animate-fade-in"
              style={{ animationDelay: '100ms' }}
            />
            <KPICard
              title="Deals Closed"
              value="47"
              change="+12 this week"
              changeType="positive"
              icon={<Award className="h-5 w-5" />}
              variant="forest"
              className="animate-fade-in"
              style={{ animationDelay: '200ms' }}
            />
            <KPICard
              title="Goal Achievement"
              value="87%"
              change="On track for Q2"
              changeType="positive"
              icon={<Target className="h-5 w-5" />}
              variant="forest"
              className="animate-fade-in"
              style={{ animationDelay: '300ms' }}
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sales Trend */}
            <Card className="animate-slide-up">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Sales vs Target Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={salesTrendData}>
                      <defs>
                        <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                        formatter={(value) => [`$${value.toLocaleString()}`, '']}
                      />
                      <Area
                        type="monotone"
                        dataKey="target"
                        stackId="1"
                        stroke="#94a3b8"
                        fillOpacity={1}
                        fill="url(#colorTarget)"
                        strokeWidth={2}
                      />
                      <Area
                        type="monotone"
                        dataKey="actual"
                        stackId="2"
                        stroke="hsl(var(--primary))"
                        fillOpacity={1}
                        fill="url(#colorActual)"
                        strokeWidth={3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Goal Progress */}
            <Card className="animate-slide-up" style={{ animationDelay: '200ms' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Quarterly Goals Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" data={goalProgress}>
                      <RadialBar
                        label={{ position: 'insideStart', fill: '#fff', fontSize: 12 }}
                        background
                        dataKey="value"
                        cornerRadius={10}
                      />
                      <Legend 
                        iconSize={12} 
                        layout="vertical" 
                        verticalAlign="middle" 
                        wrapperStyle={{ paddingLeft: '20px' }}
                      />
                      <Tooltip formatter={(value) => [`${value}%`, 'Progress']} />
                    </RadialBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Team Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Team Leaderboard */}
            <Card className="lg:col-span-2 animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users2 className="h-5 w-5 text-primary" />
                  Team Performance Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamPerformance.map((member, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">
                          #{index + 1}
                        </div>
                        <div>
                          <p className="font-semibold">{member.name}</p>
                          <p className="text-sm text-muted-foreground">
                            ${member.sales.toLocaleString()} / ${member.target.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge 
                          variant={member.achievement >= 100 ? "default" : "secondary"}
                          className="mb-2"
                        >
                          {member.achievement}%
                        </Badge>
                        <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full transition-all duration-500"
                            style={{ width: `${Math.min(member.achievement, 100)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="animate-scale-in" style={{ animationDelay: '200ms' }}>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start" variant="outline">
                  <Award className="h-4 w-4 mr-2" />
                  Add New Deal
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Users2 className="h-4 w-4 mr-2" />
                  Update Team Goals
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Meeting
                </Button>
                
                <div className="pt-4 border-t border-border">
                  <h4 className="font-semibold mb-3">Recent Activities</h4>
                  <div className="space-y-3">
                    {[
                      { text: 'Deal with Acme Corp closed', time: '2h ago' },
                      { text: 'Monthly target updated', time: '4h ago' },
                      { text: 'Team meeting scheduled', time: '1d ago' },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <div className="flex-1">
                          <p className="text-sm">{activity.text}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}