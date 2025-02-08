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
  qcData: Array<TQCData>;
}

const QCTable = ({ qcData }: IQCTableProps) => {
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
        <TableBody>
          {qcData.map((qcDatum) => (
            <TableRow key={qcDatum.name}>
              <TableCell className="font-medium">{qcDatum.name}</TableCell>
              <TableCell>{qcDatum.type}</TableCell>
              <TableCell>{qcDatum.req_date}</TableCell>
              <TableCell>{qcDatum.due_date}</TableCell>
              <TableCell>
                <Status variant={qcDatum.level} />
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

export default QCTable;
