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
  AreaChart,
  Area
} from 'recharts';
import { 
  Target, 
  TrendingUp, 
  Users, 
  MousePointer,
  Eye,
  Activity
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardSidebar } from '@/components/shared/DashboardSidebar';
import { KPICard } from '@/components/shared/KPICard';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { LanguageToggle } from '@/components/shared/LanguageToggle';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '@/contexts/AppContext';

// Marketing Analytics Data
const campaignData = [
  { month: 'Jan', impressions: 45000, clicks: 1250, conversions: 85 },
  { month: 'Feb', impressions: 52000, clicks: 1420, conversions: 102 },
  { month: 'Mar', impressions: 48000, clicks: 1380, conversions: 95 },
  { month: 'Apr', impressions: 58000, clicks: 1650, conversions: 118 },
  { month: 'May', impressions: 64000, clicks: 1820, conversions: 135 },
  { month: 'Jun', impressions: 71000, clicks: 2050, conversions: 156 },
];

const channelData = [
  { name: 'Google Ads', value: 35, color: '#84cc16' },
  { name: 'Facebook', value: 25, color: '#65a30d' },
  { name: 'Instagram', value: 20, color: '#4d7c0f' },
  { name: 'Email Marketing', value: 20, color: '#84cc16' },
];

export default function Dashboard10() {
  const { t } = useTranslation();
  const { direction } = useAppContext();

  return (
    <div className="flex min-h-screen bg-background dashboard-10">
      <DashboardSidebar variant="collapsible" theme="ocean" />
      
      <main className="flex-1 overflow-x-hidden">
        {/* Header */}
        <header className="bg-card border-b border-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {t('marketing')}
              </h1>
              <p className="text-muted-foreground mt-1">
                Track and optimize your marketing campaigns
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
              title="Total Impressions"
              value="71K"
              change="+18.5% from last month"
              changeType="positive"
              icon={<Eye className="h-5 w-5" />}
              variant="lime"
              className="animate-fade-in"
            />
            <KPICard
              title="Click-through Rate"
              value="2.89%"
              change="+0.3% from last month"
              changeType="positive"
              icon={<MousePointer className="h-5 w-5" />}
              variant="lime"
              className="animate-fade-in"
              style={{ animationDelay: '100ms' }}
            />
            <KPICard
              title="Conversions"
              value="156"
              change="+15.6% from last month"
              changeType="positive"
              icon={<Target className="h-5 w-5" />}
              variant="lime"
              className="animate-fade-in"
              style={{ animationDelay: '200ms' }}
            />
            <KPICard
              title="Cost per Acquisition"
              value="$28.50"
              change="-$3.20 improvement"
              changeType="positive"
              icon={<TrendingUp className="h-5 w-5" />}
              variant="lime"
              className="animate-fade-in"
              style={{ animationDelay: '300ms' }}
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Campaign Performance */}
            <Card className="animate-slide-up">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Campaign Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={campaignData}>
                      <defs>
                        <linearGradient id="impressions" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="clicks" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
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
                      <Area
                        type="monotone"
                        dataKey="impressions"
                        stroke="hsl(var(--primary))"
                        fillOpacity={1}
                        fill="url(#impressions)"
                        name="Impressions"
                      />
                      <Area
                        type="monotone"
                        dataKey="clicks"
                        stroke="hsl(var(--secondary))"
                        fillOpacity={1}
                        fill="url(#clicks)"
                        name="Clicks"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Conversion Funnel */}
            <Card className="animate-slide-up" style={{ animationDelay: '200ms' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Conversion Funnel
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={campaignData} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis 
                        type="number"
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis 
                        type="category"
                        dataKey="month"
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
                        dataKey="conversions" 
                        fill="hsl(var(--primary))"
                        radius={[0, 4, 4, 0]}
                        name="Conversions"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Marketing Channels */}
            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle>Marketing Channels</CardTitle>
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
                <CardTitle>Recent Marketing Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: 'Summer campaign launched with 20% CTR', time: '2 hours ago', type: 'campaign' },
                    { action: 'Email newsletter sent to 15K subscribers', time: '4 hours ago', type: 'email' },
                    { action: 'Facebook ad spend increased by $500', time: '6 hours ago', type: 'budget' },
                    { action: 'A/B test completed for landing page', time: '8 hours ago', type: 'test' },
                    { action: 'Monthly marketing report generated', time: '1 day ago', type: 'report' },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.type === 'campaign' ? 'bg-green-500' :
                          activity.type === 'email' ? 'bg-blue-500' :
                          activity.type === 'budget' ? 'bg-orange-500' :
                          activity.type === 'test' ? 'bg-purple-500' :
                          'bg-lime-500'
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