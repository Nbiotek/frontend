import { useQuery } from '@tanstack/react-query';
import { user } from './FetchKeyFactory';
import { useCallback } from 'react';

function select(resp: INBTServerResp<TProfileInfo>) {
  return resp.data;
}

export function useFetchProfile(disabled?: boolean): IQueryHookResponse<TProfileInfo | undefined> {
  const meta = user.getProfile();
  const memoizedSelect = useCallback(select, []);

  const { data, isLoading, error, status } = useQuery({
    queryKey: meta.keys(),
    meta,
    enabled: !disabled,
    select: memoizedSelect
  });

  return { data, isLoading, error, status };
}
