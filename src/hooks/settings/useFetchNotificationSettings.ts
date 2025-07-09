import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { settings } from './FetchFactoryKeys';

const select = (resp: INBTServerResp<TNotificationSettings>) => resp.data;

export function useFetchNotificationSettings(): IQueryHookResponse<
  TNotificationSettings | undefined
> {
  const meta = settings.getSettingsNotification();
  const memoizedSelect = useCallback(select, []);

  const { data, status, error, isLoading } = useQuery({
    queryKey: meta.keys(),
    meta,
    select: memoizedSelect
  });

  return { data, status, error, isLoading };
}
