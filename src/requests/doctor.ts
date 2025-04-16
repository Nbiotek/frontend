import server from '.';
import { DOCTOR } from '@/constants/api';
export interface FilterParams {
  search?: string;
  fromDate?: string;
  toDate?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
  status?: string;
}

// doctor dashboard
export const doctorDashboardService = {
  getDashboardOverview: async () => {
    const { data } = await server.get<TDoctorDashboard>(DOCTOR.DASHBOARD);
    return data;
  },
  getRecentActivity: async () => {
    const { data } = await server.get<TRecentActivity>(DOCTOR.RECENT_ACTIVITY);
    return data;
  }
};

export const doctorReviewTestService = {
  getAllTestReview: async (params: FilterParams = {}) => {
    let url = DOCTOR.TEST_REVIEW.All;

    // If params are provided, build query string
    if (Object.keys(params).length > 0) {
      // Start with base URL
      url = DOCTOR.TEST_REVIEW.All.split('?')[0];

      // Build query string from params
      const queryParams = new URLSearchParams();

      if (params.search) queryParams.append('search', params.search);
      if (params.fromDate) queryParams.append('fromDate', params.fromDate);
      if (params.toDate) queryParams.append('toDate', params.toDate);
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.limit) queryParams.append('limit', params.limit.toString());
      if (params.sortBy) queryParams.append('sortBy', params.sortBy);
      if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);
      if (params.status) queryParams.append('status', params.status);

      // Append the query string to the URL
      const queryString = queryParams.toString();
      if (queryString) {
        url = `${url}?${queryString}`;
      }
    }

    const { data } = await server.get<TDoctorTestReview>(url);
    return data;
  },

  getTestReviewById: async (id: string) => {
    const { data } = await server.get<TTestRevDet>(DOCTOR.TEST_REVIEW.DETAILS(id));
    return data;
  },

  writeRecommendation: async (id: string, notes: string) => {
    const { data } = await server.post(`/doctors/test-requests/${id}/approve`, { notes });

    return data;
  }
};

export const doctorAppointmentService = {
  getAllAppointment: async (params: FilterParams = {}) => {
    let url = DOCTOR.APPOINTMENT.ALL;

    // If params are provided, build query string
    if (Object.keys(params).length > 0) {
      // Start with base URL
      url = DOCTOR.APPOINTMENT.ALL.split('?')[0];

      // Build query string from params
      const queryParams = new URLSearchParams();

      if (params.search) queryParams.append('search', params.search);
      if (params.fromDate) queryParams.append('fromDate', params.fromDate);
      if (params.toDate) queryParams.append('toDate', params.toDate);
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.limit) queryParams.append('limit', params.limit.toString());
      if (params.sortBy) queryParams.append('sortBy', params.sortBy);
      if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);
      if (params.status) queryParams.append('status', params.status);

      // Append the query string to the URL
      const queryString = queryParams.toString();
      if (queryString) {
        url = `${url}?${queryString}`;
      }
    }

    // IMPORTANT: Use the constructed url here, not the constant
    const { data } = await server.get<TDoctorAppointment>(url);
    return data;
  },
  createAppointment: async (appointmentData: BookAppointmentDTO) => {
    const { data } = await server.post<Appointment>(DOCTOR.APPOINTMENT.CREATE, appointmentData);
    return data;
  }
};

export const doctorReferralsService = {
  getAllPatientReffered: async (params: FilterParams = {}) => {
    let url = DOCTOR.REFERRALS;

    // If params are provided, build query string
    if (Object.keys(params).length > 0) {
      // Start with base URL
      url = DOCTOR.REFERRALS.split('?')[0];

      // Build query string from params
      const queryParams = new URLSearchParams();

      if (params.search) queryParams.append('search', params.search);
      if (params.fromDate) queryParams.append('fromDate', params.fromDate);
      if (params.toDate) queryParams.append('toDate', params.toDate);
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.limit) queryParams.append('limit', params.limit.toString());
      if (params.sortBy) queryParams.append('sortBy', params.sortBy);
      if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);
      if (params.status) queryParams.append('status', params.status);

      // Append the query string to the URL
      const queryString = queryParams.toString();
      if (queryString) {
        url = `${url}?${queryString}`;
      }
    }

    const { data } = await server.get<TPatientReffered>(url);
    return data;
  }
};
