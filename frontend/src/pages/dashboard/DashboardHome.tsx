import React, { useMemo } from 'react';
import type { LucideIcon } from 'lucide-react';
import { AlertCircle, BarChart3, Calendar, Gavel, TrendingUp, Users } from 'lucide-react';

import {
  GlassCard,
  GlassCardContent,
  GlassCardDescription,
  GlassCardHeader,
  GlassCardTitle,
} from '@/components/ui/glass-card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

type DashboardHomeTranslations = {
  welcome?: {
    title?: string;
    subtitle?: string;
  };
  stats?: Array<{
    title?: string;
    value?: string;
    change?: string;
    icon?: string;
    color?: string;
  }>;
  activities?: {
    title?: string;
    subtitle?: string;
    items?: Array<{
      title?: string;
      time?: string;
      type?: string;
    }>;
  };
  tasks?: {
    title?: string;
    subtitle?: string;
    items?: Array<{
      title?: string;
      deadline?: string;
      priority?: string;
    }>;
    priorities?: Record<string, string>;
  };
};

const statIconMap: Record<string, LucideIcon> = {
  cases: Gavel,
  clients: Users,
  sessions: Calendar,
  performance: TrendingUp,
};

const priorityStyleMap: Record<string, string> = {
  high: 'bg-destructive/20 text-destructive',
  medium: 'bg-warning/20 text-warning',
};

const DashboardHome: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();

  const homeContent = useMemo(
    () => t('dashboard.home', { returnObjects: true }) as DashboardHomeTranslations,
    [t],
  );

  const stats = (homeContent?.stats ?? []).map((stat) => ({
    ...stat,
    Icon: stat.icon ? statIconMap[stat.icon] ?? TrendingUp : TrendingUp,
    colorClass: stat.color ?? 'text-primary',
  }));

  const activities = homeContent?.activities?.items ?? [];
  const tasks = homeContent?.tasks ?? { items: [], priorities: {} };
  const welcome = homeContent?.welcome;

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-transparent bg-gradient-primary bg-clip-text">
          {welcome?.title ?? t('common.welcome')}
          {user?.name ? `, ${user.name}` : ''}
        </h1>
        <p className="text-muted-foreground">{welcome?.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <GlassCard
            key={`${stat.title}-${index}`}
            variant="primary"
            hover="glow"
            className="animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <GlassCardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="mb-1 text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="mt-1 flex items-center text-sm text-success">
                    <TrendingUp className="mr-1 h-3 w-3 rtl:ml-1 rtl:mr-0" />
                    {stat.change}
                  </p>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-primary ${stat.colorClass}`}>
                  <stat.Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </GlassCardContent>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <GlassCard variant="primary" hover="lift">
          <GlassCardHeader>
            <GlassCardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-accent" />
              {homeContent?.activities?.title ?? t('dashboard.recentActivity')}
            </GlassCardTitle>
            <GlassCardDescription>{homeContent?.activities?.subtitle}</GlassCardDescription>
          </GlassCardHeader>
          <GlassCardContent>
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div
                  key={`${activity.title}-${index}`}
                  className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-accent/10"
                >
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-accent" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCardContent>
        </GlassCard>

        <GlassCard variant="primary" hover="lift">
          <GlassCardHeader>
            <GlassCardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-warning" />
              {tasks?.title}
            </GlassCardTitle>
            <GlassCardDescription>{tasks?.subtitle}</GlassCardDescription>
          </GlassCardHeader>
          <GlassCardContent>
            <div className="space-y-4">
              {(tasks.items ?? []).map((task, index) => {
                const priority = task.priority ?? '';
                const priorityLabel = tasks.priorities?.[priority] ?? priority;
                const priorityClass = priorityStyleMap[priority] ?? 'bg-warning/20 text-warning';

                return (
                  <div
                    key={`${task.title}-${index}`}
                    className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-accent/10"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium">{task.title}</p>
                      <p className="text-xs text-muted-foreground">{task.deadline}</p>
                    </div>
                    <div className={`rounded-full px-2 py-1 text-xs font-medium ${priorityClass}`}>
                      {priorityLabel}
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCardContent>
        </GlassCard>
      </div>
    </div>
  );
};

export default DashboardHome;
