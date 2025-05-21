import { useCallback } from 'react';
import { recpst } from './FetchKeyFactory';
import { useQuery } from '@tanstack/react-query';

const select = (resp: INBTServerResp<TReceptAppointmentBase>) => resp.data;

export function useFetchSingleAppt(
  id: string
): IQueryHookResponse<TReceptAppointmentBase | undefined> {
  const meta = recpst.getReceptAppointmentBase(id);
  const memoizedSelect = useCallback(select, []);

  const { data, status, error, isLoading } = useQuery({
    queryKey: meta.keys(),
    meta,
    select: memoizedSelect,
    enabled: Boolean(id)
  });

  return { data, status, error, isLoading };
}
