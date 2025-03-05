'use client';
import Cards from '@/atoms/Cards';
import { Text } from '@/lib/utils/Text';
import InputSearch from '@/atoms/fields/InputSearch';

import { usePastAppointment } from '@/hooks/patient/useAppoitment';
import AppointmentItem from '../component/AppointmentItem';
import Spinner from '@/lib/utils/spinner';
import { Calendar } from '@/components/ui/calendar';
import Button from '@/atoms/Buttons';

const PastAppointmentView = () => {
  const { data, isLoading } = usePastAppointment();

  console.log(data);

  return (
    <>
      <>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Spinner />
            <p className="text-gray-500 mt-4">Loading your appointments...</p>
          </div>
        ) : data ? (
          <div className="flex flex-col space-y-[20px] rounded-lg bg-white p-5 shadow-sm">
            <AppointmentItem type="past" data={data.data} />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg bg-white py-16 shadow-sm">
            <div className="bg-gray-100 mb-4 flex h-20 w-20 items-center justify-center rounded-full">
              <Calendar className="text-gray-400 h-10 w-10" />
            </div>
            <h3 className="mb- text-center text-lg font-medium">No appointments found</h3>
            <p className="text-gray-500 mb-6 max-w-sm text-center">
              You don&apos;t have any past appointments. When you book appointments, they&apos;ll
              appear here.
            </p>
            <Button variant="filled">Book an Appointment</Button>
          </div>
        )}
      </>
    </>
  );
};

export default PastAppointmentView;
