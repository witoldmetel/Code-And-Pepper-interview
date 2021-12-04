import { ThemeConfig } from './core/theme';
import { Layout } from './core/layouts';

import DashboardPage from './pages/DashboardPage';

export function App() {
  return (
    <ThemeConfig>
      <Layout>
        <DashboardPage />
      </Layout>
    </ThemeConfig>
  );
}
