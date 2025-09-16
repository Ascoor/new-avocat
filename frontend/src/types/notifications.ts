export interface Notification {
  id: number;
  user_id: number;
  event_id: number;
  type: string;
  message: string;
  read: boolean;
  created_at: string;
  updated_at: string;
}
