'use client';
import CardMetrics from '@/components/dashboard/metric/card';

import { AppointmentsIcon, ResultIcon, HealthProfileIcon, MessagesIcon } from '@/lib/utils/svg';

import { Calendar, Clock, MapPin } from 'lucide-react';

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

import { usePatientDashboard } from '@/hooks/patient/usePatientDashboard';
import Spinner from '@/lib/utils/spinner';
import { Skeleton } from '@/components/ui/skeleton';
import { dateTimeUTC } from '@/utils/date';
import MetricsOverview from './component/MetricOverView';
import RecentAppointment from './component/RecentAppointment';

const PatientView = () => {
  const { isLoading, data } = usePatientDashboard();
  const recentAppointments = data?.recentAppointments || [];

  return (
    <div className="mt-[24px] flex w-[100%] flex-col space-y-[24px] pb-20">
      <MetricsOverview data={data} isLoading={isLoading} />
      <div className="lg:item-start flex w-full flex-col justify-between space-y-[24px] lg:flex-row lg:space-x-[24px] lg:space-y-0 ">
        <RecentAppointment isLoading={isLoading} recentAppointments={recentAppointments} />
        <Cards title="Daily insights" className=" overflow-y-auto bg-white p-3 lg:w-[30%]">
          <div className="border-t pt-3" />
          <p className="text-sm font-normal text-black">
            Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit
            interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per
            conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum
            lobortis. Ut commodo efficitur neque. Ut diam quam, semper iaculis condimentum ac,
            vestibulum eu nisl.
          </p>
        </Cards>
      </div>
      <div className="lg:item-start flex w-full flex-col justify-between space-y-[24px] md:space-y-0 lg:flex-row lg:space-x-[24px] ">
        <Cards className="flex-1 bg-white ">
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
