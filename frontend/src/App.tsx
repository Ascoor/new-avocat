
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { store } from './app/store';
import AppRouter from './app/router';
import { useAuthInit } from './features/auth/hooks';
import { LoadingSpinner } from './shared/components/Spinner';
import { ErrorBoundary } from './components/common/ErrorBoundary';

// i18n
import './i18n';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (renamed from cacheTime)
    },
  },
});

// App initialization component
const AppInitializer: React.FC = () => {
  const { isInitialized } = useAuthInit();

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <LoadingSpinner size="lg" text="Loading Avocat Legal System..." />
          <p className="mt-4 text-gray-600 dark:text-gray-400">⚖️ Initializing Legal Intelligence</p>
        </div>
      </div>
    );
  }

  return <AppRouter />;
};

const App = () => (
  <ErrorBoundary>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <BrowserRouter>
            <AppInitializer />
          </BrowserRouter>
          
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </QueryClientProvider>
    </Provider>
  </ErrorBoundary>
);

export default App;
