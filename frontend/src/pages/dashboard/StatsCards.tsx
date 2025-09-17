import { ArrowDownRight, ArrowUpRight, Briefcase, Calendar, DollarSign, Users, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Case, Client, Session } from './api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

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
      {stats.map(stat => {
        const Icon = stat.icon;
        const Arrow = stat.change >= 0 ? ArrowUpRight : ArrowDownRight;
        const isPositive = stat.change >= 0;
        const changeBadge = isPositive
          ? 'bg-[color:hsla(var(--success)/0.32)]'
          : 'bg-[color:hsla(var(--destructive)/0.32)]';
        const changeText = `${isPositive ? '+' : '−'}${Math.abs(stat.change)}%`;
        return (
          <Card
            key={stat.label}
            className={cn(
              'relative overflow-hidden border-none text-white shadow-elegant',
              stat.background
            )}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-sm font-medium text-white/90">{stat.label}</CardTitle>
              <div className="rounded-full bg-white/15 p-2 shadow-inner">
                <Icon className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-2xl font-semibold tracking-tight">{stat.value}</div>
              <div
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-medium text-white backdrop-blur-sm',
                  changeBadge
                )}
              >
                <Arrow className="h-4 w-4" />
                <span>{changeText}</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
