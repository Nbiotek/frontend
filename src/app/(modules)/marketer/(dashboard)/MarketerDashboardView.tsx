import QuickAction from '@/components/common/quick-links';
import OverviewActivity from './components/OverviewActivity';
import { MarketerQuickLinks } from '@/config/quickActionItems';
import Cards from '@/atoms/Cards';
import FieldTaskOverview from './components/FieldTaskOverview';

const overviewData: TMarketerDashboard = {
  totalSamplesCollected: 0,
  totalAssignedTasks: 0,
  totalUploadedSamples: 0,
  referralActivity: {
    total: 0,
    accepted: 0,
    acceptanceRate: 0
  }
};
const MarketerDashboardView = () => {
  return (
    <div className="flex flex-col space-y-[24px]">
      <OverviewActivity overviewData={overviewData} />
      <div className=" flex w-full flex-col items-start justify-between space-y-[24px] md:space-y-0 lg:flex-row lg:space-x-[24px] ">
        <Cards className="bg-white p-3 lg:w-[70%]">
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
