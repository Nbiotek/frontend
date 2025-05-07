'use client';
import { EnumPatientForm, EnumRole } from '@/constants/mangle';
import InsuranceForm from './components/Insurance';
import ContactForm from './components/Contact';
import PersonalForm from './components/Personal';
import { useStore } from '@/store';
import { observer } from 'mobx-react-lite';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { PatientInsuranceSchema, TPatientInsuranceSchema } from '../validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Button from '@/atoms/Buttons';
import { useEffect, useState } from 'react';

const PatientRegView = () => {
  const router = useRouter();
  const {
    PatientStore: {
      isLoading,
      setCurrentForm,
      currentForm,
      registerPatient,
      updatePatient,
      setInsuranceInfo
    },
    AuthStore: { user }
  } = useStore();
  const [update, setUpdate] = useState(false);
  const methods = useForm<TPatientInsuranceSchema>({
    mode: 'onSubmit',
    resolver: zodResolver(PatientInsuranceSchema),
    reValidateMode: 'onSubmit'
  });

  const onSubmit: SubmitHandler<TPatientInsuranceSchema> = async (formData) => {
    const cbFn = update
      ? updatePatient((url) => router.replace(url))
      : registerPatient((url) => router.replace(url));
    setInsuranceInfo(formData, () => () => cbFn);
  };

  const switchDetails = (key: EnumPatientForm) => {
    switch (key) {
      case EnumPatientForm.PEROSNAL:
        return <PersonalForm />;
      case EnumPatientForm.CONTACT:
        return <ContactForm />;
      case EnumPatientForm.INSURANCE:
        return (
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <InsuranceForm />;
              <div className="flex items-center justify-between space-x-2">
                <Button
                  type="button"
                  variant="transparent"
                  text="Prev"
                  disabled={isLoading.regPatient}
                  onClick={() => setCurrentForm(EnumPatientForm.CONTACT)}
                />
                <Button
                  type="submit"
                  variant="filled"
                  text="Submit"
                  isLoading={isLoading.regPatient}
                  disabled={isLoading.regPatient}
                />
              </div>
            </form>
          </FormProvider>
        );
      default:
        break;
    }
  };

  useEffect(() => {
    setUpdate(user && user.role === EnumRole.PATIENT);
  }, []);
  return <>{switchDetails(currentForm)}</>;
};

export default observer(PatientRegView);
