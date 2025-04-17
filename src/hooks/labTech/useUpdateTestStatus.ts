import { Toast } from '@/atoms/Toast';
import { LAB_TECH } from '@/constants/api';
import { putUpdateTestStatus, TTestStatusMutateParams } from '@/requests/lab-tech';
import { parseError } from '@/utils/errorHandler';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useUpdateTestStatus() {
  const queryClient = useQueryClient();
  const { mutate: mutateTestStatus, isPending } = useMutation({
    mutationFn: (args: TTestStatusMutateParams) => putUpdateTestStatus(args),
    onMutate: () => {
      Toast.info('Updating test id...');
    },
    onError: (error) => {
      Toast.error(parseError(error));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [LAB_TECH.RECENT_ACTIVITIES, LAB_TECH.ALL_TESTS] });
      Toast.success('Test status updated!');
    }
  });

  return { mutateTestStatus, isPending };
}
