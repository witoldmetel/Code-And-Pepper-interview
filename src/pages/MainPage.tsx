import { useState } from 'react';

import { Dashboard } from './components/Dashboard';
import { Gameboard } from './components/Gameboard';

export default function MainPage() {
  const [isGameActive, setIsGameActive] = useState(false);

  return isGameActive ? <Gameboard onPlayClick={setIsGameActive} /> : <Dashboard onPlayClick={setIsGameActive} />;
}
