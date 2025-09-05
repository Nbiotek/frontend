import { XModal } from '@/atoms/modal';
import { AppModals } from '@/store/AppConfig/appModalTypes';
import { useStore } from '@/store';
import { observer } from 'mobx-react-lite';
import AvailableDoctors from '../AvailableDoctors';

const DoctorsModal = () => {
  const {
    AppConfigStore: { isOpen, toggleModals }
  } = useStore();

  return (
    <XModal
      closeModal={() => toggleModals({ name: AppModals.AVAILABLE_DOCTORS, open: false })}
      bgClose={false}
      isOpen={isOpen.AVAILABLE_DOCTORS}
      className="!max-w-[450px]"
      title="Available Doctors"
    >
      <AvailableDoctors />
    </XModal>
  );
};

export default observer(DoctorsModal);
