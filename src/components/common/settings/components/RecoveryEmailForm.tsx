'use client';
import Button from '@/atoms/Buttons';
import { Paragraph } from '@/atoms/typographys';
import { Form, FormField } from '@/components/ui/form';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RecoveryEmailSchema, TRecoveryEmailSchema } from '../validations';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '@/atoms/fields/NewInput';
import { useStore } from '@/store';
import { useFetchProfileSettings } from '@/hooks/settings/useFetchProfileSettings';
import { observer } from 'mobx-react-lite';
import { useQueryClient } from '@tanstack/react-query';
import { SETTINGS } from '@/constants/api';

const RecoveryPhoneForm = () => {
  const [recoveryMail, setRecoveryMail] = useState<Partial<TRecoveryEmailSchema>>({});
  const { data, isLoading } = useFetchProfileSettings();
  const {
    SettingsStore: { updateRecoveryMail, isSettingsLoading }
  } = useStore();
  const form = useForm<TRecoveryEmailSchema>({
    mode: 'onSubmit',
    resolver: zodResolver(RecoveryEmailSchema),
    reValidateMode: 'onChange'
  });

  const queryClient = useQueryClient();

  const onSubmit = (formData: TRecoveryEmailSchema) => {
    updateRecoveryMail(formData, () =>
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] == SETTINGS.PROFILE
      })
    );
  };

  useEffect(() => {
    if (!isLoading && data !== undefined) {
      const { recoveryEmail } = data;

      setRecoveryMail({ recoveryEmail });
      form.reset({ recoveryEmail });
    }
  }, [data, isLoading]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset disabled={isSettingsLoading.updateRecoveryMail}>
          <div className="flex items-center justify-between space-x-6">
            <div className="w-full max-w-[450px]">
              <Paragraph className="!font-medium" text="Recovery Email Address" />
              <Paragraph text="Set up recovery email address to secure your Account." />
            </div>

            <Button
              disabled={isSettingsLoading.updateRecoveryMail}
              isLoading={isSettingsLoading.updateRecoveryMail}
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
            name="recoveryEmail"
            render={({ field }) => (
              <div className="w-1/2">
                <InputField label="" placeholder="recovery email" {...field} />
              </div>
            )}
          />
        </fieldset>
      </form>
    </Form>
  );
};

export default observer(RecoveryPhoneForm);
