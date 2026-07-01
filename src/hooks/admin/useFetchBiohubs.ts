import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { superAdmin } from './FetchKeyFactory';

const select = (res: INBTServerResp<TAdminBiohubResp>) => res.data;

export function useFetchBiohubs(
  query?: Partial<TGeneralPaginatedQuery>
): IQueryHookResponse<TAdminBiohubResp | undefined> {
  const meta = superAdmin.getBiohubs(query);
  const memoizedSelect = useCallback(select, []);

  const { data, isLoading, status, error } = useQuery({
    queryKey: meta.keys(),
    meta,
    select: memoizedSelect
  });

  return { data, isLoading, status, error };
}
