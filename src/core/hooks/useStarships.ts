import { useQuery } from 'react-query';

import fetchStarships from '../queries/fetchStarships';

export const useStarships = () => {
  const { data, status } = useQuery('starships', fetchStarships);

  return { data, status };
};
