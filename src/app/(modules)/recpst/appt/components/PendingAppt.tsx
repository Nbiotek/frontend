'use client';
import { SubTitle } from '@/atoms/typographys';
import ApptTodayTable from '../../components/ApptTodayTable';
import { useFetchPendAppt } from '@/hooks/recpst/useFetchPenAppt';
import { useEffect, useState } from 'react';
import { pagination } from '@/constants/data';

export default function PendingAppt() {
  const [appointment, setAppointment] = useState<TAppointmentResp>({
    appointment: [],
    pagination
  });
  const { data, isLoading } = useFetchPendAppt({});

  useEffect(() => {
    if (!isLoading && data != undefined) {
      setAppointment(data);
    }
  }, []);
  return (
    <div className="flex w-full flex-col space-y-4 rounded-lg bg-white p-2">
      <div className="flex w-full items-center justify-between border-b pb-2">
        <SubTitle text="Pending Appointments" />
      </div>

      <ApptTodayTable {...{ isLoading, appointment }} />
    </div>
  );
}
