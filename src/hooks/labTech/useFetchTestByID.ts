import { useQuery } from '@tanstack/react-query';
import { labTech } from './FetchKeyFactory';
import { useCallback } from 'react';

const select = (res: INBTServerResp<TSingleTestDetail>) => res.data;

export function useFetchTestByID(id: string): IQueryHookResponse<TSingleTestDetail | undefined> {
  const meta = labTech.getTestByID(id);
  const memoizedSelect = useCallback(select, []);

  const { data, isLoading, status, error } = useQuery({
    queryKey: meta.keys(),
    meta,
    enabled: !!id,
    select: memoizedSelect
  });

  return { data, isLoading, status, error };
}
