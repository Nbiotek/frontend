import Cards from '@/atoms/Cards';
import { Text } from '@/lib/utils/Text';
import InputSearch from '@/atoms/fields/InputSearch';
import AppointmentItem from '@/components/common/appointmentItems';

const UpcomingAppointment = () => {
  return (
    <Cards className="bg-white px-[24px]">
      <div className="flex items-center justify-between py-4">
        <Text variant="title">All Upcoming Appointment</Text>
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
