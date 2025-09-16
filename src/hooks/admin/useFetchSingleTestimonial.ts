import { useCallback } from 'react';
import { superAdmin } from './FetchKeyFactory';
import { useQuery } from '@tanstack/react-query';

const select = (res: INBTServerResp<TAdminTestimonial>) => res.data;

export function useFetchSingleTestimonial(
  id: string
): IQueryHookResponse<TAdminTestimonial | undefined> {
  const meta = superAdmin.getTestimonialId(id);
  const memoizedSelect = useCallback(select, []);

  const { data, isLoading, status, error } = useQuery({
    queryKey: meta.keys(),
    meta,
    select: memoizedSelect,
    enabled: Boolean(id)
  });

  return { data, isLoading, status, error };
}
