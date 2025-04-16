import { useQuery, useMutation, useQueryClient, QueryClient } from '@tanstack/react-query';
import { doctorReferralsService, FilterParams } from '@/requests/doctor';

export const useDoctorReferral = (filterParams?: FilterParams) => {
  return useQuery<TPatientReffered>({
    queryKey: ['doctor-referrals', filterParams],
    queryFn: () => doctorReferralsService.getAllPatientReffered(filterParams || {}),
    staleTime: 5 * 60 * 1000 // 5 minutes
  });
};
