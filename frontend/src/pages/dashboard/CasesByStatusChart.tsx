import { useQuery } from '@tanstack/react-query';
import { Case } from './api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const STATUS_COLORS: Record<string, string> = {
  active: '#10B981',
  pending: '#F59E0B',
  closed: '#EF4444',
  on_hold: '#6B7280',
};

export default function CasesByStatusChart() {
  const { t } = useTranslation();
  const { data, isLoading, error } = useQuery({ queryKey: ['dashboard-cases'], queryFn: Case.list });

  const content = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-full">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      );
    }
    if (error) {
      return <div className="text-center text-destructive">{t('dashboard.errors.chart')}</div>;
    }
    const counts: Record<string, number> = { active: 0, pending: 0, closed: 0, on_hold: 0 };
    data?.forEach(c => {
      counts[c.status] = (counts[c.status] || 0) + 1;
    });
    const chartData = Object.entries(counts).map(([status, value]) => ({
      name: t(`dashboard.${status}`),
      value,
    }));
    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={chartData} dataKey="value" nameKey="name" outerRadius={100} innerRadius={60}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={STATUS_COLORS[Object.keys(counts)[index]]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    );
  };

  return (
    <Card className="h-[350px]">
      <CardHeader>
        <CardTitle>{t('dashboard.cases_by_status')}</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">{content()}</CardContent>
    </Card>
  );
}
