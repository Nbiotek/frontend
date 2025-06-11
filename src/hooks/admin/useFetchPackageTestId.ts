import { useCallback } from 'react';
import { superAdmin } from './FetchKeyFactory';
import { useQuery } from '@tanstack/react-query';

const select = (res: INBTServerResp<TAdminTestItem>) => res.data;

export function useFetchPackageTestId(id: string): IQueryHookResponse<TAdminTestItem | undefined> {
  const meta = superAdmin.getPackageTestById(id);
  const memoizedSelect = useCallback(select, []);

  const { data, isLoading, status, error } = useQuery({
    queryKey: meta.keys(),
    meta,
    select: memoizedSelect,
    enabled: Boolean(id)
  });

  return { data, isLoading, status, error };
}
