import { useCallback } from 'react';
import { labCoord } from './FetchKeyFactory';
import { useQuery } from '@tanstack/react-query';

const select = (res: INBTServerResp<TAvailableLabTechsData>) => res.data;

export function useFetchAvailableLabTechs(): IQueryHookResponse<
  TAvailableLabTechsData | undefined
> {
  const meta = labCoord.getAvailableLabTechs();
  const memoizedSelect = useCallback(select, []);

  const { data, isLoading, status, error } = useQuery({
    queryKey: meta.keys(),
    meta,
    select: memoizedSelect
  });

  return { data, isLoading, status, error };
}
