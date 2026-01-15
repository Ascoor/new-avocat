import { useEffect, useMemo, useState } from 'react';

import api from '@/api/axiosConfig';

const normaliseClients = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && typeof payload === 'object') {
    if (Array.isArray(payload.clients)) {
      return payload.clients;
    }

    if (Array.isArray(payload.data)) {
      return payload.data;
    }
  }

  return [];
};

const filterClients = (clients, query) => {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return [];
  }

  return clients.filter((client) => {
    const name = client?.name ?? '';
    const slug = client?.slug ?? '';
    const phone = client?.phone_number ?? client?.phoneNumber ?? client?.phone ?? '';
    return [name, slug, phone].some((value) => String(value).toLowerCase().includes(normalized));
  });
};

const useClientsSearch = (query, options = {}) => {
  const debounceMs = options.debounceMs ?? 280;
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const normalizedQuery = query.trim();

    if (!normalizedQuery) {
      setResults([]);
      setLoading(false);
      setError(null);
      return undefined;
    }

    let isActive = true;
    const timeout = setTimeout(() => {
      const runSearch = async () => {
        setLoading(true);
        setError(null);

        try {
          const response = await api.get('/api/clients', {
            params: { search: normalizedQuery },
          });
          const data = normaliseClients(response.data);
          if (!isActive) return;
          setResults(data);
        } catch (searchError) {
          const status = searchError?.response?.status;
          const shouldFallback = status === 404 || status === 405;

          if (!shouldFallback) {
            if (!isActive) return;
            setError('تعذر البحث عن العملاء حالياً.');
            setResults([]);
            setLoading(false);
            return;
          }

          try {
            const response = await api.get('/api/clients');
            const allClients = normaliseClients(response.data);
            const filtered = filterClients(allClients, normalizedQuery);
            if (!isActive) return;
            setResults(filtered);
          } catch (fallbackError) {
            if (!isActive) return;
            setError('تعذر تحميل قائمة العملاء.');
            setResults([]);
          }
        } finally {
          if (isActive) {
            setLoading(false);
          }
        }
      };

      void runSearch();
    }, debounceMs);

    return () => {
      isActive = false;
      clearTimeout(timeout);
    };
  }, [debounceMs, query]);

  const memoizedResults = useMemo(() => results, [results]);

  return {
    results: memoizedResults,
    loading,
    error,
  };
};

export default useClientsSearch;
