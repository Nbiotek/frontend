import { useCallback } from 'react';
import { superAdmin } from './FetchKeyFactory';
import { useQuery } from '@tanstack/react-query';
import { IProductsPagedResponse } from '@/requests/ecommerce';

const select = (res: INBTServerResp<IProductsPagedResponse>) => res.data;

export function useFetchProducts(params?: {
  search?: string;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
  page?: number;
  limit?: number;
  categoryId?: string;
}): IQueryHookResponse<IProductsPagedResponse | undefined> {
  const meta = superAdmin.getProducts(params);
  const memoizedSelect = useCallback(select, []);

  const { data, isLoading, status, error } = useQuery({
    queryKey: meta.keys(),
    meta,
    select: memoizedSelect
  });

  return { data, isLoading, status, error };
}
