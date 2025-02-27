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
  resultsData: TRecentTestResults;
}

const ResultsTable = ({ isLoading, resultsData }: IQCTableProps) => {
  return (
    <div className="w-full overflow-clip rounded-lg bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient Name</TableHead>
            <TableHead>Test type</TableHead>
            <TableHead>Requested Date</TableHead>
            <TableHead>Completed Date</TableHead>
            <TableHead className="w-[80px]">Status</TableHead>
            <TableHead className="w-[20px]"></TableHead>
          </TableRow>
        </TableHeader>

        {isLoading ? (
          <TableLoader rows={20} columns={6} />
        ) : (
          resultsData.results.length !== 0 && (
            <TableBody>
              {resultsData.results.map((resultDatum) => (
                <TableRow key={resultDatum.id}>
                  <TableCell className="font-medium">{resultDatum.patientName}</TableCell>
                  <TableCell>{resultDatum.testType}</TableCell>
                  <TableCell>{resultDatum.requestedDate}</TableCell>
                  <TableCell>{resultDatum.completedDate}</TableCell>
                  <TableCell>
                    <Status variant={resultDatum.status} />
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

      {resultsData.results.length === 0 && <EmptyState title="No Test data" />}
    </div>
  );
};

export default ResultsTable;
