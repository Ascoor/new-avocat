import apiClient from '../../services/apiClient';
import type { LegalSession } from '@/types';

export const sessionsApi = {
  async getAll(params?: any): Promise<LegalSession[]> {
    const res = await apiClient.get('/legal_sessions', { params });
    return res.data;
  },
  async getByCaseId(legCaseId: string): Promise<LegalSession[]> {
    const res = await apiClient.get(`/legal_sessions/leg-case/${legCaseId}`);
    return res.data;
  },
  async getByCourtId(courtId: string): Promise<LegalSession[]> {
    const res = await apiClient.get(`/legal_sessions/court/${courtId}`);
    return res.data;
  },
  async getByLawyerId(lawyerId: string): Promise<LegalSession[]> {
    const res = await apiClient.get(`/legal_sessions/lawyer/${lawyerId}`);
    return res.data;
  },
  async create(data: Partial<LegalSession>): Promise<LegalSession> {
    const res = await apiClient.post('/legal_sessions', data);
    return res.data;
  },
  async update(id: string, data: Partial<LegalSession>): Promise<LegalSession> {
    const res = await apiClient.put(`/legal_sessions/${id}`, data);
    return res.data;
  },
  async remove(id: string): Promise<void> {
    await apiClient.delete(`/legal_sessions/${id}`);
  },
  async getTypes(): Promise<string[]> {
    const res = await apiClient.get('/legal_session_types/');
    return res.data;
  }
};
export type { LegalSession };
