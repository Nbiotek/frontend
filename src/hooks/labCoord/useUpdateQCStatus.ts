import { LAB_COORD, QUALITY_CONTROL } from '@/constants/api';
import { patchQCStatusUpdate } from '@/requests/qc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useUpdateQCStatus(cbFn?: () => void) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: patchQCStatusUpdate,
    onError: (error) => {
      toast.success(error.message);
    },
    onSuccess: (data) => {
      toast.success(data.data.message);
      queryClient.invalidateQueries({ queryKey: [LAB_COORD.DASHBOARD, QUALITY_CONTROL.HISTORY] });
      cbFn?.();
    }
  });

  return { mutate, isPending };
}
