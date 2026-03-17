import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { superAdmin } from './FetchKeyFactory';

const select = (res: INBTServerResp<TAdminTestimonialLandingResp>) => res.data;

export function useFetchTestimonialsLanding(): IQueryHookResponse<
  TAdminTestimonialLandingResp | undefined
> {
  const meta = superAdmin.getTestimonialsLanding();
  const memoizedSelect = useCallback(select, []);

  const { data, isLoading, status, error } = useQuery({
    queryKey: meta.keys(),
    meta,
    select: memoizedSelect
  });

  return { data, isLoading, status, error };
}
