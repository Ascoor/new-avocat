import { useQuery } from '@tanstack/react-query';
import { Case } from '../api';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

const STATUS_COLORS: Record<string, string> = {
  active: 'bg-green-500',
  pending: 'bg-yellow-500',
  closed: 'bg-red-500',
  on_hold: 'bg-gray-500',
};

export default function RecentCases() {
  const { t } = useTranslation();
  const { data, isLoading, error } = useQuery({ queryKey: ['dashboard-cases'], queryFn: Case.list });

  const content = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center p-6">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      );
    }
    if (error) {
      return <div className="text-center text-red-500">Error</div>;
    }
    const recent = data?.slice(0, 5) ?? [];
    return (
      <ul className="space-y-4">
        {recent.map(c => (
          <li key={c.id} className="flex items-center justify-between">
            <div>
              <p className="font-medium">{c.title}</p>
              <p className="text-sm text-muted-foreground">{c.client} • {c.category}</p>
            </div>
            <span className={`h-3 w-3 rounded-full ${STATUS_COLORS[c.status]}`} />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('dashboard.recent_cases')}</CardTitle>
      </CardHeader>
      <CardContent>{content()}</CardContent>
      <CardFooter className="justify-end">
        <Button variant="link" asChild>
          <Link to="/cases">{t('dashboard.view_all')}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
