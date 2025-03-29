'use client';
import OverviewCardLoader from '@/atoms/Loaders/OverviewCardLoader';
import OverviewCard, { EnumOverviewIcon } from '@/components/dashboard/metric/OverviewCard';
import OverviewContainer from '@/components/dashboard/metric/OverviewContainer';
import { LAB_TECH } from '@/constants/api';
import { getLabTechDashboard } from '@/requests/lab-tech';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

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

const CoordAnalytics = () => {
  const [overviewData, setOverviewData] = useState<TLabTechDashboardRes>({
    totalPendingTests: 0,
    totalCompletedTests: 0,
    averageTurnaroundTime: 0,
    totalMessages: 0,
    recentTests: []
  });
  const { data, isLoading } = useQuery({
    queryKey: [LAB_TECH.DASHBOARD],
    queryFn: getLabTechDashboard
  });

  useEffect(() => {
    if (!isLoading && data !== undefined) {
      setOverviewData(data.data.data);
    }
  }, [data, isLoading]);

  return (
    <OverviewContainer>
      {/* {isLoading
        ? card.map((el, idx) => <OverviewCardLoader key={el.tag} />)
        : card.map((el, idx) => (
            <OverviewCard
              key={el.tag}
              type={el.type}
              stat={overviewData[el.tag as keyof Omit<TLabTechDashboardRes, 'recentTests'>]}
              title={el.title}
            />
          ))} */}

      {card.map((el, idx) => (
        <OverviewCard key={el.tag} type={el.type} stat={el.stat} title={el.title} />
      ))}
    </OverviewContainer>
  );
};

export default CoordAnalytics;
