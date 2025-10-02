import { useCallback, useEffect, useMemo, useState } from 'react';
import api from '@/api/axiosConfig';
import type { ContentBlock, Localized, Locale, PageContent } from '@/types/website';

export interface UseWebsiteContentResult {
  data: PageContent | null;
  loading: boolean;
  error: Error | null;
  contentBlocks: ContentBlock[];
  getLocalizedValue: <T>(key: string, fallback?: Localized<T>) => Localized<T | null>;
  getValueForLocale: <T>(
    key: string,
    locale: Locale,
    fallback?: T | null
  ) => T | null;
}

export function useWebsiteContent(slug: string): UseWebsiteContentResult {
  const [data, setData] = useState<PageContent | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isCancelled = false;

    setLoading(true);
    setError(null);

    api
      .get<PageContent>(`/api/website/pages/${slug}`)
      .then((response) => {
        if (!isCancelled) {
          setData(response.data);
        }
      })
      .catch((err: unknown) => {
        if (!isCancelled) {
          const normalized = err instanceof Error ? err : new Error('Failed to load content');
          setError(normalized);
        }
      })
      .finally(() => {
        if (!isCancelled) {
          setLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [slug]);

  const contentBlocks = useMemo<ContentBlock[]>(
    () => data?.content_blocks ?? data?.content ?? [],
    [data]
  );

  const getBlock = useCallback(
    (key: string) => contentBlocks.find((block) => block.key === key),
    [contentBlocks]
  );

  const getLocalizedValue = useCallback(
    <T,>(key: string, fallback?: Localized<T>): Localized<T | null> => {
      const block = getBlock(key);
      const value = (block?.value ?? {}) as Localized<T | null>;

      return {
        ar: value?.ar ?? fallback?.ar ?? null,
        en: value?.en ?? fallback?.en ?? null,
      };
    },
    [getBlock]
  );

  const getValueForLocale = useCallback(
    <T,>(key: string, locale: Locale, fallback: T | null = null): T | null => {
      const localized = getLocalizedValue<T>(key);
      const value = localized[locale];

      return (value ?? fallback ?? null) as T | null;
    },
    [getLocalizedValue]
  );

  return {
    data,
    loading,
    error,
    contentBlocks,
    getLocalizedValue,
    getValueForLocale,
  };
}
