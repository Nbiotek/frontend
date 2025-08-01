'use client';
import { EllipsisVertical, Eye, HandCoins } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import Status from '@/atoms/Buttons/Status';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent
} from '@/components/ui/dropdown-menu';
import { useStore } from '@/store';
import { AppModals } from '@/store/AppConfig/appModalTypes';
import { observer } from 'mobx-react-lite';
import TableLoader from '@/atoms/Loaders/TableLoader';
import EmptyState from '@/components/EmptyState';
import { format } from 'date-fns';
import ROUTES from '@/constants/routes';
import { useRouter } from 'next/navigation';
import Pagination from '@/atoms/pagination';
import { EnumTestLocation } from '@/constants/mangle';
import { EnumLabCoordQueryType } from '@/store/LabCoordStore';

interface ITestTableProps {
  type: 'test' | 'assigned';
  isLoading: boolean;
  tests: TTestQuesRes;
}

const TestsTable = ({ type, isLoading, tests }: ITestTableProps) => {
  const dataType =
    type === 'assigned' ? EnumLabCoordQueryType.ASSIGNED_TEST : EnumLabCoordQueryType.TEST;
  const pagination = tests.pagination;
  const router = useRouter();
  const {
    AppConfigStore: { toggleModals },
    LabCoordStore: { setLimit, setPage, queries }
  } = useStore();
  const query = type === 'assigned' ? queries.ASSIGNED_TEST : queries.TEST;

  const handleSetLimit = (_limit: number) => setLimit(_limit, dataType);
  const handleSetPage = (_page: number) => setPage(_page, dataType);

  return (
    <div className="flex h-full w-full flex-col justify-end space-y-4">
      <div className="h-full w-full  overflow-clip rounded-lg bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[280px]">Name</TableHead>
              <TableHead className="w-[280px]">Test</TableHead>
              <TableHead className="w-[80px]">Type</TableHead>
              <TableHead className="w-[80px]">Priority</TableHead>
              <TableHead className="w-[280px]">Location</TableHead>
              <TableHead className="w-[150px]">Date created</TableHead>
              <TableHead className="w-[150px]">Requested Date</TableHead>
              <TableHead className="w-[150px]">Deadline</TableHead>
              <TableHead className="w-[80px]">Status</TableHead>
              <TableHead className="w-[20px]"></TableHead>
            </TableRow>
          </TableHeader>
          {isLoading ? (
            <TableLoader rows={20} columns={9} />
          ) : (
            tests.requests.length !== 0 && (
              <TableBody>
                {tests.requests.map((test) => (
                  <TableRow key={test.id}>
                    <TableCell className="whitespace-nowrap font-medium">
                      {test.patientName}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">{test.testName}</TableCell>
                    <TableCell className="whitespace-nowrap">
                      <Status variant={test.testType} />
                    </TableCell>
                    <TableCell>
                      <Status variant={test.priority} />
                    </TableCell>
                    <TableCell>{test.location?.type}</TableCell>
                    <TableCell className="whitespace-nowrap">
                      {format(new Date(test.createdAt), 'MMM dd, yyyy')}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {format(new Date(test.preferredAt), 'MMM dd, yyyy')}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {format(new Date(test.deadlineAt), 'MMM dd, yyyy')}
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
                          {type === 'test' && test.location?.type === EnumTestLocation.CUSTOM ? (
                            test.marketer && test.marketer.id ? (
                              <DropdownMenuItem
                                onClick={() =>
                                  toggleModals({
                                    name: AppModals.AVAILABLE_TECHNICIANS,
                                    open: true,
                                    testId: test.id
                                  })
                                }
                              >
                                <HandCoins />
                                <p>Assign to lab</p>
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem
                                onClick={() =>
                                  toggleModals({
                                    name: AppModals.AVAILABLE_MARKETERS,
                                    open: true,
                                    testId: test.id
                                  })
                                }
                              >
                                <HandCoins />
                                <p>Assign to Marketer</p>
                              </DropdownMenuItem>
                            )
                          ) : null}

                          {type === 'test' && test.location?.type === EnumTestLocation.LAB && (
                            <DropdownMenuItem
                              onClick={() =>
                                toggleModals({
                                  name: AppModals.AVAILABLE_TECHNICIANS,
                                  open: true,
                                  testId: test.id
                                })
                              }
                            >
                              <HandCoins />
                              <p>Assign to lab</p>
                            </DropdownMenuItem>
                          )}
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

      {isLoading || (
        <Pagination
          limit={pagination.limit ?? query.limit}
          setLimit={handleSetLimit}
          currentPage={pagination.page ?? query.page}
          setPage={handleSetPage}
          total={pagination.total}
          totalPages={pagination.totalPages}
          siblingCount={1}
        />
      )}
    </div>
  );
};

export default observer(TestsTable);
