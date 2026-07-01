import { useCallback } from 'react';
import { superAdmin } from './FetchKeyFactory';
import { useQuery } from '@tanstack/react-query';

const select = (res: INBTServerResp<TAdminBlogCategoryResp>) => res.data;

export function useFetchBlogCategories(
  query?: Partial<TGeneralPaginatedQuery>
): IQueryHookResponse<TAdminBlogCategoryResp | undefined> {
  const meta = superAdmin.getBlogCategories(query);
  const memoizedSelect = useCallback(select, []);

  const { data, isLoading, status, error } = useQuery({
    queryKey: meta.keys(),
    meta,
    select: memoizedSelect
  });

  return { data, isLoading, status, error };
}
