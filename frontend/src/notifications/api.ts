import apiClient from '../services/apiClient';

export interface Notification {
  id: number;
  message: string;
  read?: boolean;
}

export const notificationsApi = {
  async getAll(userId: string): Promise<Notification[]> {
    const res = await apiClient.get(`/notifications/${userId}`);
    return res.data;
  },
  async markAsRead(notificationId: string): Promise<void> {
    await apiClient.post(`/notifications/${notificationId}/read`);
  },
  async create(data: Partial<Notification>): Promise<Notification> {
    const res = await apiClient.post('/notification', data);
    return res.data;
  }
};
