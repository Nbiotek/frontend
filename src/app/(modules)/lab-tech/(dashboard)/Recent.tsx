'use client';
import { useState, useEffect, useCallback } from 'react';
import HyperLink from '@/atoms/Hyperlink';
import { Paragraph, SubTitle } from '@/atoms/typographys';
import ROUTES from '@/constants/routes';
import TestsTable from '../tests/TestsTable';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { pagination } from '@/constants/data';
import { labTech } from '@/hooks/labTech/FetchKeyFactory';
import { Switch } from '@/components/ui/switch';
import { useFetchProfile } from '@/hooks/user/useFetchProfile';
import { putAvailablity } from '@/requests/lab-tech';
import { Toast } from '@/atoms/Toast';
import { AUTH } from '@/constants/api';

const Recent = () => {
  const { data: userProfile } = useFetchProfile();
  const [activity, setActivity] = useState<TTestQuesRes>({
    requests: [],
    pagination
  });

  function select(res: INBTServerResp<Array<TTestData>>) {
    return res.data;
  }

  const meta = labTech.getRecentActivities();
  const memoizedSelect = useCallback(select, []);

  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: meta.keys(),
    meta,
    select: memoizedSelect
  });

  const { mutate, isPending } = useMutation({
    mutationFn: putAvailablity,

    onError: () => {
      Toast.error('Unable to update availability now.');
    },
    onMutate: () => {},
    onSuccess: (data) => {
      const status = data.data.data.status;

      if (status === 'Available') {
        Toast.success('You are checked in!');
      } else {
        Toast.success('You are checked out!');
      }

      queryClient.invalidateQueries({ queryKey: [AUTH.GET_PROFILE] });
    }
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

        <div className="flex items-center justify-start space-x-3">
          <div className="flex items-center justify-start space-x-1">
            <Switch
              checked={userProfile?.status === 'Available'}
              disabled={isPending}
              onClick={() =>
                mutate({
                  status: userProfile?.status === 'Available' ? 'Unavailable' : 'Available'
                })
              }
            />
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
