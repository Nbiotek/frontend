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

import { PatientQuickLinks } from '@/config/quickActionItems';

const PatientView = () => {
  return (
    <div className=" mb-[20rem] flex h-screen flex-col space-y-8">
      <div className="flexBetween w-full flex-wrap gap-[10px] ">
        <CardMetrics title="My Appointments" value="46,000" icon={<AppointmentsIcon />} />
        <CardMetrics title="Test Results" value="46,000" icon={<ResultIcon />} />
        <CardMetrics title="Health Profile" value="46,000" icon={<HealthProfileIcon />} />
        <CardMetrics title="Messages" value="46,000" icon={<MessagesIcon />} />
      </div>
      <div className="flexBetween w-full gap-5">
        <Cards className=" h-[235px] w-[65%] bg-white px-[27px] py-[20px]">
          <div className="flexBetween">
            <Text weight="semibold" variant="title">
              Upcoming Appointment
            </Text>
            <HyperLink hrefText="View All" className="text-[#EC7665] underline" />
          </div>
          <Cards className="relative mx-auto mt-[5px] bg-blue-400 py-2">
            <Image
              src="/bell.svg"
              width={50}
              height={40}
              alt="Appointment Notification"
              className="absolute -right-5 -top-5"
            />
            <div className="mx-auto mt-2 flex w-[323px] flex-wrap justify-start gap-2  rounded-lg bg-[#EAFFEA] p-2">
              <Text
                variant="small"
                weight="thin"
                className="flex space-x-1 border text-neutral-1000 "
              >
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
            <hr className="mx-auto mt-4 w-[346px]" />
            <div className="mt-2 flex justify-center space-x-2">
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
          className="h-[235px] w-[30%] overflow-y-auto bg-white px-[10px] py-[16px]"
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
      <div className="flexBetween w-[100%]">
        <Cards className="w-[65%] bg-white p-5">
          <ActivityTable />
        </Cards>
        <Cards title="Quick Actions" className="h-[423px] w-[30%] bg-white px-[12px] py-[23px]">
          <QuickAction quickLink={PatientQuickLinks} />
        </Cards>
      </div>
    </div>
  );
};

export default PatientView;
