'use client';
import { CardContent } from '@/components/ui/card';
import Button from '@/atoms/Buttons';
import { SubTitle } from '@/atoms/typographys';
import Input from '@/atoms/fields/Input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { PatientContactSchema, TPatientContactSchema } from '../../validation';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/store';
import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { EnumPatientForm } from '@/constants/mangle';

function ContactForm() {
  const {
    PatientStore: { contactInfo, setContactInfo, setCurrentForm }
  } = useStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<TPatientContactSchema>({
    mode: 'onSubmit',
    resolver: zodResolver(PatientContactSchema),
    reValidateMode: 'onSubmit'
  });

  const onSubmit: SubmitHandler<TPatientContactSchema> = async (formData) => {
    setContactInfo(formData);
  };

  useEffect(() => {
    reset(contactInfo);
  }, []);
  return (
    <div className="flex w-full flex-col space-y-4 rounded-lg bg-white">
      <SubTitle className="!text-center" text="Contact Information" />

      <form onSubmit={handleSubmit(onSubmit)} className="border">
        <fieldset className="">
          <Input
            required={true}
            type="text"
            id="emailAddress"
            label="Home address"
            placeholder="No 65 Block B1 Westros Est."
            {...register('homeAddress')}
            error={errors.homeAddress?.message}
          />
          <div className="mb-1 flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4">
            <Input
              required={true}
              className="md:mb-0 md:w-[50%]"
              type="text"
              id="fname"
              label="City"
              placeholder="Akure"
              {...register('city')}
              error={errors.city?.message}
            />
            <Input
              required={true}
              className="md:mb-0 md:w-[50%]"
              type="text"
              id="lname"
              label="State"
              placeholder="Ondo"
              {...register('state')}
              error={errors.state?.message}
            />
          </div>
          <div className="mb-1 flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4">
            <Input
              className="md:mb-0 md:w-[50%]"
              type="text"
              id="fname"
              label="Landmark"
              placeholder="behind C.B.N Office"
              {...register('landMark')}
              error={errors.landMark?.message}
            />
            <Input
              required={true}
              className="md:mb-0 md:w-[50%]"
              type="text"
              id="lname"
              label="Zip code"
              placeholder="0000"
              {...register('zipCode')}
              error={errors.zipCode?.message}
            />
          </div>

          <label className="mb-3 font-medium">
            <div className="flex items-center justify-start space-x-1">
              <label className="">Emergency Contact</label>
              <span className="text-red-300">*</span>
            </div>
          </label>

          <div className="mt-3">
            <div className="mb-1 flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4">
              <Input
                required={true}
                className="md:mb-0 md:w-[50%]"
                type="text"
                id="fname"
                placeholder="First Name"
                {...register('emergencyContact.firstName')}
                error={errors.emergencyContact?.firstName?.message}
              />
              <Input
                required={true}
                className="md:mb-0 md:w-[50%]"
                type="text"
                id="lname"
                placeholder="Last Name"
                {...register('emergencyContact.lastName')}
                error={errors.emergencyContact?.lastName?.message}
              />
            </div>

            <div className="mb-1 flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4">
              <Input
                required={true}
                className="md:mb-0 md:w-[50%]"
                type="text"
                id="fname"
                placeholder="Address"
                {...register('emergencyContact.address')}
                error={errors.emergencyContact?.address?.message}
              />
              <Input
                required={true}
                className="md:mb-0 md:w-[50%]"
                type="text"
                id="lname"
                placeholder="Phone Number"
                {...register('emergencyContact.phoneNumber')}
                error={errors.emergencyContact?.phoneNumber?.message}
              />
            </div>
          </div>
        </fieldset>

        <div className="flex items-center justify-between space-x-2">
          <Button
            type="button"
            variant="transparent"
            text="Prev"
            onClick={() => setCurrentForm(EnumPatientForm.PEROSNAL)}
          />
          <Button type="submit" variant="filled" text="Next" />
        </div>
      </form>
    </div>
  );
}

export default observer(ContactForm);
