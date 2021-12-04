import { QueryClient, QueryClientProvider } from 'react-query';

import { ThemeConfig } from './core/theme';
import { Layout } from './core/layouts';
import MainPage from './pages/MainPage';

const queryClient = new QueryClient();

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
