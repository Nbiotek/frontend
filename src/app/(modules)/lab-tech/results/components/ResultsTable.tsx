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
import { tests } from '@/constants/data';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup
} from '@/components/ui/dropdown-menu';

interface IQCTableProps {
  resultsData: Array<TTestResultData>;
}

const ResultsTable = ({ resultsData }: IQCTableProps) => {
  return (
    <div className="w-full overflow-clip rounded-lg bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient Name</TableHead>
            <TableHead>Test type</TableHead>
            <TableHead>Requested Date</TableHead>
            <TableHead>Deadline</TableHead>
            <TableHead>Completed Date</TableHead>
            <TableHead className="w-[80px]">Status</TableHead>
            <TableHead className="w-[20px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {resultsData.map((resultDatum) => (
            <TableRow key={resultDatum.name}>
              <TableCell className="font-medium">{resultDatum.name}</TableCell>
              <TableCell>{resultDatum.type}</TableCell>
              <TableCell>{resultDatum.req_date}</TableCell>
              <TableCell>{resultDatum.due_date}</TableCell>
              <TableCell>{resultDatum?.submitted_date ?? ''}</TableCell>
              <TableCell>
                <Status variant={resultDatum.level} />
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
      </Table>
    </div>
  );
};

export default ResultsTable;
