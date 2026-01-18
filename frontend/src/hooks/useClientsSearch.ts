import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getClients } from '@/api/clients.service';
import { useDebouncedValue } from '@/lib/useDebouncedValue';
import type { Client } from '@/types/clients';

type SearchOptions = {
  debounceMs?: number;
};

type SearchResult = {
  results: Client[];
  loading: boolean;
  error?: string;
};

const normaliseQuery = (query: string) => query.trim().toLowerCase();

const filterClients = (clients: Client[], query: string) => {
  if (!query) {
    return clients;
  }

  return clients.filter((client) => {
    const name = client.name?.toLowerCase() ?? '';
    const slug = client.slug?.toLowerCase() ?? '';
    const phone = client.phone_number?.toLowerCase() ?? '';

    return name.includes(query) || slug.includes(query) || phone.includes(query);
  });
};

const dedupeClients = (clients: Client[]) => {
  const seen = new Map<string | number, Client>();

  clients.forEach((client) => {
    if (client.id !== undefined && client.id !== null) {
      if (!seen.has(client.id)) {
        seen.set(client.id, client);
      }
    }
  });

  return Array.from(seen.values());
};

const useClientsSearch = (query: string, options: SearchOptions = {}): SearchResult => {
  const debouncedQuery = useDebouncedValue(query, options.debounceMs ?? 280);

  const { data, isLoading, error } = useQuery<Client[], Error>({
    queryKey: ['clients'],
    queryFn: async () => {
      const response = await getClients();
      return response.data ?? [];
    },
  });

  const results = useMemo(() => {
    const normalized = normaliseQuery(debouncedQuery);
    const filtered = filterClients(data ?? [], normalized);
    return dedupeClients(filtered);
  }, [data, debouncedQuery]);

  return {
    results,
    loading: isLoading,
    error: error?.message,
  };
};

export default useClientsSearch;
