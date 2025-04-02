import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { EllipsisVertical } from 'lucide-react';
import Status from '@/atoms/Buttons/Status';
import TableLoader from '@/atoms/Loaders/TableLoader';
import { dateTimeUTC } from '@/utils/date';
import EmptyState from '@/components/EmptyState';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-[#FFA756]/30 text-yellow-800';
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'under review':
      return 'bg-[#6226EF]/30 text-blue-400';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

interface ReviewTestTableProps {
  loading: boolean;
  reviewTests: Tests[];
}

const ReviewTestTable = ({ loading, reviewTests }: ReviewTestTableProps) => {
  console.log(reviewTests);

  return (
    <div className="overflow-clip rounded-lg">
      <Table className="bg-white">
        <TableHeader>
          <TableRow>
            <TableHead>Test ID</TableHead>
            <TableHead>Patient Name</TableHead>
            <TableHead>Test Name</TableHead>
            <TableHead>Assinged Date</TableHead>
            <TableHead>Deadlines</TableHead>
            <TableHead>status</TableHead>
            <TableHead className="w-[20px]"></TableHead>
          </TableRow>
        </TableHeader>
        {loading ? (
          <TableLoader rows={7} columns={6} />
        ) : (
          reviewTests.length !== 0 && (
            <TableBody>
              {reviewTests.map((test) => (
                <TableRow key={test.id}>
                  <TableCell>{test.id}</TableCell>
                  <TableCell>{test.patientName}</TableCell>
                  <TableCell>{test.testName}</TableCell>
                  <TableCell>{dateTimeUTC(test.createdAt, false)}</TableCell>
                  <TableCell>{dateTimeUTC(test.deadline, false)}</TableCell>
                  <TableCell>
                    <Status variant={test.status} />
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
      {loading || (reviewTests.length === 0 && <EmptyState title="No Test data" />)}
    </div>
  );
};

export default ReviewTestTable;
