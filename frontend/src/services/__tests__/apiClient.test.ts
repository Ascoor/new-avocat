import { describe, expect, it, vi } from 'vitest';
import axios from 'axios';

vi.mock('axios');

describe('apiClient', () => {
  it('initializes with credentials and base URL', async () => {
    const create = vi.fn().mockReturnValue({});
    (axios as any).create = create;

    await import('../apiClient');

    expect(create).toHaveBeenCalledWith({
      baseURL: 'http://127.0.0.1:8000/api',
      withCredentials: true,
    });
  });
});
