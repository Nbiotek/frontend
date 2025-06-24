import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { EllipsisVertical } from 'lucide-react';
import Status from '@/atoms/Buttons/Status';
import TableLoader from '@/atoms/Loaders/TableLoader';
import { dateTimeUTC } from '@/utils/date';
import EmptyState from '@/components/EmptyState';
import { useRouter } from 'next/navigation';

interface ReviewTestTableProps {
  loading: boolean;
  reviewTests: Tests[];
}

const ReviewTestTable = ({ loading, reviewTests }: ReviewTestTableProps) => {
  const router = useRouter();

  return (
    <div className="overflow-clip rounded-lg bg-white">
      <Table className="bg-white">
        <TableHeader>
          <TableRow>
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
                  <TableCell>{test.patientName}</TableCell>
                  <TableCell>{test.testName}</TableCell>
                  <TableCell>{dateTimeUTC(test.createdAt, false)}</TableCell>
                  <TableCell>{dateTimeUTC(test.deadlineAt, false)}</TableCell>
                  <TableCell>
                    <Status variant={test.status} />
                  </TableCell>
                  {/* download  */}
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <EllipsisVertical className="cursor-pointer" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuGroup>
                          {test.status === 'COMPLETED' ? (
                            <DropdownMenuItem
                              onClick={() => router.push(`/doctor/review-test/${test.id}`)}
                            >
                              View Test
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              onClick={() => router.push(`/doctor/review-test/${test.id}`)}
                            >
                              Write Report
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
