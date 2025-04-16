import { useQuery } from '@tanstack/react-query';
import { labCoord } from './FetchKeyFactory';
import { useCallback } from 'react';

const select = (resp: INBTServerResp<TStaffShiftsRes>) => resp.data;

export function useFetchStaffShift(): IQueryHookResponse<TStaffShiftsRes | undefined> {
  const meta = labCoord.getStaffShifts();

  const memoizedSelect = useCallback(select, []);

  const { data, isLoading, status, error } = useQuery({
    queryKey: meta.Keys(),
    meta,
    select: memoizedSelect
  });

  return { data, isLoading, status, error };
}
