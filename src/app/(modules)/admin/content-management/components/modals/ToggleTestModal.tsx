import { Button } from '@/components/ui/button';
import { XModal } from '@/atoms/modal';
import { useStore } from '@/store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUser, toggleTestAvailability } from '@/requests/admin';
import toast from 'react-hot-toast';
import { SUPER_ADMIN } from '@/constants/api';
import { Loader } from 'lucide-react';
import { EnumTestAvailability } from '@/atoms/Buttons/Status';

export default function DeleteUserModal() {
  const {
    AppConfigStore: { toggleModals, isOpen, testAvailability }
  } = useStore();

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: toggleTestAvailability,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] == SUPER_ADMIN.STATS
      });
      toast.success('Test status updated!');
      toggleModals({});
    }
  });

  return (
    <XModal
      isOpen={isOpen.ADMIN_TOGGLE_TEST_AVAILABILITY}
      closeModal={() => toggleModals({})}
      title="Test status"
      className="!max-w-[350px]"
    >
      <div>
        <div className="mb-6">
          <p className="text-sm text-neutral-500">
            Toggle test status between active and inactive.
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
            variant={
              testAvailability.status === EnumTestAvailability.ACTIVE ? 'default' : 'destructive'
            }
            onClick={() =>
              mutate({
                type: testAvailability.type,
                id: testAvailability.id,
                payload: { status: testAvailability.status }
              })
            }
          >
            {isPending && <Loader className="animate-spin" />}
            {testAvailability.status === EnumTestAvailability.IN_ACTIVE && 'Deactivate'}
            {testAvailability.status === EnumTestAvailability.ACTIVE && 'Activate'}
          </Button>
        </div>
      </div>
    </XModal>
  );
}
