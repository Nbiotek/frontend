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
import { dateTimeUTC } from '@/utils/date';
import Router, { useRouter } from 'next/navigation';

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup
} from '@/components/ui/dropdown-menu';

const TestResultTable = ({ data }: TestResultResponse) => {
  const router = useRouter();

  const handleView = (id: string) => {
    router.push(`/patient/result/${id}`);
  };
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
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.results.map((test) => (
            <TableRow key={test.id}>
              <TableCell>{test.testId}</TableCell>
              <TableCell>{test.testName}</TableCell>
              <TableCell>{dateTimeUTC(test.conductedAt, false)}</TableCell>
              <TableCell>{test.resultStatus}</TableCell>
              <TableCell>{test.status}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <EllipsisVertical className="cursor-pointer" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuGroup>
                      <DropdownMenuItem onClick={() => handleView(test.id)}>View</DropdownMenuItem>
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
