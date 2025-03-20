'use client';
import CardMetrics from '@/components/dashboard/metric/card';

import { AppointmentsIcon, ResultIcon, HealthProfileIcon, MessagesIcon } from '@/lib/utils/svg';

import { Calendar, Clock, MapPin } from 'lucide-react';

import Cards from '@/atoms/Cards';
import QuickAction from '@/components/common/quick-links';
import Link from 'next/link';

import { PatientQuickLinks } from '@/config/quickActionItems';

import { usePatientDashboard, usePatientRecentResult } from '@/hooks/patient/usePatientDashboard';
import Spinner from '@/lib/utils/spinner';
import { Skeleton } from '@/components/ui/skeleton';
import { dateTimeUTC } from '@/utils/date';
import MetricsOverview from './component/MetricOverView';
import RecentAppointment from './component/RecentAppointment';
import RecentResultTable from './component/RecentResultTable';
import { useEffect, useState } from 'react';

const PatientView = () => {
  const { isLoading, data } = usePatientDashboard();
  const recentAppointments = data?.recentAppointments || [];
  const { isLoading: recentDataloading, data: recentResultData } = usePatientRecentResult();

  const [recentResult, setRecentData] = useState<TPatientRecentTest>({
    data: []
  });

  useEffect(() => {
    if (!recentDataloading && recentResultData !== undefined) {
      setRecentData(recentResultData);
    }
  }, [recentDataloading, recentResultData]);

  return (
    <div className="mt-[24px] flex w-full flex-col space-y-[24px]">
      <MetricsOverview data={data} isLoading={isLoading} />
      <div className="flex flex-col-reverse space-y-2 space-y-reverse lg:flex-row lg:space-x-4 lg:space-y-0 ">
        <RecentAppointment isLoading={isLoading} recentAppointments={recentAppointments} />
        <Cards title="Daily insights" className="h-fit overflow-y-auto bg-white p-3 lg:w-[35%]">
          <div className="mt-4 border-t p-2" />
          <p className="text-sm font-normal text-black">
            Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit
            interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per
            conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum
            lobortis. Ut commodo efficitur neque. Ut diam quam, semper iaculis condimentum ac,
            vestibulum eu nisl.
          </p>
        </Cards>
      </div>
      <div className="flex flex-col-reverse space-y-2 space-y-reverse lg:flex-row lg:space-x-4 lg:space-y-0  ">
        <Cards className="bg-white p-4 lg:w-[65%] ">
          <div className="mb-3 flex justify-between">
            <h4 className="text-lg font-bold">Recent Test Result</h4>
            <Link
              className="text-sm text-blue-50 hover:text-black/20 hover:underline"
              href="/patients/results"
            >
              View all result
            </Link>
          </div>
          <RecentResultTable loading={recentDataloading} data={recentResult} />
        </Cards>
        <Cards title="Quick Actions" className="w-full bg-white px-[12px] py-[23px] lg:w-[35%]">
          <QuickAction quickLink={PatientQuickLinks} />
        </Cards>
      </div>
    </div>
  );
};

export default PatientView;
