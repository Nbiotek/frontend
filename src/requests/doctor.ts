import server from '.';
import { DOCTOR } from '@/constants/api';

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
  getAllTestReview: async () => {
    const { data } = await server.get<TDoctorTestReview>(DOCTOR.TEST_REVIEW);
    return data;
  }
};

export const doctorAppointmentService = {
  getAllAppointment: async () => {
    const { data } = await server.get<TDoctorAppointment>(DOCTOR.APPOINTMENT.ALL);
    return data;
  },
  createAppointment: async (appointmentData: BookAppointmentDTO) => {
    const { data } = await server.post<Appointment>(DOCTOR.APPOINTMENT.CREATE, appointmentData);
    return data;
  }
};
