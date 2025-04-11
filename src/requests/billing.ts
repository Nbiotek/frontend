import server, { serverwithoutInterceptor } from '.';
import { PATIENT } from '@/constants/api';

export interface BillingFilterParams {
  search?: string;
  fromDate?: string;
  toDate?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export const BillingService = {
  // Get all Test Resuslt
  getBillingHistory: async (params?: BillingFilterParams) => {
    // Build the query string from params
    let url = PATIENT.BILLING;

    // If params are provided, build query string
    if (params && Object.keys(params).length > 0) {
      // Start with base URL
      url = PATIENT.BILLING.split('?')[0];

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

    const { data } = await server.get<BillingHistory>(url);
    return data;
  }
};
