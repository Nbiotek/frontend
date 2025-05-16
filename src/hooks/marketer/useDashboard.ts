import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { marketerDashboardService } from '@/requests/marketer';

export const useDashboard = () => {
  return useQuery<TFieldOfficerDashboard>({
    queryKey: ['marketer-dashboard'],
    queryFn: marketerDashboardService.getDashboardOverview
  });
};
