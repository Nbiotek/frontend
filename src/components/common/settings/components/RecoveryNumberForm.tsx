import Button from '@/atoms/Buttons';
import { Paragraph } from '@/atoms/typographys';
import { Form, FormField } from '@/components/ui/form';
import React from 'react';
import { useForm } from 'react-hook-form';
import { RecoveryPhoneSchema, TRecoveryPhoneSchema } from '../validations';
import { zodResolver } from '@hookform/resolvers/zod';
import InputNumPatternField from '@/atoms/fields/PhoneNumberInput';

const RecoveryPhoneForm = () => {
  const form = useForm<TRecoveryPhoneSchema>({
    mode: 'onSubmit',
    resolver: zodResolver(RecoveryPhoneSchema),
    reValidateMode: 'onChange'
  });

  const onSubmit = (formData: TRecoveryPhoneSchema) => {
    console.log(formData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex items-center justify-between space-x-6">
          <div className="w-full max-w-[450px]">
            <Paragraph className="!font-medium" text="Recovery Phone number" />
            <Paragraph text="Set up recovery phone number to secure your Account." />
          </div>

          <Button type="submit" className="!w-16" size="sm" variant="filled">
            update
          </Button>
        </div>

        <FormField
          control={form.control}
          name="phoneNumber"
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
      </form>
    </Form>
  );
};

export default RecoveryPhoneForm;
