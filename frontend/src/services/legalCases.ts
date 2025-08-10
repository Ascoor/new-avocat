
import { AxiosPromise } from 'axios';
import apiClient from './apiClient';
import { LegalCase } from '@/types';

// Export the type for external use
export type { LegalCase };

export const getLegalCases = (): AxiosPromise<LegalCase[]> => apiClient.get('/legal_cases');
export const createLegalCase = (data: Partial<LegalCase>): AxiosPromise<LegalCase> => 
  apiClient.post('/legal_case', data);
export const updateLegalCase = (id: string, data: Partial<LegalCase>): AxiosPromise<LegalCase> => 
  apiClient.put(`/legal_case/${id}`, data);
