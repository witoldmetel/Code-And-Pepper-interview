import { useEffect, useState } from 'react';

import { Button, Container, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';

import GameService from 'src/services/GameService';
import { GameCard } from '../GameCard';
import { usePeople } from 'src/hooks/usePeople';
import { getPageCount } from 'src/utils/getPageCount';
import { getRandomNumber } from 'src/utils/getRandomNumber';
import { INIT_CARD_TITLE } from 'src/constants';
import { GameCardType } from '../types';

type PlaygroundProps = {
  type: INIT_CARD_TITLE;

  onPlayClick: (isGameActive: boolean) => void;
};

export function Playground({ type, onPlayClick }: PlaygroundProps) {
  const classes = useStyles();
  const [pageCount, setPageCount] = useState(1);
  const { data, isLoading, isError, refetch } = usePeople(pageCount);
  const [firstPlayer, setFirstPlayer] = useState<GameCardType | null>(null);
  const [secondPlayer, setSecondPlayer] = useState<GameCardType | null>(null);
  const [battleResult, setBattleResult] = useState('');

  const isPlayerWinner = (playerName: string) => battleResult.includes(playerName);

  useEffect(() => {
    if (firstPlayer && secondPlayer) {
      const result = GameService.getBattleResult(type, firstPlayer, secondPlayer);

      setBattleResult(result);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstPlayer, secondPlayer]);

  useEffect(() => {
    if (data) {
      setPageCount(getPageCount(data.count));

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
          type={type}
          isWinner={battleResult.includes(firstPlayer?.name as string)}
        />
        vs.
        <GameCard
          {...(secondPlayer as GameCardType)}
          type={type}
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
