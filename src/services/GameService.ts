import { INIT_CARD_TITLE } from 'src/constants';
import { convertToInteger } from 'src/utils/convertToInteger';

const getBattleResult = (type: INIT_CARD_TITLE, firstPlayer: any, secondPlayer: any): string => {
  if (type === INIT_CARD_TITLE.CHARACTER) {
    const firstMass = convertToInteger(firstPlayer.mass);
    const secondMass = convertToInteger(secondPlayer.mass);

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
