import { Button } from '@/components/ui/button';
import { XModal } from '@/atoms/modal';
import { useStore } from '@/store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { unSuspendUser } from '@/requests/admin';
import toast from 'react-hot-toast';
import { SUPER_ADMIN } from '@/constants/api';
import { Loader } from 'lucide-react';

export default function UnSuspendUserModal() {
  const {
    AppConfigStore: { toggleModals, isOpen, data }
  } = useStore();

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: unSuspendUser,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] == SUPER_ADMIN.STATS
      });
      toast.success('user reinstated.');
      toggleModals({});
    }
  });

  return (
    <XModal
      isOpen={isOpen.ADMIN_UNSUSPEND_USER}
      closeModal={() => toggleModals({})}
      title="Reinstate user"
      className="!max-w-[450px]"
    >
      <div>
        <div className="mb-6">
          <p className="text-sm text-neutral-500">
            {`This will restore the user's access and permissions. You can manage their status anytime in user settings.`}
          </p>
        </div>
        <div className="flex justify-end space-x-2">
          <Button
            disabled={isPending}
            type="button"
            variant="secondary"
            onClick={() => toggleModals({})}
          >
            close
          </Button>
          <Button disabled={isPending} type="button" onClick={() => mutate(data.id)}>
            {isPending && <Loader className="animate-spin" />}
            Activate
          </Button>
        </div>
      </div>
    </XModal>
  );
}
