'use client';
import { CircleX, EllipsisVertical, Upload } from 'lucide-react';
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
  DropdownMenuContent,
  DropdownMenuGroup
} from '@/components/ui/dropdown-menu';
import { useStore } from '@/store';
import { AppModals } from '@/store/AppConfig/appModalTypes';
import { observer } from 'mobx-react-lite';
import TableLoader from '@/atoms/Loaders/TableLoader';
import EmptyState from '@/components/EmptyState';

interface ITestTableProps {
  isLoading: boolean;
  tests: Array<TTestType>;
}

const TestsTable = ({ isLoading, tests }: ITestTableProps) => {
  const {
    AppConfigStore: { toggleModals }
  } = useStore();
  return (
    <div className="w-full overflow-clip rounded-lg bg-white">
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
        {isLoading ? (
          <TableLoader rows={20} columns={6} />
        ) : (
          tests.length !== 0 && (
            <TableBody>
              {tests.map((test) => (
                <TableRow key={test.patientName}>
                  <TableCell className="whitespace-nowrap font-medium">
                    {test.patientName}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">{test.testType}</TableCell>
                  <TableCell className="whitespace-nowrap">{test.requestDate}</TableCell>
                  <TableCell className="whitespace-nowrap">{test.deadline}</TableCell>
                  <TableCell>
                    <Status variant={test.priority} />
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <EllipsisVertical size={16} className="cursor-pointer text-neutral-400" />
                      </DropdownMenuTrigger>

                      <DropdownMenuContent className="">
                        <DropdownMenuGroup>
                          <DropdownMenuItem
                            onClick={() =>
                              toggleModals({
                                open: true,
                                name: AppModals.RESULT_UPLOAD_MODAL,
                                test_uuid: ''
                              })
                            }
                          >
                            <Upload />
                            <p>Upload result</p>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-400">
                            <CircleX />
                            <p>Cancel test</p>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )
        )}
      </Table>

      {tests.length === 0 && <EmptyState title="No Test data" />}
    </div>
  );
};

export default observer(TestsTable);
