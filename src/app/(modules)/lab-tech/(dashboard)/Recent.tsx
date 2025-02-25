'use client';
import { useState, useEffect } from 'react';
import HyperLink from '@/atoms/Hyperlink';
import { SubTitle } from '@/atoms/typographys';
import ROUTES from '@/constants/routes';
import { SlidersHorizontal } from 'lucide-react';
import TestsTable from '../tests/TestsTable';
import { useQuery } from '@tanstack/react-query';
import { LAB_TECH } from '@/constants/api';
import { getRecentActivities } from '@/requests/lab-tech';

const Recent = () => {
  const [activity, setActivity] = useState<TLabTechRecentActivitesRes>({ data: [] });
  const { data, isLoading } = useQuery({
    queryKey: [LAB_TECH.RECENT_ACTIVITIES],
    queryFn: getRecentActivities
  });

  useEffect(() => {
    if (!isLoading && data !== undefined) {
      setActivity(data.data);
    }
  }, [data, isLoading]);

  console.log(isLoading, activity);

  return (
    <div className="flex w-full flex-col space-y-4">
      <div className="flex w-full items-center justify-between border-b pb-2">
        <SubTitle text="Recent Activity" />
        <SlidersHorizontal className="cursor-pointer text-neutral-500" />
      </div>

      <TestsTable isLoading={isLoading} tests={activity.data} />

      <div className="flex w-full items-center justify-end pt-3">
        <HyperLink href={ROUTES.LAB_TECH_TEST.path} hrefText="See tests pool" />
      </div>
    </div>
  );
};

export default Recent;
