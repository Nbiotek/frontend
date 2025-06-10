import { Button } from '@/components/ui/button';
import { XModal } from '@/atoms/modal';
import { useStore } from '@/store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUser } from '@/requests/admin';
import toast from 'react-hot-toast';
import { SUPER_ADMIN } from '@/constants/api';
import { Loader } from 'lucide-react';

export default function DeleteUserModal() {
  const {
    AppConfigStore: { toggleModals, isOpen, data }
  } = useStore();

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteUser,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] == SUPER_ADMIN.STATS
      });
      toast.success('user deleted.');
      toggleModals({});
    }
  });

  return (
    <XModal
      isOpen={isOpen.ADMIN_DELETE_USER}
      closeModal={() => toggleModals({})}
      title="Delete user"
      className="!max-w-[450px]"
    >
      <div>
        <div className="mb-6">
          <p className="text-sm text-neutral-500">
            Permanently remove this user from the system. This action is irreversible and all
            associated data will be lost.
          </p>
        </div>
        <div className="flex justify-end space-x-3">
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
            Delete
          </Button>
        </div>
      </div>
    </XModal>
  );
}
