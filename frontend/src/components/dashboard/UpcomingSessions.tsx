import { useQuery } from '@tanstack/react-query';
import { Session } from './api';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';

const STATUS_STYLES: Record<string, string> = {
  scheduled: 'bg-warning text-warning-foreground',
  completed: 'bg-success text-success-foreground',
  canceled: 'bg-destructive text-destructive-foreground',
};

export default function UpcomingSessions() {
  const { t } = useTranslation();
  const { data, isLoading, error } = useQuery({ queryKey: ['dashboard-sessions'], queryFn: Session.list });

  const content = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center p-6">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      );
    }
    if (error) {
      return <div className="text-center text-destructive">Error</div>;
    }
    const upcoming = data?.slice(0, 5) ?? [];
    return (
      <ul className="space-y-4">
        {upcoming.map(s => (
          <li key={s.id} className="flex items-center justify-between">
            <div>
              <p className="font-medium">{s.title}</p>
              <p className="text-sm text-muted-foreground">{s.client} • {new Date(s.date).toLocaleDateString()}</p>
            </div>
            <Badge className={`${STATUS_STYLES[s.status]}`}>
              {t(`dashboard.${s.status}`)}
            </Badge>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('dashboard.upcoming_sessions')}</CardTitle>
      </CardHeader>
      <CardContent>{content()}</CardContent>
      <CardFooter className="justify-end">
        <Button variant="link" asChild>
          <Link to="/sessions">{t('dashboard.view_all')}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
