import { useCallback } from 'react';
import { recpst } from './FetchKeyFactory';
import { useQuery } from '@tanstack/react-query';

const select = (resp: INBTServerResp<TReceptionistDashboardResp>) => resp.data;

export function useFetchReceptdashboard(): IQueryHookResponse<
  TReceptionistDashboardResp | undefined
> {
  const meta = recpst.getDashboard();
  const memoizedSelect = useCallback(select, []);

  const { data, status, error, isLoading } = useQuery({
    queryKey: meta.keys(),
    meta,
    select: memoizedSelect
  });

  return { data, status, error, isLoading };
}
