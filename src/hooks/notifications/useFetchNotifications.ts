import { useCallback } from 'react';
import { notifications } from './fetchKeyFactory';
import { useQuery } from '@tanstack/react-query';
import { TGetAllNotificationRes, TPaginatedNotification } from '@/types/notification';

const select = (resp: TGetAllNotificationRes) => resp.data;

export function useFetchNotifications(): IQueryHookResponse<TPaginatedNotification | undefined> {
  const meta = notifications.getNotifications();
  const memoizedSelect = useCallback(select, []);

  const { data, status, error, isLoading } = useQuery({
    queryKey: meta.keys(),
    meta,
    select: memoizedSelect
  });

  return { data, status, error, isLoading };
}
