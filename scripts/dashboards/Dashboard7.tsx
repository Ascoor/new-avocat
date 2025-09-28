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
  Folder, 
  Users, 
  Calendar, 
  CheckCircle,
  Clock,
  Target
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardSidebar } from '@/components/shared/DashboardSidebar';
import { KPICard } from '@/components/shared/KPICard';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { LanguageToggle } from '@/components/shared/LanguageToggle';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '@/contexts/AppContext';

// Project Management Data
const projectData = [
  { month: 'Jan', completed: 8, inProgress: 12, planned: 15 },
  { month: 'Feb', completed: 12, inProgress: 10, planned: 18 },
  { month: 'Mar', completed: 15, inProgress: 8, planned: 20 },
  { month: 'Apr', completed: 10, inProgress: 14, planned: 16 },
  { month: 'May', completed: 18, inProgress: 11, planned: 22 },
  { month: 'Jun', completed: 20, inProgress: 9, planned: 25 },
];

const statusData = [
  { name: 'Completed', value: 45, color: '#059669' },
  { name: 'In Progress', value: 35, color: '#0891b2' },
  { name: 'Planning', value: 20, color: '#0d9488' },
];

export default function Dashboard7() {
  const { t } = useTranslation();
  const { direction } = useAppContext();

  return (
    <div className="flex min-h-screen bg-background dashboard-7">
      <DashboardSidebar variant="collapsible" theme="ocean" />
      
      <main className="flex-1 overflow-x-hidden">
        {/* Header */}
        <header className="bg-card border-b border-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {t('project')}
              </h1>
              <p className="text-muted-foreground mt-1">
                Track and manage your projects efficiently
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
              title="Active Projects"
              value="42"
              change="+8% from last month"
              changeType="positive"
              icon={<Folder className="h-5 w-5" />}
              variant="teal"
              className="animate-fade-in"
            />
            <KPICard
              title="Team Members"
              value="156"
              change="+12 new members"
              changeType="positive"
              icon={<Users className="h-5 w-5" />}
              variant="teal"
              className="animate-fade-in"
              style={{ animationDelay: '100ms' }}
            />
            <KPICard
              title="Completed Tasks"
              value="892"
              change="+15% from last month"
              changeType="positive"
              icon={<CheckCircle className="h-5 w-5" />}
              variant="teal"
              className="animate-fade-in"
              style={{ animationDelay: '200ms' }}
            />
            <KPICard
              title="Avg. Completion Time"
              value="12.5 days"
              change="-2.3 days improvement"
              changeType="positive"
              icon={<Clock className="h-5 w-5" />}
              variant="teal"
              className="animate-fade-in"
              style={{ animationDelay: '300ms' }}
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Project Progress */}
            <Card className="animate-slide-up">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Folder className="h-5 w-5 text-primary" />
                  Project Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={projectData}>
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
                        dataKey="completed" 
                        fill="hsl(var(--primary))"
                        radius={[4, 4, 0, 0]}
                        name="Completed"
                      />
                      <Bar 
                        dataKey="inProgress" 
                        fill="hsl(var(--secondary))"
                        radius={[4, 4, 0, 0]}
                        name="In Progress"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Team Performance */}
            <Card className="animate-slide-up" style={{ animationDelay: '200ms' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Team Productivity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={projectData}>
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
                        dataKey="completed" 
                        stroke="hsl(var(--primary))"
                        strokeWidth={3}
                        dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 6 }}
                        activeDot={{ r: 8 }}
                        name="Completed Projects"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="inProgress" 
                        stroke="hsl(var(--secondary))"
                        strokeWidth={3}
                        dot={{ fill: 'hsl(var(--secondary))', strokeWidth: 2, r: 6 }}
                        activeDot={{ r: 8 }}
                        name="In Progress"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Project Status */}
            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle>Project Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2">
                  {statusData.map((item, index) => (
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
                <CardTitle>Recent Project Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: 'Website redesign project completed', time: '30 minutes ago', type: 'completed' },
                    { action: 'Mobile app development milestone reached', time: '2 hours ago', type: 'milestone' },
                    { action: 'New project "AI Integration" started', time: '4 hours ago', type: 'started' },
                    { action: 'Team standup meeting scheduled for tomorrow', time: '6 hours ago', type: 'meeting' },
                    { action: 'Budget approval for Q4 projects received', time: '1 day ago', type: 'budget' },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.type === 'completed' ? 'bg-green-500' :
                          activity.type === 'milestone' ? 'bg-blue-500' :
                          activity.type === 'started' ? 'bg-purple-500' :
                          activity.type === 'meeting' ? 'bg-orange-500' :
                          'bg-teal-500'
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