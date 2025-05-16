import { useQuery } from '@tanstack/react-query';
import { labTech } from './FetchKeyFactory';
import { useCallback } from 'react';

function select(res: INBTServerResp<TLabTechDashboardRes>) {
  return res.data;
}

export function useFetchDashboard(): IQueryHookResponse<TLabTechDashboardRes | undefined> {
  const meta = labTech.getDashboard();
  const memoizedSelect = useCallback(select, []);

  const { data, isLoading, error, status } = useQuery({
    queryKey: meta.keys(),
    meta,
    select: memoizedSelect
  });

  return { data, isLoading, error, status };
}
