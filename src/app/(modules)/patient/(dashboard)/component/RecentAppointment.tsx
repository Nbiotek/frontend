import Cards from '@/atoms/Cards';
import { Text } from '@/lib/utils/Text';
import Link from 'next/link';
import Image from 'next/image';
import Spinner from '@/lib/utils/spinner';
import { Calendar, Clock, MapPin } from 'lucide-react';

import { dateTimeUTC } from '@/utils/date';
import ScheduleBtn from '@/atoms/Buttons/ScheduleAppointBtn';

interface RecentAppointmentProps {
  isLoading: boolean;
  recentAppointments: Array<{
    id: string;
    location: {
      type: 'lab' | 'custom';
      address: string;
    };
    appointmentDate: string;
  }>;
}

const RecentAppointment = ({ isLoading, recentAppointments }: RecentAppointmentProps) => {
  return (
    <Cards className="flex-1 bg-white px-[8px] py-[20px]  lg:px-[27px]">
      <div className="mb-3 flex flex-col sm:flex-row sm:justify-between lg:items-center">
        <Text weight="semibold" variant="title">
          Upcoming Appointment
        </Text>
        <Link href="View All" className="text-sm text-[#EC7665] underline">
          {' '}
          View All
        </Link>
      </div>
      <Cards className="relative mx-auto mt-[5px] bg-blue-400 px-[10px] py-2">
        <Image
          src="/bell.svg"
          width={50}
          height={40}
          alt="Appointment Notification"
          className="absolute -top-5 right-4 hidden sm:-right-4 sm:flex"
        />
        {isLoading ? (
          <Spinner />
        ) : recentAppointments.length > 0 ? (
          recentAppointments?.map((item) => (
            <div key={item.id}>
              <div className="mx-auto mt-2 flex flex-wrap justify-start gap-2 rounded-lg  bg-[#EAFFEA] p-2 sm:w-[323px]">
                <Text variant="small" weight="thin" className="flex space-x-1 text-neutral-1000 ">
                  <Calendar size={23} />
                  <span>{dateTimeUTC(item.appointmentDate, false)}</span>
                </Text>
                <Text variant="small" weight="thin" className="flex space-x-1 text-neutral-1000 ">
                  <Clock size={23} />
                  <span>{dateTimeUTC(item.appointmentDate).split(', ')[2]}</span>
                </Text>
                <Text variant="small" weight="thin" className="flex space-x-1 text-neutral-1000">
                  <MapPin size={23} />
                  <span>{item.location.address}</span>
                </Text>
              </div>

              <hr className="mx-auto mt-4 max-w-[346px]" />
              <div className="mt-2 flex flex-col items-center justify-center space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                <ScheduleBtn title="View details" className="bg-white" />
                <ScheduleBtn
                  title="Reschedule Appointment"
                  className="bg-[#3B883E] text-white hover:bg-green-200/20"
                />
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-white">
            <p>NO UPCOMING APPOINTMENT</p>
          </div>
        )}
      </Cards>
    </Cards>
  );
};

export default RecentAppointment;
