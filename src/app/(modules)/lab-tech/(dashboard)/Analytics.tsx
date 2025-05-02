'use client';
import OverviewCardLoader from '@/atoms/Loaders/OverviewCardLoader';
import OverviewCard, { EnumOverviewIcon } from '@/components/dashboard/metric/OverviewCard';
import OverviewContainer from '@/components/dashboard/metric/OverviewContainer';

const card = [
  {
    stat: 120,
    title: 'Pending Tests',
    type: EnumOverviewIcon.PEOPLE,
    tag: 'totalPendingTests'
  },

  {
    stat: 1500,
    title: 'Tests Completed',
    type: EnumOverviewIcon.CUBE,
    tag: 'totalCompletedTests'
  },

  {
    stat: 2,
    title: 'Turnaround Time',
    type: EnumOverviewIcon.TIMER,
    tag: 'averageTurnaroundTime'
  },

  {
    stat: 2040,
    title: 'Messages',
    type: EnumOverviewIcon.CHART,
    tag: 'totalMessages'
  }
];

interface IAnalyticsProps {
  isLoading: boolean;
  data: TLabTechDashboardRes;
}

const Analytics = ({ isLoading, data }: IAnalyticsProps) => {
  return (
    <OverviewContainer>
      {isLoading
        ? card.map((el, idx) => <OverviewCardLoader key={el.tag} />)
        : card.map((el, idx) => (
            <OverviewCard
              key={el.tag}
              type={el.type}
              stat={data[el.tag as keyof Omit<TLabTechDashboardRes, 'recentTests'>]}
              title={el.title}
            />
          ))}
    </OverviewContainer>
  );
};

export default Analytics;
