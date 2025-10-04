import { XModal } from '@/atoms/modal';
import { useStore } from '@/store';
import { observer } from 'mobx-react-lite';
import { SubmitHandler, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField } from '@/components/ui/form';
import { AdminCreatePartnerSchema, TAdminCreatePartnerSchema } from '../../validation';
import { Button } from '@/components/ui/button';
import { Loader, Upload } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { SUPER_ADMIN } from '@/constants/api';
import { useEffect } from 'react';
import { AppModals } from '@/store/AppConfig/appModalTypes';
import FilePreview from '@/components/common/FileUpload/FilePreview';
import InputSelect from '@/atoms/fields/NewInputSelect';
import { carouselStatus } from '@/constants/data';

const AdminPartnerModal = () => {
  const {
    AppConfigStore: {
      isOpen,
      toggleModals,
      partnerModal,
      files,
      addFiles,
      removeFiles,
      setMediaMultiple
    },
    AdminStore: { updatePartner, createPartner, isLoading }
  } = useStore();

  const queryClient = useQueryClient();
  const isEditMode = partnerModal.id !== '';

  const form = useForm<TAdminCreatePartnerSchema>({
    defaultValues: {
      status: partnerModal.status
    },
    mode: 'onSubmit',
    resolver: zodResolver(AdminCreatePartnerSchema),
    reValidateMode: 'onSubmit'
  });

  const { fields, append, remove, update, replace } = useFieldArray({
    control: form.control,
    name: 'media'
  });

  const media = useWatch({ control: form.control, name: 'media' });

  const handleUpdate = (index: number, remoteFile: TRemoteFile) => {
    update(index, { file: remoteFile });

    if (files.length && !files.find((file) => file.uuid === remoteFile.uuid)) {
      addFiles(remoteFile);
    }
  };

  const handleRemove = (idx: number, media_uuid?: string) => {
    if (media_uuid) {
      removeFiles(media_uuid);
    }
    remove(idx);
  };

  const handlerFn = (_files: File[]) => {
    append(_files.map((file) => ({ file })));
    toggleModals({ name: AppModals.FILE_UPLOAD_MODAL, open: false });
  };

  const disableSubmit = (() => {
    if (media && media.length > 0) {
      const hasUnprocessedFiles = media.some((el) => el.file instanceof File);
      return hasUnprocessedFiles;
    }
    return true;
  })();

  const onSubmit: SubmitHandler<TAdminCreatePartnerSchema> = (formData) => {
    const cbFn = () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === SUPER_ADMIN.STATS
      });
      toggleModals();
    };
    if (isEditMode) {
      updatePartner(partnerModal.id, formData, cbFn);
      return;
    }
    createPartner(formData, cbFn);
  };

  const handleCloseModal = () => {
    form.reset();
    toggleModals();
  };

  useEffect(() => {
    if (isEditMode) {
      form.reset({
        status: partnerModal?.status || 'ACTIVE',
        media: partnerModal?.media?.map((el) => ({ file: el })) || []
      });
      const editableMedia =
        partnerModal?.media?.map((el) => ({ file: { ...el, file: el.file_url } })) || [];
      replace(editableMedia);
    } else if (!isEditMode) {
      form.reset({
        status: 'ACTIVE'
      });
    }
  }, [isEditMode, partnerModal, form]);

  return (
    <XModal
      closeModal={handleCloseModal}
      bgClose={false}
      isOpen={isOpen.CREATE_PARTNER_MODAL}
      title="Partners"
    >
      <div className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col space-y-4">
            <fieldset disabled={isLoading.create_hero} className="w-full">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <div>
                    <InputSelect
                      label="Status"
                      placeholder="Select a status"
                      items={carouselStatus}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      {...field}
                    />
                  </div>
                )}
              />
            </fieldset>

            {fields.length === 1 ? null : (
              <Button
                type="button"
                variant="outline"
                className="!h-[35px] !w-auto !text-xs"
                onClick={() => {
                  setMediaMultiple(false);
                  toggleModals({
                    open: true,
                    name: AppModals.FILE_UPLOAD_MODAL,
                    handlerFn
                  });
                }}
              >
                <Upload size={15} />
                upload
              </Button>
            )}

            {form?.formState?.errors?.media?.message && (
              <p className="text-[0.8rem] font-medium text-destructive">
                {form?.formState?.errors?.media?.message}
              </p>
            )}

            <div className="flex flex-col">
              <div className="mt-4 flex w-full flex-wrap justify-start gap-5">
                {fields.map(({ id, file }, idx) => (
                  <FilePreview
                    key={id}
                    {...{ file, id, idx, bucket: 'cloudinary' }}
                    remove={handleRemove}
                    update={handleUpdate}
                    error={form.formState.errors?.media?.[idx]?.message}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2">
              <Button
                disabled={isLoading.create_hero || disableSubmit}
                type="button"
                variant="outline"
                onClick={handleCloseModal}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-blue-400"
                disabled={disableSubmit || isLoading.create_hero}
              >
                {isLoading.create_hero && <Loader className="animate-spin" />}
                {isEditMode ? 'Update' : 'Add'} partner
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </XModal>
  );
};

export default observer(AdminPartnerModal);
