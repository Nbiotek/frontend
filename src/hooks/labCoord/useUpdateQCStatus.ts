import { patchQCStatusUpdate } from '@/requests/qc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { qualityControl } from '../qualityControl/FetchkeyFactory';

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
      queryClient.invalidateQueries({
        predicate: (query) =>
          Array.isArray(query.queryKey) &&
          query.queryKey[0] === qualityControl.getHistory({}).keys()[0]
      });

      cbFn?.();
    }
  });

  return { mutate, isPending };
}
