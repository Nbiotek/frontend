import { XModal } from '@/atoms/modal';
import { AppModals } from '@/store/AppConfig/appModalTypes';
import { useStore } from '@/store';
import { observer } from 'mobx-react-lite';
import { useUpdateQCStatus } from '@/hooks/labCoord/useUpdateQCStatus';
import { Paragraph } from '@/atoms/typographys';
import Button from '@/atoms/Buttons';
import { EnumResultStatus } from '@/atoms/Buttons/Status';
import { useState } from 'react';
import { z } from 'zod';
import { Form, FormField } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '@/atoms/fields/NewInput';

const qcStatusShema = z.object({
  reason: z.string().optional()
});

type TQcSchema = z.infer<typeof qcStatusShema>;

const QCStatusModal = () => {
  const {
    AppConfigStore: { isOpen, toggleModals, qcStatusUpdate }
  } = useStore();

  const { mutate, isPending } = useUpdateQCStatus(() => toggleModals({}));
  const [status, setStatus] = useState('');

  const form = useForm({
    resolver: zodResolver(qcStatusShema)
  });

  const onSubmit = (formData: TQcSchema) => {
    if (status === EnumResultStatus.FAILED && !formData.reason) {
      form.setError('reason', { message: 'Give reasons for failing the test.' });
      return;
    }
    mutate({
      id: qcStatusUpdate.testId,
      payload: { status: status as EnumResultStatus, reason: formData.reason || '' }
    });
  };

  return (
    <XModal
      closeModal={() => toggleModals({ name: AppModals.QC_STATUS_UPDATE, open: false })}
      bgClose={false}
      isOpen={isOpen.QC_STATUS_UPDATE}
      className="!max-w-[450px]"
      title="Update QC Status"
    >
      <div className="flex w-full flex-col space-y-4 bg-white">
        <Paragraph text="You are about to update the Quality control status of a test." />

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col space-y-2 bg-white"
          >
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <div>
                  <InputField label="" placeholder="Reason for failing test..." {...field} />
                </div>
              )}
            />
            <div className="flex items-center justify-end space-x-3">
              <Button
                type="submit"
                className="!w-24"
                disabled={isPending}
                isLoading={isPending && status === EnumResultStatus.FAILED}
                variant="danger"
                text="Fail"
                onClick={() => setStatus(EnumResultStatus.FAILED)}
              />
              <Button
                type="submit"
                className="!w-24"
                disabled={isPending}
                isLoading={isPending && status === EnumResultStatus.PASSED}
                variant="filled"
                text="Pass"
                onClick={() => setStatus(EnumResultStatus.PASSED)}
              />
            </div>
          </form>
        </Form>
      </div>
    </XModal>
  );
};

export default observer(QCStatusModal);
