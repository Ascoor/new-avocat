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
  }

  return [];
};

const useCaseTree = () => {
  const [caseTree, setCaseTree] = useState({});

  const loadCaseTree = useCallback(async (caseId) => {
    if (!caseId) return;

    setCaseTree((prev) => {
      const existing = prev[caseId];
      if (existing?.loading || existing?.loaded) {
        return prev;
      }
      return {
        ...prev,
        [caseId]: {
          ...existing,
          loading: true,
          error: null,
        },
      };
    });

    try {
      const [proceduresResponse, sessionsResponse, adsResponse] = await Promise.all([
        api.get(`/api/procedures/leg-case/${caseId}`),
        api.get(`/api/legal_sessions/leg-case/${caseId}`),
        api.get(`/api/legal-ads/${caseId}`),
      ]);

      const procedures = normalizeList(proceduresResponse.data);
      const sessions = normalizeList(sessionsResponse.data);
      const ads = normalizeList(adsResponse.data);

      setCaseTree((prev) => ({
        ...prev,
        [caseId]: {
          procedures,
          sessions,
          ads,
          loading: false,
          loaded: true,
          error: null,
        },
      }));
    } catch (error) {
      setCaseTree((prev) => ({
        ...prev,
        [caseId]: {
          ...(prev[caseId] ?? {}),
          loading: false,
          loaded: false,
          error: 'تعذر تحميل تفاصيل القضية.',
        },
      }));
    }
  }, []);

  return {
    caseTree,
    loadCaseTree,
  };
};

export default useCaseTree;
