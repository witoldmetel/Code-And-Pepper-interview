import { useEffect, useState } from 'react';

import { Button, Container, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { GameCard } from '../GameCard';
import { useGameContext } from 'src/hooks/useGameContext';
import { getRandomNumber } from 'src/utils/getRandomNumber';
import { GameCardType } from '../types';
import { CharacterTemplate, INIT_CARD_TITLE, StarshipTemplate } from 'src/constants';

type PlaygroundProps = {
  onPlayClick: (isGameActive: boolean) => void;
};

export function Playground({ onPlayClick }: PlaygroundProps) {
  const classes = useStyles();
  const { selectedResource, gameData, getBattleResult, counter, setCounter } = useGameContext();
  const [firstPlayer, setFirstPlayer] = useState<GameCardType | null>(null);
  const [secondPlayer, setSecondPlayer] = useState<GameCardType | null>(null);
  const [battleResult, setBattleResult] = useState('');

  const playerTemplate = selectedResource === INIT_CARD_TITLE.CHARACTER ? CharacterTemplate : StarshipTemplate;
  const isPlayerWinner = (playerName: string) => battleResult.includes(playerName);

  //@todo: Add proper type
  const { data, isLoading, isError, refetch } = gameData as any;

  useEffect(() => {
    if (data) {
      if (!isPlayerWinner(firstPlayer?.name as string)) {
        setFirstPlayer(data.results[getRandomNumber(data?.results?.length ?? 10)] ?? playerTemplate);
      }

      if (!isPlayerWinner(secondPlayer?.name as string)) {
        setSecondPlayer(data.results[getRandomNumber(data?.results?.length ?? 10)] ?? playerTemplate);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (firstPlayer && secondPlayer) {
      const result = getBattleResult(firstPlayer, secondPlayer);

      setBattleResult(result);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstPlayer, secondPlayer]);

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
          heading="You"
          counter={counter.first}
          isWinner={isPlayerWinner(firstPlayer?.name as string)}
        />
        vs.
        <GameCard
          {...(secondPlayer as GameCardType)}
          heading="Computer"
          counter={counter.second}
          isWinner={isPlayerWinner(secondPlayer?.name as string)}
        />
      </div>
      <div className={classes.actionsButton}>
        <Button className={classes.button} variant="contained" onClick={onPlayAgainClick()}>
          Play Again
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          onClick={() => {
            onPlayClick(false);
            setCounter({ first: 0, second: 0 });
          }}
        >
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
