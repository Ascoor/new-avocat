import { AxiosPromise } from 'axios';
import apiClient from './apiClient';
import type { Court } from '@/types';

export const getCourts = (): AxiosPromise<Court[]> => apiClient.get('/api/courts')
export const getCourtById = (id: number): AxiosPromise<Court> => apiClient.get(`/api/courts/${id}`)
export const createCourt = (data: Partial<Court>): AxiosPromise<Court> => apiClient.post('/api/courts', data)
export const updateCourt = (id: number, data: Partial<Court>): AxiosPromise<Court> => apiClient.put(`/api/courts/${id}`, data)
export const deleteCourt = (id: number): AxiosPromise<void> => apiClient.delete(`/api/courts/${id}`)
