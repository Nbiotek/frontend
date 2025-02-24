import server, { serverwithoutInterceptor } from '.';
import { PATIENT } from '@/constants/api';
import { SingleTest, PackageTest, AllTestResponse } from '@/types/test';

export const TestService = {
  // Get all tests
  getAllTests: async () => {
    const { data } = await server.get<AllTestResponse>(PATIENT.TESTS.ALl);
    return data;
  },

  getPackageTest: async () => {
    const { data } = await server.get<PackageTest[]>(PATIENT.TESTS.PACKAGES);
    return data;
  }

  // Get test details
  //   getTestById: async (id: string) => {
  //     const { data } = await server.get<SingleTest>(
  //       PATIENT.DETAILS(id)
  //     );
  //     return data;
  //   },

  // Get test packages
  //   getTestPackages: async () => {
  //     const { data } = await server.get<PackageTest[]>(PATIENT.PACKAGES);
  //     return data;
  //   }
};
