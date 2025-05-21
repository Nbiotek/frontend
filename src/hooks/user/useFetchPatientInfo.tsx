import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { user } from './FetchKeyFactory';

const select = (resp: INBTServerResp<TPatientInfoResp>) => resp.data;

export function useFetchPatientInfo(id: string): IQueryHookResponse<TPatientInfoResp | undefined> {
  const meta = user.getSinglePatientInfo(id);
  const memoizedSelect = useCallback(select, []);

  const { data, status, error, isLoading } = useQuery({
    queryKey: meta.keys(),
    meta,
    select: memoizedSelect
  });

  return { data, status, error, isLoading };
}
