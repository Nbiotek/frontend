'use client';
import { CardContent } from '@/components/ui/card';
import { SubTitle } from '@/atoms/typographys';
import Input from '@/atoms/fields/Input';
import { useFormContext } from 'react-hook-form';
import { TPatientInsuranceSchema } from '../../validation';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/store';
import { useEffect } from 'react';

function InsuranceForm() {
  const {
    PatientStore: { isLoading, insuranceInfo }
  } = useStore();
  const {
    register,
    reset,
    watch,
    formState: { errors }
  } = useFormContext<TPatientInsuranceSchema>();

  const provider = watch('primaryInsuranceProvider');

  useEffect(() => {
    reset(insuranceInfo);
  }, []);

  return (
    <div className="flex flex-col space-y-4">
      <CardContent className="flex flex-col space-y-4 rounded-lg bg-white py-6">
        <SubTitle className="!text-center" text="Insurance Information" />

        <fieldset disabled={isLoading.regPatient} className="">
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
              disabled={Boolean(!provider)}
              type="text"
              id="fname"
              label="Insurance plan"
              placeholder="Health"
              {...register('insurancePlanName')}
              error={errors.insurancePlanName?.message}
            />
            <Input
              disabled={Boolean(!provider)}
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
              disabled={Boolean(!provider)}
              className="md:mb-0 md:w-[50%]"
              type="text"
              id="fname"
              label="Policy No"
              placeholder="0054689"
              {...register('policyNumber')}
              error={errors.policyNumber?.message}
            />
            <Input
              disabled={Boolean(!provider)}
              className="md:mb-0 md:w-[50%]"
              type="text"
              id="lname"
              label="Group No"
              placeholder="97657"
              {...register('groupNumber')}
              error={errors.groupNumber?.message}
            />
          </div>

          <fieldset disabled={Boolean(!provider)}>
            <label className="mb-3 font-medium">Policy Holder</label>

            <div className="mt-3">
              <div className="mb-1 flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4">
                <Input
                  disabled={Boolean(!provider)}
                  className="md:mb-0 md:w-[50%]"
                  type="text"
                  id="fname"
                  placeholder="First name"
                  {...register('policyHolder.firstName')}
                  error={errors.policyHolder?.firstName?.message}
                />
                <Input
                  disabled={Boolean(!provider)}
                  className="md:mb-0 md:w-[50%]"
                  type="text"
                  id="lname"
                  placeholder="Last Name"
                  {...register('policyHolder.lastName')}
                  error={errors.policyHolder?.lastName?.message}
                />
              </div>
              <Input
                disabled={Boolean(!provider)}
                type="text"
                placeholder="Phone number"
                {...register('policyHolder.phoneNumber')}
                error={errors.policyHolder?.phoneNumber?.message}
              />
            </div>
          </fieldset>
        </fieldset>
      </CardContent>
    </div>
  );
}

export default observer(InsuranceForm);
