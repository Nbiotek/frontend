import { useQuery } from '@tanstack/react-query';
import { labCoord } from './FetchKeyFactory';
import { useCallback } from 'react';

export function useFetchStaffShift() {
  const meta = labCoord.getStaffShifts();

  const { data, isLoading, status, error } = useQuery({
    queryKey: meta.Keys(),
    meta
  });

  return { data, isLoading, status, error };
}
