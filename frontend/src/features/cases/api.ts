import apiClient from '../../services/apiClient';
import type { LegalCase } from '@/types';

export const casesApi = {
  async getAll(params?: any): Promise<LegalCase[]> {
    const res = await apiClient.get('/legal-cases', { params });
    return res.data;
  },
  async getById(id: string): Promise<LegalCase> {
    const res = await apiClient.get(`/legal-cases/${id}`);
    return res.data;
  },
  async create(data: Partial<LegalCase>): Promise<LegalCase> {
    const res = await apiClient.post('/legal-cases', data);
    return res.data;
  },
  async update(id: string, data: Partial<LegalCase>): Promise<LegalCase> {
    const res = await apiClient.put(`/legal-cases/${id}`, data);
    return res.data;
  },
  async remove(id: string): Promise<void> {
    await apiClient.delete(`/legal-cases/${id}`);
  }
};
export type { LegalCase };
