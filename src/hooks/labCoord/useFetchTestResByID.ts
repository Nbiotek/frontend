import { useQuery } from '@tanstack/react-query';
import { labCoord } from './FetchKeyFactory';
import { useCallback } from 'react';

const select = (res: INBTServerResp<TSingleTestDetail>) => res.data;

export function useFetchTestResultByID(
  id: string
): IQueryHookResponse<TSingleTestDetail | undefined> {
  const meta = labCoord.getTestResultByID(id);
  const memoizedSelect = useCallback(select, []);

  const { data, isLoading, status, error } = useQuery({
    queryKey: meta.keys(),
    meta,
    enabled: Boolean(id),
    select: memoizedSelect
  });

  return { data, isLoading, status, error };
}
