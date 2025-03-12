import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { TestResultService } from '@/requests/testResult';

export const useTestResult = () => {
  return useQuery<TestResultResponse>({
    queryKey: ['test-result'],
    queryFn: TestResultService.getTestResult
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
