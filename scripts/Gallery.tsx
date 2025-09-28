import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { LanguageToggle } from '@/components/shared/LanguageToggle';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '@/contexts/AppContext';
import heroImage from '@/assets/hero-dashboard.jpg';

interface DashboardItem {
  id: string;
  title: string;
  description: string;
  theme: 'ocean' | 'forest' | 'sunset' | 'royal' | 'rose';
  type: string;
  features: string[];
  route: string;
  preview: string;
}

const dashboards: DashboardItem[] = [
  {
    id: 'dashboard-1',
    title: 'Analytics Dashboard',
    description: 'Comprehensive analytics with advanced charts and KPIs',
    theme: 'ocean',
    type: 'analytics',
    features: ['Line Charts', 'Bar Charts', 'KPI Cards', 'Real-time Data'],
    route: '/dashboard-1',
    preview: 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20'
  },
  {
    id: 'dashboard-2',
    title: 'Sales Dashboard',
    description: 'Sales performance tracking with detailed metrics',
    theme: 'forest',
    type: 'sales',
    features: ['Sales Trends', 'Revenue Charts', 'Team Performance', 'Goals Tracking'],
    route: '/dashboard-2',
    preview: 'bg-gradient-to-br from-green-500/20 to-emerald-500/20'
  },
  {
    id: 'dashboard-3',
    title: 'E-commerce Dashboard',
    description: 'Online store management with inventory and orders',
    theme: 'sunset',
    type: 'ecommerce',
    features: ['Order Management', 'Inventory', 'Customer Analytics', 'Product Performance'],
    route: '/dashboard-3',
    preview: 'bg-gradient-to-br from-orange-500/20 to-yellow-500/20'
  },
  {
    id: 'dashboard-4',
    title: 'Social Media Dashboard',
    description: 'Social media management and engagement tracking',
    theme: 'royal',
    type: 'social',
    features: ['Engagement Metrics', 'Content Calendar', 'Audience Insights', 'Campaign Tracking'],
    route: '/dashboard-4',
    preview: 'bg-gradient-to-br from-purple-500/20 to-violet-500/20'
  },
  {
    id: 'dashboard-5',
    title: 'Finance Dashboard',
    description: 'Financial overview with budgets and expenses',
    theme: 'rose',
    type: 'finance',
    features: ['Budget Tracking', 'Expense Analysis', 'Cash Flow', 'Financial Reports'],
    route: '/dashboard-5',
    preview: 'bg-gradient-to-br from-pink-500/20 to-rose-500/20'
  }
];

export default function Gallery() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('all');
  const { t } = useTranslation();
  const { direction } = useAppContext();

  const filteredDashboards = useMemo(() => {
    return dashboards.filter(dashboard => {
      const matchesSearch = dashboard.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           dashboard.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           dashboard.features.some(feature => 
                             feature.toLowerCase().includes(searchTerm.toLowerCase())
                           );
      const matchesTheme = selectedTheme === 'all' || dashboard.theme === selectedTheme;
      return matchesSearch && matchesTheme;
    });
  }, [searchTerm, selectedTheme]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold bg-hero-gradient bg-clip-text text-transparent">
                {t('dashboardGallery')}
              </h1>
            </div>
            
            <div className="flex items-center gap-2">
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Dashboard Gallery Hero" 
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-hero-gradient opacity-20" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            {t('dashboardGallery')}
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-slide-up">
            اكتشف مجموعتنا من أكثر من 25 تصميم لوحة تحكم جميل وعملي. 
            كل لوحة تحكم تتميز بثيمات وتخطيطات ومكونات فريدة.
          </p>
          
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-12 animate-scale-in">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t('search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 ${direction === 'rtl' ? 'pr-10 pl-4' : ''}`}
              />
            </div>
            
            <Select value={selectedTheme} onValueChange={setSelectedTheme}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder={t('filter')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('allThemes')}</SelectItem>
                <SelectItem value="ocean">{t('oceanBlue')}</SelectItem>
                <SelectItem value="forest">{t('forestGreen')}</SelectItem>
                <SelectItem value="sunset">{t('sunsetOrange')}</SelectItem>
                <SelectItem value="royal">{t('royalPurple')}</SelectItem>
                <SelectItem value="rose">{t('rosePink')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Dashboard Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDashboards.map((dashboard, index) => (
              <Card 
                key={dashboard.id}
                className="group hover:shadow-strong transition-all duration-300 border-2 hover:border-primary/20 animate-fade-in overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`h-48 ${dashboard.preview} border-b relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="capitalize">
                      {t(dashboard.theme)}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                      {t(dashboard.type)}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {t(dashboard.type)}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {dashboard.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {dashboard.features.slice(0, 3).map((feature) => (
                      <Badge key={feature} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                    {dashboard.features.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{dashboard.features.length - 3} more
                      </Badge>
                    )}
                  </div>
                  
                  <Button asChild className="w-full group/btn">
                    <Link to={dashboard.route}>
                      <Eye className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                      {t('viewDashboard')}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredDashboards.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">
                No dashboards found matching your criteria.
              </p>
            </div>
          )}
          
          {/* Coming Soon Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {Array.from({ length: 20 }, (_, i) => (
              <Card key={`coming-soon-${i}`} className="opacity-50 hover:opacity-70 transition-opacity">
                <div className="h-32 bg-gradient-to-br from-muted/50 to-muted/30 border-b flex items-center justify-center">
                  <span className="text-muted-foreground font-medium">Coming Soon</span>
                </div>
                <CardContent className="p-4">
                  <h4 className="font-medium text-muted-foreground">Dashboard {i + 6}</h4>
                  <p className="text-sm text-muted-foreground/70 mt-1">More designs coming...</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 Dashboard Gallery. Built with React, TypeScript & Tailwind CSS.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}