import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { BillingService } from '@/requests/billing';

export const useBillingHistory = () => {
  return useQuery<BillingHistory>({
    queryKey: ['transaction-history'],
    queryFn: BillingService.getBillingHistory
  });
};
