import { useCallback } from 'react';
import { labCoord } from './FetchKeyFactory';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getAvailableLabTechs } from '@/requests/lab-coord';

const select = (res: INBTServerResp<TAvailableLabTechsData>) => res.data;

export function useFetchAvailableLabTechs(): IQueryHookResponse<
  TAvailableLabTechsData | undefined
> {
  const meta = labCoord.getAvailableLabTechs();
  const memoizedSelect = useCallback(select, []);

  const { data, isLoading, status, error } = useQuery({
    queryKey: meta.keys(),
    meta,
    select: memoizedSelect
  });

  return { data, isLoading, status, error };
}

export function useFetchInfiniteAvailableLabTechs() {
  const meta = labCoord.getAvailableLabTechs();

  const { data, isLoading, status, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<TAvailableLabTechsData, Error>({
      queryKey: meta.keys(),
      queryFn: async ({ pageParam }) => {
        const response = await getAvailableLabTechs(pageParam as number);
        return response.data.data;
      },
      initialPageParam: null,
      getNextPageParam: (lastPage: TAvailableLabTechsData) => lastPage.nextCursor ?? undefined
    });

  return {
    data,
    isLoading,
    status,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  };
}
