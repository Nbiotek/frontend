import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

import { EllipsisVertical } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup
} from '@/components/ui/dropdown-menu';

const TestResultTable = () => {
  return (
    <div className="w-full overflow-clip rounded-lg bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Test ID</TableHead>
            <TableHead>Test Name</TableHead>
            <TableHead>Date Conducted</TableHead>
            <TableHead>Result Summary</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Reference Range</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">T1001</TableCell>
            <TableCell>Complete Blood Count (CBC)</TableCell>
            <TableCell>2024-12-18</TableCell>
            <TableCell>Normal</TableCell>
            <TableCell>Completed</TableCell>
            <TableCell>WBC: 4.0–11.0 x10⁹/L</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <EllipsisVertical size={16} className="cursor-pointer text-neutral-400" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="">
                  <DropdownMenuGroup>
                    <DropdownMenuItem>View</DropdownMenuItem>
                    <DropdownMenuItem>Download</DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">T1002</TableCell>
            <TableCell>Complete Blood Count (CBC)</TableCell>
            <TableCell>2024-12-18</TableCell>
            <TableCell>Normal</TableCell>
            <TableCell>Completed</TableCell>
            <TableCell>WBC: 4.0–11.0 x10⁹/L</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <EllipsisVertical size={16} className="cursor-pointer text-neutral-400" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="">
                  <DropdownMenuGroup>
                    <DropdownMenuItem>View</DropdownMenuItem>
                    <DropdownMenuItem>Download</DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default TestResultTable;
