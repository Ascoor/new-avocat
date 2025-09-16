import api from './axiosConfig';
import { Lawyer } from '@/types/legalCase';

export const getLawyers = () => api.get<Lawyer[]>('/api/lawyers');

export const getLawyerById = (id: string) =>
  api.get<Lawyer>(`/api/lawyers/${id}`);

export const createLawyer = (data: Omit<Lawyer, 'id'>) =>
  api.post<Lawyer>('/api/lawyers', data);

export const updateLawyer = (id: string, data: Partial<Lawyer>) =>
  api.put<Lawyer>(`/api/lawyers/${id}`, data);

export const deleteLawyer = (id: string) =>
  api.delete(`/api/lawyers/${id}`);
