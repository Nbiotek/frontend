import { useQuery, useMutation, useQueryClient, QueryClient } from '@tanstack/react-query';
import { doctorReferralsService } from '@/requests/doctor';

export const useDoctorReferral = () => {
  return useQuery<TPatientReffered>({
    queryKey: ['doctor-appointment'],
    queryFn: doctorReferralsService.getAllPatientReffered
  });
};
