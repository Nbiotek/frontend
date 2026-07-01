import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { superAdmin } from './FetchKeyFactory';

const select = (res: INBTServerResp<TOrderItem[]>) => res.data;

export function useFetchAllOrders(): IQueryHookResponse<TOrderItem[] | undefined> {
  const meta = superAdmin.getAdminAllOrders();
  const memoizedSelect = useCallback(select, []);

  const { data, isLoading, status, error } = useQuery({
    queryKey: meta.keys(),
    meta,
    select: memoizedSelect
  });

  return { data, isLoading, status, error };
}
