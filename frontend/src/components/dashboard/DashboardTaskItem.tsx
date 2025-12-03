import { FC } from 'react';
import { Badge } from '@/components/ui/badge';

interface Props {
  title: string;
  time: string;
  priority: "high" | "medium" | "low";
  icon: any;
}

const DashboardTaskItem: FC<Props> = ({ title, time, priority, icon: Icon }) => {
  const variant =
    priority === 'high' ? 'destructive' :
    priority === 'medium' ? 'default' : 'secondary';

  return (
    <div className="flex items-center gap-3 rounded-xl border p-3 bg-card/60 hover:shadow">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
        <Icon className="h-5 w-5" />
      </div>

      <div className="flex-1">
        <h4 className="font-semibold">{title}</h4>
        <p className="text-xs text-muted-foreground">{time}</p>
      </div>

      <Badge variant={variant}>{priority}</Badge>
    </div>
  );
};

export default DashboardTaskItem;
