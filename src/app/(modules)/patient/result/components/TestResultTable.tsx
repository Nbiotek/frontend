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
import test from 'node:test';

const TestResultTable = ({ data }: TestResultResponse) => {
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
          {data.results.map((test) => (
            <TableRow key={test.id}>
              <TableCell>{test.testId}</TableCell>
              <TableCell>{test.testName}</TableCell>
              <TableCell>{test.conductedAt}</TableCell>
              <TableCell>{test.resultStatus}</TableCell>
              <TableCell>{test.status}</TableCell>
              <TableCell>{test.results[0].range}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <EllipsisVertical className="cursor-pointer" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuGroup>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
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

export default TestResultTable;
