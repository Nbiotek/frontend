import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PatientDashboardService } from '@/requests/patient';

export const usePatientDashboard = () => {
  return useQuery<TPatientDashboard>({
    queryKey: ['patient-dashboard'],
    queryFn: PatientDashboardService
  });
};
