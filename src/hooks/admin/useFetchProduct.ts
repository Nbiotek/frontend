import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { superAdmin } from './FetchKeyFactory';

const select = (res: INBTServerResp<TProductItem>) => res.data;

export function useFetchProduct(id: string | null) {
  const meta = id ? superAdmin.getProductById(id) : null;
  const memoizedSelect = useCallback(select, []);

  return useQuery({
    queryKey: meta?.keys() ?? ['product', null],
    meta: meta ?? undefined,
    enabled: !!id,
    select: memoizedSelect
  });
}
