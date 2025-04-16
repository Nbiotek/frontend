import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { TestResultFilterParams, TestResultService } from '@/requests/testResult';

export const useTestResult = (filterParams?: TestResultFilterParams) => {
  return useQuery<TestResultResponse>({
    queryKey: ['test-result', filterParams],
    queryFn: () => TestResultService.getTestResult(filterParams),
    // Add staleTime to prevent excessive refetching
    staleTime: 5 * 60 * 1000 // 5 minutes
  });
};

export const useTestResultDetails = (id: string) => {
  return useQuery<TestResultDetailsResponse>({
    queryKey: ['test-result-details', id],
    queryFn: () => TestResultService.getTestResultDetails(id),
    enabled: !!id
  });
};

export const useTestSuiteDetails = (id: string) => {
  return useQuery<TestSuiteDetails>({
    queryKey: ['test-suite-details', id],
    queryFn: () => TestResultService.getTestSuiteDetails(id),
    enabled: !!id
  });
};
