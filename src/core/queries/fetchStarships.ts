import { ROOT_ENDPOINT } from './constants';

export default async function fetchStarships() {
  const res = await fetch(`${ROOT_ENDPOINT}/starships`);

  return res.json();
}
