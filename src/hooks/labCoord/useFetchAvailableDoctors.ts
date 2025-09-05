import { useCallback } from 'react';
import { labCoord } from './FetchKeyFactory';
import { useQuery } from '@tanstack/react-query';

const select = (res: INBTServerResp<TAvailableDoctorData>) => res.data;

export function useFetchAvailableDoctors(): IQueryHookResponse<TAvailableDoctorData | undefined> {
  const meta = labCoord.getAvailableDoctors();
  const memoizedSelect = useCallback(select, []);

  const { data, isLoading, status, error } = useQuery({
    queryKey: meta.keys(),
    meta,
    select: memoizedSelect
  });

  return { data, isLoading, status, error };
}
