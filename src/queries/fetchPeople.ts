import { BASE_URL } from './constants';
import { getRandomPage } from 'src/utils/getRandomPage';

export default async function fetchPeople(pageCount: number) {
  const page = getRandomPage(pageCount);
  const response = await fetch(`${BASE_URL}/people/?page=${page}`);

  return response.json();
}
