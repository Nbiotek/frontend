import server from '.';
import { DOCTOR } from '@/constants/api';

export const doctorDashboardService = {
  getDashboardOverview: async () => {
    const { data } = await server.get<TDoctorDashboard>(DOCTOR.DASHBOARD);

    return data;
  }
};
