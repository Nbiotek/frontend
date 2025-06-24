import Button from '@/atoms/Buttons';
import { Paragraph } from '@/atoms/typographys';
import { Form, FormField } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { TUpdatePwdSchema, UpdatePwdSchema } from '../validations';
import InputField from '@/atoms/fields/NewInput';

const PwdChangeForm = () => {
  const form = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(UpdatePwdSchema),
    reValidateMode: 'onChange'
  });

  const onSubmit = (formData: TUpdatePwdSchema) => {
    console.log(formData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full max-w-96 flex-col justify-start space-y-3"
      >
        <div className="w-full">
          <Paragraph className="!font-medium" text="Update Password" />
          <Paragraph text="Change your password to update and protect your account" />
        </div>

        <fieldset className="flex flex-col space-y-2">
          <div>
            <FormField
              control={form.control}
              name="old_password"
              render={({ field }) => (
                <div>
                  <InputField type="password" label="" placeholder="old password" {...field} />
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="new_password"
              render={({ field }) => (
                <div>
                  <InputField type="password" label="" placeholder="new password" {...field} />
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <div>
                  <InputField type="password" label="" placeholder="confirm password" {...field} />
                </div>
              )}
            />
          </div>

          <Button variant="filled">Update</Button>
        </fieldset>
      </form>
    </Form>
  );
};

export default PwdChangeForm;
