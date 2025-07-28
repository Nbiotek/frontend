import React, { useEffect, useState } from 'react';
import Button from '@/atoms/Buttons';
import { Paragraph } from '@/atoms/typographys';
import { Form, FormField } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { RecoveryPhoneSchema, TRecoveryPhoneSchema } from '../validations';
import { zodResolver } from '@hookform/resolvers/zod';
import InputNumPatternField from '@/atoms/fields/PhoneNumberInput';
import { useFetchProfileSettings } from '@/hooks/settings/useFetchProfileSettings';
import { useStore } from '@/store';
import { observer } from 'mobx-react-lite';
import { useQueryClient } from '@tanstack/react-query';
import { SETTINGS } from '@/constants/api';

const RecoveryPhoneForm = () => {
  const [recoveryNumber, setRecoveryNumber] = useState<Partial<TRecoveryPhoneSchema>>({});
  const { data, isLoading } = useFetchProfileSettings();
  const {
    SettingsStore: { updateRecoveryNumber, isSettingsLoading }
  } = useStore();
  const form = useForm<TRecoveryPhoneSchema>({
    mode: 'onSubmit',
    resolver: zodResolver(RecoveryPhoneSchema),
    reValidateMode: 'onChange'
  });
  const queryClient = useQueryClient();
  const onSubmit = (formData: TRecoveryPhoneSchema) => {
    updateRecoveryNumber(formData, () =>
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] == SETTINGS.PROFILE
      })
    );
  };

  useEffect(() => {
    if (!isLoading && data !== undefined) {
      const { recoveryPhone } = data;

      if (recoveryPhone) {
        setRecoveryNumber({ recoveryPhone });
        form.reset({ recoveryPhone: recoveryPhone.slice(3) });
      }
    }
  }, [data, isLoading]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset disabled={isSettingsLoading.updateRecoveryNumber}>
          <div className="flex items-center justify-between space-x-6">
            <div className="w-full max-w-[450px]">
              <Paragraph className="!font-medium" text="Recovery Phone number" />
              <Paragraph text="Set up recovery phone number to secure your Account." />
            </div>

            <Button
              disabled={isSettingsLoading.updateRecoveryNumber}
              isLoading={isSettingsLoading.updateRecoveryNumber}
              type="submit"
              className="!w-16"
              size="sm"
              variant="filled"
            >
              update
            </Button>
          </div>

          <FormField
            control={form.control}
            name="recoveryPhone"
            render={({ field }) => (
              <div className="w-1/2">
                <InputNumPatternField
                  label=""
                  format="(+234) ### #### ###"
                  allowEmptyFormatting
                  mask=" "
                  {...field}
                />
              </div>
            )}
          />
        </fieldset>
      </form>
    </Form>
  );
};

export default observer(RecoveryPhoneForm);
