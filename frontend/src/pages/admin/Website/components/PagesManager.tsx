import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { listWebsitePages } from '@/api/websiteAdmin.service';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import PageEditor from './PageEditor';

const PagesManager: React.FC = () => {
  const pagesQuery = useQuery({
    queryKey: ['admin-website-pages'],
    queryFn: listWebsitePages,
  });

  const pages = pagesQuery.data ?? [];
  const [selectedSlug, setSelectedSlug] = useState('');

  useEffect(() => {
    if (!pages.length) {
      return;
    }

    if (!selectedSlug) {
      const landing = pages.find((page) => page.slug === 'landing');
      setSelectedSlug((landing ?? pages[0]).slug);
    } else if (!pages.some((page) => page.slug === selectedSlug)) {
      setSelectedSlug(pages[0].slug);
    }
  }, [pages, selectedSlug]);

  const selectedPage = useMemo(
    () => pages.find((page) => page.slug === selectedSlug),
    [pages, selectedSlug],
  );

  return (
    <div className="space-y-6">
      <div className="w-full md:w-72">
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
                  {page.title?.en ?? page.slug}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {selectedSlug ? (
        <PageEditor
          slug={selectedSlug}
          title={selectedPage?.title?.en ?? selectedSlug}
          description="Edit localized content blocks for the selected landing page section."
        />
      ) : null}
    </div>
  );
};

export default PagesManager;
