import { useCallback } from 'react';
import { labCoord } from './FetchKeyFactory';
import { useQuery } from '@tanstack/react-query';

const select = (res: INBTServerResp<TDashboardData>) => res.data;

export function useFetchDashboard(): IQueryHookResponse<TDashboardData | undefined> {
  const meta = labCoord.getDashboard();
  const memoizedSelect = useCallback(select, []);

  const { data, isLoading, status, error } = useQuery({
    queryKey: meta.keys(),
    meta,
    select: memoizedSelect
  });

  return { data, isLoading, status, error };
}
