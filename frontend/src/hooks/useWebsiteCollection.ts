import { useEffect, useState } from 'react';
import api from '@/api/axiosConfig';

interface UseWebsiteCollectionResult<T> {
  data: T[];
  loading: boolean;
  error: Error | null;
}

export function useWebsiteCollection<T = unknown>(endpoint: string): UseWebsiteCollectionResult<T> {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isCancelled = false;

    setLoading(true);
    setError(null);

    api
      .get<T[]>(endpoint)
      .then((response) => {
        if (!isCancelled) {
          setData(response.data);
        }
      })
      .catch((err: unknown) => {
        if (!isCancelled) {
          const normalized = err instanceof Error ? err : new Error('Failed to load data');
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
  }, [endpoint]);

  return { data, loading, error };
}
