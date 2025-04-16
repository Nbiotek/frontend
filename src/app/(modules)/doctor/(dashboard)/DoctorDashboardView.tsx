'use client';
import ActivityTable from '@/atoms/Table/test-table';
import OverviewActivity from './components/OverviewActivity';
import QuickAction from '@/components/common/quick-links';
import { DoctorsQuickLinks } from '@/config/quickActionItems';
import Cards from '@/atoms/Cards';
import { useDashboard } from '@/hooks/doctor/useDashboard';
import { useEffect, useState } from 'react';
import RecentActivityTable from './components/RecentActivityTable';

const DoctorDashboardView = () => {
  const { data, isLoading } = useDashboard();
  const [overviewData, setOverviewData] = useState<TDoctorDashboard>({
    totalPatients: 0,
    pendingTestResultReviews: 0,
    completedTestResultReviews: 0,
    referralActivity: {
      total: 0,
      accepted: 0,
      acceptanceRate: 0
    }
  });

  useEffect(() => {
    if (!isLoading && data !== undefined) {
      setOverviewData(data);
    }
  }, [isLoading, data]);

  return (
    <div className="flex flex-col space-y-[24px]">
      <OverviewActivity overviewData={overviewData} isLoading={isLoading} />
      <div className=" flex w-full flex-col items-start justify-between space-y-[24px] md:space-y-0 lg:flex-row lg:space-x-[24px] ">
        <Cards className="flex-1 bg-white ">
          <RecentActivityTable />
        </Cards>
        <Cards title="Quick Actions" className="w-full bg-white px-[12px] py-[23px] lg:w-[30%]">
          <QuickAction quickLink={DoctorsQuickLinks} />
        </Cards>
      </div>
    </div>
  );
};

export default DoctorDashboardView;
