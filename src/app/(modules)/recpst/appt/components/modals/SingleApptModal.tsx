import { XModal } from '@/atoms/modal';
import { useStore } from '@/store';
import { observer } from 'mobx-react-lite';
import { useFetchSingleAppt } from '@/hooks/recpst/useFetchSingleAppt';
import AppointmentCard from '../../../patients/[id]/components/AppointmentCard';
import { Skeleton } from '@/components/ui/skeleton';

const SingleApptModal = () => {
  const {
    AppConfigStore: { isOpen, toggleModals, singleAppt }
  } = useStore();

  const { data, isLoading } = useFetchSingleAppt(singleAppt.id);

  return (
    <XModal
      closeModal={() => toggleModals({})}
      bgClose={false}
      isOpen={isOpen.SINGLE_APPOINTMENT}
      className="!max-w-[500px]"
      title="Lab Appointment"
    >
      <>
        {isLoading ? (
          <Skeleton className="h-56 w-full" />
        ) : (
          data && <AppointmentCard datum={data} className="border-none shadow-none" />
        )}
      </>
    </XModal>
  );
};

export default observer(SingleApptModal);
