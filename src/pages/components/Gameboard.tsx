import { Container, Typography } from '@mui/material';

import { INIT_CARD_TITLE } from 'src/constants';
import { Playground } from 'src/core/components';

type GameboardProps = {
  selectedCard: INIT_CARD_TITLE;

  onPlayClick: (isGameActive: boolean) => void;
};

export function Gameboard({ selectedCard, onPlayClick }: GameboardProps) {
  return (
    <Container maxWidth="lg" component="main" sx={{ p: 5 }}>
      <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
        {`${selectedCard} Battle`}
      </Typography>

      <Playground type={selectedCard} onPlayClick={onPlayClick} />
    </Container>
  );
}
