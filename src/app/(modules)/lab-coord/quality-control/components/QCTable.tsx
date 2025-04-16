import { EllipsisVertical } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import Status from '@/atoms/Buttons/Status';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup
} from '@/components/ui/dropdown-menu';
import TableLoader from '@/atoms/Loaders/TableLoader';
import EmptyState from '@/components/EmptyState';
import { formatTestDate } from '@/utils/date';

interface IQCTableProps {
  isLoading: boolean;
  resultsData: TQCTestResp;
}

const QCTable = ({ isLoading, resultsData }: IQCTableProps) => {
  return (
    <div className="w-full overflow-clip rounded-lg bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient Name</TableHead>
            <TableHead>Test Name</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Test Type</TableHead>
            <TableHead>Requested Date</TableHead>
            <TableHead>Deadline</TableHead>
            <TableHead className="w-[80px]">Status</TableHead>
            <TableHead className="w-[20px]"></TableHead>
          </TableRow>
        </TableHeader>

        {isLoading ? (
          <TableLoader rows={20} columns={8} />
        ) : (
          resultsData.requests.length !== 0 && (
            <TableBody>
              {resultsData.requests.map((qcDatum) => (
                <TableRow key={qcDatum.id}>
                  <TableCell>{qcDatum.patientName}</TableCell>
                  <TableCell>{qcDatum.testName}</TableCell>
                  <TableCell>
                    <Status variant={qcDatum.priority} />
                  </TableCell>
                  <TableCell>{qcDatum.testType}</TableCell>
                  <TableCell>{formatTestDate(qcDatum.preferredAt)}</TableCell>
                  <TableCell>{formatTestDate(qcDatum.deadlineAt)}</TableCell>
                  <TableCell>
                    <Status variant={qcDatum.status} />
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <EllipsisVertical size={16} className="cursor-pointer text-neutral-400" />
                      </DropdownMenuTrigger>

                      <DropdownMenuContent className="">
                        <DropdownMenuGroup>
                          <DropdownMenuItem>Mark as ready</DropdownMenuItem>
                          <DropdownMenuItem>Mark as ready</DropdownMenuItem>
                          <DropdownMenuItem>Mark as ready</DropdownMenuItem>
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

      {isLoading ||
        (resultsData.requests.length === 0 && (
          <EmptyState title="No pending Quality control data" />
        ))}
    </div>
  );
};

export default QCTable;
