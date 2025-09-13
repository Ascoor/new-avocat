import { describe, expect, it, vi } from 'vitest';
import axios from 'axios';
import { BACKEND_URL } from '@/config/api';

vi.mock('axios');

describe('apiClient', () => {
  it('initializes with credentials and base URL', async () => {
    const create = vi
      .spyOn(axios, 'create')
      .mockReturnValue({} as ReturnType<typeof axios.create>);

    await import('../apiClient');

    expect(create).toHaveBeenCalledWith({
      baseURL: `${BACKEND_URL}/api`,
      withCredentials: true,
    });
  });
});
