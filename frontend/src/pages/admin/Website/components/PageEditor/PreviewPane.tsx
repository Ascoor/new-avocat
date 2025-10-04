import { ExternalLink, Play, Send } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { ContentBlock, Localized, PageStatus } from '@/types/website';

import PreviewLandingSection from '../PreviewLandingSection';

interface PreviewPaneProps {
  title?: Localized<string | null>;
  blocks: ContentBlock[];
  status: PageStatus;
  isPreviewing?: boolean;
  isPublishing?: boolean;
  previewUrl?: string | null;
  onPreview?: () => void;
  onPublish?: () => void;
}

const getStatusMeta = (status: PageStatus) => {
  switch (status) {
    case 'published':
      return { label: 'Published', tone: 'bg-emerald-100 text-emerald-800', icon: '🟢' };
    case 'preview':
      return { label: 'Preview', tone: 'bg-blue-100 text-blue-800', icon: '🔵' };
    case 'unlinked':
      return { label: 'Unlinked', tone: 'bg-red-100 text-red-800', icon: '🔴' };
    default:
      return { label: 'Draft', tone: 'bg-amber-100 text-amber-800', icon: '🟡' };
  }
};

const PreviewPane: React.FC<PreviewPaneProps> = ({
  title,
  blocks,
  status,
  isPreviewing,
  isPublishing,
  previewUrl,
  onPreview,
  onPublish,
}) => {
  const statusMeta = getStatusMeta(status);

  return (
    <Card className="h-full">
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Live preview</CardTitle>
          <Badge className={`${statusMeta.tone} font-medium`}>{statusMeta.icon} {statusMeta.label}</Badge>
        </div>
        <CardDescription>Review localized content before sharing changes with the world.</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <Tabs defaultValue="en" className="space-y-4">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="en">English</TabsTrigger>
            <TabsTrigger value="ar">العربية</TabsTrigger>
          </TabsList>

          <TabsContent value="en" className="space-y-3">
            <PreviewLandingSection locale="en" title={title?.en ?? ''} blocks={blocks} />
          </TabsContent>

          <TabsContent value="ar" className="space-y-3">
            <div dir="rtl">
              <PreviewLandingSection locale="ar" title={title?.ar ?? ''} blocks={blocks} />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      <Separator />

      <CardFooter className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {previewUrl ? (
          <a
            href={previewUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            <ExternalLink className="h-4 w-4" /> Preview link
          </a>
        ) : (
          <p className="text-sm text-muted-foreground">Preview links are generated when you request a preview.</p>
        )}

        <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:justify-end">
          <Button variant="outline" size="sm" onClick={onPreview} disabled={isPreviewing}>
            <Play className="mr-2 h-4 w-4" />
            {isPreviewing ? 'Generating…' : 'Preview changes'}
          </Button>
          <Button size="sm" onClick={onPublish} disabled={isPublishing}>
            <Send className="mr-2 h-4 w-4" />
            {isPublishing ? 'Publishing…' : 'Publish'}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PreviewPane;
