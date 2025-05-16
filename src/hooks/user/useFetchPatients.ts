import { useQuery } from '@tanstack/react-query';
import { user } from './FetchKeyFactory';
import { useCallback } from 'react';

function select(resp: INBTServerResp<TReceptAllPatientRes>) {
  return resp.data;
}

export function useFetchPatients(
  query: TGeneralPaginatedQuery
): IQueryHookResponse<TReceptAllPatientRes | undefined> {
  const meta = user.getPatients(query);
  const memoizedSelect = useCallback(select, []);

  const { data, isLoading, error, status } = useQuery({
    queryKey: meta.keys(),
    meta,
    enabled: true,
    select: memoizedSelect
  });

  return { data, isLoading, error, status };
}
