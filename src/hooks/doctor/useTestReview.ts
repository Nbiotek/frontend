import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { doctorReviewTestService } from '@/requests/doctor';

export const useTestReview = () => {
  return useQuery<TDoctorTestReview>({
    queryKey: ['doctor-review-test'],
    queryFn: doctorReviewTestService.getAllTestReview
  });
};
