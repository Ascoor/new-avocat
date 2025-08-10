 
import { AxiosResponse } from 'axios';
import apiClient from './apiClient';
import { User } from '@/types';

export const getLawyers = (): Promise<AxiosResponse<{ lawyers: User[] }>> =>
  apiClient.get('/api/lawyers');

export const getLawyerById = (id: string): Promise<AxiosResponse<User>> =>
  apiClient.get(`/api/lawyers/${id}`);

export const createLawyer = (data: Partial<User>): Promise<AxiosResponse<User>> =>
  apiClient.post('/api/lawyers', data);

export const updateLawyer = (
  id: string,
  data: Partial<User>
): Promise<AxiosResponse<User>> => apiClient.put(`/api/lawyers/${id}`, data);

export const deleteLawyer = (id: string): Promise<AxiosResponse<void>> =>
  apiClient.delete(`/api/lawyers/${id}`); 
