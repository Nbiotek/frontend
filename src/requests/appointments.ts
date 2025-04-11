import server, { serverwithoutInterceptor } from '.';
import { PATIENT } from '@/constants/api';

export interface AppointmentFilterParams {
  search?: string;
  fromDate?: string;
  toDate?: string;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export const AppointmentService = {
  // Get all upcoming appointments
  getUpcomingAppointments: async (params?: AppointmentFilterParams) => {
    // Get the base URL
    const baseUrl = PATIENT.APPOINTMENTS.UPCOMING;

    // If no params are provided, use the default sortOrder=DESC
    if (!params || Object.keys(params).length === 0) {
      const defaultUrl = `${baseUrl}?sortOrder=DESC`;
      const { data } = await server.get<UpcomingAppointment>(defaultUrl);
      return data;
    } else {
      // Build query string from params
      const queryParams = new URLSearchParams();

      if (params.search) queryParams.append('search', params.search);
      if (params.fromDate) queryParams.append('fromDate', params.fromDate);
      if (params.toDate) queryParams.append('toDate', params.toDate);
      if (params.sortBy) queryParams.append('sortBy', params.sortBy);

      // Always include sortOrder, default to DESC if not provided
      queryParams.append('sortOrder', params.sortOrder || 'DESC');

      // Append the query string to the URL
      const url = `${baseUrl}?${queryParams.toString()}`;
      const { data } = await server.get<UpcomingAppointment>(url);
      return data;
    }
  },

  getPendingAppointments: async (params?: AppointmentFilterParams) => {
    const baseUrl = PATIENT.APPOINTMENTS.PENDING;

    if (!params || Object.keys(params).length === 0) {
      const defaultUrl = `${baseUrl}?sortOrder=DESC`;
      const { data } = await server.get<PendingAppointment>(defaultUrl);
      return data;
    } else {
      // Build query string from params
      const queryParams = new URLSearchParams();

      if (params.search) queryParams.append('search', params.search);
      if (params.fromDate) queryParams.append('fromDate', params.fromDate);
      if (params.toDate) queryParams.append('toDate', params.toDate);
      if (params.sortBy) queryParams.append('sortBy', params.sortBy);

      // Always include sortOrder, default to DESC if not provided
      queryParams.append('sortOrder', params.sortOrder || 'DESC');

      // Append the query string to the URL
      const url = `${baseUrl}?${queryParams.toString()}`;
      const { data } = await server.get<PendingAppointment>(url);
      return data;
    }
  },

  // Get all past appointment
  getPastAppointments: async (params?: AppointmentFilterParams) => {
    const baseUrl = PATIENT.APPOINTMENTS.PAST;

    if (!params || Object.keys(params).length === 0) {
      const defaultUrl = `${baseUrl}?sortOrder=DESC`;
      const { data } = await server.get<PastAppointment>(defaultUrl);
      return data;
    } else {
      // Build query string from params
      const queryParams = new URLSearchParams();

      if (params.search) queryParams.append('search', params.search);
      if (params.fromDate) queryParams.append('fromDate', params.fromDate);
      if (params.toDate) queryParams.append('toDate', params.toDate);
      if (params.sortBy) queryParams.append('sortBy', params.sortBy);

      // Always include sortOrder, default to DESC if not provided
      queryParams.append('sortOrder', params.sortOrder || 'DESC');

      // Append the query string to the URL
      const url = `${baseUrl}?${queryParams.toString()}`;
      const { data } = await server.get<PastAppointment>(url);
      return data;
    }
  },

  // Get single appointment
  getAppointmentById: async (id: string) => {
    const { data } = await server.get<TShowAppointment>(PATIENT.APPOINTMENTS.DETAILS(id));
    return data;
  },

  // Create appointment
  createAppointment: async (appointmentData: BookAppointmentDTO) => {
    console.log('this is  creating an appointment');
    console.log(appointmentData);
    const { data } = await server.post<Appointment>(PATIENT.APPOINTMENTS.CREATE, appointmentData);
    return data;
  },

  // Cancel appointment
  cancelAppointment: async (id: string) => {
    const { data } = await server.post(PATIENT.APPOINTMENTS.CANCEL(id));
    return data;
  },

  // Reschedule appointment
  rescheduleAppointment: async (id: string, newDate: Date | string) => {
    const { data } = await server.post(PATIENT.APPOINTMENTS.RESCHEDULE(id), {
      newDate
    });
    return data;
  },

  processPayment: async (appointmentId: string) => {
    const { data } = await server.post(PATIENT.APPOINTMENTS.PENDING_PAYMENT(appointmentId));
    return data;
  },

  verifyPayment: async (tx_Ref: string) => {
    const { data } = await server.get(PATIENT.APPOINTMENTS.VERIFY_PAYMENT(tx_Ref));
    return data;
  }
};
