'use client';
import QuickAction from '@/components/common/quick-links';
import OverviewActivity from './components/OverviewActivity';
import { MarketerQuickLinks } from '@/config/quickActionItems';
import Cards from '@/atoms/Cards';
import FieldTaskOverview from './components/FieldTaskOverview';

import { useEffect, useState } from 'react';
import { useDashboard } from '@/hooks/marketer/useDashboard';

const MarketerDashboardView = () => {
  const { data, isLoading } = useDashboard();

  const [overviewData, setOverviewData] = useState<TFieldOfficerAnalytics>({
    totalSamplesCollected: 0,
    totalAssignedTask: 0,
    totaluploadedSample: 0
  });

  useEffect(() => {
    if (!isLoading && data !== undefined) {
      setOverviewData(data.data);
    }
  }, [isLoading, data]);
  return (
    <div className="flex flex-col space-y-[24px]">
      <OverviewActivity overviewData={overviewData} isLoading={isLoading} />
      <div className=" flex w-full flex-col items-start justify-between space-y-[24px] md:space-y-0 lg:flex-row lg:space-x-[24px] ">
        <Cards className="bg-white p-3 lg:w-[70%]">
          {/* here is my field task overview  */}
          <FieldTaskOverview />
        </Cards>
        <Cards title="Quick Links" className="bg-white px-[12px] py-[23px] lg:w-[30%] ">
          <QuickAction quickLink={MarketerQuickLinks} />
        </Cards>
      </div>
    </div>
  );
};

export default MarketerDashboardView;
