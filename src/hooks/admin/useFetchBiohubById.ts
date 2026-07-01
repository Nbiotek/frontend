import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { superAdmin } from './FetchKeyFactory';

const select = (res: INBTServerResp<TAdminBiohubItem>) => res.data;

export function useFetchBiohubById(id: string): IQueryHookResponse<TAdminBiohubItem | undefined> {
  const meta = superAdmin.getBiohubById(id);
  const memoizedSelect = useCallback(select, []);

  const { data, isLoading, status, error } = useQuery({
    queryKey: meta.keys(),
    meta,
    select: memoizedSelect,
    enabled: Boolean(id)
  });

  return { data, isLoading, status, error };
}
