import { XModal } from '@/atoms/modal';
import { AppModals } from '@/store/AppConfig/appModalTypes';
import { useStore } from '@/store';
import { observer } from 'mobx-react-lite';
import AvailableMarketers from '../AvailableMarketers';

const MarketersModal = () => {
  const {
    AppConfigStore: { isOpen, toggleModals }
  } = useStore();

  return (
    <XModal
      closeModal={() => toggleModals({ name: AppModals.AVAILABLE_MARKETERS, open: false })}
      bgClose={false}
      isOpen={isOpen.AVAILABLE_MARKETERS}
      className="!max-w-[450px]"
      title="Available marketers"
    >
      <AvailableMarketers />
    </XModal>
  );
};

export default observer(MarketersModal);
