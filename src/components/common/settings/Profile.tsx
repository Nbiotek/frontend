'use client';
import React from 'react';
import Input from '@/atoms/fields/Input';
import { useForm } from 'react-hook-form';
import { ProfileSettingSchema, TProfileSettingsSchema } from './validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField } from '@/components/ui/form';
import InputField from '@/atoms/fields/NewInput';
import InputNumPatternField from '@/atoms/fields/PhoneNumberInput';
import InputDate from '@/atoms/fields/InputDate';
import InputSelect from '@/atoms/fields/NewInputSelect';
import { gender, maritalStatus } from '@/constants/data';
import Button from '@/atoms/Buttons';

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
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-6">
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
                      required
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
                      required
                      {...field}
                    />
                  </div>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="homeAddress"
              render={({ field }) => (
                <div>
                  <InputField label="Home address" placeholder="" required {...field} />
                </div>
              )}
            />
            <div className="mb-1 flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4">
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <div className="md:w-[50%]">
                    <InputDate
                      label="Date of Birth"
                      placeholder="Jan 1, 2000"
                      granularity="day"
                      hourCycle={12}
                      displayFormat={{ hour24: 'yyyy/MM/dd' }}
                      value={field.value}
                      onChange={field.onChange}
                      hidden={{ after: new Date() }}
                      showTime={false}
                      required
                    />
                  </div>
                )}
              />

              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <div className="md:mb-0 md:w-[50%]">
                    <InputField label="Zip code" placeholder="" {...field} />
                  </div>
                )}
              />
            </div>

            <div className="mb-1 flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <div className="md:mb-0 md:w-[50%]">
                    <InputField label="City" placeholder="" required {...field} />
                  </div>
                )}
              />

              <FormField
                control={form.control}
                name="landMark"
                render={({ field }) => (
                  <div className="md:mb-0 md:w-[50%]">
                    <InputField label="Land mark" placeholder="" {...field} />
                  </div>
                )}
              />
            </div>

            <div className="mb-1 flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4">
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <div className="md:w-[50%]">
                    <InputSelect
                      label="Gender"
                      placeholder="Select a gender"
                      items={gender}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      required
                      {...field}
                    />
                  </div>
                )}
              />

              <FormField
                control={form.control}
                name="maritalStatus"
                render={({ field }) => (
                  <div className="md:w-[50%]">
                    <InputSelect
                      label="Marital status"
                      placeholder="Select a status"
                      items={maritalStatus}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      required
                      {...field}
                    />
                  </div>
                )}
              />
            </div>
          </fieldset>

          <div className="flex items-center justify-between space-x-4">
            <Button variant="outlined">clear</Button>
            <Button variant="filled">update changes</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Profile;
