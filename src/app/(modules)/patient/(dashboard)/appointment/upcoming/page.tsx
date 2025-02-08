import Cards from '@/atoms/Cards';
import { Text } from '@/lib/utils/Text';
import InputSearch from '@/atoms/fields/InputSearch';
import AppointmentItem from '@/components/common/appointmentItems';

const UpcomingAppointment = () => {
  return (
    <Cards className="bg-white px-[24px]">
      <div className="flex justify-end py-4">
        <InputSearch />
      </div>
      <div className="flex flex-col space-y-5">
        <AppointmentItem />
        <AppointmentItem />
        <AppointmentItem />
      </div>
    </Cards>
  );
};

export default UpcomingAppointment;
