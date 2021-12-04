import { BASE_URL } from './constants';

export default async function fetchStarships() {
  const result = await fetch(`${BASE_URL}/starships/`);

  return result.json();
}
