import server, { serverwithoutInterceptor } from '.';
import { PATIENT } from '@/constants/api';
import { SingleTest, PackageTest, AllTestResponse, AllPackageTestResponse } from '@/types/test';

export const TestService = {
  // Get all tests
  getAllTests: async () => {
    const { data } = await server.get<AllTestResponse>(PATIENT.TESTS.ALl);
    return data;
  },

  getPackageTest: async () => {
    const { data } = await server.get<AllPackageTestResponse>(PATIENT.TESTS.PACKAGES);
    return data;
  }
};
