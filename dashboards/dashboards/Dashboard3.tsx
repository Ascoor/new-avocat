import { 
  ComposedChart,
  Bar,
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Package, 
  ShoppingCart, 
  Users, 
  Star,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock
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
const salesData = [
  { month: 'Jan', orders: 450, revenue: 28000, customers: 320 },
  { month: 'Feb', orders: 520, revenue: 32000, customers: 380 },
  { month: 'Mar', orders: 480, revenue: 30000, customers: 350 },
  { month: 'Apr', orders: 610, revenue: 38000, customers: 420 },
  { month: 'May', orders: 720, revenue: 45000, customers: 480 },
  { month: 'Jun', orders: 680, revenue: 42000, customers: 460 },
];

const categoryData = [
  { name: 'Electronics', value: 35, color: '#f97316' },
  { name: 'Clothing', value: 25, color: '#eab308' },
  { name: 'Home & Garden', value: 20, color: '#22c55e' },
  { name: 'Sports', value: 12, color: '#3b82f6' },
  { name: 'Others', value: 8, color: '#8b5cf6' },
];

const topProducts = [
  { name: 'Wireless Headphones', sales: 2847, revenue: 142350, rating: 4.8, stock: 156 },
  { name: 'Smartphone Case', sales: 2234, revenue: 67020, rating: 4.6, stock: 89 },
  { name: 'Laptop Stand', sales: 1998, revenue: 119880, rating: 4.7, stock: 234 },
  { name: 'USB-C Cable', sales: 1876, revenue: 28140, rating: 4.5, stock: 445 },
  { name: 'Bluetooth Speaker', sales: 1654, revenue: 165400, rating: 4.9, stock: 67 },
];

const recentOrders = [
  { id: '#3421', customer: 'John Doe', amount: 156.50, status: 'completed', time: '2 min ago' },
  { id: '#3422', customer: 'Sarah Wilson', amount: 289.99, status: 'processing', time: '5 min ago' },
  { id: '#3423', customer: 'Mike Johnson', amount: 89.99, status: 'pending', time: '12 min ago' },
  { id: '#3424', customer: 'Emily Brown', amount: 234.50, status: 'completed', time: '18 min ago' },
  { id: '#3425', customer: 'David Lee', amount: 445.00, status: 'processing', time: '25 min ago' },
];

export default function Dashboard3() {
  const { t } = useTranslation();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'processing': return <Clock className="h-4 w-4 text-blue-500" />;
      case 'pending': return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'processing': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className="flex min-h-screen bg-background dashboard-3">
      <DashboardSidebar variant="collapsible" theme="sunset" />
      
      <main className="flex-1 overflow-x-hidden">
        {/* Header */}
        <header className="bg-card border-b border-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {t('ecommerce')}
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage your online store and track sales performance
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Package className="h-4 w-4 mr-2" />
                Inventory
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
              title="Total Orders"
              value="3,547"
              change="+22.5% from last month"
              changeType="positive"
              icon={<ShoppingCart className="h-5 w-5" />}
              variant="sunset"
              className="animate-fade-in"
            />
            <KPICard
              title="Revenue"
              value="$87,432"
              change="+15.8% from last month"
              changeType="positive"
              icon={<TrendingUp className="h-5 w-5" />}
              variant="sunset"
              className="animate-fade-in"
              style={{ animationDelay: '100ms' }}
            />
            <KPICard
              title="Customers"
              value="2,847"
              change="+8.3% from last month"
              changeType="positive"
              icon={<Users className="h-5 w-5" />}
              variant="sunset"
              className="animate-fade-in"
              style={{ animationDelay: '200ms' }}
            />
            <KPICard
              title="Products"
              value="456"
              change="+12 new products"
              changeType="positive"
              icon={<Package className="h-5 w-5" />}
              variant="sunset"
              className="animate-fade-in"
              style={{ animationDelay: '300ms' }}
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sales & Orders Trend */}
            <Card className="animate-slide-up">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Sales & Orders Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} />
                      <YAxis yAxisId="left" axisLine={false} tickLine={false} />
                      <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                        formatter={(value, name) => [
                          name === 'revenue' ? `$${value.toLocaleString()}` : value,
                          name === 'revenue' ? 'Revenue' : 'Orders'
                        ]}
                      />
                      <Bar 
                        yAxisId="left"
                        dataKey="orders" 
                        fill="hsl(var(--primary))" 
                        radius={[4, 4, 0, 0]}
                        opacity={0.8}
                      />
                      <Line 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#f97316"
                        strokeWidth={3}
                        dot={{ fill: '#f97316', strokeWidth: 2, r: 6 }}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Category Distribution */}
            <Card className="animate-slide-up" style={{ animationDelay: '200ms' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Sales by Category
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, 'Share']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {categoryData.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm font-medium truncate">{item.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Products */}
            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-primary" />
                  {t('topProducts')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xs font-bold text-muted-foreground">#{index + 1}</span>
                          <h4 className="font-semibold truncate">{product.name}</h4>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs">{product.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>{product.sales} sold</span>
                          <span>${product.revenue.toLocaleString()}</span>
                        </div>
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span>Stock</span>
                            <span className={product.stock < 100 ? 'text-red-500' : 'text-green-500'}>
                              {product.stock} units
                            </span>
                          </div>
                          <Progress 
                            value={(product.stock / 500) * 100} 
                            className="h-2"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Orders */}
            <Card className="animate-scale-in" style={{ animationDelay: '200ms' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-primary" />
                  Recent Orders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(order.status)}
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{order.id}</span>
                            <Badge className={`text-xs ${getStatusColor(order.status)}`}>
                              {order.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{order.customer}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${order.amount}</p>
                        <p className="text-xs text-muted-foreground">{order.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View All Orders
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}