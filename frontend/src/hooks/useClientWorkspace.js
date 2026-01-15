import { useEffect, useMemo, useState } from 'react';

import api from '@/api/axiosConfig';

const normaliseCollection = (payload, keys = ['data', 'clients', 'services']) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && typeof payload === 'object') {
    for (const key of keys) {
      if (Array.isArray(payload[key])) {
        return payload[key];
      }
    }
  }

  return [];
};

const normaliseClient = (payload) => {
  if (payload && typeof payload === 'object') {
    if (payload.client) {
      return payload.client;
    }

    if (payload.data) {
      return payload.data;
    }
  }

  return payload;
};

const matchesClientId = (candidateId, clientId) =>
  String(candidateId ?? '') === String(clientId ?? '');

const useClientWorkspace = (clientId) => {
  const [client, setClient] = useState(null);
  const [cases, setCases] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!clientId) {
      setClient(null);
      setCases([]);
      setServices([]);
      setLoading(false);
      setError(null);
      return;
    }

    let isActive = true;
    setLoading(true);
    setError(null);

    const fetchWorkspace = async () => {
      try {
        const [clientResponse, casesResponse, servicesResponse] = await Promise.all([
          api.get(`/api/clients/${clientId}`),
          api.get('/api/legal-cases'),
          api.get('/api/services'),
        ]);

        if (!isActive) return;

        const nextClient = normaliseClient(clientResponse.data);
        const nextCases = normaliseCollection(casesResponse.data, ['data', 'cases']);
        const nextServices = normaliseCollection(servicesResponse.data, ['services', 'data']);

        setClient(nextClient);

        const filteredCases = nextCases.filter((caseItem) =>
          Array.isArray(caseItem?.clients)
            ? caseItem.clients.some((linkedClient) => matchesClientId(linkedClient?.id, clientId))
            : false,
        );

        const filteredServices = nextServices.filter((service) =>
          Array.isArray(service?.clients)
            ? service.clients.some((linkedClient) => matchesClientId(linkedClient?.id, clientId))
            : false,
        );

        setCases(filteredCases);
        setServices(filteredServices);
      } catch (fetchError) {
        if (!isActive) return;
        setError('تعذر تحميل بيانات الموكل حالياً.');
        setClient(null);
        setCases([]);
        setServices([]);
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    void fetchWorkspace();

    return () => {
      isActive = false;
    };
  }, [clientId]);

  return useMemo(
    () => ({
      client,
      cases,
      services,
      loading,
      error,
    }),
    [client, cases, services, loading, error],
  );
};

export default useClientWorkspace;
