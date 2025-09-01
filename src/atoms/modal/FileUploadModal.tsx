import { useEffect } from 'react';
import { XModal } from '.';
import { useStore } from '@/store';
import { observer } from 'mobx-react-lite';
import FileInput from '@/atoms/fields/FileInput';
import { mediaAcceptTypes } from '@/constants';
import { AppModals } from '@/store/AppConfig/appModalTypes';
import { Form, FormField } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { fileObjectSchema, fileSchema } from '@/app/(modules)/lab-tech/tests/components/validation';
import z from 'zod';

const MediaUploadModal = () => {
  const {
    AppConfigStore: { toggleModals, isOpen, fileModalUpload, mediaMultiple }
  } = useStore();

  const form = useForm({
    mode: 'onChange',
    resolver: zodResolver(
      z.object({
        file: z.array(z.union([fileSchema, fileObjectSchema]))
      })
    ),
    reValidateMode: 'onChange'
  });

  useEffect(() => {
    const values = form.getValues();
    const errors = form.formState.errors;

    if (values.file && !errors.file?.message) {
      fileModalUpload.handlerFn(values.file as File[]);
    }
  }, [form.watch('file')]);

  return (
    <XModal
      isOpen={isOpen.FILE_UPLOAD_MODAL}
      closeModal={() => toggleModals({ name: AppModals.FILE_UPLOAD_MODAL, open: false })}
      bgClose={false}
      title="Upload files"
      className="!max-w-[1200px]"
    >
      <Form {...form}>
        <div className="h-[500px] w-full overflow-y-scroll">
          <FormField
            control={form.control}
            name="file"
            render={({ field: { onChange } }) => (
              <FileInput
                type="file"
                multiple={mediaMultiple}
                accept={mediaAcceptTypes}
                onChange={(event) => onChange(event.target.files)}
                errors={form?.formState?.errors?.file?.message}
              />
            )}
          />
        </div>
      </Form>
    </XModal>
  );
};

export default observer(MediaUploadModal);
