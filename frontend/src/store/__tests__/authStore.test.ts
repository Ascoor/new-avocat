import { act } from 'react-dom/test-utils';
import { useAuthStore } from '../authStore';
import { describe, expect, it } from 'vitest';

const setUp = () => {
  const store = useAuthStore.getState();
  return store;
};

describe('authStore', () => {
  it('logs in a user', async () => {
    await act(async () => {
      await useAuthStore.getState().login('test@example.com', 'password');
    });
    const { user, token, isAuthenticated } = setUp();
    expect(user?.email).toBe('test@example.com');
    expect(token).toBe('mock-jwt-token');
    expect(isAuthenticated).toBe(true);
  });

  it('logs out a user', async () => {
    await act(async () => {
      useAuthStore.getState().logout();
    });
    const { user, token, isAuthenticated } = setUp();
    expect(user).toBeNull();
    expect(token).toBeNull();
    expect(isAuthenticated).toBe(false);
  });
});
