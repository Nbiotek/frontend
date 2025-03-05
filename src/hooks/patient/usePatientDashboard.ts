import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PatientDashboardService, PatientInfoService } from '@/requests/patient';

export const usePatientDashboard = () => {
  return useQuery<TPatientDashboard>({
    queryKey: ['patient-dashboard'],
    queryFn: PatientDashboardService
  });
};

export const usePatientInfo = () => {
  return useQuery<InfoApiResponse>({
    queryKey: ['patient-dashboard'],
    queryFn: PatientInfoService
  });
};
