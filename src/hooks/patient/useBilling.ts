import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { BillingFilterParams, BillingService } from '@/requests/billing';

export const useBillingHistory = (filterParams?: BillingFilterParams) => {
  return useQuery<BillingHistory>({
    queryKey: ['transaction-history', filterParams],
    queryFn: () => BillingService.getBillingHistory(filterParams),
    // Add staleTime to prevent excessive refetching
    staleTime: 5 * 60 * 1000 // 5 minutes
  });
};
