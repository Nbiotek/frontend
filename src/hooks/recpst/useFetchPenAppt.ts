import { useCallback } from 'react';
import { recpst } from './FetchKeyFactory';
import { useQuery } from '@tanstack/react-query';

const select = (resp: INBTServerResp<TAppointmentResp>) => resp.data;

export function useFetchPendAppt(
  query: Omit<Partial<TAppointmentQuery>, 'status' | 'month'>
): IQueryHookResponse<TAppointmentResp | undefined> {
  const meta = recpst.getPendingAppointments(query);
  const memoizedSelect = useCallback(select, []);

  const { data, status, error, isLoading } = useQuery({
    queryKey: meta.keys(),
    meta,
    select: memoizedSelect
  });

  return { data, status, error, isLoading };
}
