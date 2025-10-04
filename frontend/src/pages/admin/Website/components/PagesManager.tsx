import { useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { listWebsitePages, publishAllWebsitePages } from '@/api/websiteAdmin.service';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import type { PageStatus } from '@/types/website';
import PageEditor from './PageEditor/PageEditor';

const PagesManager: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const pagesQuery = useQuery({
    queryKey: ['admin-website-pages'],
    queryFn: listWebsitePages,
  });

  const pages = useMemo(() => pagesQuery.data ?? [], [pagesQuery.data]);
  const [selectedSlug, setSelectedSlug] = useState('');

  const publishAllMutation = useMutation({
    mutationFn: publishAllWebsitePages,
    onSuccess: () => {
      toast({ title: 'All staged changes published' });
      queryClient.invalidateQueries({ queryKey: ['admin-website-pages'] });
      if (selectedSlug) {
        queryClient.invalidateQueries({ queryKey: ['admin-website-page', selectedSlug] });
      }
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : 'Unable to publish all changes';
      toast({ title: 'Bulk publish failed', description: message, variant: 'destructive' });
    },
  });

  useEffect(() => {
    if (!pages.length) {
      return;
    }

    if (!selectedSlug) {
      const preferredOrder = ['home', 'landing'];
      const preferredPage = preferredOrder
        .map((slug) => pages.find((page) => page.slug === slug))
        .find((page) => Boolean(page));
      setSelectedSlug((preferredPage ?? pages[0]).slug);
    } else if (!pages.some((page) => page.slug === selectedSlug)) {
      setSelectedSlug(pages[0].slug);
    }
  }, [pages, selectedSlug]);

  const selectedPage = useMemo(
    () => pages.find((page) => page.slug === selectedSlug),
    [pages, selectedSlug],
  );

  const renderStatusBadge = (status?: PageStatus) => {
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="w-full md:w-80">
          {pagesQuery.isLoading ? (
            <Skeleton className="h-10 w-full" />
          ) : (
            <Select value={selectedSlug} onValueChange={setSelectedSlug}>
              <SelectTrigger>
                <SelectValue placeholder="Select page" />
              </SelectTrigger>
              <SelectContent>
                {pages.map((page) => (
                  <SelectItem key={page.slug} value={page.slug}>
                    <div className="flex items-center justify-between gap-2">
                      <span>{page.title?.en ?? page.slug}</span>
                      {renderStatusBadge(page.status)}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="outline" onClick={() => navigate('/dashboard/website/report')}>
            View report
          </Button>
          <Button type="button" onClick={() => publishAllMutation.mutate()} disabled={publishAllMutation.isPending}>
            {publishAllMutation.isPending ? 'Publishing…' : 'Publish all changes'}
          </Button>
        </div>
      </div>

      {selectedSlug ? (
        <PageEditor
          slug={selectedSlug}
          title={selectedPage?.title?.en ?? selectedSlug}
          description="Edit localized content blocks, stage drafts, and publish updates."
        />
      ) : null}
    </div>
  );
};

export default PagesManager;
