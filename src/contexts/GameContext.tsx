import { createContext, ReactNode, useEffect, useState } from 'react';

import { usePeople } from 'src/hooks/usePeople';
import { useStarships } from 'src/hooks/useStarships';
import { GameContextType } from './types';
import { INIT_CARD_TITLE } from 'src/constants';
import { getPageCount } from 'src/utils/getPageCount';
import { Character, Starship } from 'src/core/components/types';
import { convertToInteger } from 'src/utils/convertToInteger';

function getResource(type: INIT_CARD_TITLE) {
  let resource;

  switch (type) {
    case INIT_CARD_TITLE.CHARACTER:
      resource = INIT_CARD_TITLE.CHARACTER;
      break;
    case INIT_CARD_TITLE.STARSHIP:
      resource = INIT_CARD_TITLE.STARSHIP;
      break;
    case INIT_CARD_TITLE.RANDOM:
      resource = [INIT_CARD_TITLE.CHARACTER, INIT_CARD_TITLE.STARSHIP][Math.floor(Math.random() * 2)];
      break;
    default:
      resource = INIT_CARD_TITLE.CHARACTER;
  }

  return resource;
}

const GameContext = createContext<GameContextType | null>(null);

function GameProvider({ children }: { children: ReactNode }) {
  const [resource, setResource] = useState(INIT_CARD_TITLE.RANDOM);
  // selected resource is used to set proper game
  const [selectedResource, setSelectedResource] = useState(INIT_CARD_TITLE.RANDOM);
  const [peoplePageCount, setPeoplePageCount] = useState(1);
  const {
    data: peopleData,
    isLoading: isLoadingPeopleData,
    isError: isErrorPeopleData,
    refetch: refetchPeople
  } = usePeople(peoplePageCount);
  const [starshipPageCount, setStarshipPageCount] = useState(1);
  const {
    data: starshipsData,
    isLoading: isLoadingStarshipsData,
    isError: isErrorStarshipsData,
    refetch: refetchStarships
  } = useStarships(starshipPageCount);

  //@todo: Add proper type
  const [gameData, setGameData] = useState<any>(null);
  const [counter, setCounter] = useState<{ first: number; second: number }>({ first: 0, second: 0 });

  useEffect(() => {
    if (selectedResource === INIT_CARD_TITLE.CHARACTER) {
      setGameData({
        data: peopleData,
        isLoading: isLoadingPeopleData,
        isError: isErrorPeopleData,
        refetch: refetchPeople
      });
    }

    if (selectedResource === INIT_CARD_TITLE.STARSHIP) {
      setGameData({
        data: starshipsData,
        isLoading: isLoadingStarshipsData,
        isError: isErrorStarshipsData,
        refetch: refetchStarships
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resource, peopleData, starshipsData]);

  useEffect(() => {
    if (selectedResource === INIT_CARD_TITLE.CHARACTER && peopleData) {
      setPeoplePageCount(getPageCount(peopleData.count));
    }

    if (selectedResource === INIT_CARD_TITLE.STARSHIP && starshipsData) {
      setStarshipPageCount(getPageCount(starshipsData.count));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resource]);

  const onResourceSelect = (resource: INIT_CARD_TITLE) => {
    setResource(resource);
    setSelectedResource(getResource(resource));
  };

  const getBattleResult = (firstPlayer: Character | Starship, secondPlayer: Character | Starship): string => {
    if (selectedResource === INIT_CARD_TITLE.CHARACTER) {
      const firstMass = convertToInteger((firstPlayer as Character).mass);
      const secondMass = convertToInteger((secondPlayer as Character).mass);

      if (isNaN(firstMass) || isNaN(secondMass)) {
        return 'Unknown result of the battle';
      }

      if (firstMass > secondMass) {
        setCounter({ ...counter, first: counter.first + 1 });

        return `The winner is ${firstPlayer.name}`;
      }

      if (firstMass < secondMass) {
        setCounter({ ...counter, second: counter.second + 1 });

        return `The winner is ${secondPlayer.name}`;
      }

      return 'We have draw!';
    }

    if (selectedResource === INIT_CARD_TITLE.STARSHIP) {
      const firstCrew = convertToInteger((firstPlayer as Starship).crew);
      const secondCrew = convertToInteger((secondPlayer as Starship).crew);

      if (isNaN(firstCrew) || isNaN(secondCrew)) {
        return 'Unknown result of the battle';
      }

      if (firstCrew > secondCrew) {
        setCounter({ ...counter, first: counter.first + 1 });

        return `The winner is ${firstPlayer.name}`;
      }

      if (firstCrew < secondCrew) {
        setCounter({ ...counter, second: counter.second + 1 });

        return `The winner is ${secondPlayer.name}`;
      }

      return 'We have draw!';
    }

    return 'Something went wrong';
  };

  return (
    <GameContext.Provider
      value={{
        resource,
        selectedResource,
        onResourceSelect,
        gameData,
        getBattleResult,
        counter,
        setCounter
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export { GameContext, GameProvider };
