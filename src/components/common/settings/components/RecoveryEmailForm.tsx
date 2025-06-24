'use client';
import Button from '@/atoms/Buttons';
import { Paragraph } from '@/atoms/typographys';
import { Form, FormField } from '@/components/ui/form';
import React from 'react';
import { useForm } from 'react-hook-form';
import { RecoveryEmailSchema, TRecoveryEmailSchema } from '../validations';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '@/atoms/fields/NewInput';

const RecoveryPhoneForm = () => {
  const form = useForm<TRecoveryEmailSchema>({
    mode: 'onSubmit',
    resolver: zodResolver(RecoveryEmailSchema),
    reValidateMode: 'onChange'
  });

  const onSubmit = (formData: TRecoveryEmailSchema) => {
    console.log(formData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex items-center justify-between space-x-6">
          <div className="w-full max-w-[450px]">
            <Paragraph className="!font-medium" text="Recovery Email Address" />
            <Paragraph text="Set up recovery email address to secure your Account." />
          </div>

          <Button type="submit" className="!w-16" size="sm" variant="filled">
            update
          </Button>
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <div className="w-1/2">
              <InputField label="" placeholder="recovery email" {...field} />
            </div>
          )}
        />
      </form>
    </Form>
  );
};

export default RecoveryPhoneForm;
