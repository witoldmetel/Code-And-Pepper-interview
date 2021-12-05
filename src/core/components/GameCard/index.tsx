import { Card, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { GameCardType } from '../types';
import { GameCardContent } from './GameCardContent';

type GameCardProps = GameCardType & { isWinner: boolean };

export function GameCard(props: GameCardProps) {
  const classes = useStyles();

  return (
    <Card className={classes.root} sx={{ border: `1px solid ${props.isWinner ? 'green' : 'red'}` }}>
      <GameCardContent {...props} />
    </Card>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
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
