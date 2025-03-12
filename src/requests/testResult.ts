import server, { serverwithoutInterceptor } from '.';
import { PATIENT } from '@/constants/api';

export const TestResultService = {
  // Get all Test Resuslt
  getTestResult: async () => {
    const { data } = await server.get<TestResultResponse>(PATIENT.TEST_RESULTS.ALL);
    return data;
  },

  getTestResultDetails: async (id: string) => {
    const { data } = await server.get<TestResultDetailsResponse>(PATIENT.TEST_RESULTS.DETAILS(id));
    return data;
  },

  getTestSuiteDetails: async (id: string) => {
    const { data } = await server.get<TestSuiteDetails>(PATIENT.TEST_RESULTS.SUITE_DETAILS(id));
    return data;
  }
};
