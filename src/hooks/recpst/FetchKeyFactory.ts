import { RECEPTIONIST } from '@/constants/api';

export const recpst = {
  getDashboard() {
    return {
      path: RECEPTIONIST.DASHBOARD,
      keys: () => [RECEPTIONIST.DASHBOARD] as const
    };
  },
  getApprovedAppointments(params: Omit<Partial<TAppointmentQuery>, 'status'>) {
    return {
      path: RECEPTIONIST.APPOINTMENTS,
      keys: () => [RECEPTIONIST.DASHBOARD, RECEPTIONIST.APPOINTMENTS, 'APPROVED', params] as const,
      params: { status: 'APPROVED', ...params }
    };
  },

  getPendingAppointments(params: Omit<Partial<TAppointmentQuery>, 'status'>) {
    return {
      path: RECEPTIONIST.APPOINTMENTS,
      keys: () => [RECEPTIONIST.DASHBOARD, RECEPTIONIST.APPOINTMENTS, 'PENDING', params] as const,
      params: { status: 'PENDING', ...params }
    };
  },

  getReceptAppointmentBase(id: string) {
    return {
      path: RECEPTIONIST.SINGLE_APPOINTMENT.replace(':id', id),
      keys: () =>
        [
          RECEPTIONIST.DASHBOARD,
          RECEPTIONIST.APPOINTMENTS,
          RECEPTIONIST.SINGLE_APPOINTMENT,
          id
        ] as const
    };
  }
};
