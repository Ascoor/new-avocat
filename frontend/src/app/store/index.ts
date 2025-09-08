import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../features/auth/slice';
import clientsReducer from '../../features/clients/slice';
import dashboardReducer from '../../features/dashboard/slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    clients: clientsReducer,
    dashboard: dashboardReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;