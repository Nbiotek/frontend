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
import { EllipsisVertical } from 'lucide-react';

import { useRecentActivity } from '@/hooks/doctor/useDashboard';
import { Text } from '@/lib/utils/Text';

const RecentActivityTable = () => {
  const { isLoading, data: recentActivity } = useRecentActivity();

  const reviews = recentActivity?.data?.reviews || [];
  const hasNoData = reviews.length === 0;
  return (
    <>
      <div className="w-full rounded-lg px-4 py-3">
        <Text className="border-b-1.5 mb-4" variant="title" weight="bold">
          Recent Activity
        </Text>
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
