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
  MessageCircle, 
  Clock, 
  CheckCircle, 
  Star,
  Users,
  Phone
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardSidebar } from '@/components/shared/DashboardSidebar';
import { KPICard } from '@/components/shared/KPICard';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { LanguageToggle } from '@/components/shared/LanguageToggle';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '@/contexts/AppContext';

// Customer Support Data
const supportData = [
  { month: 'Jan', tickets: 245, resolved: 220, satisfaction: 4.2 },
  { month: 'Feb', tickets: 280, resolved: 265, satisfaction: 4.3 },
  { month: 'Mar', tickets: 320, resolved: 298, satisfaction: 4.1 },
  { month: 'Apr', tickets: 290, resolved: 275, satisfaction: 4.4 },
  { month: 'May', tickets: 310, resolved: 295, satisfaction: 4.5 },
  { month: 'Jun', tickets: 265, resolved: 255, satisfaction: 4.6 },
];

const channelData = [
  { name: 'Live Chat', value: 40, color: '#3730a3' },
  { name: 'Email', value: 30, color: '#4338ca' },
  { name: 'Phone', value: 20, color: '#4f46e5' },
  { name: 'Social Media', value: 10, color: '#6366f1' },
];

export default function Dashboard9() {
  const { t } = useTranslation();
  const { direction } = useAppContext();

  return (
    <div className="flex min-h-screen bg-background dashboard-9">
      <DashboardSidebar variant="collapsible" theme="ocean" />
      
      <main className="flex-1 overflow-x-hidden">
        {/* Header */}
        <header className="bg-card border-b border-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {t('support')}
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage customer support and satisfaction
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
              title="Open Tickets"
              value="42"
              change="-15% from last month"
              changeType="positive"
              icon={<MessageCircle className="h-5 w-5" />}
              variant="indigo"
              className="animate-fade-in"
            />
            <KPICard
              title="Avg. Response Time"
              value="2.3h"
              change="-0.5h improvement"
              changeType="positive"
              icon={<Clock className="h-5 w-5" />}
              variant="indigo"
              className="animate-fade-in"
              style={{ animationDelay: '100ms' }}
            />
            <KPICard
              title="Resolution Rate"
              value="96.2%"
              change="+2.1% from last month"
              changeType="positive"
              icon={<CheckCircle className="h-5 w-5" />}
              variant="indigo"
              className="animate-fade-in"
              style={{ animationDelay: '200ms' }}
            />
            <KPICard
              title="Satisfaction Score"
              value="4.6/5"
              change="+0.2 from last month"
              changeType="positive"
              icon={<Star className="h-5 w-5" />}
              variant="indigo"
              className="animate-fade-in"
              style={{ animationDelay: '300ms' }}
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Ticket Volume */}
            <Card className="animate-slide-up">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  Support Tickets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={supportData}>
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
                        dataKey="tickets" 
                        fill="hsl(var(--primary))"
                        radius={[4, 4, 0, 0]}
                        name="Total Tickets"
                      />
                      <Bar 
                        dataKey="resolved" 
                        fill="hsl(var(--secondary))"
                        radius={[4, 4, 0, 0]}
                        name="Resolved"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Satisfaction Trend */}
            <Card className="animate-slide-up" style={{ animationDelay: '200ms' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-primary" />
                  Customer Satisfaction
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={supportData}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis 
                        dataKey="month" 
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis 
                        domain={[3.5, 5]}
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
                        dataKey="satisfaction" 
                        stroke="hsl(var(--primary))"
                        strokeWidth={3}
                        dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 6 }}
                        activeDot={{ r: 8 }}
                        name="Satisfaction Score"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Support Channels */}
            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle>Support Channels</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={channelData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {channelData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2">
                  {channelData.map((item, index) => (
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
                <CardTitle>Recent Support Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: 'High priority ticket #12345 resolved', time: '5 minutes ago', type: 'resolved' },
                    { action: 'Customer feedback received - 5 stars', time: '15 minutes ago', type: 'feedback' },
                    { action: 'New ticket created via live chat', time: '1 hour ago', type: 'created' },
                    { action: 'Agent training session completed', time: '3 hours ago', type: 'training' },
                    { action: 'Weekly team meeting scheduled', time: '1 day ago', type: 'meeting' },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.type === 'resolved' ? 'bg-green-500' :
                          activity.type === 'feedback' ? 'bg-blue-500' :
                          activity.type === 'created' ? 'bg-orange-500' :
                          activity.type === 'training' ? 'bg-purple-500' :
                          'bg-indigo-500'
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