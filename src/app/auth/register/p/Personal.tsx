'use client';
import { CardContent } from '@/components/ui/card';
import Button from '@/atoms/Buttons';
import { SubTitle } from '@/atoms/typographys';
import Input from '@/atoms/fields/Input';
import { useRouter } from 'next/navigation';
import ROUTES from '@/constants/routes';
import InputSelect from '@/atoms/fields/InputSelect';
import { gender, maritalStatus } from '@/constants/data';
import { SubmitHandler, useForm } from 'react-hook-form';
import { PatientPersonalSchema, TPatientPersonalSchema } from '../../validation';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomDate from '@/atoms/fields/CustomDate';

export default function PersonalForm() {
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors }
  } = useForm<TPatientPersonalSchema>({
    mode: 'onSubmit',
    resolver: zodResolver(PatientPersonalSchema),
    reValidateMode: 'onSubmit'
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<TPatientPersonalSchema> = async (formData) => {
    console.log(formData);
    router.push(ROUTES.PATIENT_REG_CONTACT.path);
  };

  const handleSetValue = (key: string, value: string) => {
    const _typeKey = key as keyof TPatientPersonalSchema;
    setValue(_typeKey, value);
    clearErrors(_typeKey);
  };

  const handleSetDate = (val: Date) => {
    setValue('dob', val.toISOString());
    clearErrors('dob');
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
      <CardContent className="flex flex-col space-y-4 rounded-2xl bg-white py-6 shadow-lg">
        <SubTitle className="!text-center" text="Personal Information" />

        <fieldset className="">
          <div className="mb-1 flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4">
            <Input
              className="md:mb-0 md:w-[50%]"
              type="text"
              id="fname"
              label="First Name"
              placeholder="Adeolu"
              {...register('firstName')}
              error={errors.firstName?.message}
            />
            <Input
              className="md:mb-0 md:w-[50%]"
              type="text"
              id="lname"
              label="Last Name"
              placeholder="John"
              {...register('lastName')}
              error={errors.lastName?.message}
            />
          </div>
          <Input
            className="mb-1"
            type="email"
            id="emailAddress"
            label="Email Address"
            placeholder="adeolujohn@gmail.com"
            {...register('email')}
            error={errors.email?.message}
          />
          <div className="mb-1 flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4">
            <Input
              className="md:mb-0 md:w-[50%]"
              type="text"
              id="phone_number"
              label="Phone Number"
              placeholder="08123456789"
              {...register('phoneNumber')}
              error={errors.phoneNumber?.message}
            />

            <CustomDate
              className="md:w-[50%]"
              id="dob"
              label="Date of Birth"
              showTime={false}
              error={errors.dob?.message}
              placeholder="Jan 1, 2000"
              handleSetDate={handleSetDate}
            />
          </div>

          <div className="">
            <div className="mb-1 flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4">
              <InputSelect
                className="md:w-[50%]"
                id="gender"
                label="Gender"
                name="gender"
                items={gender}
                handleSetValue={handleSetValue}
                error={errors.gender?.message}
              />

              <InputSelect
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
      </CardContent>
      <Button type="submit" variant="filled">
        Next
      </Button>
    </form>
  );
}
