import { useQuery } from 'react-query';

import fetchPeople from '../queries/fetchPeople';

export const usePeople = () => {
  const { data, status } = useQuery('people', fetchPeople);

  return { data, status };
};
