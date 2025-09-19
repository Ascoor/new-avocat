import { ArrowDownRight, ArrowUpRight, Briefcase, Calendar, DollarSign, Users, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Case, Client, Session } from './api';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { GlassCard } from '@/components/ui/glass-card';

export default function StatsCards() {
  const { t } = useTranslation();
  const casesQuery = useQuery({ queryKey: ['dashboard-cases'], queryFn: Case.list });
  const clientsQuery = useQuery({ queryKey: ['dashboard-clients'], queryFn: Client.list });
  const sessionsQuery = useQuery({ queryKey: ['dashboard-sessions'], queryFn: Session.list });

  const isLoading = casesQuery.isLoading || clientsQuery.isLoading || sessionsQuery.isLoading;
  const isError = casesQuery.error || clientsQuery.error || sessionsQuery.error;

  if (isLoading) {
    return (
      <div className="flex justify-center p-6">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return <div className="p-4 text-center text-destructive">{t('dashboard.errors.stats')}</div>;
  }

  const totalCases = casesQuery.data?.length ?? 0;
  const activeClients = clientsQuery.data?.filter(c => c.status === 'active')?.length ?? 0;
  const upcomingSessions = sessionsQuery.data?.filter(s => s.status === 'scheduled')?.length ?? 0;
  const totalRevenue = casesQuery.data?.reduce((sum, c) => sum + c.revenue, 0) ?? 0;

  const stats = [
    {
      label: t('dashboard.total_cases'),
      value: totalCases.toLocaleString(),
      icon: Briefcase,
      background: 'bg-gradient-primary',
      change: 12,
    },
    {
      label: t('dashboard.active_clients'),
      value: activeClients.toLocaleString(),
      icon: Users,
      background: 'bg-gradient-success',
      change: 5,
    },
    {
      label: t('dashboard.upcoming_sessions'),
      value: upcomingSessions.toLocaleString(),
      icon: Calendar,
      background: 'bg-gradient-accent',
      change: -2,
    },
    {
      label: t('dashboard.total_revenue'),
      value: `$${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      background: 'bg-gradient-warning',
      change: 8,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        const Arrow = stat.change >= 0 ? ArrowUpRight : ArrowDownRight;
        const isPositive = stat.change >= 0;
        const changeBadge = isPositive
          ? 'bg-[color:hsla(var(--success)/0.22)] text-white'
          : 'bg-[color:hsla(var(--destructive)/0.18)] text-white';
        const changeText = `${isPositive ? '+' : '−'}${Math.abs(stat.change)}%`;

        return (
          <GlassCard
            key={stat.label}
            variant="primary"
            hover="glow"
            className={cn(
              'relative overflow-hidden border border-border/70 text-white shadow-lg transition-transform duration-300',
              stat.background
            )}
          >
            <div className="absolute inset-0 opacity-70 mix-blend-screen" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.25),transparent_45%)]" />
            <div className="relative flex flex-col gap-4 p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-white/85">{stat.label}</p>
                <span className="rounded-full bg-white/15 p-2 shadow-inner">
                  <Icon className="h-5 w-5" />
                </span>
              </div>
              <div className="text-2xl font-semibold tracking-tight">
                {stat.value}
              </div>
              <div
                className={cn(
                  'inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-medium backdrop-blur-sm transition-colors',
                  changeBadge
                )}
              >
                <Arrow className="h-4 w-4" />
                <span>{changeText}</span>
              </div>
            </div>
          </GlassCard>
        );
      })}
    </div>
  );
}
