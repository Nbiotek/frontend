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
