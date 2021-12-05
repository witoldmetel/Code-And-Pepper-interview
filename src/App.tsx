import { QueryClient, QueryClientProvider } from 'react-query';

import { ThemeConfig } from './core/theme';
import { Layout } from './core/layouts';
import MainPage from './pages/MainPage';
import { GameProvider } from './contexts/GameContext';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 5 * 60 * 1000
    }
  }
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GameProvider>
        <ThemeConfig>
          <Layout>
            <MainPage />
          </Layout>
        </ThemeConfig>
      </GameProvider>
      {/* react query for develop */}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}
