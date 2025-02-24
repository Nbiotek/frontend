import CardMetrics from '@/components/dashboard/metric/card';

import { AppointmentsIcon, ResultIcon, HealthProfileIcon, MessagesIcon } from '@/lib/utils/svg';

import { Phone, Calendar, Clock, MapPin } from 'lucide-react';

import Cards from '@/atoms/Cards';
import { Text } from '@/lib/utils/Text';
import HyperLink from '@/atoms/Hyperlink';
import Button from '@/atoms/Buttons';
import ScheduleBtn from '@/atoms/Buttons/ScheduleAppointBtn';
import Image from 'next/image';
import TestTable from '@/atoms/Table/test-table';
import ActivityTable from '@/atoms/Table/test-table';
import QuickAction from '@/components/common/quick-links';
import Link from 'next/link';

import { PatientQuickLinks } from '@/config/quickActionItems';

const PatientView = () => {
  return (
    <div className="mb-[20rem] flex w-[100%] flex-col space-y-8">
      <div className="space-y-4 sm:flex sm:flex-col md:flex-row md:flex-wrap md:justify-between md:gap-4 md:space-y-0 ">
        <CardMetrics title="My Appointments" value="2" icon={<AppointmentsIcon />} />
        <CardMetrics title="Test Results" value="3" icon={<ResultIcon />} />
        {/* <CardMetrics title="Health Profile" value="46,000" icon={<HealthProfileIcon />} /> */}
        <CardMetrics title="Messages" value="5" icon={<MessagesIcon />} />
      </div>
      <div className="flex w-[100%] flex-col items-center space-y-5 lg:flex-row lg:space-x-8 ">
        <Cards className=" w-full bg-white px-[8px] py-[20px] sm:h-[235px] lg:w-[65%] lg:px-[27px]">
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
            <div className="mx-auto mt-2 flex flex-wrap justify-start gap-2 rounded-lg  bg-[#EAFFEA] p-2 sm:w-[323px]">
              <Text variant="small" weight="thin" className="flex space-x-1 text-neutral-1000 ">
                <Calendar size={23} />
                <span>October 28th, 2023</span>
              </Text>
              <Text variant="small" weight="thin" className="flex space-x-1 text-neutral-1000 ">
                <Clock size={23} />
                <span>11:30 -12:00</span>
              </Text>
              <Text variant="small" weight="thin" className="flex space-x-1 text-neutral-1000">
                <MapPin size={23} />
                <span>October 28th, 2023</span>
              </Text>
            </div>
            <hr className="mx-auto mt-4 max-w-[346px]" />
            <div className="mt-2 flex flex-col items-center justify-center space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
              <ScheduleBtn title="Reschule" className="bg-white" />
              <ScheduleBtn
                title="Confirm Appointment"
                className="bg-[#3B883E] text-white hover:bg-green-200/20"
              />
            </div>
          </Cards>
        </Cards>
        <Cards
          title="Daily insights"
          className="h-[235px] w-full overflow-y-auto bg-white px-[10px] py-[16px] lg:w-[30%]"
        >
          <div className="mt-3 border-t pt-3" />
          <p className="text-sm font-normal text-black">
            Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit
            interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per
            conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum
            lobortis. Ut commodo efficitur neque. Ut diam quam, semper iaculis condimentum ac,
            vestibulum eu nisl.
          </p>
        </Cards>
      </div>
      <div className="flex w-[100%] flex-col items-start space-y-5 lg:flex-row lg:space-x-8">
        <Cards className="w-full bg-white p-5 lg:w-[65%]">
          <ActivityTable />
        </Cards>
        <Cards title="Quick Actions" className="w-full bg-white px-[12px] py-[23px] lg:w-[30%]">
          <QuickAction quickLink={PatientQuickLinks} />
        </Cards>
      </div>
    </div>
  );
};

export default PatientView;
