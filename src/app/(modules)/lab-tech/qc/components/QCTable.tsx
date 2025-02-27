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
            <TableHead>Test type</TableHead>
            <TableHead>Requested Date</TableHead>
            <TableHead>Deadline</TableHead>
            <TableHead className="w-[80px]">Status</TableHead>
            <TableHead className="w-[20px]"></TableHead>
          </TableRow>
        </TableHeader>

        {isLoading ? (
          <TableLoader rows={20} columns={6} />
        ) : (
          resultsData.requests.length !== 0 && (
            <TableBody>
              {resultsData.requests.map((qcDatum) => (
                <TableRow key={qcDatum.id}>
                  <TableCell className="font-medium">{qcDatum.patientName}</TableCell>
                  <TableCell>{qcDatum.testType}</TableCell>
                  <TableCell>{qcDatum.preferredAt}</TableCell>
                  <TableCell>{qcDatum.deadlineAt}</TableCell>
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

      {resultsData.requests.length === 0 && <EmptyState title="No Test data" />}
    </div>
  );
};

export default QCTable;
