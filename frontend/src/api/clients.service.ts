import api from './axiosConfig';
import { Client } from '@/types/legalCase';

export const getClients = () => api.get<{ clients: Client[] }>('/api/clients');

export const getClientById = (id: string) =>
  api.get<Client>(`/api/clients/${id}`);

export const createClient = (data: Omit<Client, 'id'>) =>
  api.post<Client>('/api/clients', data);

export const updateClient = (id: string, data: Partial<Client>) =>
  api.put<Client>(`/api/clients/${id}`, data);

export const deleteClient = (id: string) =>
  api.delete(`/api/clients/${id}`);
