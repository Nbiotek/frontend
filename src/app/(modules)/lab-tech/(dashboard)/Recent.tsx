'use client';
import { useState, useEffect } from 'react';
import HyperLink from '@/atoms/Hyperlink';
import { SubTitle } from '@/atoms/typographys';
import ROUTES from '@/constants/routes';
import TestsTable from '../tests/TestsTable';
import { useQuery } from '@tanstack/react-query';
import { LAB_TECH } from '@/constants/api';
import { getRecentActivities } from '@/requests/lab-tech';
import { pagination } from '@/constants/data';

const Recent = () => {
  const [activity, setActivity] = useState<TTestQuesRes>({
    requests: [],
    pagination
  });
  const { data, isLoading } = useQuery({
    queryKey: [LAB_TECH.RECENT_ACTIVITIES],
    queryFn: getRecentActivities,
    select: (data) => data.data
  });

  useEffect(() => {
    if (!isLoading && data !== undefined) {
      setActivity(data);
    }
  }, [data, isLoading]);

  return (
    <div className="flex w-full flex-col space-y-4">
      <div className="flex w-full items-center justify-between border-b pb-2">
        <SubTitle text="Recent Activity" />
        <HyperLink href={ROUTES.LAB_TECH_TEST.path} hrefText="All tests" />
      </div>

      {/* <TestsTable isLoading={isLoading} tests={activity} /> */}
    </div>
  );
};

export default Recent;
