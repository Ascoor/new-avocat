import { AxiosPromise } from 'axios';
import apiClient from './apiClient';

export const searchExpenses = (): AxiosPromise<unknown[]> => apiClient.get('/expenses/search')
export const getExpenseCategories = (): AxiosPromise<string[]> => apiClient.get('/expense_categories')
