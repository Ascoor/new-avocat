
import { useState, type ComponentType } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import {
  TrendingUp,
  TrendingDown,
  Users,
  Briefcase,
  DollarSign,
  Calendar,
  Scale,
  BarChart3,
  FileText,
  Clock,
  Award,
  Target
} from 'lucide-react';
import { formatValue } from '@/lib/utils';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

// Mock data for analytics
const monthlyRevenueData = [
  { month: 'Jan', revenue: 45000, cases: 12, clients: 8 },
  { month: 'Feb', revenue: 52000, cases: 15, clients: 12 },
  { month: 'Mar', revenue: 48000, cases: 11, clients: 9 },
  { month: 'Apr', revenue: 61000, cases: 18, clients: 14 },
  { month: 'May', revenue: 55000, cases: 16, clients: 11 },
  { month: 'Jun', revenue: 67000, cases: 20, clients: 16 },
];

const caseTypeData = [
  { name: 'Corporate Law', value: 35, color: '#3B82F6' },
  { name: 'Criminal Defense', value: 25, color: '#EF4444' },
  { name: 'Family Law', value: 20, color: '#10B981' },
  { name: 'Real Estate', value: 15, color: '#F59E0B' },
  { name: 'Immigration', value: 5, color: '#8B5CF6' }
];

const lawyerPerformanceData = [
  { name: 'Ahmed Al-Rashid', cases: 28, winRate: 92, revenue: 125000 },
  { name: 'Sarah Johnson', cases: 24, winRate: 88, revenue: 98000 },
  { name: 'Mohammed Hassan', cases: 22, winRate: 85, revenue: 87000 },
  { name: 'Emily Davis', cases: 20, winRate: 90, revenue: 82000 },
  { name: 'Omar Khalil', cases: 18, winRate: 87, revenue: 76000 }
];

const quarterlyData = [
  { quarter: 'Q1', revenue: 145000, expenses: 85000, profit: 60000 },
  { quarter: 'Q2', revenue: 183000, expenses: 95000, profit: 88000 },
  { quarter: 'Q3', revenue: 167000, expenses: 89000, profit: 78000 },
  { quarter: 'Q4', revenue: 201000, expenses: 105000, profit: 96000 }
];

export const Dashboard = () => {
  const { t } = useTranslation();
  const [selectedPeriod, setSelectedPeriod] = useState('6months');

  interface KPICardProps {
    title: string;
    value: string | number;
    change?: number;
    trend?: 'up' | 'down';
    icon: ComponentType<{ className?: string }>;
    color: string;
    subtitle?: string;
  }

  const KPICard = ({ title, value, change, trend, icon: Icon, color, subtitle }: KPICardProps) => (
    <Card className={`hover:shadow-lg transition-all duration-300 border-l-4 border-l-${color}-500`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {title}
        </CardTitle>
        <div className={`p-2 rounded-full bg-${color}-100 dark:bg-${color}-900/20`}>
          <Icon className={`h-4 w-4 text-${color}-600 dark:text-${color}-400`} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900 dark:text-white">
          {value}
        </div>
        {subtitle && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {subtitle}
          </p>
        )}
        {change && (
          <div className="flex items-center gap-1 mt-2">
            {trend === 'up' ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
            <span className={`text-sm font-medium ${
              trend === 'up' ? 'text-green-500' : 'text-red-500'
            }`}>
              {change}%
            </span>
            <span className="text-xs text-gray-500">vs last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <BarChart3 className="h-8 w-8 text-blue-600" />
            Legal Analytics Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Comprehensive insights into your law firm's performance
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant={selectedPeriod === '3months' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedPeriod('3months')}
          >
            3 Months
          </Button>
          <Button 
            variant={selectedPeriod === '6months' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedPeriod('6months')}
          >
            6 Months
          </Button>
          <Button 
            variant={selectedPeriod === '1year' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedPeriod('1year')}
          >
            1 Year
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Revenue"
          value="$322,500"
          change={15}
          trend="up"
          icon={DollarSign}
          color="green"
          subtitle="This quarter"
        />
        <KPICard
          title="Active Cases"
          value="127"
          change={8}
          trend="up"
          icon={Briefcase}
          color="blue"
          subtitle="Currently ongoing"
        />
        <KPICard
          title="Client Satisfaction"
          value="94.2%"
          change={2}
          trend="up"
          icon={Award}
          color="purple"
          subtitle="Average rating"
        />
        <KPICard
          title="Success Rate"
          value="88.5%"
          change={-3}
          trend="down"
          icon={Target}
          color="orange"
          subtitle="Cases won"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Trend */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Revenue Trend Analysis
            </CardTitle>
            <CardDescription>Monthly revenue performance over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyRevenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
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
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#10B981"
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Case Distribution */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scale className="h-5 w-5 text-blue-500" />
              Case Type Distribution
            </CardTitle>
            <CardDescription>Breakdown of cases by practice area</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={caseTypeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {caseTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quarterly Performance */}
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-purple-500" />
            Quarterly Financial Performance
          </CardTitle>
          <CardDescription>Revenue, expenses, and profit comparison by quarter</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={quarterlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="quarter" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#3B82F6" name="Revenue" />
              <Bar dataKey="expenses" fill="#EF4444" name="Expenses" />
              <Bar dataKey="profit" fill="#10B981" name="Profit" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Lawyer Performance Table */}
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-indigo-500" />
            Lawyer Performance Analytics
          </CardTitle>
          <CardDescription>Individual lawyer metrics and performance indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium">Lawyer</th>
                  <th className="text-left p-4 font-medium">Cases Handled</th>
                  <th className="text-left p-4 font-medium">Win Rate</th>
                  <th className="text-left p-4 font-medium">Revenue Generated</th>
                  <th className="text-left p-4 font-medium">Performance</th>
                </tr>
              </thead>
              <tbody>
                {lawyerPerformanceData.map((lawyer, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <td className="p-4 font-medium">{lawyer.name}</td>
                    <td className="p-4">
                      <Badge variant="outline">{lawyer.cases} cases</Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Progress value={lawyer.winRate} className="w-16" />
                        <span className="text-sm font-medium">{lawyer.winRate}%</span>
                      </div>
                    </td>
                    <td className="p-4 font-mono text-green-600 dark:text-green-400">
                      {formatValue(lawyer.revenue)}
                    </td>
                    <td className="p-4">
                      <Badge 
                        variant={lawyer.winRate >= 90 ? "default" : lawyer.winRate >= 85 ? "secondary" : "outline"}
                      >
                        {lawyer.winRate >= 90 ? "Excellent" : lawyer.winRate >= 85 ? "Good" : "Average"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
