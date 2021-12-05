import { createContext, ReactNode, useEffect, useState } from 'react';

import { queryClient } from '../App';
import fetchPeople from 'src/queries/fetchPeople';
import { usePeople } from 'src/hooks/usePeople';
import { useStarships } from 'src/hooks/useStarships';
import fetchStarships from 'src/queries/fetchStarships';
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
  const [pageCount, setPageCount] = useState(1);
  console.log('file: GameContext.tsx ~ line 39 ~ GameProvider ~ pageCount', pageCount);
  const {
    data: peopleData,
    isLoading: isLoadingPeopleData,
    isError: isErrorPeopleData,
    refetch: refetchPeople
  } = usePeople(pageCount);
  const {
    data: starshipsData,
    isLoading: isLoadingStarshipsData,
    isError: isErrorStarshipsData,
    refetch: refetchStarships
  } = useStarships(pageCount);

  //@todo: Add proper type
  const [gameData, setGameData] = useState<any>(null);

  useEffect(() => {
    queryClient.prefetchQuery(['people', 1], () => fetchPeople(1));
    queryClient.prefetchQuery(['starships', 1], () => fetchStarships(1));
  }, []);

  useEffect(() => {
    if (getResource(resource) === INIT_CARD_TITLE.CHARACTER) {
      setGameData({
        data: peopleData,
        isLoading: isLoadingPeopleData,
        isError: isErrorPeopleData,
        refetch: refetchPeople
      });
    }

    if (getResource(resource) === INIT_CARD_TITLE.STARSHIP) {
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
    console.log(resource);
    if (getResource(resource) === INIT_CARD_TITLE.CHARACTER && peopleData) {
      setPageCount(getPageCount(peopleData.count));
    }

    if (getResource(resource) === INIT_CARD_TITLE.STARSHIP && starshipsData) {
      setPageCount(getPageCount(starshipsData.count));
    }
  }, [resource]);

  const getBattleResult = (
    type: INIT_CARD_TITLE,
    firstPlayer: Character | Starship,
    secondPlayer: Character | Starship
  ): string => {
    if (type === INIT_CARD_TITLE.CHARACTER) {
      const firstMass = convertToInteger((firstPlayer as Character).mass);
      const secondMass = convertToInteger((secondPlayer as Character).mass);

      if (isNaN(firstMass) || isNaN(secondMass)) {
        return 'Unknown result of the battle';
      }

      if (firstMass > secondMass) {
        return `The winner is ${firstPlayer.name}`;
      }

      if (firstMass < secondMass) {
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
        setResource,
        gameData,
        setPageCount,
        getBattleResult
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export { GameContext, GameProvider };
