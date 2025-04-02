'use client';

import SearchInput from '@/atoms/fields/SearchInput';
import IconPod from '@/atoms/Icon/IconPod';
import { Text } from '@/lib/utils/Text';
import { ArrowUpDown, ListFilter, ClipboardList, Receipt, Calendar } from 'lucide-react';
import Button from '@/atoms/Buttons';
import AppointmentTable from './components/AppointmentTable';
import { useDoctorAppointment } from '@/hooks/doctor/useAppointment';

const AppointmentView = () => {
  const { data: appointmentList, isLoading } = useDoctorAppointment();

  return (
    <div className="flex-col space-y-[24px]">
      <div className="flex flex-col space-x-2 sm:flex-row sm:items-center sm:justify-between">
        <IconPod Icon={ListFilter} />
        <SearchInput className="!w-[calc(100%-80px)]" placeholder="Search transactions..." />
        <IconPod Icon={ArrowUpDown} />
      </div>
      <AppointmentTable appointments={appointmentList?.data.patients || []} loading={isLoading} />
    </div>
  );
};

export default AppointmentView;
