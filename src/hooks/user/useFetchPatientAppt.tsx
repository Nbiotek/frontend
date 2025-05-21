import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { user } from './FetchKeyFactory';

const select = (resp: INBTServerResp<TPatientApptResp>) => resp.data;

export function useFetchPatientAppt(id: string): IQueryHookResponse<TPatientApptResp | undefined> {
  const meta = user.getSinglePatientAppt(id);
  const memoizedSelect = useCallback(select, []);

  const { data, status, error, isLoading } = useQuery({
    queryKey: meta.keys(),
    meta,
    select: memoizedSelect
  });

  return { data, status, error, isLoading };
}
