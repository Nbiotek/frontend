import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { QUERY_KEY } from '@/constants/data';
import { putUpdateVisibility } from '@/requests/file-manager';

export function useToggleMediaVisibility({
  errorCbFn,
  successCbFn
}: {
  errorCbFn?: () => void;
  successCbFn?: (arg: string) => void;
}) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: putUpdateVisibility,
    onError: (error) => {
      toast.error(error.message);
      errorCbFn?.();
    },
    onSuccess: (data) => {
      const newVisibiltyStatus = data.data.data.visibiltyStatus;
      toast.success(data.data.message);
      queryClient.invalidateQueries({
        predicate: (query) =>
          Array.isArray(query.queryKey) && query.queryKey[0] === QUERY_KEY.LAB_DASHBOARD
      });

      successCbFn?.(newVisibiltyStatus);
    }
  });

  return { mutate, isPending };
}
