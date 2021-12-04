import { ROOT_ENDPOINT } from './constants';

export default async function fetchPeople() {
  const res = await fetch(`${ROOT_ENDPOINT}/people`);

  return res.json();
}
