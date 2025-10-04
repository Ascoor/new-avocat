import { useQuery } from '@tanstack/react-query';
import { Activity, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';

import { getWebsiteReport } from '@/api/websiteAdmin.service';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

const ReportWidget: React.FC = () => {
  const reportQuery = useQuery({
    queryKey: ['admin-website-report'],
    queryFn: getWebsiteReport,
  });

  const report = reportQuery.data;

  if (reportQuery.isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index}>
            <CardHeader>
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (reportQuery.isError || !report) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-700">
            <AlertTriangle className="h-5 w-5" /> Unable to load report
          </CardTitle>
          <CardDescription className="text-red-600">
            Check API connectivity for /api/admin/website/report and try again.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const completion = Math.round(report.completionRate ?? 0);
  const apiStatus = report.apiHealthy ? (
    <Badge className="bg-emerald-100 text-emerald-800">Connected</Badge>
  ) : (
    <Badge className="bg-red-100 text-red-800">Unavailable</Badge>
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Activity className="h-4 w-4" /> Completion
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-3xl font-semibold">{completion}%</div>
            <Progress value={completion} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Clock className="h-4 w-4" /> Last edited
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold text-foreground">
              {report.lastEditedAt ? new Date(report.lastEditedAt).toLocaleString() : 'No edits recorded'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <CheckCircle2 className="h-4 w-4" /> Completed pages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold text-foreground">
              {report.completedPages} / {report.totalPages}
            </p>
            <p className="text-xs text-muted-foreground">Pending drafts: {report.pendingDrafts}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-sm font-medium text-muted-foreground">API status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {apiStatus}
            <p className="text-xs text-muted-foreground">Monitored endpoint: /api/admin/website/report</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Section progress</CardTitle>
          <CardDescription>Track how each landing page module is progressing toward publication.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {report.sections.length === 0 ? (
            <p className="text-sm text-muted-foreground">No sections available.</p>
          ) : (
            report.sections.map((section) => {
              const progress = Math.round(section.completion);
              return (
                <div key={section.slug} className="space-y-2 rounded-lg border border-border/60 p-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{section.title}</span>
                      {renderStatus(section.status)}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      Last update: {section.updated_at ? new Date(section.updated_at).toLocaleString() : '—'}
                    </span>
                  </div>
                  <Progress value={progress} />
                </div>
              );
            })
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const renderStatus = (status: string) => {
  switch (status) {
    case 'published':
      return <Badge className="bg-emerald-100 text-emerald-800">🟢 Published</Badge>;
    case 'preview':
      return <Badge className="bg-blue-100 text-blue-800">🔵 Preview</Badge>;
    case 'unlinked':
      return <Badge className="bg-red-100 text-red-800">🔴 Unlinked</Badge>;
    default:
      return <Badge className="bg-amber-100 text-amber-800">🟡 Draft</Badge>;
  }
};

export default ReportWidget;
