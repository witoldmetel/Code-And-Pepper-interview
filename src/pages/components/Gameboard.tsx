import { Container, Typography } from '@mui/material';

import { Playground } from 'src/core/components';
import { useGameContext } from 'src/hooks/useGameContext';

type GameboardProps = {
  onPlayClick: (isGameActive: boolean) => void;
};

export function Gameboard({ onPlayClick }: GameboardProps) {
  const { selectedResource } = useGameContext();

  return (
    <Container maxWidth="lg" component="main" sx={{ p: 5 }}>
      <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
        {`${selectedResource} Battle`}
      </Typography>

      <Playground onPlayClick={onPlayClick} />
    </Container>
  );
}
