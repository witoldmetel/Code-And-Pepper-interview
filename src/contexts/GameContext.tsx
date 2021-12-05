import { createContext, ReactNode, useEffect } from 'react';

import { queryClient } from '../App';
import fetchPeople from 'src/queries/fetchPeople';
import fetchStarships from 'src/queries/fetchStarships';
import { GameContextType } from './types';

const GameContext = createContext<GameContextType | null>(null);

function GameProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    queryClient.prefetchQuery(['people', 1], () => fetchPeople(1));
    queryClient.prefetchQuery(['starships', 1], () => fetchStarships(1));
  }, []);

  return (
    <GameContext.Provider
      value={
        {
          // sendConfirmationEmail,
          // register,
          // login,
          // loginWithGoogle,
          // logout,
          // resetPassword
        }
      }
    >
      {children}
    </GameContext.Provider>
  );
}

export { GameContext, GameProvider };
