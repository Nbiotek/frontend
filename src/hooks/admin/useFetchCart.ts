import { useCallback } from 'react';
import { superAdmin } from './FetchKeyFactory';
import { useQuery } from '@tanstack/react-query';

const select = (res: INBTServerResp<TCart>) => res.data;

export function useFetchCart(): IQueryHookResponse<TCart | undefined> {
  const meta = superAdmin.getCart();
  const memoizedSelect = useCallback(select, []);

  const { data, isLoading, status, error, refetch } = useQuery({
    queryKey: meta.keys(),
    meta,
    select: memoizedSelect
  });

  return { data, isLoading, status, error, refetch };
}
