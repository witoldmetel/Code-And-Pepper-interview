import { INIT_CARD_TITLE } from 'src/constants';
import { convertToInteger } from 'src/utils/convertToInteger';
import { Character, Starship } from 'src/core/components/types';

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

const GameService = {
  getBattleResult
};

export default GameService;
