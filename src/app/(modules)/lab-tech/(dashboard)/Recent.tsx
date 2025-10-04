'use client';
import { startTransition, useEffect, useOptimistic, useState } from 'react';
import HyperLink from '@/atoms/Hyperlink';
import { Paragraph, SubTitle } from '@/atoms/typographys';
import ROUTES from '@/constants/routes';
import TestsTable from '../tests/TestsTable';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { pagination } from '@/constants/data';
import { Switch } from '@/components/ui/switch';
import { useFetchProfile } from '@/hooks/user/useFetchProfile';
import { putAvailablity } from '@/requests/lab-tech';
import { AUTH } from '@/constants/api';
import toast from 'react-hot-toast';

interface IRecentActivityProps {
  isLoading: boolean;
  data: Array<TTestData>;
}

type TOptimisticAction = { type: 'start' } | { type: 'complete'; status?: string };

const Recent = ({ isLoading, data }: IRecentActivityProps) => {
  const { data: userProfile, isLoading: isProfileLoading } = useFetchProfile();
  const [userStatus, setUserStatus] = useState(userProfile?.status);
  const [optimisticCheck, addOptimisticCheck] = useOptimistic(
    userStatus === 'Available' ? 'checked' : 'unchecked',
    (_, action: TOptimisticAction) => {
      if (action.type === 'start') {
        return 'checking';
      }
      return action.status === 'Available' ? 'checked' : 'unchecked';
    }
  );

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: putAvailablity,
    onError: () => {
      toast.error('Unable to update availability now.');

      startTransition(() => {
        addOptimisticCheck({ type: 'complete', status: userStatus });
      });
    },
    onSuccess: (data) => {
      const newStatus = data.data.data.status;

      startTransition(() => {
        setUserStatus(newStatus);
        addOptimisticCheck({ type: 'complete', status: newStatus });
      });

      if (newStatus === 'Available') {
        toast.success('You are checked in!');
      } else {
        toast.success('You are checked out!');
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [AUTH.GET_PROFILE] });
    }
  });

  const handleToggle = () => {
    const newStatus = userProfile?.status === 'Available' ? 'Unavailable' : 'Available';

    startTransition(() => {
      addOptimisticCheck({ type: 'start' });
      mutate({ status: newStatus });
    });
  };

  useEffect(() => {
    if (!isProfileLoading) {
      setUserStatus(userProfile?.status);
    }
  }, [isProfileLoading, userProfile?.status]);

  return (
    <div className="flex w-full flex-col space-y-4">
      <div className="flex w-full items-center justify-between border-b pb-2">
        <SubTitle text="Recent Activity" />

        <div className="flex items-center justify-start space-x-3">
          <div className="flex items-center justify-start space-x-1">
            <Switch
              data-state={optimisticCheck}
              checked={optimisticCheck === 'checked'}
              disabled={isPending}
              onClick={handleToggle}
            />
            <Paragraph className="!font-medium" text="Check in" />
          </div>
        </div>
      </div>

      <TestsTable
        isLoading={isLoading}
        tests={{
          requests: data,
          pagination
        }}
      />

      {data.length > 0 && (
        <div className="flex w-full justify-end">
          <HyperLink href={ROUTES.LAB_TECH_TEST.path} hrefText="See tests" />
        </div>
      )}
    </div>
  );
};

export default Recent;
