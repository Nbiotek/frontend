import { useCallback } from 'react';
import { superAdmin } from './FetchKeyFactory';
import { useQuery } from '@tanstack/react-query';

const select = (res: INBTServerResp<Array<TAdminUsersItem>>) => res.data;

export function useFetchUsers(
  query: Partial<TGeneralPaginatedQuery>
): IQueryHookResponse<Array<TAdminUsersItem> | undefined> {
  const meta = superAdmin.getUsers(query);
  const memoizedSelect = useCallback(select, []);

  const { data, isLoading, status, error } = useQuery({
    queryKey: meta.keys(),
    meta,
    select: memoizedSelect
  });

  return { data, isLoading, status, error };
}
