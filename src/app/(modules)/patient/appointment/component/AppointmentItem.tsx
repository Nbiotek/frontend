import { Text } from '@/lib/utils/Text';
import { MapPin } from 'lucide-react';
import DropDownAction from '@/components/common/dropdownActions';
import { dateTimeUTC } from '@/utils/date';

const AppointmentItem = ({ data }: UpcomingAppointment) => {
  function getStatus(status: string) {
    switch (status) {
      case 'CONFIRMED':
        return 'bg-green-400';
      case 'PENDING':
        return 'bg-red-400';
      default:
        return 'bg-blue-300';
    }
  }

  return (
    <>
      {data?.upcomingAppointments.map((appointment) => (
        <div className="pb-3" key={appointment.id}>
          <Text variant="h4" weight="semibold" className="mb-3 mt-2 border-b pb-3">
            {' '}
            Today
          </Text>
          <div className="flex items-start space-x-3">
            <div
              className={`hidden h-7 w-7 rounded-full ${getStatus(appointment.status)} sm:flex`}
            />
            <div className="flex w-full flex-col  space-y-2">
              <div className=" flex w-full items-start justify-between">
                <div className="space-y-1.5">
                  <Text>{appointment.title}</Text>
                  <p>{appointment.description}</p>
                </div>
                <DropDownAction />
              </div>

              <div className="sm:flexBetween  w-full">
                <div>
                  <MapPin className="inline" /> ({dateTimeUTC(appointment.appointmentDate, false)}){' '}
                </div>
                <span>{dateTimeUTC(appointment.appointmentDate).split(', ')[2]}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default AppointmentItem;
