'use client';
import { useState, useEffect, useCallback } from 'react';
import HyperLink from '@/atoms/Hyperlink';
import { SubTitle } from '@/atoms/typographys';
import ROUTES from '@/constants/routes';
import TestsTable from '../tests/TestsTable';
import { useQuery } from '@tanstack/react-query';
import { pagination } from '@/constants/data';
import { labTech } from '@/hooks/labTech/FetchKeyFactory';

const Recent = () => {
  const [activity, setActivity] = useState<TTestQuesRes>({
    requests: [],
    pagination
  });

  function select(res: INBTServerResp<Array<TTestQueue>>) {
    return res.data;
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
      setActivity((prev) => ({ ...prev, requests: data }));
    }
  }, [data, isLoading]);

  return (
    <div className="flex w-full flex-col space-y-4">
      <div className="flex w-full items-center justify-between border-b pb-2">
        <SubTitle text="Recent Activity" />
        <HyperLink href={ROUTES.LAB_TECH_TEST.path} hrefText="All tests" />
      </div>

      <TestsTable isLoading={isLoading} tests={activity} />
    </div>
  );
};

export default Recent;
