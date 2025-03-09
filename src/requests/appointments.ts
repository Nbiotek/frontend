import server, { serverwithoutInterceptor } from '.';
import { PATIENT } from '@/constants/api';

export const AppointmentService = {
  // Get all upcoming appointments
  getUpcomingAppointments: async () => {
    const { data } = await server.get<UpcomingAppointment>(PATIENT.APPOINTMENTS.UPCOMING);
    return data;
  },

  getPendingAppointments: async () => {
    const { data } = await server.get<PendingAppointment>(PATIENT.APPOINTMENTS.PENDING);
    return data;
  },

  // Get all past appointment
  getPastAppointments: async () => {
    const { data } = await server.get<PastAppointment>(PATIENT.APPOINTMENTS.PAST);
    return data;
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

  updatePaymentStatus: async (appointmentId: string) => {
    const { data } = await server.post(PATIENT.APPOINTMENTS.PAYMENT_STATUS, appointmentId);
    return data;
  }
};
