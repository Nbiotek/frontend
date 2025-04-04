import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { doctorReviewTestService } from '@/requests/doctor';

export const useTestReview = () => {
  return useQuery<TDoctorTestReview>({
    queryKey: ['doctor-review-test'],
    queryFn: doctorReviewTestService.getAllTestReview
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
