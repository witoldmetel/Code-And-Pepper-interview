import { useQuery } from 'react-query';

import fetchPeople from 'src/queries/fetchPeople';

export const usePeople = (pageCount: number) => {
  const { data, isLoading, isError, isFetching, refetch } = useQuery(
    ['people', pageCount],
    () => fetchPeople(pageCount),
    {
      enabled: Boolean(pageCount)
    }
  );

  return { data, isLoading, isError, isFetching, refetch };
};
