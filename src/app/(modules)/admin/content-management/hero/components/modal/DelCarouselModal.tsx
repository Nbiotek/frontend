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

const DeleteCarousel = () => {
  const {
    AppConfigStore: { toggleModals, isOpen, heroSectionModal },
    AdminStore: { deleteHeroCarousel, isLoading }
  } = useStore();

  const queryClient = useQueryClient();

  console.log(isLoading.del_carousel);

  return (
    <Dialog
      modal={true}
      onOpenChange={() => toggleModals({ name: AppModals.DEL_HERO_CAROUSEL, open: false })}
      open={isOpen.DEL_HERO_CAROUSEL}
    >
      <DialogContent className="w-full max-w-lg">
        <DialogHeader>
          <DialogTitle>Delete Carousel</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this carousel ? This action is permanent.
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
              deleteHeroCarousel(heroSectionModal.id, () => {
                queryClient.invalidateQueries({
                  predicate: (query) => query.queryKey[0] === SUPER_ADMIN.LANDING_PAGE
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

export default observer(DeleteCarousel);
