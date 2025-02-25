import { useQuery } from '@tanstack/react-query';
import { TestService } from '@/requests/test';
import { AllTestResponse, AllPackageTestResponse } from '@/types/test';

export const useTestsSingle = () => {
  return useQuery<AllTestResponse>({
    queryKey: ['allSingle-test'],
    queryFn: TestService.getAllTests
  });
};

export const useTestPackages = () => {
  return useQuery<AllPackageTestResponse>({
    queryKey: ['test-packages'],
    queryFn: TestService.getPackageTest
  });
};
