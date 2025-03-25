import { useQuery } from '@tanstack/react-query';
import { labCoord } from './FetchKeyFactory';
import { useCallback } from 'react';

const select = (resp: INBTServerResp<Array<TInventoryItem>>) => resp.data;

export function useFetchInventory(
  query: Partial<TinventoryQuery>
): IQueryHookResponse<Array<TInventoryItem> | undefined> {
  const meta = labCoord.getLabInventory(query);
  const memoizedSelect = useCallback(select, []);

  const { data, status, isLoading, error } = useQuery({
    queryKey: meta.keys(),
    meta,
    select: memoizedSelect
  });

  return { data, status, isLoading, error };
}
