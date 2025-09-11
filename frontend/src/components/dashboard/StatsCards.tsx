import { ArrowDownRight, ArrowUpRight, Briefcase, Calendar, DollarSign, Users, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Case, Client, Session } from './api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';

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
    return <div className="text-center text-red-500 p-4">Failed to load stats</div>;
  }

  const stats = [
    {
      label: t('dashboard.total_cases'),
      value: casesQuery.data?.length ?? 0,
      icon: Briefcase,
      gradient: 'from-blue-500 to-blue-700',
      change: 12,
    },
    {
      label: t('dashboard.active_clients'),
      value: clientsQuery.data?.filter(c => c.status === 'active').length ?? 0,
      icon: Users,
      gradient: 'from-green-500 to-green-700',
      change: 5,
    },
    {
      label: t('dashboard.upcoming_sessions'),
      value: sessionsQuery.data?.filter(s => s.status === 'scheduled').length ?? 0,
      icon: Calendar,
      gradient: 'from-purple-500 to-purple-700',
      change: -2,
    },
    {
      label: t('dashboard.total_revenue'),
      value: `$${casesQuery.data?.reduce((sum, c) => sum + c.revenue, 0).toLocaleString()}`,
      icon: DollarSign,
      gradient: 'from-orange-500 to-orange-700',
      change: 8,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map(stat => {
        const Icon = stat.icon;
        const Arrow = stat.change >= 0 ? ArrowUpRight : ArrowDownRight;
        const changeColor = stat.change >= 0 ? 'text-emerald-300' : 'text-red-300';
        return (
          <Card key={stat.label} className={`text-white border-none shadow-sm bg-gradient-to-br ${stat.gradient}`}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <Icon className="h-5 w-5" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className={`flex items-center text-xs mt-1 ${changeColor}`}>
                <Arrow className="h-4 w-4 mr-1" />
                {Math.abs(stat.change)}%
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
