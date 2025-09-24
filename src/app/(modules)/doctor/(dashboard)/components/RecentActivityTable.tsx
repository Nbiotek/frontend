import Status from '@/atoms/Buttons/Status';
import TableLoader from '@/atoms/Loaders/TableLoader';
import EmptyState from '@/components/EmptyState';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { dateTimeUTC } from '@/utils/date';
import { CheckCircle, EllipsisVertical, MapPin } from 'lucide-react';

import { useRecentActivity } from '@/hooks/doctor/useDashboard';
import { Text } from '@/lib/utils/Text';
import { useState } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { doctorDashboardService } from '@/requests/doctor';
import toast from 'react-hot-toast';
import { AUTH } from '@/constants/api';
import { Switch } from '@/components/ui/switch';
import { useFetchProfile } from '@/hooks/user/useFetchProfile';

const RecentActivityTable = () => {
  const { isLoading, data: recentActivity } = useRecentActivity();
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  const reviews = recentActivity?.data?.reviews || [];
  const hasNoData = reviews.length === 0;

  const { data: userProfile } = useFetchProfile();

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: doctorDashboardService.updateAvailability,

    onError: () => {
      toast.error('Unable to update availability now.');
    },
    onMutate: () => {},
    onSuccess: (data) => {
      const status = data.status;

      if (status === 'Available') {
        toast.success('You are checked in!');
      } else {
        toast.success('You are checked out!');
      }

      queryClient.invalidateQueries({ queryKey: [AUTH.GET_PROFILE] });
    }
  });
  return (
    <>
      <div className="w-full rounded-lg px-4 py-3">
        <div className="flex items-center justify-between p-3">
          <Text className="border-b-1.5 " variant="title" weight="bold">
            Recent Activity
          </Text>

          <div
            className={`flex items-center space-x-3 rounded-lg border-2 px-4 py-2 transition-all duration-200 ${
              isCheckedIn
                ? 'bg-green-50 text-green-800 border-green-200'
                : 'bg-orange-50 border-orange-200 text-orange-800'
            }`}
          >
            <div className="flex items-center space-x-2">
              {isCheckedIn ? (
                <CheckCircle size={18} className="text-green-600" />
              ) : (
                <MapPin size={18} className="text-orange-600" />
              )}
              <span className="font-medium">{isCheckedIn ? 'Checked In' : 'Check In'}</span>
            </div>
            <Switch
              checked={userProfile?.status === 'Available'}
              onCheckedChange={setIsCheckedIn}
              disabled={isPending}
              onClick={() =>
                mutate({
                  status: userProfile?.status === 'Available' ? 'Unavailable' : 'Available'
                })
              }
            />
          </div>
        </div>
        <Table>
          <TableHeader className="bg-neutral-50 text-black">
            <TableRow className="text-black">
              <TableHead className="text-black">TEST NAME</TableHead>
              <TableHead className="text-black">PATIENT NAME</TableHead>
              <TableHead className="text-black"> TEST TYPE</TableHead>
              <TableHead className="text-black">DATE</TableHead>
              <TableHead className="text-black">STATUS</TableHead>
              <TableHead className="w-[20px]"> </TableHead>
            </TableRow>
          </TableHeader>
          {isLoading ? (
            <TableLoader rows={6} columns={5} />
          ) : (
            reviews.length !== 0 && (
              <TableBody>
                {reviews.map((recentTest) => (
                  <TableRow key={recentTest.id}>
                    <TableCell>{recentTest.testName}</TableCell>
                    <TableCell>{recentTest.patientName}</TableCell>

                    <TableCell>
                      <Status variant={recentTest.type} />
                    </TableCell>
                    <TableCell>{dateTimeUTC(recentTest.createdAt, false)}</TableCell>
                    <TableCell>
                      <Status variant={recentTest.status} />
                    </TableCell>
                    {/* download  */}
                    <TableCell>
                      <EllipsisVertical className="cursor-pointer" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )
          )}
        </Table>
        {isLoading || (reviews.length === 0 && <EmptyState title="No Test data" />)}
      </div>
    </>
  );
};

export default RecentActivityTable;
