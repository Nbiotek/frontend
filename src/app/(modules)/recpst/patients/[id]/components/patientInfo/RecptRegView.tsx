'use client';
import { EnumPatientForm } from '@/constants/mangle';
import InsuranceForm from '@/app/auth/patient/components/Insurance';
import ContactForm from '@/app/auth/patient/components/Contact';
import PersonalForm from '@/app/auth/patient/components/Personal';
import { useStore } from '@/store';
import { observer } from 'mobx-react-lite';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { PatientInsuranceSchema, TPatientInsuranceSchema } from '@/app/auth/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Button from '@/atoms/Buttons';
import ProfileCard from './ProfileCard';

const RecptRegView = () => {
  const router = useRouter();
  const {
    PatientStore: { isLoading, setCurrentForm, currentForm, registerPatient, setInsuranceInfo }
  } = useStore();
  const methods = useForm<TPatientInsuranceSchema>({
    mode: 'onSubmit',
    resolver: zodResolver(PatientInsuranceSchema),
    reValidateMode: 'onSubmit'
  });

  const onSubmit: SubmitHandler<TPatientInsuranceSchema> = async (formData) => {
    setInsuranceInfo(formData, () => registerPatient((url) => router.replace(url)));
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
  return (
    <div className="flex w-full max-w-4xl flex-col justify-between space-y-4 md:flex-row md:space-x-4 md:space-y-0">
      <div className="w-full overflow-clip rounded-lg bg-white md:w-[50%]">
        <ProfileCard />
      </div>

      <div className="w-full md:w-[50%]">{switchDetails(currentForm)}</div>
    </div>
  );
};

export default observer(RecptRegView);
