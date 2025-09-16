import { XModal } from '@/atoms/modal';
import { useStore } from '@/store';
import { observer } from 'mobx-react-lite';
import { SubmitHandler, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField } from '@/components/ui/form';
import { AdminTestimonialSchema, TAdminTestimonialSchema } from '../../validation';
import { Button } from '@/components/ui/button';
import { Loader, Upload } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import TextareaField from '@/atoms/fields/TextAreaField';
import { SUPER_ADMIN } from '@/constants/api';
import { useEffect } from 'react';
import { useFetchSingleTestimonial } from '@/hooks/admin/useFetchSingleTestimonial';
import { AppModals } from '@/store/AppConfig/appModalTypes';
import InputSelect from '@/atoms/fields/NewInputSelect';
import { testimonialStatus } from '@/constants/data';
import InputField from '@/atoms/fields/NewInput';
import FilePreview from '@/components/common/FileUpload/FilePreview';
import InputRating from '@/atoms/fields/InputRating';

const AdminTestimonialModal = () => {
  const {
    AppConfigStore: {
      isOpen,
      toggleModals,
      dataModal,
      files,
      addFiles,
      removeFiles,
      setMediaMultiple
    },
    AdminStore: { createTestimonial, updateTestimonial, isLoading }
  } = useStore();

  const queryClient = useQueryClient();
  const isEditMode = dataModal.id !== '';

  const { data, status } = useFetchSingleTestimonial(dataModal.id);

  const form = useForm<TAdminTestimonialSchema>({
    defaultValues: {
      description: '',
      author: { fullName: '', role: '' },
      rating: '0',
      status: 'active'
    },
    mode: 'onSubmit',
    resolver: zodResolver(AdminTestimonialSchema),
    reValidateMode: 'onSubmit'
  });

  const { fields, append, remove, update, replace } = useFieldArray({
    control: form.control,
    name: 'author.media'
  });

  const media = useWatch({ control: form.control, name: 'author.media' });

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

  const onSubmit: SubmitHandler<TAdminTestimonialSchema> = (formData) => {
    const cbFn = () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === SUPER_ADMIN.TESTIMONIALS
      });
      toggleModals({});
    };
    if (isEditMode) {
      updateTestimonial(dataModal.id, formData, cbFn);
      return;
    }
    createTestimonial(formData, cbFn);
  };

  const handleCloseModal = () => {
    form.reset();
    toggleModals();
  };

  useEffect(() => {
    if (isEditMode && data) {
      form.reset({
        description: data.description || '',
        author: {
          fullName: data.author.fullName || '',
          role: data.author.role || '',
          media: data?.author?.media?.map((el) => ({ file: el })) || []
        },
        rating: data.rating.toString() || '0',
        status: data.status || 'ACTIVE'
      });
      const editableMedia =
        data?.author.media?.map((el) => ({ file: { ...el, file: el.file_url } })) || [];

      console.log(data.author.media[0], editableMedia);
      replace(editableMedia);
    } else if (!isEditMode) {
      form.reset({
        description: ''
      });
    }
  }, [isEditMode, data, form]);

  if (isEditMode && status === 'pending') {
    return (
      <XModal
        closeModal={handleCloseModal}
        bgClose={false}
        isOpen={isOpen.CREATE_TESTIMONIAL_MODAL}
        title="Testimonial"
      >
        <div className="flex items-center justify-center py-8">
          <Loader className="h-6 w-6 animate-spin" />
          <span className="ml-2">Loading Testimonial...</span>
        </div>
      </XModal>
    );
  }

  if (isEditMode && status === 'error') {
    return (
      <XModal
        closeModal={handleCloseModal}
        bgClose={false}
        isOpen={isOpen.CREATE_TESTIMONIAL_MODAL}
        title="Testimonial"
      >
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <p className="mb-4 text-red-500">Failed to get hero section. Please try again.</p>
          <Button onClick={handleCloseModal} variant="outline">
            Close
          </Button>
        </div>
      </XModal>
    );
  }

  return (
    <XModal
      closeModal={handleCloseModal}
      bgClose={false}
      isOpen={isOpen.CREATE_TESTIMONIAL_MODAL}
      title="Testimonial"
    >
      <div className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col space-y-4">
            <fieldset disabled={isLoading.create_testimonial} className="w-full">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <TextareaField label="Description" placeholder="" required {...field} />
                )}
              />

              <FormField
                control={form.control}
                name="author.fullName"
                render={({ field }) => (
                  <InputField label="Author's full name" placeholder="" required {...field} />
                )}
              />

              <FormField
                control={form.control}
                name="author.role"
                render={({ field }) => (
                  <InputField label="Author's role" placeholder="" required {...field} />
                )}
              />

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
                  upload author&apos;s photo
                </Button>
              )}

              {form?.formState?.errors?.author?.media?.message && (
                <p className="text-[0.8rem] font-medium text-destructive">
                  {form?.formState?.errors?.author?.media?.message}
                </p>
              )}

              <div className="flex flex-col">
                <div className="my-4 flex w-full flex-wrap justify-start gap-5">
                  {fields.map(({ id, file }, idx) => (
                    <FilePreview
                      key={id}
                      {...{ file, id, idx, bucket: 'cloudinary' }}
                      remove={handleRemove}
                      update={handleUpdate}
                      error={form.formState.errors?.author?.media?.[idx]?.message}
                    />
                  ))}
                </div>
              </div>

              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <InputRating label="Rating" placeholder="" required {...field} />
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <InputSelect
                    label="Status"
                    placeholder="Select a status"
                    items={testimonialStatus}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    {...field}
                  />
                )}
              />
            </fieldset>

            <div className="flex items-center justify-end space-x-2">
              <Button
                disabled={isLoading.create_testimonial}
                type="button"
                variant="outline"
                onClick={handleCloseModal}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-blue-400"
                disabled={disableSubmit || isLoading.create_testimonial}
              >
                {isLoading.create_testimonial && <Loader className="animate-spin" />}
                {isEditMode ? 'Update' : 'Create'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </XModal>
  );
};

export default observer(AdminTestimonialModal);
