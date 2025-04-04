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
    const { data } = await server.get<TDoctorTestReview>(DOCTOR.TEST_REVIEW.All);
    return data;
  },

  getTestReviewById: async (id: string) => {
    const { data } = await server.get<TTestRevDet>(DOCTOR.TEST_REVIEW.DETAILS(id));
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

export const doctorReferralsService = {
  getAllPatientReffered: async () => {
    const { data } = await server.get<TPatientReffered>(DOCTOR.REFERRALS);
    return data;
  }
};
