import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../features/auth/slice';
import clientsReducer from '../../features/clients/slice';
import dashboardReducer from '../../features/dashboard/slice';
import casesReducer from '../../features/cases/slice';
import sessionsReducer from '../../features/sessions/slice';
import servicesReducer from '../../features/services/slice';
import proceduresReducer from '../../features/procedures/slice';
import notificationsReducer from '../../features/notifications/slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    clients: clientsReducer,
    dashboard: dashboardReducer,
    cases: casesReducer,
    sessions: sessionsReducer,
    services: servicesReducer,
    procedures: proceduresReducer,
    notifications: notificationsReducer,
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