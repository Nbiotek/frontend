import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AppointmentService } from '@/requests/appointments';

export const useBookAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AppointmentService.createAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
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

export const useAllPastAppointment = () => {
  return useQuery<BookAppointmentDTO>({
    queryKey: ['past-appointment'],
    queryFn: AppointmentService.getPastAppointments
  });
};
