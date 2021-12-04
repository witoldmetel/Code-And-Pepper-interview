import { useEffect, useState } from 'react';

import { Button, Container, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { GameCard } from '../GameCard';
import { INIT_CARD_TITLE } from 'src/constants';
import { usePeople } from 'src/hooks/usePeople';
import { getPageCount } from 'src/utils/getPageCount';
import { getRandomNumber } from 'src/utils/getRandomNumber';

type PlaygroundProps = {
  type: INIT_CARD_TITLE;

  onPlayClick: (isGameActive: boolean) => void;
};

export function Playground({ type, onPlayClick }: PlaygroundProps) {
  const classes = useStyles();
  const [pageCount, setPageCount] = useState(1);
  const { data, isLoading, isError, refetch } = usePeople(pageCount);

  useEffect(() => {
    if (data) {
      setPageCount(getPageCount(data.count));
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className={classes.wrapper}>
        <CircularProgress />
      </div>
    );
  }

  if (isError) {
    return (
      <div className={classes.wrapper}>
        <span>Cannot get cards. Please try again</span>
        <Button className={classes.button} variant="contained" onClick={() => refetch()}>
          Play Again
        </Button>
      </div>
    );
  }

  return (
    <Container maxWidth="lg" component="main" className={classes.root}>
      <div className={classes.cardsWrapper}>
        <GameCard {...data.results[getRandomNumber(data.results.length)]} />
        VS.
        <GameCard {...data.results[getRandomNumber(data.results.length)]} />
      </div>

      <div className={classes.actionsButton}>
        <Button className={classes.button} variant="contained" onClick={() => refetch()}>
          Play Again
        </Button>
        <Button className={classes.button} variant="contained" onClick={() => onPlayClick(false)}>
          Start New Game
        </Button>
      </div>
    </Container>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    padding: 40
  },
  cardsWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  actionsButton: {
    display: 'flex',
    justifyContent: 'center'
  },
  button: {
    margin: 15
  },
  wrapper: {
    width: '100%',
    height: '50vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));
