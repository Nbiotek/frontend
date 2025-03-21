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
import Status, { EnumResultStatus } from '@/atoms/Buttons/Status';

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup
} from '@/components/ui/dropdown-menu';

const TestResultTable = ({ data }: TestResultResponse) => {
  console.log(data);
  const router = useRouter();

  const handleView = (id: string) => {
    router.push(`/patient/result/${id}`);
  };

  const handleTestSuit = (id: string) => {
    router.push(`/patient/result/test-suite/${id}`);
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
            <TableHead className="w-20"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.results.map((test) => (
            <TableRow key={test.id}>
              <TableCell>{test.testId}</TableCell>
              <TableCell>{test.testName}</TableCell>
              <TableCell>{dateTimeUTC(test.conductedAt, false)}</TableCell>
              <TableCell>
                <Status variant={test.resultStatus} />
              </TableCell>
              <TableCell>{test.status}</TableCell>
              <TableCell>
                {test.resultStatus !== 'IN_PROGRESS' ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <EllipsisVertical className="cursor-pointer" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuGroup>
                        <DropdownMenuItem onClick={() => handleView(test.id)}>
                          View
                        </DropdownMenuItem>
                        {test.testSuitId && (
                          <DropdownMenuItem onClick={() => handleTestSuit(test.testSuitId)}>
                            View Test Suit
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Status variant="NOT_AVAILABLE" />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TestResultTable;
