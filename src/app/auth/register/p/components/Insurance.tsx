'use client';
import { CardContent } from '@/components/ui/card';
import Button from '@/atoms/Buttons';
import { SubTitle } from '@/atoms/typographys';
import Input from '@/atoms/fields/Input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { PatientInsuranceSchema, TPatientInsuranceSchema } from '../../../validation';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/store';
import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { EnumPatientForm } from '@/constants/mangle';

function InsuranceForm() {
  const {
    PatientStore: { insuranceInfo, setInsuranceInfo, setCurrentForm }
  } = useStore();
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    reset,
    formState: { errors }
  } = useForm<TPatientInsuranceSchema>({
    defaultValues: insuranceInfo,
    mode: 'onSubmit',
    resolver: zodResolver(PatientInsuranceSchema),
    reValidateMode: 'onSubmit'
  });

  const onSubmit: SubmitHandler<TPatientInsuranceSchema> = async (formData) => {
    setInsuranceInfo(formData, () => {});
  };

  const handleSetValue = (key: string, value: string) => {
    const _typeKey = key as keyof TPatientInsuranceSchema;
    setValue(_typeKey, value);
    clearErrors(_typeKey);
  };

  useEffect(() => {
    reset(insuranceInfo);
  }, []);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
      <CardContent className="flex flex-col space-y-4 rounded-2xl bg-white py-6 shadow-lg">
        <SubTitle className="!text-center" text="Insurance Information" />

        <fieldset className="">
          <Input
            type="text"
            id="emailAddress"
            label="Primary insurance provider"
            placeholder="United Health"
            {...register('primaryInsuranceProvider')}
            error={errors.primaryInsuranceProvider?.message}
          />

          <div className="mb-1 flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4">
            <Input
              className="md:mb-0 md:w-[50%]"
              type="text"
              id="fname"
              label="Insurance plan"
              placeholder="Health"
              {...register('insurancePlanName')}
              error={errors.insurancePlanName?.message}
            />
            <Input
              className="md:mb-0 md:w-[50%]"
              type="text"
              id="lname"
              label="Insurance Phone number"
              placeholder="08123456789"
              {...register('insurancePhoneNumber')}
              error={errors.insurancePhoneNumber?.message}
            />
          </div>
          <div className="mb-1 flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4">
            <Input
              className="md:mb-0 md:w-[50%]"
              type="text"
              id="fname"
              label="Policy No"
              placeholder="0054689"
              {...register('policyNumber')}
              error={errors.policyNumber?.message}
            />
            <Input
              className="md:mb-0 md:w-[50%]"
              type="text"
              id="lname"
              label="Group No"
              placeholder="97657"
              {...register('groupNumber')}
              error={errors.groupNumber?.message}
            />
          </div>
          <label className="mb-3 font-medium">Policy Holder</label>

          <div className="mt-3">
            <div className="mb-1 flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4">
              <Input
                className="md:mb-0 md:w-[50%]"
                type="text"
                id="fname"
                placeholder="First name"
                {...register('policyHolder.firstName')}
                error={errors.policyHolder?.firstName?.message}
              />
              <Input
                className="md:mb-0 md:w-[50%]"
                type="text"
                id="lname"
                placeholder="Last Name"
                {...register('policyHolder.lastName')}
                error={errors.policyHolder?.lastName?.message}
              />
            </div>
            <Input
              type="text"
              placeholder="Phone number"
              {...register('policyHolder.phoneNumber')}
              error={errors.policyHolder?.phoneNumber?.message}
            />
          </div>
        </fieldset>
      </CardContent>

      <div className="flex items-center justify-between space-x-2">
        <Button
          type="button"
          variant="transparent"
          text="Prev"
          onClick={() => setCurrentForm(EnumPatientForm.CONTACT)}
        />
        <Button type="submit" variant="filled" text="Submit" />
      </div>
    </form>
  );
}

export default observer(InsuranceForm);
