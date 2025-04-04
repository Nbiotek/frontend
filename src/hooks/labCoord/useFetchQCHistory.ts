import { useQuery } from '@tanstack/react-query';
import { labCoord } from './FetchKeyFactory';
import { useCallback } from 'react';

const select = (resp: INBTServerResp<INBTPaginatedData<TTestData>>) => resp.data;

export function useFetchQCHistory(
  query: Partial<TTestQuery>
): IQueryHookResponse<INBTPaginatedData<TTestData> | undefined> {
  const meta = labCoord.getLabCoordQCHistory(query);
  const memoizedSelect = useCallback(select, []);

  const { data, status, isLoading, error } = useQuery({
    queryKey: meta.keys(),
    meta,
    select: memoizedSelect
  });

  return { data, status, isLoading, error };
}
