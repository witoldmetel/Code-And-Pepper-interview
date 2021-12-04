import { QueryClient, QueryClientProvider } from 'react-query';

import { ThemeConfig } from './core/theme';
import { Layout } from './core/layouts';
import MainPage from './pages/MainPage';

const queryClient = new QueryClient({
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
      <ThemeConfig>
        <Layout>
          <MainPage />
        </Layout>
      </ThemeConfig>
    </QueryClientProvider>
  );
}
