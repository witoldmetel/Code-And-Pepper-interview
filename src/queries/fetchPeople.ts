import { BASE_URL } from './constants';
import { getRandomNumber } from 'src/utils/getRandomNumber';

export default async function fetchPeople(pageCount: number) {
  const page = getRandomNumber(pageCount);
  const response = await fetch(`${BASE_URL}/people/?page=${page}`);

  return response.json();
}
