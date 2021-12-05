import { Box, Card, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { GameCardType } from '../types';
import { GameCardContent } from './GameCardContent';

type GameCardProps = GameCardType & { heading: string; counter: number; isWinner: boolean };

export function GameCard(props: GameCardProps) {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography component="div" variant="h5" gutterBottom align="center">
        <strong>{props.heading}</strong>
      </Typography>
      <Card className={classes.card} sx={{ border: `1px solid ${props.isWinner ? 'green' : 'red'}` }}>
        <GameCardContent {...props} />
      </Card>
      <Typography component="div" variant="h6" gutterBottom align="center">
        <strong>Score: </strong>
        {props.counter}
      </Typography>
    </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  card: {
    margin: 10
  },
  header: {
    textAlign: 'center',
    backgroundColor: theme.palette.grey[200]
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: 300,
    height: 300
  }
}));
