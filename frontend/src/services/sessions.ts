import { AxiosPromise } from 'axios';
import apiClient from './apiClient';
import type { LegalSession } from '@/types';

export const getAllSessions = (): AxiosPromise<LegalSession[]> => apiClient.get('/api/legal_sessions')
export const getSessionsByLegCaseId = (legCaseId: number): AxiosPromise<LegalSession[]> =>
  apiClient.get(`/api/legal_sessions/leg-case/${legCaseId}`)
export const getSessionsByCourtId = (courtId: number): AxiosPromise<LegalSession[]> =>
  apiClient.get(`/api/legal_sessions/court/${courtId}`)
export const getSessionsByLawyerId = (lawyerId: number): AxiosPromise<LegalSession[]> =>
  apiClient.get(`/api/legal_sessions/lawyer/${lawyerId}`)
export const createSession = (data: Partial<LegalSession>): AxiosPromise<LegalSession> =>
  apiClient.post('/api/legal_sessions', data)
export const updateSession = (id: number, data: Partial<LegalSession>): AxiosPromise<LegalSession> =>
  apiClient.put(`/api/legal_sessions/${id}`, data)
export const deleteSession = (id: number): AxiosPromise<void> => apiClient.delete(`/api/legal_sessions/${id}`)
export const getLegalSessionTypes = (): AxiosPromise<string[]> => apiClient.get('/api/legal_session_types/')
