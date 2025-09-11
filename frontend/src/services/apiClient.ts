import axios from 'axios';
import { BACKEND_URL } from '@/config/api';

const apiClient = axios.create({
  baseURL: `${BACKEND_URL}/api`,
  withCredentials: true,
});

export default apiClient;
