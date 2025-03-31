import ActivityTable from '@/atoms/Table/test-table';
import OverviewActivity from './components/OverviewActivity';
import QuickAction from '@/components/common/quick-links';
import { DoctorsQuickLinks } from '@/config/quickActionItems';
import Cards from '@/atoms/Cards';
import { useDashboard } from '@/hooks/doctor/useDashboard';

const DoctorDashboardView = () => {
  return (
    <div className="flex flex-col space-y-[24px]">
      <OverviewActivity />
      <div className="lg:item-start flex w-full flex-col justify-between space-y-[24px] md:space-y-0 lg:flex-row lg:space-x-[24px] ">
        <Cards className="flex-1 bg-white ">
          <ActivityTable />
        </Cards>
        <Cards title="Quick Actions" className="w-full bg-white px-[12px] py-[23px] lg:w-[30%]">
          <QuickAction quickLink={DoctorsQuickLinks} />
        </Cards>
      </div>
    </div>
  );
};

export default DoctorDashboardView;
