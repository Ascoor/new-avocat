import { 
  LineChart,
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ComposedChart
} from 'recharts';
import { 
  DollarSign, 
  TrendingUp, 
  CreditCard, 
  PiggyBank,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  AlertTriangle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardSidebar } from '@/components/shared/DashboardSidebar';
import { KPICard } from '@/components/shared/KPICard';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { LanguageToggle } from '@/components/shared/LanguageToggle';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useTranslation } from 'react-i18next';

// Sample data
const cashFlowData = [
  { month: 'Jan', income: 85000, expenses: 62000, profit: 23000 },
  { month: 'Feb', income: 78000, expenses: 58000, profit: 20000 },
  { month: 'Mar', income: 92000, expenses: 65000, profit: 27000 },
  { month: 'Apr', income: 88000, expenses: 61000, profit: 27000 },
  { month: 'May', income: 95000, expenses: 68000, profit: 27000 },
  { month: 'Jun', income: 102000, expenses: 72000, profit: 30000 },
];

const expenseCategories = [
  { name: 'Operations', value: 35, amount: 25200, color: '#ef4444' },
  { name: 'Marketing', value: 25, amount: 18000, color: '#f97316' },
  { name: 'Salaries', value: 30, amount: 21600, color: '#eab308' },
  { name: 'Utilities', value: 6, amount: 4320, color: '#22c55e' },
  { name: 'Others', value: 4, amount: 2880, color: '#8b5cf6' },
];

const budgetItems = [
  { category: 'Marketing', allocated: 20000, spent: 16800, remaining: 3200 },
  { category: 'Operations', allocated: 30000, spent: 25200, remaining: 4800 },
  { category: 'R&D', allocated: 15000, spent: 12300, remaining: 2700 },
  { category: 'Travel', allocated: 8000, spent: 5600, remaining: 2400 },
  { category: 'Equipment', allocated: 12000, spent: 11200, remaining: 800 },
];

const transactions = [
  { id: 1, description: 'Client Payment - Project Alpha', amount: 15000, type: 'income', date: '2h ago', category: 'Revenue' },
  { id: 2, description: 'Office Rent Payment', amount: -3500, type: 'expense', date: '4h ago', category: 'Operations' },
  { id: 3, description: 'Marketing Campaign Budget', amount: -2800, type: 'expense', date: '6h ago', category: 'Marketing' },
  { id: 4, description: 'Software License Renewal', amount: -899, type: 'expense', date: '1d ago', category: 'Operations' },
  { id: 5, description: 'Freelancer Payment', amount: -1200, type: 'expense', date: '1d ago', category: 'Operations' },
];

export default function Dashboard5() {
  const { t } = useTranslation();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getBudgetStatus = (spent: number, allocated: number) => {
    const percentage = (spent / allocated) * 100;
    if (percentage > 90) return { color: 'text-red-500', status: 'Critical' };
    if (percentage > 75) return { color: 'text-yellow-500', status: 'Warning' };
    return { color: 'text-green-500', status: 'Good' };
  };

  return (
    <div className="flex min-h-screen bg-background dashboard-5">
      <DashboardSidebar variant="collapsible" theme="rose" />
      
      <main className="flex-1 overflow-x-hidden">
        {/* Header */}
        <header className="bg-card border-b border-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {t('finance')}
              </h1>
              <p className="text-muted-foreground mt-1">
                Monitor your financial health and budget performance
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                This Quarter
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
              title="Total Revenue"
              value="$540K"
              change="+12.5% from last quarter"
              changeType="positive"
              icon={<DollarSign className="h-5 w-5" />}
              variant="rose"
              className="animate-fade-in"
            />
            <KPICard
              title="Net Profit"
              value="$154K"
              change="+8.2% from last quarter"
              changeType="positive"
              icon={<TrendingUp className="h-5 w-5" />}
              variant="rose"
              className="animate-fade-in"
              style={{ animationDelay: '100ms' }}
            />
            <KPICard
              title="Total Expenses"
              value="$386K"
              change="+3.1% from last quarter"
              changeType="negative"
              icon={<CreditCard className="h-5 w-5" />}
              variant="rose"
              className="animate-fade-in"
              style={{ animationDelay: '200ms' }}
            />
            <KPICard
              title="Cash Balance"
              value="$89K"
              change="+15.8% from last month"
              changeType="positive"
              icon={<PiggyBank className="h-5 w-5" />}
              variant="rose"
              className="animate-fade-in"
              style={{ animationDelay: '300ms' }}
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Cash Flow Trend */}
            <Card className="animate-slide-up">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Cash Flow Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={cashFlowData}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                        formatter={(value) => [formatCurrency(Number(value)), '']}
                      />
                      <Bar 
                        dataKey="income" 
                        fill="hsl(var(--primary))" 
                        radius={[4, 4, 0, 0]}
                        opacity={0.8}
                      />
                      <Bar 
                        dataKey="expenses" 
                        fill="#ef4444" 
                        radius={[4, 4, 0, 0]}
                        opacity={0.8}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="profit" 
                        stroke="#22c55e"
                        strokeWidth={3}
                        dot={{ fill: '#22c55e', strokeWidth: 2, r: 6 }}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Expense Breakdown */}
            <Card className="animate-slide-up" style={{ animationDelay: '200ms' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Expense Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={expenseCategories}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {expenseCategories.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value, name, props) => [
                        `${value}% (${formatCurrency(props.payload.amount)})`,
                        name
                      ]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-3">
                  {expenseCategories.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <span className="text-sm font-semibold">{formatCurrency(item.amount)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Budget Tracking */}
            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PiggyBank className="h-5 w-5 text-primary" />
                  Budget Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {budgetItems.map((item, index) => {
                    const percentage = (item.spent / item.allocated) * 100;
                    const status = getBudgetStatus(item.spent, item.allocated);
                    
                    return (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{item.category}</span>
                            <Badge className={`text-xs ${status.color}`}>
                              {status.status}
                            </Badge>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {formatCurrency(item.spent)} / {formatCurrency(item.allocated)}
                          </span>
                        </div>
                        
                        <Progress 
                          value={percentage} 
                          className="h-3"
                        />
                        
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{percentage.toFixed(1)}% used</span>
                          <span className="text-green-600">
                            {formatCurrency(item.remaining)} remaining
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card className="animate-scale-in" style={{ animationDelay: '200ms' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  Recent Transactions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${
                          transaction.type === 'income' 
                            ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300' 
                            : 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300'
                        }`}>
                          {transaction.type === 'income' ? (
                            <ArrowUpRight className="h-4 w-4" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{transaction.description}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {transaction.category}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{transaction.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${
                          transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.type === 'income' ? '+' : ''}{formatCurrency(transaction.amount)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button variant="outline" className="w-full mt-4">
                  View All Transactions
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}