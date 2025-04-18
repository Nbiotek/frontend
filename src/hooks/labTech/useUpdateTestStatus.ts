import { Toast } from '@/atoms/Toast';
import { LAB_TECH } from '@/constants/api';
import { putUpdateTestStatus, TTestStatusMutateParams } from '@/requests/lab-tech';
import { parseError } from '@/utils/errorHandler';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useUpdateTestStatus() {
  const queryClient = useQueryClient();
  const { mutate: mutateTestStatus, isPending } = useMutation({
    mutationFn: (args: TTestStatusMutateParams) => putUpdateTestStatus(args),
    onError: (error) => {
      toast.error(parseError(error));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [LAB_TECH.RECENT_ACTIVITIES, LAB_TECH.ALL_TESTS] });
      toast.success('Test status updated!');
    }
  });

  return { mutateTestStatus, isPending };
}
