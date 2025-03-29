'use client';
import { useState, useEffect, useCallback } from 'react';
import HyperLink from '@/atoms/Hyperlink';
import { Paragraph, SubTitle } from '@/atoms/typographys';
import ROUTES from '@/constants/routes';
import TestsTable from '../tests/TestsTable';
import { useQuery } from '@tanstack/react-query';
import { pagination } from '@/constants/data';
import { labTech } from '@/hooks/labTech/FetchKeyFactory';
import { Switch } from '@/components/ui/switch';

const Recent = () => {
  const [activity, setActivity] = useState<TTestQuesRes>({
    requests: [],
    pagination
  });

  function select(res: TTestQuesRes) {
    return res;
  }

  const meta = labTech.getRecentActivities();
  const memoizedSelect = useCallback(select, []);

  const { data, isLoading } = useQuery({
    queryKey: meta.keys(),
    meta,
    select: memoizedSelect
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

        <div className="flex items-center justify-start space-x-3">
          <div className="flex items-center justify-start space-x-1">
            <Switch />
            <Paragraph className="!font-medium" text="Check in" />
          </div>
        </div>
      </div>

      <TestsTable isLoading={isLoading} tests={activity} />

      {activity.requests.length && (
        <div className="flex w-full justify-end">
          <HyperLink href={ROUTES.LAB_TECH_TEST.path} hrefText="See tests" />
        </div>
      )}
    </div>
  );
};

export default Recent;
