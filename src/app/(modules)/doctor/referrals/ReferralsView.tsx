'use client';
import SearchInput from '@/atoms/fields/SearchInput';
import IconPod from '@/atoms/Icon/IconPod';
import { Text } from '@/lib/utils/Text';
import { ArrowUpDown, ListFilter, ClipboardList, Receipt, Calendar } from 'lucide-react';
import Button from '@/atoms/Buttons';
import ReferralTable from './components/ReferralsTable';
import { useDoctorReferral } from '@/hooks/doctor/useReferrals';

const ReferralsView = () => {
  const { data: referPatientsList, isLoading } = useDoctorReferral();
  return (
    <div className="flex-col space-y-[24px]">
      <div className="flex flex-col space-x-2 sm:flex-row sm:items-center sm:justify-between">
        <IconPod Icon={ListFilter} />
        <SearchInput className="!w-[calc(100%-80px)]" placeholder="Search transactions..." />
        <IconPod Icon={ArrowUpDown} />
      </div>
      <ReferralTable
        referPatientList={referPatientsList?.data.patients || []}
        loading={isLoading}
      />
    </div>
  );
};

export default ReferralsView;
