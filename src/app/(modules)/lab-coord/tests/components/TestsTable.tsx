'use client';
import { EllipsisVertical, Eye, Pause, Play, Upload } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import Status, { EnumTestStatus } from '@/atoms/Buttons/Status';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup
} from '@/components/ui/dropdown-menu';
import { useStore } from '@/store';
import { AppModals } from '@/store/AppConfig/appModalTypes';
import { observer } from 'mobx-react-lite';
import TableLoader from '@/atoms/Loaders/TableLoader';
import EmptyState from '@/components/EmptyState';
import { format } from 'date-fns';
import Link from 'next/link';
import ROUTES from '@/constants/routes';
import { useRouter } from 'next/navigation';
import { useUpdateTestStatus } from '@/hooks/labTech/useUpdateTestStatus';

interface ITestTableProps {
  isLoading: boolean;
  tests: TTestQuesRes;
}

const TestsTable = ({ isLoading, tests }: ITestTableProps) => {
  const router = useRouter();
  const {
    AppConfigStore: { toggleModals }
  } = useStore();
  const { mutateTestStatus, isPending } = useUpdateTestStatus();

  return (
    <div className="w-full overflow-clip rounded-lg bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[280px]">Name</TableHead>
            <TableHead className="w-[280px]">Test Name</TableHead>
            <TableHead className="w-[80px]">Priority</TableHead>
            <TableHead className="w-[150px]">Date created</TableHead>
            <TableHead className="w-[150px]">Requested Date</TableHead>
            <TableHead className="w-[150px]">Deadline</TableHead>
            <TableHead className="w-[80px]">Status</TableHead>
            <TableHead className="w-[20px]"></TableHead>
          </TableRow>
        </TableHeader>
        {isLoading ? (
          <TableLoader rows={20} columns={6} />
        ) : (
          tests.requests.length !== 0 && (
            <TableBody>
              {tests.requests.map((test) => (
                <TableRow key={test.id}>
                  <TableCell className="whitespace-nowrap font-medium">
                    {test.patientName}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">{test.testName}</TableCell>
                  <TableCell>
                    <Status variant={test.priority} />
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {format(new Date(test.createdAt), 'dd MMM, yyyy')}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {format(new Date(test.preferredAt), 'dd MMM, yyyy')}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {format(new Date(test.deadlineAt), 'dd MMM, yyyy')}
                  </TableCell>
                  <TableCell>
                    <Status variant={test.status} />
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <EllipsisVertical size={16} className="cursor-pointer text-neutral-400" />
                      </DropdownMenuTrigger>

                      <DropdownMenuContent className="">
                        <DropdownMenuItem
                          onClick={() =>
                            router.push(
                              `${ROUTES.LAB_COORD_TEST_DETAILS.path.replaceAll(':id', test.id)}`
                            )
                          }
                        >
                          <Eye />
                          <p>View Test</p>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )
        )}
      </Table>

      {isLoading || (tests.requests.length === 0 && <EmptyState title="No Test data" />)}
    </div>
  );
};

export default observer(TestsTable);
