import server, { serverwithoutInterceptor } from '.';
import { PATIENT, LAB_TECH, TEST } from '@/constants/api';
import { SingleTest, PackageTest, AllTestResponse, AllPackageTestResponse } from '@/types/test';
import { TTestResultsTypeSchema } from '@/app/(modules)/lab-tech/tests/components/validation';

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

// post requests
export const postUploadResult = async (testRequestId: string, payload: TTestResultsTypeSchema) =>
  server.post(TEST.UPLOAD_RESULT.replaceAll(':id', testRequestId), payload);
