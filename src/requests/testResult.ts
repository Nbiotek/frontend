import server, { serverwithoutInterceptor } from '.';
import { PATIENT } from '@/constants/api';

export interface TestResultFilterParams {
  search?: string;
  fromDate?: string;
  toDate?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export const TestResultService = {
  // Get all Test Resuslt
  getTestResult: async (params?: TestResultFilterParams) => {
    // Build the query string from params
    let url = PATIENT.TEST_RESULTS.ALL;

    // If params are provided, build query string
    if (params && Object.keys(params).length > 0) {
      // Start with base URL
      url = PATIENT.TEST_RESULTS.ALL.split('?')[0];

      // Build query string from params
      const queryParams = new URLSearchParams();

      if (params.search) queryParams.append('search', params.search);
      if (params.fromDate) queryParams.append('fromDate', params.fromDate);
      if (params.toDate) queryParams.append('toDate', params.toDate);
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.limit) queryParams.append('limit', params.limit.toString());
      if (params.sortBy) queryParams.append('sortBy', params.sortBy);
      if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);

      // Append the query string to the URL
      const queryString = queryParams.toString();
      if (queryString) {
        url = `${url}?${queryString}`;
      }
    }

    const { data } = await server.get<TestResultResponse>(url);
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
