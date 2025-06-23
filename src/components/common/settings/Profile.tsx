'use client';
import React from 'react';
import Input from '@/atoms/fields/Input';
import { useForm } from 'react-hook-form';
import { ProfileSettingSchema, TProfileSettingsSchema } from './validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField } from '@/components/ui/form';
import InputField from '@/atoms/fields/NewInput';
import InputNumPatternField from '@/atoms/fields/PhoneNumberInput';

const Profile = () => {
  const form = useForm<TProfileSettingsSchema>({
    mode: 'onChange',
    resolver: zodResolver(ProfileSettingSchema),
    reValidateMode: 'onChange'
  });

  const onSubmit = () => {};

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <fieldset className="">
            <div className="mb-1 flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <div className="md:mb-0 md:w-[50%]">
                    <InputField label="first Name" placeholder="John" required {...field} />
                  </div>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <div className="md:mb-0 md:w-[50%]">
                    <InputField label="Last Name" placeholder="Doe" required {...field} />
                  </div>
                )}
              />
            </div>
            <div className="mb-1 flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <div className="md:mb-0 md:w-[50%]">
                    <InputField
                      type="email"
                      label="Email Address"
                      placeholder="adeolu@gmail.com"
                      {...field}
                    />
                  </div>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <div className="md:mb-0 md:w-[50%]">
                    <InputNumPatternField
                      label="Phone Number"
                      format="(+234) ### #### ###"
                      allowEmptyFormatting
                      mask=" "
                      {...field}
                    />
                  </div>
                )}
              />
            </div>
            <div className="mb-1 flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4">
              <Input
                className="md:mb-0 md:w-[50%]"
                type="text"
                id="fname"
                label="First Name"
                placeholder="Adeolu"
              />
              <Input
                className="md:mb-0 md:w-[50%]"
                type="text"
                id="lname"
                label="Last Name"
                placeholder="John"
              />
            </div>

            <div className="mb-1 flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4">
              <Input
                className="md:mb-0 md:w-[50%]"
                type="text"
                id="fname"
                label="First Name"
                placeholder="Adeolu"
              />
              <Input
                className="md:mb-0 md:w-[50%]"
                type="text"
                id="lname"
                label="Last Name"
                placeholder="John"
              />
            </div>
          </fieldset>
        </form>
      </Form>
    </div>
  );
};

export default Profile;
