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

const ReviewTestTable = () => {
  return (
    <div className="overflow-clip rounded-lg">
      <Table className="bg-white">
        <TableHeader>
          <TableRow>
            <TableHead>Patient Name</TableHead>
            <TableHead>Test ID</TableHead>
            <TableHead>Test Assinged Date</TableHead>
            <TableHead>Deadlines</TableHead>
            <TableHead>status</TableHead>
            <TableHead className="w-[20px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">david chappel</TableCell>
            <TableCell>##@$EEEE</TableCell>
            <TableCell>23/05/33</TableCell>
            <TableCell>23/4/5</TableCell>
            <TableCell>
              {' '}
              <span
                className={`${getStatusColor('under review')} rounded-lg px-4 py-1.5 font-semibold  `}
              >
                Under Review
              </span>
            </TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <EllipsisVertical className="mr-2" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>View</DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">david chappel</TableCell>
            <TableCell>##@$EEEE</TableCell>
            <TableCell>23/05/33</TableCell>
            <TableCell>23/4/5</TableCell>
            <TableCell>
              {' '}
              <span className={`${getStatusColor('pending')} rounded-lg px-4 py-1.5`}>pending</span>
            </TableCell>
            <TableCell className="">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <EllipsisVertical className="mr-2" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>View</DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default ReviewTestTable;
