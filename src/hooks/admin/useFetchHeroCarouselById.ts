import { useCallback } from 'react';
import { superAdmin } from './FetchKeyFactory';
import { useQuery } from '@tanstack/react-query';

const select = (res: INBTServerResp<TAdminCarouselItem>) => res.data;

export function useFetchHeroCarouselById(
  id: string
): IQueryHookResponse<TAdminCarouselItem | undefined> {
  const meta = superAdmin.getHeroSectionId(id);
  const memoizedSelect = useCallback(select, []);

  const { data, isLoading, status, error } = useQuery({
    queryKey: meta.keys(),
    meta,
    select: memoizedSelect,
    enabled: !!id
  });

  return { data, isLoading, status, error };
}
