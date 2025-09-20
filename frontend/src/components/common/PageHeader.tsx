import type { ReactNode } from 'react';

interface PageHeaderProps {
  icon: ReactNode;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}

const PageHeader = ({ icon, title, subtitle, actions }: PageHeaderProps) => {
  return (
    <div className="rounded-2xl border border-border/60 bg-gradient-to-r from-primary/5 via-background to-background p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            {icon}
          </span>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{title}</h1>
            {subtitle ? <p className="text-sm text-muted-foreground">{subtitle}</p> : null}
          </div>
        </div>
        {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
      </div>
    </div>
  );
};

export default PageHeader;
