import { XModal } from '@/atoms/modal';
import { AppModals } from '@/store/AppConfig/appModalTypes';
import { useStore } from '@/store';
import { EnumPatientForm } from '@/constants/mangle';
import InsuranceForm from '@/app/auth/patient/components/Insurance';
import ContactForm from '@/app/auth/patient/components/Contact';
import PersonalForm from '@/app/auth/patient/components/Personal';
import { observer } from 'mobx-react-lite';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { PatientInsuranceSchema, TPatientInsuranceSchema } from '@/app/auth/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@/atoms/Buttons';

const RegPatientModal = () => {
  const {
    AppConfigStore: { isOpen, toggleModals },
    PatientStore: {
      isLoading,
      setCurrentForm,
      currentForm,
      registerPatient,
      setInsuranceInfo,
      resetPatientStore
    }
  } = useStore();

  const methods = useForm<TPatientInsuranceSchema>({
    mode: 'onSubmit',
    resolver: zodResolver(PatientInsuranceSchema),
    reValidateMode: 'onSubmit'
  });

  const onSubmit: SubmitHandler<TPatientInsuranceSchema> = async (formData) => {
    setInsuranceInfo(formData, () => registerPatient(() => toggleModals({})));
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
    <XModal
      closeModal={() => {
        resetPatientStore();
        toggleModals({ name: AppModals.RECPTS_PATIENT_REG, open: false });
      }}
      bgClose={false}
      isOpen={isOpen.RECPTS_PATIENT_REG}
      className="!max-w-[450px]"
      title="Register Patients"
    >
      <div className="w-full">{switchDetails(currentForm)}</div>
    </XModal>
  );
};

export default observer(RegPatientModal);
