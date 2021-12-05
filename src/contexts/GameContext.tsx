import { createContext, ReactNode, useEffect, useState } from 'react';

import { queryClient } from '../App';
import fetchPeople from 'src/queries/fetchPeople';
import { usePeople } from 'src/hooks/usePeople';
import fetchStarships from 'src/queries/fetchStarships';
import { GameContextType } from './types';
import { INIT_CARD_TITLE } from 'src/constants';
import { getPageCount } from 'src/utils/getPageCount';

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
  const {
    data: peopleData,
    isLoading: isLoadingPeopleData,
    isError: isErrorPeopleData,
    refetch: refetchPeople
  } = usePeople(pageCount);

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

      if (peopleData) {
        setPageCount(getPageCount(peopleData.count));
      }
    }

    if (getResource(resource) === INIT_CARD_TITLE.STARSHIP) {
      setGameData({
        data: peopleData,
        isLoading: isLoadingPeopleData,
        isError: isErrorPeopleData,
        refetch: refetchPeople
      });

      if (peopleData) {
        setPageCount(getPageCount(peopleData.count));
      }
    }
  }, [peopleData]);

  return (
    <GameContext.Provider
      value={{
        resource,
        setResource,
        gameData,
        setPageCount
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export { GameContext, GameProvider };
