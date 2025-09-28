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
  Package, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle,
  Truck,
  BarChart3
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardSidebar } from '@/components/shared/DashboardSidebar';
import { KPICard } from '@/components/shared/KPICard';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { LanguageToggle } from '@/components/shared/LanguageToggle';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '@/contexts/AppContext';

// Inventory Management Data
const inventoryData = [
  { month: 'Jan', inStock: 1250, outStock: 45, lowStock: 120 },
  { month: 'Feb', inStock: 1380, outStock: 32, lowStock: 95 },
  { month: 'Mar', inStock: 1420, outStock: 28, lowStock: 110 },
  { month: 'Apr', inStock: 1380, outStock: 38, lowStock: 88 },
  { month: 'May', inStock: 1550, outStock: 25, lowStock: 75 },
  { month: 'Jun', inStock: 1620, outStock: 18, lowStock: 65 },
];

const categoryData = [
  { name: 'Electronics', value: 35, color: '#f59e0b' },
  { name: 'Clothing', value: 25, color: '#eab308' },
  { name: 'Home & Garden', value: 20, color: '#d97706' },
  { name: 'Sports', value: 20, color: '#f59e0b' },
];

export default function Dashboard8() {
  const { t } = useTranslation();
  const { direction } = useAppContext();

  return (
    <div className="flex min-h-screen bg-background dashboard-8">
      <DashboardSidebar variant="collapsible" theme="ocean" />
      
      <main className="flex-1 overflow-x-hidden">
        {/* Header */}
        <header className="bg-card border-b border-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {t('inventory')}
              </h1>
              <p className="text-muted-foreground mt-1">
                Monitor and manage your inventory levels
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
              title="Total Items"
              value="1,620"
              change="+4.5% from last month"
              changeType="positive"
              icon={<Package className="h-5 w-5" />}
              variant="amber"
              className="animate-fade-in"
            />
            <KPICard
              title="Low Stock Items"
              value="65"
              change="-13% from last month"
              changeType="positive"
              icon={<AlertTriangle className="h-5 w-5" />}
              variant="amber"
              className="animate-fade-in"
              style={{ animationDelay: '100ms' }}
            />
            <KPICard
              title="Out of Stock"
              value="18"
              change="-28% from last month"
              changeType="positive"
              icon={<TrendingDown className="h-5 w-5" />}
              variant="amber"
              className="animate-fade-in"
              style={{ animationDelay: '200ms' }}
            />
            <KPICard
              title="Inventory Value"
              value="$485K"
              change="+8.2% from last month"
              changeType="positive"
              icon={<BarChart3 className="h-5 w-5" />}
              variant="amber"
              className="animate-fade-in"
              style={{ animationDelay: '300ms' }}
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Stock Levels */}
            <Card className="animate-slide-up">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Stock Level Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={inventoryData}>
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
                        dataKey="inStock" 
                        fill="hsl(var(--primary))"
                        radius={[4, 4, 0, 0]}
                        name="In Stock"
                      />
                      <Bar 
                        dataKey="lowStock" 
                        fill="hsl(var(--secondary))"
                        radius={[4, 4, 0, 0]}
                        name="Low Stock"
                      />
                      <Bar 
                        dataKey="outStock" 
                        fill="#ef4444"
                        radius={[4, 4, 0, 0]}
                        name="Out of Stock"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Inventory Movement */}
            <Card className="animate-slide-up" style={{ animationDelay: '200ms' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-primary" />
                  Inventory Movement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={inventoryData}>
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
                        dataKey="inStock" 
                        stroke="hsl(var(--primary))"
                        strokeWidth={3}
                        dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 6 }}
                        activeDot={{ r: 8 }}
                        name="In Stock"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="lowStock" 
                        stroke="hsl(var(--secondary))"
                        strokeWidth={3}
                        dot={{ fill: 'hsl(var(--secondary))', strokeWidth: 2, r: 6 }}
                        activeDot={{ r: 8 }}
                        name="Low Stock"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Category Distribution */}
            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle>Inventory by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2">
                  {categoryData.map((item, index) => (
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
                <CardTitle>Recent Inventory Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: '150 units of iPhone 15 restocked', time: '20 minutes ago', type: 'restock' },
                    { action: 'Low stock alert for Nike Air Max', time: '1 hour ago', type: 'alert' },
                    { action: '85 Samsung Galaxy phones sold out', time: '3 hours ago', type: 'sold' },
                    { action: 'New shipment of winter clothing arrived', time: '5 hours ago', type: 'arrival' },
                    { action: 'Inventory audit completed for Electronics', time: '1 day ago', type: 'audit' },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.type === 'restock' ? 'bg-green-500' :
                          activity.type === 'alert' ? 'bg-yellow-500' :
                          activity.type === 'sold' ? 'bg-red-500' :
                          activity.type === 'arrival' ? 'bg-blue-500' :
                          'bg-purple-500'
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