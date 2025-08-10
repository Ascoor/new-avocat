
import apiClient from './apiClient';

export interface Procedure {
  id: number;
  title: string;
  note?: string;
  [key: string]: unknown;
}

export const createProcedure = async (data: { title: string; note?: string }) => {
  return apiClient.post<Procedure>('/procedures', data);
};

export const updateProcedure = async (id: number, data: { title: string; note?: string }) => {
  return apiClient.put<Procedure>(`/procedures/${id}`, data);
};

export const getProcedures = async () => {
  return apiClient.get<Procedure[]>('/procedures');
};

export const deleteProcedure = async (id: number) => {
  return apiClient.delete(`/procedures/${id}`);
};
