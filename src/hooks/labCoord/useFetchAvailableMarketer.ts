import { useCallback } from 'react';
import { labCoord } from './FetchKeyFactory';
import { useQuery } from '@tanstack/react-query';

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
