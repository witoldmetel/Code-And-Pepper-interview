import { Container, Typography } from '@mui/material';

export function Gameboard() {
  return (
    <Container maxWidth="lg" component="main" sx={{ p: 5 }}>
      <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
        Game Board
      </Typography>
    </Container>
  );
}
