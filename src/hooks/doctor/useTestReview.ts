import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FilterParams, doctorReviewTestService } from '@/requests/doctor';

export const useTestReview = (filterParams?: FilterParams) => {
  return useQuery<TDoctorTestReview>({
    queryKey: ['doctor-review-test', filterParams],
    queryFn: () => {
      // If filterParams is undefined, pass an empty object instead
      return doctorReviewTestService.getAllTestReview(filterParams);
    },
    // Add staleTime to prevent excessive refetching
    staleTime: 5 * 60 * 1000 // 5 minutes
  });
};

export const useTestRevDetails = (id: string) => {
  return useQuery<TTestRevDet>({
    queryKey: ['doctor-review-test-details', id],
    queryFn: () => doctorReviewTestService.getTestReviewById(id)
  });
};

export const useWriteRecommendation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, notes }: { id: string; notes: string }) =>
      doctorReviewTestService.writeRecommendation(id, notes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doctor-review-test'] });
    }
  });
};
