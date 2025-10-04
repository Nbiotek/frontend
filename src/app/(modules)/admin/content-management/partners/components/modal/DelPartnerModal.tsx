'use client';
import { useStore } from '@/store';
import { observer } from 'mobx-react-lite';
import {
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogDescription,
  Dialog
} from '@/components/ui/dialog';
import { AppModals } from '@/store/AppConfig/appModalTypes';
import Button from '@/atoms/Buttons';
import { useQueryClient } from '@tanstack/react-query';
import { SUPER_ADMIN } from '@/constants/api';

const DeletePartner = () => {
  const {
    AppConfigStore: { toggleModals, isOpen, partnerModal },
    AdminStore: { deletePartner, isLoading }
  } = useStore();

  const queryClient = useQueryClient();

  return (
    <Dialog
      modal={true}
      onOpenChange={() => toggleModals({ name: AppModals.DEL_PARTNER, open: false })}
      open={isOpen.DEL_PARTNER}
    >
      <DialogContent className="w-full max-w-lg">
        <DialogHeader>
          <DialogTitle>Delete Partner</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this partner ? This action is permanent.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-8 flex items-center justify-between space-x-3 sm:justify-end">
          <Button
            type="button"
            variant="transparent"
            text="Discard"
            disabled={isLoading.del_carousel}
            className="h-11 w-36"
            onClick={() => toggleModals({})}
          />
          <Button
            type="button"
            variant="danger"
            text="Delete"
            disabled={isLoading.del_carousel}
            isLoading={isLoading.del_carousel}
            className="h-11 w-36"
            onClick={() =>
              deletePartner(partnerModal.id, () => {
                queryClient.invalidateQueries({
                  predicate: (query) => query.queryKey[0] === SUPER_ADMIN.CONTENT_PARTNERS
                });
                toggleModals({});
              })
            }
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default observer(DeletePartner);
