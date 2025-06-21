import { useCallback } from 'react';
import { superAdmin } from './FetchKeyFactory';
import { useQuery } from '@tanstack/react-query';

const select = (res: INBTServerResp<TAdminChartRes>) => res.data;

export function useFetchPaymentChart(
  query: TChartQuery
): IQueryHookResponse<TAdminChartRes | undefined> {
  const meta = superAdmin.getPaymentChart(query);
  const memoizedSelect = useCallback(select, []);

  const { data, isLoading, status, error } = useQuery({
    queryKey: meta.keys(),
    meta,
    select: memoizedSelect
  });

  return { data, isLoading, status, error };
}
