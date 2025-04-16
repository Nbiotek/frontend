import { useQuery, useMutation, useQueryClient, QueryClient } from '@tanstack/react-query';
import { doctorAppointmentService, FilterParams } from '@/requests/doctor';

export const useDoctorAppointment = (filterParams?: FilterParams) => {
  return useQuery<TDoctorAppointment>({
    queryKey: ['doctor-appointment', filterParams],
    queryFn: () => doctorAppointmentService.getAllAppointment(filterParams || {})
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
