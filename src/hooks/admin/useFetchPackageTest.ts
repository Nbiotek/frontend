import { useCallback } from 'react';
import { superAdmin } from './FetchKeyFactory';
import { useQuery } from '@tanstack/react-query';

const select = (res: INBTServerResp<INBTPaginatedData<TAdminTestItem>>) => res.data;

export function useFetchPackageTest(
  query: Partial<TAdminTestQuery>
): IQueryHookResponse<INBTPaginatedData<TAdminTestItemBase> | undefined> {
  const meta = superAdmin.getPackageTest(query);
  const memoizedSelect = useCallback(select, []);

  const { data, isLoading, status, error } = useQuery({
    queryKey: meta.keys(),
    meta,
    select: memoizedSelect
  });

  return { data, isLoading, status, error };
}
