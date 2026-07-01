import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { superAdmin } from './FetchKeyFactory';

const select = (res: INBTServerResp<TAdminBlogItem>) => res.data;

export function useFetchBlogById(id: string): IQueryHookResponse<TAdminBlogItem | undefined> {
  const meta = superAdmin.getBlogById(id);
  const memoizedSelect = useCallback(select, []);

  const { data, isLoading, status, error } = useQuery({
    queryKey: meta.keys(),
    meta,
    select: memoizedSelect,
    enabled: Boolean(id)
  });

  return { data, isLoading, status, error };
}
