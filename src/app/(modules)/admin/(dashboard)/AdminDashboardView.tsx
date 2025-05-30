'use client';
import OverviewCard, { EnumOverviewIcon } from '@/components/dashboard/metric/OverviewCard';
import OverviewContainer from '@/components/dashboard/metric/OverviewContainer';
import { GrowthChart } from './components/GrowthChart';
import { useFetchStats } from '@/hooks/admin/useFetchStats';
import OverviewCardLoader from '@/atoms/Loaders/OverviewCardLoader';

const card = [
  {
    stat: 4056,
    title: 'Total users',
    type: EnumOverviewIcon.PEOPLE,
    tag: 'totalUsers'
  },

  {
    stat: 2078,
    title: 'Total results',
    type: EnumOverviewIcon.PEOPLE,
    tag: 'totalTestResults'
  },

  {
    stat: 51,
    title: 'Total Tests',
    type: EnumOverviewIcon.PEOPLE,
    tag: 'totalLabTestRequests'
  },

  {
    stat: 24,
    title: 'Total Packages',
    type: EnumOverviewIcon.PEOPLE,
    tag: 'totalPackages'
  }
];

const AdminDashboardView = () => {
  const { data, isLoading } = useFetchStats();
  return (
    <div className="flex w-full flex-col space-y-4">
      <OverviewContainer>
        {isLoading
          ? card.map((el) => <OverviewCardLoader key={el.tag} />)
          : card.map((el) => (
              <OverviewCard
                key={el.tag}
                type={el.type}
                stat={data ? data[el.tag as keyof TAdminDashboardStats] : el.stat}
                title={el.title}
              />
            ))}
      </OverviewContainer>

      <GrowthChart />
    </div>
  );
};

export default AdminDashboardView;
