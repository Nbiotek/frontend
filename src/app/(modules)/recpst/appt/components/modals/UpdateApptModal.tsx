import { XModal } from '@/atoms/modal';
import { useStore } from '@/store';
import { observer } from 'mobx-react-lite';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { putUpdateAppt } from '@/requests/recept';
import { AppModals } from '@/store/AppConfig/appModalTypes';
import { Form, FormField } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import z from 'zod';
import InputSelect from '@/atoms/fields/NewInputSelect';
import { AppointmentStatus, PaymentStatus } from '@/constants/data';
import InputDate from '@/atoms/fields/InputDate';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from 'lucide-react';
import toast from 'react-hot-toast';
import { useFetchSingleAppt } from '@/hooks/recpst/useFetchSingleAppt';
import Status from '@/atoms/Buttons/Status';
import { formatTestDate } from '@/utils/date';
import { useEffect, useMemo } from 'react';
import { recpst } from '@/hooks/recpst/FetchKeyFactory';

export const ApptInfoSchema = z
  .object({
    paymentStatus: z.string().optional(),
    status: z.string().optional(),
    appointmentDate: z.date().optional()
  })
  .superRefine((data, ctx) => {
    const { appointmentDate } = data;

    if (appointmentDate) {
      const currentDate = new Date().getTime();
      const appointmentTime = new Date(appointmentDate).getTime();

      if (currentDate > appointmentTime) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Set a future date pls.',
          path: ['appointmentDate']
        });
      }
    }
  });

export type TApptInfoSchema = z.infer<typeof ApptInfoSchema>;

const UpdateApptModal = () => {
  const {
    AppConfigStore: { isOpen, toggleModals, singleAppt }
  } = useStore();
  const { data, isLoading } = useFetchSingleAppt(singleAppt.id);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: putUpdateAppt,
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === recpst.getReceptAppointmentBase('').keys()[0]
      });
      toast.success(data.data.message);
      handleClose();
    }
  });

  const form = useForm<TApptInfoSchema>({
    mode: 'onSubmit',
    resolver: zodResolver(ApptInfoSchema),
    reValidateMode: 'onChange'
  });

  const formValues = form.watch();

  const hasChanges = useMemo(() => {
    if (!data) return false;

    if (formValues.paymentStatus && formValues.paymentStatus !== data.paymentStatus) {
      return true;
    }

    if (formValues.status && formValues.status !== data.status) {
      return true;
    }

    const originalDate = data.appointmentDate ? new Date(data.appointmentDate).getTime() : null;
    const currentDate = formValues.appointmentDate
      ? new Date(formValues.appointmentDate).getTime()
      : null;

    if (currentDate && originalDate !== currentDate) {
      return true;
    }

    return false;
  }, [formValues, data]);

  function onSubmit(formData: TApptInfoSchema) {
    if (hasChanges) {
      const payload: TApptInfoSchema = {};

      if (formData.appointmentDate) {
        payload.appointmentDate = formData.appointmentDate;
      }

      if (formData.paymentStatus) {
        payload.paymentStatus = formData.paymentStatus;
      }

      if (formData.status) {
        payload.status = formData.status;
      }

      mutate({ id: singleAppt.id, payload });
    } else {
      toast.error('No changes detected');
    }
  }

  const handleClose = () => toggleModals({ open: false, name: AppModals.UPDATE_APPOINTMENT });

  useEffect(() => {
    if (!isLoading && data !== undefined) {
      form.reset({
        status: data.status,
        paymentStatus: data.paymentStatus,
        appointmentDate: new Date(data.appointmentDate)
      });
    }
  }, [data, isLoading]);

  return (
    <XModal
      closeModal={handleClose}
      bgClose={false}
      isOpen={isOpen.UPDATE_APPOINTMENT}
      className="!max-w-[350px]"
      title="Update Appointment"
    >
      <div className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
            <div className="flex w-full flex-col gap-2">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <div>
                    <InputSelect
                      items={AppointmentStatus}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      label="Status"
                      placeholder="select status"
                      {...field}
                    />
                    {data && <Status variant={data.status} />}
                  </div>
                )}
              />

              <FormField
                control={form.control}
                name="paymentStatus"
                render={({ field }) => (
                  <div>
                    <InputSelect
                      items={PaymentStatus}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      label="Payment status"
                      placeholder="select status"
                      {...field}
                    />
                    {data && <Status variant={data.paymentStatus} />}
                  </div>
                )}
              />

              <FormField
                control={form.control}
                name="appointmentDate"
                render={({ field }) => (
                  <div>
                    <InputDate
                      label="Appointment Date"
                      placeholder="Select appointment date"
                      granularity="minute"
                      hourCycle={12}
                      displayFormat={{ hour24: 'yyyy/MM/dd' }}
                      yearRange={0}
                      value={field.value}
                      onChange={field.onChange}
                      hidden={{ before: new Date() }}
                    />
                    {data && <small>{formatTestDate(data.appointmentDate)}</small>}
                  </div>
                )}
              />
            </div>

            <div className="flex items-center justify-end space-x-2">
              <Button
                disabled={isPending || isLoading}
                type="button"
                onClick={handleClose}
                variant="secondary"
              >
                Back
              </Button>
              <Button disabled={isPending || isLoading || !hasChanges} type="submit">
                {isPending && <Loader className="animate-spin" />}
                Update
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </XModal>
  );
};

export default observer(UpdateApptModal);
