import { useState } from 'react';

import { Container, Typography, Grid, Button } from '@mui/material';

import { InitCard, InitCardProps } from 'src/core/components';
import { initCards, INIT_CARD_TITLE } from 'src/constants';

export function Dashboard() {
  const [selectedCard, setSelectedCard] = useState(INIT_CARD_TITLE.RANDOM);

  return (
    <Container maxWidth="lg" component="main" sx={{ p: 5 }}>
      <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
        Star Wars Card Game
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary" component="p">
        Choose one of the resources and participate in the galactic battle!
      </Typography>
      <Grid container spacing={5} alignItems="flex-start" sx={{ p: 5 }}>
        {initCards.map((card: Pick<InitCardProps, 'title' | 'icon' | 'description'>) => (
          <InitCard
            key={card.title}
            {...card}
            selectedCard={selectedCard}
            onClick={(cardTitle: INIT_CARD_TITLE) => setSelectedCard(cardTitle)}
          />
        ))}
      </Grid>
      <Button variant="contained">Play</Button>
    </Container>
  );
}
