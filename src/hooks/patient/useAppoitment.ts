import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AppointmentFilterParams, AppointmentService } from '@/requests/appointments';

export const useBookAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AppointmentService.createAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['create-appointments'] });
    }
  });
};

export const useAllUpcomingAppointment = (filterParams?: AppointmentFilterParams) => {
  return useQuery<UpcomingAppointment>({
    queryKey: ['upcoming-appointment', filterParams],
    queryFn: () => AppointmentService.getUpcomingAppointments(filterParams),
    // prevent excessive refetching
    staleTime: 5 * 60 * 1000 // 5 minutes
  });
};

export const usePendingAppointment = (filterParams?: AppointmentFilterParams) => {
  return useQuery<PendingAppointment>({
    queryKey: ['pending-appointment', filterParams],
    queryFn: () => AppointmentService.getPendingAppointments(filterParams),
    staleTime: 5 * 60 * 1000 // 5 minutes
  });
};

export const usePastAppointment = (filterParams?: AppointmentFilterParams) => {
  return useQuery<PastAppointment>({
    queryKey: ['past-appointment', filterParams],
    queryFn: () => AppointmentService.getPastAppointments(filterParams),
    staleTime: 5 * 60 * 1000 // 5 minutes
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

export const useVerifyPayment = (tx_Ref: string) => {
  return useQuery<TverifyPaymentResponse>({
    queryKey: ['verify-payment', tx_Ref],
    queryFn: () => AppointmentService.verifyPayment(tx_Ref),

    // Only run the query if we have an ID
    enabled: !!tx_Ref
  });
};
