'use client';
import Cards from '@/atoms/Cards';
import { Text } from '@/lib/utils/Text';
import InputSearch from '@/atoms/fields/InputSearch';

import { usePendingAppointment } from '@/hooks/patient/useAppoitment';
import AppointmentItem from '../component/AppointmentItem';
import Spinner from '@/lib/utils/spinner';

const PendingAppointmentView = () => {
  const { data, isLoading } = usePendingAppointment();

  console.log(data);

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Spinner />
          <p className="text-gray-500 mt-4">Loading your appointments...</p>
        </div>
      ) : data ? (
        <div className="flex flex-col space-y-[20px] bg-white p-5">
          <AppointmentItem type="pending" data={data.data} />
        </div>
      ) : (
        <div className="flex justify-center">No appointment data found</div>
      )}
    </>
  );
};

export default PendingAppointmentView;
