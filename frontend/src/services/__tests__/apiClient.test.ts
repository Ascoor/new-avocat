import { describe, expect, it, vi } from 'vitest';
import axios from 'axios';

vi.mock('axios');

const mockedAxios = axios as unknown as {
  create: (config: Record<string, unknown>) => {
    interceptors: { request: { use: (fn: (cfg: Record<string, unknown>) => void) => void } };
    get: unknown;
  };
};

describe('apiClient', () => {
  it('attaches token from sessionStorage', async () => {
    const requestInterceptors: Array<(cfg: Record<string, unknown>) => Record<string, unknown>> = [];
    mockedAxios.create = vi.fn().mockReturnValue({
      interceptors: { request: { use: (fn: (cfg: Record<string, unknown>) => Record<string, unknown>) => requestInterceptors.push(fn) } },
      get: vi.fn()
    });
    // Re-import to use mocked axios
    const { default: buildClient } = await import('../apiClient');

    sessionStorage.setItem('token', 'test-token');
    const config = await requestInterceptors[0]({ headers: {} as Record<string, unknown> });
    expect((config.headers as Record<string, unknown>)?.Authorization).toBe('Bearer test-token');
    void buildClient; // Mark as intentionally unused to satisfy ESLint
  });
});
