import { ReactNode, CSSProperties } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface KPICardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: ReactNode;
  className?: string;
  variant?: 'ocean' | 'forest' | 'sunset' | 'royal' | 'rose' | 'crimson' | 'teal' | 'amber' | 'indigo' | 'lime' | 'default';
  style?: CSSProperties;
}

export function KPICard({
  title,
  value,
  change,
  changeType = 'neutral',
  icon,
  className,
  variant = 'default',
  style
}: KPICardProps) {
  const variantClasses = {
    ocean: 'kpi-card-ocean',
    forest: 'kpi-card-forest',
    sunset: 'kpi-card-sunset',
    royal: 'kpi-card-royal',
    rose: 'kpi-card-rose',
    crimson: 'kpi-card-crimson',
    teal: 'kpi-card-teal',
    amber: 'kpi-card-amber',
    indigo: 'kpi-card-indigo',
    lime: 'kpi-card-lime',
    default: 'bg-card'
  };

  const changeClasses = {
    positive: 'text-green-600 dark:text-green-400',
    negative: 'text-red-600 dark:text-red-400',
    neutral: 'text-muted-foreground'
  };

  return (
    <Card 
      className={cn(
        'transition-all duration-300 hover:shadow-medium border-2 animate-fade-in',
        variantClasses[variant],
        className
      )}
      style={style}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && (
          <div className="text-muted-foreground opacity-70">
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-1">
          {value}
        </div>
        {change && (
          <p className={cn(
            'text-xs flex items-center gap-1',
            changeClasses[changeType]
          )}>
            {changeType === 'positive' && '↗'}
            {changeType === 'negative' && '↘'}
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  );
}