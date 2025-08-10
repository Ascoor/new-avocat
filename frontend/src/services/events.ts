import { AxiosPromise } from 'axios';
import apiClient from './apiClient';

export interface CalendarEvent {
  id: number;
  title: string;
}

export const getEvents = (): AxiosPromise<CalendarEvent[]> => apiClient.get('/events')
export const createEvent = (data: Partial<CalendarEvent>): AxiosPromise<CalendarEvent> =>
  apiClient.post('/event', data)
