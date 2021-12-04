import { Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

import { InitCard } from '../core/components';
import { initCards } from '../constants';

export default function DashboardPage() {
  return (
    <>
      <Container maxWidth="lg" component="main" sx={{ p: 5 }}>
        <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
          Star Wars Card Game
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" component="p">
          Choose one of the resources and participate in the galactic battle!
        </Typography>
        <Grid container spacing={5} alignItems="flex-start" sx={{ p: 5 }}>
          {initCards.map((card) => (
            <InitCard key={card.title} {...card} />
          ))}
        </Grid>
      </Container>
    </>
  );
}
