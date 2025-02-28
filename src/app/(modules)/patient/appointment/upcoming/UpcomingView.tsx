'use client';
import Cards from '@/atoms/Cards';
import { Text } from '@/lib/utils/Text';
import InputSearch from '@/atoms/fields/InputSearch';

import { useAllUpcomingAppointment } from '@/hooks/patient/useAppoitment';
import AppointmentItem from '../component/AppointmentItem';
import Spinner from '@/lib/utils/spinner';

const UpcomingAppointmentView = () => {
  const { data, isLoading } = useAllUpcomingAppointment();

  console.log(data);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : data ? (
        <div className="flex flex-col space-y-[20px] bg-white p-5">
          <AppointmentItem data={data.data} />
        </div>
      ) : (
        <div className="flex justify-center">No appointment data found</div>
      )}
    </>
  );
};

export default UpcomingAppointmentView;
