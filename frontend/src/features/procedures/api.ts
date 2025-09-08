import apiClient from '../../services/apiClient';
import type { Procedure } from '@/types';

export const proceduresApi = {
  async getAll(params?: any): Promise<Procedure[]> {
    const res = await apiClient.get('/procedures', { params });
    return res.data;
  },
  async getById(id: string): Promise<Procedure> {
    const res = await apiClient.get(`/procedures/${id}`);
    return res.data;
  },
  async create(data: Partial<Procedure>): Promise<Procedure> {
    const res = await apiClient.post('/procedures', data);
    return res.data;
  },
  async update(id: string, data: Partial<Procedure>): Promise<Procedure> {
    const res = await apiClient.put(`/procedures/${id}`, data);
    return res.data;
  },
  async remove(id: string): Promise<void> {
    await apiClient.delete(`/procedures/${id}`);
  },
  async getByCaseId(legCaseId: string): Promise<Procedure[]> {
    const res = await apiClient.get(`/procedures/leg-case/${legCaseId}`);
    return res.data;
  }
};
export type { Procedure };
