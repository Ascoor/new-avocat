import { AxiosPromise } from 'axios'
import apiClient from './apiClient'
import type { LegalAd } from '@/types'

export const getAds = (): AxiosPromise<LegalAd[]> => apiClient.get('/legal-ads')
export const getAdById = (id: number): AxiosPromise<LegalAd> => apiClient.get(`/legal-ads/${id}`)
export const createAd = (data: Partial<LegalAd>): AxiosPromise<LegalAd> => apiClient.post('/legal-ads', data)
export const updateAd = (id: number, data: Partial<LegalAd>): AxiosPromise<LegalAd> => apiClient.put(`/legal-ads/${id}`, data)
export const deleteAd = (id: number): AxiosPromise<void> => apiClient.delete(`/legal-ads/${id}`)
