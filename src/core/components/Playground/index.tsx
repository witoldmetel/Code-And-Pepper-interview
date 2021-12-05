import { useEffect, useState } from 'react';

import { Button, Container, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';

import GameService from 'src/services/GameService';
import { GameCard } from '../GameCard';
import { getPageCount } from 'src/utils/getPageCount';
import { getRandomNumber } from 'src/utils/getRandomNumber';

import { GameCardType } from '../types';
import { useGameContext } from 'src/hooks/useGameContext';

type PlaygroundProps = {
  onPlayClick: (isGameActive: boolean) => void;
};

export function Playground({ onPlayClick }: PlaygroundProps) {
  const classes = useStyles();
  const { resource, gameData, setPageCount } = useGameContext();
  console.log('file: index.tsx ~ line 21 ~ Playground ~ gameData', gameData);
  const [firstPlayer, setFirstPlayer] = useState<GameCardType | null>(null);
  const [secondPlayer, setSecondPlayer] = useState<GameCardType | null>(null);
  const [battleResult, setBattleResult] = useState('');

  const isPlayerWinner = (playerName: string) => battleResult.includes(playerName);

  const { data, isLoading, isError, refetch } = gameData;

  // useEffect(() => {
  //   setPageCount(getPageCount(data.count));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    if (firstPlayer && secondPlayer) {
      const result = GameService.getBattleResult(resource, firstPlayer, secondPlayer);

      setBattleResult(result);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstPlayer, secondPlayer]);

  useEffect(() => {
    if (data) {
      if (!isPlayerWinner(firstPlayer?.name as string)) {
        setFirstPlayer(data.results[getRandomNumber(data.results.length)]);
      }

      if (!isPlayerWinner(secondPlayer?.name as string)) {
        setSecondPlayer(data.results[getRandomNumber(data.results.length)]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onPlayAgainClick = () => () => refetch();

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
        <Button className={classes.button} variant="contained" onClick={() => onPlayAgainClick()}>
          Play Again
        </Button>
      </div>
    );
  }

  return (
    <Container maxWidth="lg" component="main" className={classes.root}>
      <h2 className={classes.result}>{battleResult}</h2>
      <div className={classes.cardsWrapper}>
        <GameCard
          {...(firstPlayer as GameCardType)}
          type={resource}
          isWinner={battleResult.includes(firstPlayer?.name as string)}
        />
        vs.
        <GameCard
          {...(secondPlayer as GameCardType)}
          type={resource}
          isWinner={battleResult.includes(secondPlayer?.name as string)}
        />
      </div>
      <div className={classes.actionsButton}>
        <Button className={classes.button} variant="contained" onClick={onPlayAgainClick()}>
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
    padding: 20
  },
  result: {
    textAlign: 'center'
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
