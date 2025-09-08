import { useQuery } from '@tanstack/react-query';
import { Case } from '../api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function CasesByCategoryChart() {
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
      return <div className="text-center text-red-500">Error</div>;
    }
    const counts: Record<string, number> = {};
    data?.forEach(c => {
      counts[c.category] = (counts[c.category] || 0) + 1;
    });
    const chartData = Object.entries(counts).map(([category, value]) => ({ category, value }));
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <XAxis dataKey="category" stroke="#888" />
          <YAxis allowDecimals={false} stroke="#888" />
          <Tooltip />
          <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <Card className="h-[350px]">
      <CardHeader>
        <CardTitle>{t('dashboard.cases_by_category')}</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">{content()}</CardContent>
    </Card>
  );
}
