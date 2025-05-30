'use client';
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

const Recent = ({ isLoading, data }: IRecentActivityProps) => {
  const { data: userProfile } = useFetchProfile();

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: putAvailablity,

    onError: () => {
      toast.error('Unable to update availability now.');
    },
    onMutate: () => {},
    onSuccess: (data) => {
      const status = data.data.data.status;

      if (status === 'Available') {
        toast.success('You are checked in!');
      } else {
        toast.success('You are checked out!');
      }

      queryClient.invalidateQueries({ queryKey: [AUTH.GET_PROFILE] });
    }
  });

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
