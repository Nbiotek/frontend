import { RECEPTIONIST } from '@/constants/api';

export const recpst = {
  getApprovedAppointments(params: Omit<Partial<TAppointmentQuery>, 'status'>) {
    return {
      path: RECEPTIONIST.APPOINTMENTS,
      keys: () => [RECEPTIONIST.APPOINTMENTS, 'APPROVED', params] as const,
      params: { status: 'APPROVED', ...params }
    };
  },

  getPendingAppointments(params: Omit<Partial<TAppointmentQuery>, 'status'>) {
    return {
      path: RECEPTIONIST.APPOINTMENTS,
      keys: () => [RECEPTIONIST.APPOINTMENTS, 'PENDING', params] as const,
      params: { status: 'PENDING', ...params }
    };
  },

  getSingleAppointment(id: string) {
    return {
      path: RECEPTIONIST.SINGLE_APPOINTMENT.replace(':id', id),
      keys: () => [RECEPTIONIST.APPOINTMENTS, RECEPTIONIST.SINGLE_APPOINTMENT, id] as const
    };
  }
};
