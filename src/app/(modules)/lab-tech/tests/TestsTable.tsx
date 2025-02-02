import { EllipsisVertical } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import TestBadge from '@/atoms/Buttons/TestBadge';
import { tests } from '@/constants/data';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup
} from '@/components/ui/dropdown-menu';

const TestsTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Test type</TableHead>
          <TableHead>Requested Date</TableHead>
          <TableHead>Deadline</TableHead>
          <TableHead className="w-[80px]">Priority</TableHead>
          <TableHead className="w-[20px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tests.map((test) => (
          <TableRow key={test.name}>
            <TableCell className="font-medium">{test.name}</TableCell>
            <TableCell>{test.type}</TableCell>
            <TableCell>{test.req_date}</TableCell>
            <TableCell>{test.due_date}</TableCell>
            <TableCell>
              <TestBadge variant={test.level} />
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
  );
};

export default TestsTable;
