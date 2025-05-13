import { XModal } from '@/atoms/modal';
import { AppModals } from '@/store/AppConfig/appModalTypes';
import { useStore } from '@/store';
import { observer } from 'mobx-react-lite';
import { useFetchSingleAppt } from '@/hooks/recpst/useFetchSingleAppt';
import { Loader2, MapPin, Timer } from 'lucide-react';
import { CardTitle } from '@/components/ui/card';
import { toTitleCase } from '@/utils';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import Button from '@/atoms/Buttons';

const SingleApptModule = () => {
  const {
    AppConfigStore: { isOpen, toggleModals, singleAppt }
  } = useStore();

  const { data, isLoading } = useFetchSingleAppt(singleAppt.id);
  console.log(data, isLoading);

  return (
    <XModal
      closeModal={() => toggleModals({})}
      bgClose={false}
      isOpen={isOpen.SINGLE_APPOINTMENT}
      className="!max-w-[450px]"
      title="Lab Appointment"
    >
      <div className="flex min-h-20 w-full flex-col items-center justify-center space-y-8 ">
        {isLoading ? (
          <Loader2 size={30} className="animate-spin" />
        ) : (
          <>
            <div className="flex w-full  flex-col space-y-1 rounded-lg bg-blue-400 p-3">
              <div className="flex  w-full items-center justify-between">
                <CardTitle className="text-white">{toTitleCase(data?.patientName ?? '')}</CardTitle>
                <Badge variant="secondary">{data?.status}</Badge>
              </div>
              <div className="flex w-full items-center justify-between space-y-2 text-white">
                <div className="flex items-center justify-start space-x-1 text-xs">
                  <MapPin size={15} className="text-white" /> <p>{data?.location.address}</p>
                </div>
                <div className="flex items-center justify-start space-x-1 text-xs">
                  <Timer size={15} className="text-white" />{' '}
                  <p>{format(new Date(data?.appointmentDate ?? ''), "hh:mm aaaaa'm'")}</p>
                </div>
              </div>
            </div>

            <div className="flex w-full items-center justify-end space-x-2">
              <Button variant="filled">Reschedule</Button>
              <Button variant="secondary" onClick={() => toggleModals({})}>
                Close
              </Button>
            </div>
          </>
        )}
      </div>
    </XModal>
  );
};

export default observer(SingleApptModule);
