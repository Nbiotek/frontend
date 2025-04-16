import { useQuery } from '@tanstack/react-query';
import { labTech } from './FetchKeyFactory';
import { useCallback } from 'react';

function select(res: INBTServerResp<TTestQuesRes>) {
  return res.data;
}

export function useFetchTests(
  query: Partial<TTestQuery>
): IQueryHookResponse<TTestQuesRes | undefined> {
  const meta = labTech.getTestQueue(query);
  const memoizedSelect = useCallback(select, []);

  const { data, isLoading, error, status } = useQuery({
    queryKey: meta.keys(),
    meta,
    select: memoizedSelect
  });

  return { data, isLoading, error, status };
}
