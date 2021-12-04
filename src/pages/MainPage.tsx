import { useState } from 'react';

import { Dashboard } from './components/Dashboard';
import { Gameboard } from './components/Gameboard';
import { INIT_CARD_TITLE } from 'src/constants';

export default function MainPage() {
  const [selectedCard, setSelectedCard] = useState(INIT_CARD_TITLE.RANDOM);
  const [isGameActive, setIsGameActive] = useState(false);

  return isGameActive ? (
    <Gameboard selectedCard={selectedCard} onPlayClick={setIsGameActive} />
  ) : (
    <Dashboard selectedCard={selectedCard} setSelectedCard={setSelectedCard} onPlayClick={setIsGameActive} />
  );
}
