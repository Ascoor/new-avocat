import { 
  LineChart,
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Users,
  TrendingUp,
  Eye,
  UserPlus,
  Calendar
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardSidebar } from '@/components/shared/DashboardSidebar';
import { KPICard } from '@/components/shared/KPICard';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { LanguageToggle } from '@/components/shared/LanguageToggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

// Sample data
const engagementData = [
  { day: 'Mon', likes: 1240, comments: 380, shares: 150, views: 5200 },
  { day: 'Tue', likes: 980, comments: 290, shares: 120, views: 4800 },
  { day: 'Wed', likes: 1450, comments: 420, shares: 180, views: 6100 },
  { day: 'Thu', likes: 1120, comments: 350, shares: 140, views: 5400 },
  { day: 'Fri', likes: 1680, comments: 480, shares: 220, views: 7200 },
  { day: 'Sat', likes: 2100, comments: 620, shares: 280, views: 8500 },
  { day: 'Sun', likes: 1890, comments: 550, shares: 240, views: 7800 },
];

const audienceData = [
  { platform: 'Instagram', engagement: 85, reach: 78, growth: 92 },
  { platform: 'Facebook', engagement: 70, reach: 88, growth: 65 },
  { platform: 'Twitter', engagement: 65, reach: 72, growth: 80 },
  { platform: 'LinkedIn', engagement: 75, reach: 65, growth: 70 },
  { platform: 'TikTok', engagement: 90, reach: 85, growth: 95 },
  { platform: 'YouTube', engagement: 80, reach: 90, growth: 75 },
];

const topPosts = [
  {
    id: 1,
    content: 'Just launched our new product line! 🚀',
    platform: 'Instagram',
    likes: 2847,
    comments: 156,
    shares: 89,
    engagement: 4.2,
    time: '2h ago'
  },
  {
    id: 2,
    content: 'Behind the scenes of our latest campaign',
    platform: 'Facebook',
    likes: 1923,
    comments: 234,
    shares: 167,
    engagement: 3.8,
    time: '4h ago'
  },
  {
    id: 3,
    content: 'Customer testimonial video',
    platform: 'YouTube',
    likes: 3456,
    comments: 89,
    shares: 234,
    engagement: 5.1,
    time: '6h ago'
  },
  {
    id: 4,
    content: 'Weekly industry insights thread',
    platform: 'Twitter',
    likes: 1234,
    comments: 67,
    shares: 123,
    engagement: 3.2,
    time: '8h ago'
  }
];

const campaigns = [
  { name: 'Summer Sale', status: 'active', budget: 5000, spent: 3200, reach: 45000, ctr: 2.8 },
  { name: 'Brand Awareness', status: 'paused', budget: 8000, spent: 6400, reach: 78000, ctr: 3.1 },
  { name: 'Product Launch', status: 'completed', budget: 12000, spent: 11800, reach: 120000, ctr: 4.2 },
];

export default function Dashboard4() {
  const { t } = useTranslation();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'paused': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'completed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram': return 'text-pink-500';
      case 'facebook': return 'text-blue-600';
      case 'twitter': return 'text-sky-500';
      case 'youtube': return 'text-red-500';
      case 'linkedin': return 'text-blue-700';
      case 'tiktok': return 'text-purple-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="flex min-h-screen bg-background dashboard-4">
      <DashboardSidebar variant="collapsible" theme="royal" />
      
      <main className="flex-1 overflow-x-hidden">
        {/* Header */}
        <header className="bg-card border-b border-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {t('social')}
              </h1>
              <p className="text-muted-foreground mt-1">
                Monitor your social media performance and engagement
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Post
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
              title="Total Followers"
              value="847K"
              change="+12.3% this month"
              changeType="positive"
              icon={<Users className="h-5 w-5" />}
              variant="royal"
              className="animate-fade-in"
            />
            <KPICard
              title="Engagement Rate"
              value="4.2%"
              change="+0.8% from last week"
              changeType="positive"
              icon={<Heart className="h-5 w-5" />}
              variant="royal"
              className="animate-fade-in"
              style={{ animationDelay: '100ms' }}
            />
            <KPICard
              title="Reach"
              value="2.4M"
              change="+18.5% this month"
              changeType="positive"
              icon={<Eye className="h-5 w-5" />}
              variant="royal"
              className="animate-fade-in"
              style={{ animationDelay: '200ms' }}
            />
            <KPICard
              title="New Followers"
              value="3,284"
              change="+156 today"
              changeType="positive"
              icon={<UserPlus className="h-5 w-5" />}
              variant="royal"
              className="animate-fade-in"
              style={{ animationDelay: '300ms' }}
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Engagement Trend */}
            <Card className="animate-slide-up">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Weekly Engagement Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={engagementData}>
                      <defs>
                        <linearGradient id="colorLikes" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorComments" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey="day" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="likes"
                        stackId="1"
                        stroke="#8b5cf6"
                        fillOpacity={1}
                        fill="url(#colorLikes)"
                        strokeWidth={2}
                      />
                      <Area
                        type="monotone"
                        dataKey="comments"
                        stackId="2"
                        stroke="#06b6d4"
                        fillOpacity={1}
                        fill="url(#colorComments)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Audience Insights */}
            <Card className="animate-slide-up" style={{ animationDelay: '200ms' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Platform Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={audienceData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="platform" />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} />
                      <Radar
                        name="Engagement"
                        dataKey="engagement"
                        stroke="#8b5cf6"
                        fill="#8b5cf6"
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                      <Radar
                        name="Reach"
                        dataKey="reach"
                        stroke="#06b6d4"
                        fill="#06b6d4"
                        fillOpacity={0.2}
                        strokeWidth={2}
                      />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Performing Posts */}
            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Top Performing Posts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPosts.map((post, index) => (
                    <div key={post.id} className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm mb-1 truncate">{post.content}</p>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className={getPlatformColor(post.platform)}>
                              {post.platform}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{post.time}</span>
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                          {post.engagement}% ER
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Heart className="h-4 w-4" />
                            {post.likes.toLocaleString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="h-4 w-4" />
                            {post.comments}
                          </span>
                          <span className="flex items-center gap-1">
                            <Share2 className="h-4 w-4" />
                            {post.shares}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Active Campaigns */}
            <Card className="animate-scale-in" style={{ animationDelay: '200ms' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Campaign Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {campaigns.map((campaign, index) => (
                    <div key={index} className="p-4 rounded-lg border border-border">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold">{campaign.name}</h4>
                        <Badge className={getStatusColor(campaign.status)}>
                          {campaign.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Budget</span>
                          <span className="font-medium">
                            ${campaign.spent.toLocaleString()} / ${campaign.budget.toLocaleString()}
                          </span>
                        </div>
                        
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-500"
                            style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }}
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground block">Reach</span>
                            <span className="font-semibold">{campaign.reach.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground block">CTR</span>
                            <span className="font-semibold">{campaign.ctr}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button variant="outline" className="w-full mt-4">
                  Create New Campaign
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}