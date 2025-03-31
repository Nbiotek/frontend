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
