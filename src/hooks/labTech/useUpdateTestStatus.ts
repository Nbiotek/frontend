import { TEST } from '@/constants/api';
import { putUpdateTestStatus, TTestStatusMutateParams } from '@/requests/lab-tech';
import { parseError } from '@/utils/errorHandler';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { labTech } from './FetchKeyFactory';

export function useUpdateTestStatus() {
  const queryClient = useQueryClient();
  const { mutate: mutateTestStatus, isPending } = useMutation({
    mutationFn: (args: TTestStatusMutateParams) => putUpdateTestStatus(args),
    onError: (error) => {
      toast.error(parseError(error));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: labTech.getRecentActivities().keys() });
      toast.success('Test status updated!');
    }
  });

  return { mutateTestStatus, isPending };
}
