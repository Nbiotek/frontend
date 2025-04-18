import { XModal } from '@/atoms/modal';
import { AppModals } from '@/store/AppConfig/appModalTypes';
import AvailableTechnicians from '../AvailableTechnicians';
import { useStore } from '@/store';
import { observable } from 'mobx';
import { observer } from 'mobx-react-lite';

const LabTechModal = () => {
  const {
    AppConfigStore: { isOpen, toggleModals }
  } = useStore();

  return (
    <XModal
      closeModal={() => toggleModals({ name: AppModals.AVAILABLE_TECHNICIANS, open: false })}
      bgClose={false}
      isOpen={isOpen.AVAILABLE_TECHNICIANS}
      className="!max-w-[450px]"
      title="Available Technicians"
    >
      <AvailableTechnicians />
    </XModal>
  );
};

export default observer(LabTechModal);
