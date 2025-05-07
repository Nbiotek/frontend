import { XModal } from '@/atoms/modal';
import { AppModals } from '@/store/AppConfig/appModalTypes';
import { useStore } from '@/store';
import { observer } from 'mobx-react-lite';
import PatientRegView from '@/app/auth/patient/PatientRegView';

const LabTechModal = () => {
  const {
    AppConfigStore: { isOpen, toggleModals }
  } = useStore();

  return (
    <XModal
      closeModal={() => toggleModals({ name: AppModals.RECPTS_PATIENT_REG, open: false })}
      bgClose={false}
      isOpen={isOpen.RECPTS_PATIENT_REG}
      className="!max-w-[450px]"
      title="Register Patients"
    >
      <PatientRegView />
    </XModal>
  );
};

export default observer(LabTechModal);
