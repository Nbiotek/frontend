import { useQuery, useMutation, useQueryClient, QueryClient } from '@tanstack/react-query';
import { doctorAppointmentService } from '@/requests/doctor';

export const useDoctorAppointment = () => {
  return useQuery<TDoctorAppointment>({
    queryKey: ['doctor-appointment'],
    queryFn: doctorAppointmentService.getAllAppointment
  });
};

export const useCreateAppointment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: doctorAppointmentService.createAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['create-appointment'] });
    }
  });
};
