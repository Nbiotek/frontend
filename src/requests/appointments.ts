import server, { serverwithoutInterceptor } from '.';
import { PATIENT } from '@/constants/api';

export const AppointmentService = {
  // Get all upcoming appointments
  getAppointments: async () => {
    const { data } = await server.get<BookAppointmentDTO>(PATIENT.APPOINTMENTS.UPCOMING);
    return data;
  },

  // Get all past appointment
  getPastAppointments: async () => {
    const { data } = await server.get<BookAppointmentDTO>(PATIENT.APPOINTMENTS.PAST);
    return data;
  },

  // Get single appointment
  getAppointmentById: async (id: string) => {
    const { data } = await server.get<Appointment>(PATIENT.APPOINTMENTS.DETAILS(id));
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
  rescheduleAppointment: async (id: string, newDate: Date) => {
    const { data } = await server.post(PATIENT.APPOINTMENTS.RESCHEDULE(id), {
      newDate
    });
    return data;
  }
};
