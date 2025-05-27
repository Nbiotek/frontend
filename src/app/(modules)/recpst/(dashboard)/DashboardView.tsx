'use client';
import { useEffect, useState } from 'react';
import RecptsAnalytics from './RecptsAnalytics';
import ApptTodayTable from '../components/ApptTodayTable';
import HyperLink from '@/atoms/Hyperlink';
import ROUTES from '@/constants/routes';
import { SubTitle } from '@/atoms/typographys';
import { pagination } from '@/constants/data';
import { useFetchReceptdashboard } from '@/hooks/recpst/useFetchRecptDashboard';

const DashboardView = () => {
  const [summary, setSummary] = useState<TReceptionistDashboardSummary>({
    totalAppointments: 0,
    pendingAppointments: 0,
    totalRevenue: 0,
    totalPatients: 0,
    todayAppointments: 0
  });
  const [appointment, setAppointment] = useState<Array<TReceptAppointmentBase>>([]);
  const { data, isLoading } = useFetchReceptdashboard();

  useEffect(() => {
    if (!isLoading && data !== undefined) {
      setSummary(data.statistics);
      setAppointment(data.statistics.appointments);
    }
  }, [isLoading, data]);

  return (
    <div className="flex w-full flex-col space-y-4">
      <RecptsAnalytics {...{ isLoading, summary }} />

      <div className="flex w-full flex-col space-y-4 rounded-lg bg-white p-2">
        <div className="flex w-full items-center justify-between border-b pb-2">
          <SubTitle text="Appointments" className="whitespace-nowrap" />

          <div className="flex w-full justify-end">
            <HyperLink href={ROUTES.RECPTS_APOINTMENT.path} hrefText="See all" />
          </div>
        </div>

        <ApptTodayTable {...{ isLoading, appointment: { appointment, pagination } }} />
      </div>
    </div>
  );
};

export default DashboardView;
