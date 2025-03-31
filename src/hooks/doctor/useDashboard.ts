import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { doctorDashboardService } from '@/requests/doctor';

export const useDashboard = () => {
  return useQuery<TDoctorDashboard>({
    queryKey: ['doctor-dashboard'],
    queryFn: doctorDashboardService.getDashboardOverview
  });
};
