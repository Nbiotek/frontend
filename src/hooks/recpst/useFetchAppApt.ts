import { useCallback } from 'react';
import { recpst } from './FetchKeyFactory';
import { useQuery } from '@tanstack/react-query';

const select = (resp: INBTServerResp<TAppointmentResp>) => resp.data;

export function useFetchAprvdAppt(
  query: Omit<Partial<TAppointmentQuery>, 'status'>
): IQueryHookResponse<TAppointmentResp | undefined> {
  const meta = recpst.getApprovedAppointments(query);
  const memoizedSelect = useCallback(select, []);

  const { data, status, error, isLoading } = useQuery({
    queryKey: meta.keys(),
    meta,
    select: memoizedSelect
  });

  return { data, status, error, isLoading };
}
