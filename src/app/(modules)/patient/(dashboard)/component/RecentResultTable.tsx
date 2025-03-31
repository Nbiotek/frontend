import Status from '@/atoms/Buttons/Status';
import TableLoader from '@/atoms/Loaders/TableLoader';
import EmptyState from '@/components/EmptyState';
import { Skeleton } from '@/components/ui/skeleton';
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
import { DownloadCloudIcon, EllipsisVertical } from 'lucide-react';

interface RecentResultProps {
  data: TPatientRecentTest;
  loading: boolean;
}

const RecentResultTable = ({ data, loading }: RecentResultProps) => {
  return (
    <>
      <div className="w-full rounded-lg">
        <Table>
          <TableHeader className="bg-neutral-50 text-black">
            <TableRow className="text-black">
              <TableHead className="text-black">ID</TableHead>
              <TableHead className="text-black">TEST NAME</TableHead>
              <TableHead className="text-black">DATE</TableHead>
              <TableHead className="text-black">TYPE</TableHead>
              <TableHead className="text-black">STATUS</TableHead>
              <TableHead className="w-[20px]"> </TableHead>
            </TableRow>
          </TableHeader>
          {loading ? (
            <TableLoader rows={6} columns={5} />
          ) : (
            data.data.length !== 0 && (
              <TableBody>
                {data.data.map((recentTest) => (
                  <TableRow key={recentTest.id}>
                    <TableCell>{recentTest.id}</TableCell>
                    <TableCell>{recentTest.name}</TableCell>
                    <TableCell>{dateTimeUTC(recentTest.date, false)}</TableCell>
                    <TableCell>{recentTest.type}</TableCell>
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
        {loading || (data.data.length === 0 && <EmptyState title="No Test data" />)}
      </div>
    </>
  );
};

export default RecentResultTable;
