import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AppointmentService } from '@/requests/appointments';

export const useBookAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AppointmentService.createAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['create-appointments'] });
    }
  });
};

export const useAllUpcomingAppointment = () => {
  return useQuery<UpcomingAppointment>({
    queryKey: ['upcoming-appointment'],
    queryFn: AppointmentService.getUpcomingAppointments
  });
};

export const usePendingAppointment = () => {
  return useQuery<PendingAppointment>({
    queryKey: ['pending-appointment'],
    queryFn: AppointmentService.getPendingAppointments
  });
};

export const usePastAppointment = () => {
  return useQuery<PastAppointment>({
    queryKey: ['past-appointment'],
    queryFn: AppointmentService.getPastAppointments
  });
};

export const useGetAppointmentById = (id: string) => {
  return useQuery<TShowAppointment>({
    queryKey: ['getAppointmentItem-details', id],
    queryFn: () => AppointmentService.getAppointmentById(id),

    // Only run the query if we have an ID
    enabled: !!id
  });
};

export const useRescheduleAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ appointmentId, newDate }: { appointmentId: string; newDate: string }) =>
      AppointmentService.rescheduleAppointment(appointmentId, newDate),
    onSuccess: () => {
      // Invalidate and refetch appointments after a successful reschedule
      queryClient.invalidateQueries({ queryKey: ['reschedule-appointments'] });
    }
  });
};

export const useProcessPayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ appointmentId }: { appointmentId: string }) =>
      AppointmentService.processPayment(appointmentId),
    onSuccess: () => {
      // Invalidate and refetch appointments after a successful payment
      queryClient.invalidateQueries({ queryKey: ['payment-process'] });
    }
  });
};

export const useUpdatePaymentStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (appointmentId: TUpdatePaymentStatus) =>
      AppointmentService.updatePaymentStatus(appointmentId),
    onSuccess: () => {
      // Invalidate and refetch appointments after a successful payment
      queryClient.invalidateQueries({ queryKey: ['update-paymentstatus'] });
    }
  });
};
