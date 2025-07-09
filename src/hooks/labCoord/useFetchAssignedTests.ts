import { useQuery } from '@tanstack/react-query';
import { labCoord } from './FetchKeyFactory';
import { useCallback } from 'react';

function select(res: INBTServerResp<TTestQuesRes>) {
  return res.data;
}

export function useFetchAssignedTests(
  query: Partial<TTestQuery>
): IQueryHookResponse<TTestQuesRes | undefined> {
  const meta = labCoord.getAssignedTests(query);
  const memoizedSelect = useCallback(select, []);

  const { data, isLoading, error, status } = useQuery({
    queryKey: meta.keys(),
    meta,
    select: memoizedSelect
  });

  return { data, isLoading, error, status };
}
