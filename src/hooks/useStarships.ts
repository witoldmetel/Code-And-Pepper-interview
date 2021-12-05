import { useQuery } from 'react-query';

import fetchStarships from 'src/queries/fetchStarships';

export const useStarships = () => {
  const { data, isLoading, isError, error } = useQuery('starships', fetchStarships);

  return { data, isLoading, isError, error };
};
