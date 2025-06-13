import { Button } from '@/components/ui/button';
import { XModal } from '@/atoms/modal';
import { useStore } from '@/store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { suspendUser } from '@/requests/admin';
import toast from 'react-hot-toast';
import { SUPER_ADMIN } from '@/constants/api';
import { Loader } from 'lucide-react';

export default function SuspendUserModal() {
  const {
    AppConfigStore: { toggleModals, isOpen, data }
  } = useStore();

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: suspendUser,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] == SUPER_ADMIN.STATS
      });
      toast.success('user suspended.');
      toggleModals({});
    }
  });

  return (
    <XModal
      isOpen={isOpen.ADMIN_SUSPEND_USER}
      closeModal={() => toggleModals({})}
      title="Suspend user"
      className="!max-w-[450px]"
    >
      <div>
        <div className="mb-6">
          <p className="text-sm text-neutral-500">
            {`Temporarily deactivate this user's account. You can restore access at any time from the
            user management settings.`}
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
          <Button
            disabled={isPending}
            type="button"
            variant="destructive"
            onClick={() => mutate(data.id)}
          >
            {isPending && <Loader className="animate-spin" />}
            Suspend
          </Button>
        </div>
      </div>
    </XModal>
  );
}
