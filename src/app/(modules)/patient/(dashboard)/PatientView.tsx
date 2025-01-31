import CardMetrics from '@/components/dashboard/metric/card';

import { AppointmentsIcon, ResultIcon, HealthProfileIcon, MessagesIcon } from '@/lib/utils/svg';

import { Phone, Calendar, Clock, MapPin } from 'lucide-react';

import Cards from '@/atoms/Cards';
import { Text } from '@/lib/utils/Text';
import HyperLink from '@/atoms/Hyperlink';
import Button from '@/atoms/Buttons';

const PatientView = () => {
  return (
    <div className="container flex flex-col gap-10 px-[12px]">
      <div className="flex w-full flex-wrap gap-[25px]">
        <CardMetrics title="My Appointments" value="46,000" icon={<AppointmentsIcon />} />
        <CardMetrics title="Test Results" value="46,000" icon={<ResultIcon />} />
        <CardMetrics title="Health Profile" value="46,000" icon={<HealthProfileIcon />} />
        <CardMetrics title="Messages" value="46,000" icon={<MessagesIcon />} />
      </div>

      <div className="">
        <Cards className="h-[280px] w-[630px] bg-white px-[27px] py-[16px]">
          <div className="flexBetween">
            <Text weight="semibold" variant="title">
              Upcoming Appointment
            </Text>
            <HyperLink hrefText="View All" className="text-[#EC7665] underline" />
          </div>
          <Cards className="mx-auto mt-[10px] bg-blue-400 py-5">
            <div className="mx-auto mt-6 w-[323px] rounded-lg bg-[#EAFFEA] p-5">
              <Text weight="thin" className="flex text-neutral-1000">
                <Calendar />
                <span>October 28th, 2023</span>
              </Text>
            </div>
            <div>
              <Button
                text="Log Out"
                type="button"
                variant="secondary"
                leftIcon={<Calendar />}
                className="text-base"
              />
            </div>
            <hr />
          </Cards>
        </Cards>
      </div>
    </div>
  );
};

export default PatientView;
