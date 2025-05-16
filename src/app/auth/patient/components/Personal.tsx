'use client';
import Button from '@/atoms/Buttons';
import { SubTitle } from '@/atoms/typographys';
import Input from '@/atoms/fields/Input';
import InputSelect from '@/atoms/fields/InputSelect';
import { gender, maritalStatus } from '@/constants/data';
import { SubmitHandler, useForm } from 'react-hook-form';
import { PatientPersonalSchema, TPatientPersonalSchema } from '../../validation';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomDate from '@/atoms/fields/CustomDate';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/store';
import { useEffect, useState } from 'react';
import { EnumRole } from '@/constants/mangle';
import { toJS } from 'mobx';
import { useFetchProfile } from '@/hooks/user/useFetchProfile';

function PersonalForm() {
  const { data, isLoading } = useFetchProfile();
  const {
    PatientStore: { personalInfo, setPersonalInfo },
    AuthStore: { user }
  } = useStore();
  const [disable, setDisable] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    reset,
    formState: { errors }
  } = useForm<TPatientPersonalSchema>({
    defaultValues: personalInfo,
    mode: 'onSubmit',
    resolver: zodResolver(PatientPersonalSchema),
    reValidateMode: 'onSubmit'
  });

  const onSubmit: SubmitHandler<TPatientPersonalSchema> = async (formData) => {
    setPersonalInfo(formData);
  };

  const handleSetValue = (key: string, value: string) => {
    const _typeKey = key as keyof TPatientPersonalSchema;
    setValue(_typeKey, value);
    clearErrors(_typeKey);
  };

  const handleSetDate = (val: Date) => {
    setValue('dateOfBirth', val.toISOString());
    clearErrors('dateOfBirth');
  };

  useEffect(() => {
    reset(personalInfo);
    if (personalInfo.height) {
      setValue('height', String(personalInfo.height));
    }

    setDisable(user && user.role === EnumRole.PATIENT);

    if (personalInfo.weight) {
      setValue('weight', String(personalInfo.weight));
    }
  }, []);

  useEffect(() => {
    if (disable) {
      if (!isLoading && data) {
        setValue('firstName', data.first_name as string);
        setValue('lastName', data.last_name as string);
        setValue('email', data.email as string);
      }
    }
  }, [isLoading, data, disable]);

  return (
    <div className="flex w-full flex-col space-y-4 rounded-lg bg-white">
      <SubTitle className="!text-center" text="Personal Information" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="w-full">
          <div className="mb-1 flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4">
            <Input
              required={true}
              className="md:mb-0 md:w-[50%]"
              type="text"
              id="fname"
              label="First Name"
              placeholder="Adeolu"
              {...register('firstName')}
              error={errors.firstName?.message}
              disabled={disable}
            />
            <Input
              required={true}
              className="md:mb-0 md:w-[50%]"
              type="text"
              id="lname"
              label="Last Name"
              placeholder="John"
              {...register('lastName')}
              error={errors.lastName?.message}
              disabled={disable}
            />
          </div>

          <Input
            required={true}
            type="text"
            id="email"
            label="Email"
            placeholder="johndoes@gmail.com"
            {...register('email')}
            error={errors.email?.message}
            disabled={disable}
          />
          <div className="mb-1 flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4">
            <Input
              required={true}
              className="md:mb-0 md:w-[50%]"
              type="text"
              id="phone_number"
              label="Phone Number"
              placeholder="08123456789"
              {...register('phoneNumber')}
              error={errors.phoneNumber?.message}
            />

            <div className="md:w-[50%]">
              <CustomDate
                required={true}
                id="dateOfBirth"
                label="Date of Birth"
                showTime={false}
                error={errors.dateOfBirth?.message}
                placeholder="Jan 1, 2000"
                handleSetDate={handleSetDate}
              />
            </div>
          </div>

          <div className="">
            <div className="mb-1 flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4">
              <InputSelect
                required={true}
                className="md:w-[50%]"
                id="gender"
                label="Gender"
                name="gender"
                items={gender}
                handleSetValue={handleSetValue}
                error={errors.gender?.message}
              />

              <InputSelect
                required={true}
                className="md:w-[50%]"
                id="marital_status"
                label="Marital status"
                name="maritalStatus"
                items={maritalStatus}
                handleSetValue={handleSetValue}
                error={errors.maritalStatus?.message}
              />
            </div>

            <div className="mb-1 flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4">
              <Input
                className="md:mb-0 md:w-[50%]"
                type="text"
                id="weight"
                label="Weight (kg)"
                placeholder="120"
                {...register('weight')}
                error={errors.weight?.message}
              />
              <Input
                className="md:mb-0 md:w-[50%]"
                type="text"
                id="height"
                label="Height (cm)"
                placeholder="178"
                {...register('height')}
                error={errors.height?.message}
              />
            </div>
          </div>
        </fieldset>

        <Button type="submit" variant="filled">
          Next
        </Button>
      </form>
    </div>
  );
}

export default observer(PersonalForm);
