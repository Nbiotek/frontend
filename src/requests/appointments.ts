import server, { serverwithoutInterceptor } from '.';
import { PATIENT } from '@/constants/api';
import { Appointment, BookAppointmentDTO } from '@/types/patient';

export const AppointmentService = {
  // Get all appointments
  getAppointments: async (status?: 'upcoming' | 'completed') => {
    const { data } = await server.get<Appointment[]>(PATIENT.APPOINTMENTS.LIST, {
      params: { status }
    });
    return data;
  },

  // Get single appointment
  getAppointmentById: async (id: string) => {
    const { data } = await server.get<Appointment>(PATIENT.APPOINTMENTS.DETAILS(id));
    return data;
  },

  // Create appointment
  createAppointment: async (appointmentData: BookAppointmentDTO) => {
    const { data } = await server.post<Appointment>(PATIENT.APPOINTMENTS.CREATE, appointmentData);
    return data;
  },

  // Cancel appointment
  cancelAppointment: async (id: string) => {
    const { data } = await server.post(PATIENT.APPOINTMENTS.CANCEL(id));
    return data;
  },

  // Reschedule appointment
  rescheduleAppointment: async (id: string, newDate: Date) => {
    const { data } = await server.post(PATIENT.APPOINTMENTS.RESCHEDULE(id), {
      newDate
    });
    return data;
  }
};
