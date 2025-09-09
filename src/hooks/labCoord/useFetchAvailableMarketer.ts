import { useCallback } from 'react';
import { labCoord } from './FetchKeyFactory';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getAvailableMarketers } from '@/requests/lab-coord';

const select = (res: INBTServerResp<TAvailableMarketerData>) => res.data;

export function useFetchAvailableMarketers(): IQueryHookResponse<
  TAvailableMarketerData | undefined
> {
  const meta = labCoord.getAvailableMarketers();
  const memoizedSelect = useCallback(select, []);

  const { data, isLoading, status, error } = useQuery({
    queryKey: meta.keys(),
    meta,
    select: memoizedSelect
  });

  return { data, isLoading, status, error };
}

export function useFetchInfiniteAvailableMarketers() {
  const meta = labCoord.getAvailableMarketers();

  const { data, isLoading, status, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<TAvailableMarketerData, Error>({
      queryKey: meta.keys(),
      queryFn: async ({ pageParam }) => {
        const response = await getAvailableMarketers(pageParam as number);
        return response.data.data;
      },
      initialPageParam: null,
      getNextPageParam: (lastPage: TAvailableMarketerData) => lastPage.nextCursor ?? undefined
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
