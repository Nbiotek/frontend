import { patchQCStatusUpdate } from '@/requests/qc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { labCoord } from './FetchKeyFactory';

export function useUpdateQCStatus(cbFn?: () => void) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: patchQCStatusUpdate,
    onError: (error) => {
      toast.error(error.message);
      cbFn?.();
    },
    onSuccess: (data) => {
      toast.success(data.data.message);
      queryClient.invalidateQueries({ queryKey: labCoord.getDashboard().keys() });
      cbFn?.();
    }
  });

  return { mutate, isPending };
}
