import { FC } from 'react';
import { Badge } from '@/components/ui/badge';

interface Props {
  title: string;
  description: string;
  time: string;
  status: string;
  icon: any;
  statusColor: string;
}

const DashboardActivityItem: FC<Props> = ({ title, description, time, status, icon: Icon, statusColor }) => (
  <div className="flex items-start gap-3 rounded-xl border p-3 bg-card/60 hover:shadow">
    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
      <Icon className="h-5 w-5" />
    </div>

    <div className="flex-1 space-y-1">
      <div className="flex justify-between">
        <h4 className="font-semibold">{title}</h4>
        <Badge className={statusColor}>{status}</Badge>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
      <p className="text-xs text-muted-foreground">{time}</p>
    </div>
  </div>
);

export default DashboardActivityItem;
