import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { settings } from './FetchFactoryKeys';

const select = (resp: INBTServerResp<TProfileSettings>) => resp.data;

export function useFetchProfileSettings(): IQueryHookResponse<TProfileSettings | undefined> {
  const meta = settings.getSettingsProfile();
  const memoizedSelect = useCallback(select, []);

  const { data, status, error, isLoading } = useQuery({
    queryKey: meta.keys(),
    meta,
    select: memoizedSelect
  });

  return { data, status, error, isLoading };
}
