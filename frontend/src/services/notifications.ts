import { AxiosPromise } from 'axios';
import apiClient from './apiClient';

export interface Notification {
  id: number;
  message: string;
  read?: boolean;
}

export const getNotifications = (userId: number): AxiosPromise<Notification[]> =>
  apiClient.get(`/notifications/${userId}`)
export const markNotificationAsRead = (notificationId: number): AxiosPromise<void> =>
  apiClient.post(`/notifications/${notificationId}/read`)
export const createNotification = (data: Partial<Notification>): AxiosPromise<Notification> =>
  apiClient.post('/notification', data)
