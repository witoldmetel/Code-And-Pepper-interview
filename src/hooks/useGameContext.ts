import { useContext } from 'react';

import { GameContext } from 'src/contexts/GameContext';

export const useGameContext = () => {
  const context = useContext(GameContext);

  if (!context) throw new Error('Game context must be use inside GameProvider');

  return context;
};
