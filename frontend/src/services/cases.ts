import type { LegalCase } from '@/types'
import { AxiosPromise } from 'axios'
import apiClient from './apiClient'

export const getCases = (): AxiosPromise<LegalCase[] | { cases: LegalCase[] }> => apiClient.get('/cases')
export const getCaseById = (id: string | number): AxiosPromise<LegalCase> => apiClient.get(`/cases/${id}`)
export const createCase = (data: Partial<LegalCase>): AxiosPromise<LegalCase> => apiClient.post('/cases', data)
export const updateCase = (id: string | number, data: Partial<LegalCase>): AxiosPromise<LegalCase> => apiClient.put(`/cases/${id}`, data)
export const deleteCase = (id: string | number): AxiosPromise<void> => apiClient.delete(`/cases/${id}`)
