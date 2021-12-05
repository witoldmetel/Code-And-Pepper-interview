import { INIT_CARD_TITLE } from 'src/constants';
import { Character, Starship } from 'src/core/components/types';

export type GameContextType = {
  resource: INIT_CARD_TITLE;
  selectedResource: INIT_CARD_TITLE;
  gameData: unknown;
  counter: { first: number; second: number };

  onResourceSelect: (resource: INIT_CARD_TITLE) => void;
  getBattleResult: (firstPlayer: Character | Starship, secondPlayer: Character | Starship) => string;
  setCounter: (counter: { first: number; second: number }) => void;
};
