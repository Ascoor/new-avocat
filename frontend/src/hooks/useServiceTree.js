import { useCallback, useState } from 'react';

import api from '@/api/axiosConfig';

const normalizeList = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && typeof payload === 'object') {
    if (Array.isArray(payload.data)) {
      return payload.data;
    }

    if (Array.isArray(payload.procedures)) {
      return payload.procedures;
    }
  }

  return [];
};

const useServiceTree = () => {
  const [serviceTree, setServiceTree] = useState({});

  const loadServiceTree = useCallback(async (serviceId) => {
    if (!serviceId) return;

    setServiceTree((prev) => {
      const existing = prev[serviceId];
      if (existing?.loading || existing?.loaded) {
        return prev;
      }
      return {
        ...prev,
        [serviceId]: {
          ...existing,
          loading: true,
          error: null,
        },
      };
    });

    try {
      const response = await api.get(`/api/service-procedures/${serviceId}`);
      const procedures = normalizeList(response.data);

      setServiceTree((prev) => ({
        ...prev,
        [serviceId]: {
          procedures,
          loading: false,
          loaded: true,
          error: null,
        },
      }));
    } catch (error) {
      setServiceTree((prev) => ({
        ...prev,
        [serviceId]: {
          ...(prev[serviceId] ?? {}),
          loading: false,
          loaded: false,
          error: 'تعذر تحميل إجراءات الخدمة.',
        },
      }));
    }
  }, []);

  return {
    serviceTree,
    loadServiceTree,
  };
};

export default useServiceTree;
