import api from './axiosConfig';
import type { Unclient } from '@/types/unclients';

interface UnclientsResponse {
  unclients: Unclient[];
}

export const getUnclients = () => api.get<UnclientsResponse>('/api/unclients');

export const getUnclientById = (id: string) =>
  api.get<Unclient>(`/api/unclients/${id}`);

export const createUnclient = (data: Partial<Unclient>) =>
  api.post<Unclient>('/api/unclients', data);

export const updateUnclient = (id: string, data: Partial<Unclient>) =>
  api.put<Unclient>(`/api/unclients/${id}`, data);

export const deleteUnclient = (id: string) =>
  api.delete(`/api/unclients/${id}`);
