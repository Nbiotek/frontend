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

const AppointmentTable = () => {
  return (
    <div className="overflow-clip rounded-lg">
      <Table className="bg-white">
        <TableHeader>
          <TableRow>
            <TableHead>Patient Name</TableHead>
            <TableHead>Test ID</TableHead>
            <TableHead>Test Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>status</TableHead>
            <TableHead className="w-[20px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">david chappel</TableCell>
            <TableCell>##@$EEEE</TableCell>
            <TableCell>Glucose blah blah</TableCell>
            <TableCell>23/4/5</TableCell>
            <TableCell>
              {' '}
              <Status variant={'PENDING'} />
            </TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <EllipsisVertical className="mr-2" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>View </DropdownMenuItem>
                  <DropdownMenuItem></DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">david chappel</TableCell>
            <TableCell>##@$EEEE</TableCell>
            <TableCell>Glucose blah blah</TableCell>
            <TableCell>23/4/5</TableCell>
            <TableCell>
              {' '}
              <Status variant={'PENDING'} />
            </TableCell>
            <TableCell className="">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <EllipsisVertical className="mr-2" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Reject </DropdownMenuItem>
                  <DropdownMenuItem>Write Report</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default AppointmentTable;
