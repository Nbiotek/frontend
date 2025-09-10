import { useCallback } from 'react';
import { labCoord } from './FetchKeyFactory';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getAvailableDoctors } from '@/requests/lab-coord';

const select = (res: INBTServerResp<TAvailableDoctorData>) => res.data;

export function useFetchAvailableDoctors(): IQueryHookResponse<TAvailableDoctorData | undefined> {
  const meta = labCoord.getAvailableDoctors();
  const memoizedSelect = useCallback(select, []);

  const { data, isLoading, status, error } = useQuery({
    queryKey: meta.keys(),
    meta,
    select: memoizedSelect
  });

  return { data, isLoading, status, error };
}

export function useFetchInfiniteAvailableDoctors() {
  const meta = labCoord.getAvailableDoctors();

  const { data, isLoading, status, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<TAvailableDoctorData, Error>({
      queryKey: meta.keys(),
      queryFn: async ({ pageParam }) => {
        const response = await getAvailableDoctors(pageParam as number);
        return response.data.data;
      },
      initialPageParam: null,
      getNextPageParam: (lastPage: TAvailableDoctorData) => lastPage.nextCursor ?? undefined
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
