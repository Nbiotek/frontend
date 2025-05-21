import { recpst } from './FetchKeyFactory';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { putUpdateAppt } from '@/requests/recept';

export function useUpdateAppt() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: putUpdateAppt,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data.data.message);
      queryClient.invalidateQueries({
        predicate: (query) =>
          Array.isArray(query.queryKey) &&
          query.queryKey[0] === recpst.getApprovedAppointments({}).keys()[0]
      });
    }
  });

  return { mutate, isPending };
}
