import { Container, Typography } from '@mui/material';

import { ThemeConfig } from './core/theme';
import { Layout } from './core/layouts';

export function App() {
  return (
    <ThemeConfig>
      <Layout>
        <Container disableGutters maxWidth="lg" component="main" sx={{ p: 5 }}>
          <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
            Star Wars Card Game
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" component="p">
            Choose one of the resources and participate in the galactic battle!
          </Typography>
        </Container>
      </Layout>
    </ThemeConfig>
  );
}
