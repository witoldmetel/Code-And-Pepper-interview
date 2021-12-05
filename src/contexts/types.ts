import { INIT_CARD_TITLE } from 'src/constants';
import { Character, Starship } from 'src/core/components/types';

export type GameContextType = {
  resource: INIT_CARD_TITLE;
  selectedResource: INIT_CARD_TITLE;
  gameData: unknown;

  onResourceSelect: (resource: INIT_CARD_TITLE) => void;
  getBattleResult: (firstPlayer: Character | Starship, secondPlayer: Character | Starship) => string;
};
