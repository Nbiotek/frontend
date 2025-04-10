import { EllipsisVertical } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import Status, { EnumResultStatus } from '@/atoms/Buttons/Status';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup
} from '@/components/ui/dropdown-menu';
import TableLoader from '@/atoms/Loaders/TableLoader';
import EmptyState from '@/components/EmptyState';
import { formatTestDate } from '@/utils/date';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { putQCStatusUpdate } from '@/requests/lab-coord';
import toast from 'react-hot-toast';
import { LAB_COORD } from '@/constants/api';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/store';
import { AppModals } from '@/store/AppConfig/appModalTypes';
import ROUTES from '@/constants/routes';
import { useRouter } from 'next/navigation';

interface IQCTableProps {
  isLoading: boolean;
  resultsData: TQCTestResp;
}

const QCTable = ({ isLoading, resultsData }: IQCTableProps) => {
  const router = useRouter();
  const {
    AppConfigStore: { toggleModals }
  } = useStore();
  const queryClient = useQueryClient();
  const { mutate: qcStatusMutate, isPending } = useMutation({
    mutationFn: putQCStatusUpdate,
    onError: (error) => {
      toast.success(error.message);
    },
    onSuccess: (data) => {
      toast.success(data.data.message);
      queryClient.invalidateQueries({ queryKey: [LAB_COORD.DASHBOARD] });
    }
  });

  return (
    <div className="w-full overflow-clip rounded-lg bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient</TableHead>
            <TableHead>Test Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Test Type</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Requested Date</TableHead>
            <TableHead className="w-[80px]">Result</TableHead>
            <TableHead>Deadline</TableHead>
            <TableHead className="w-[80px]">QC</TableHead>
            <TableHead className="w-[20px]"></TableHead>
          </TableRow>
        </TableHeader>

        {isLoading ? (
          <TableLoader rows={20} columns={10} />
        ) : (
          resultsData.requests.length !== 0 && (
            <TableBody>
              {resultsData.requests.map((qcDatum) => (
                <TableRow key={qcDatum.id}>
                  <TableCell>{qcDatum.patientName}</TableCell>
                  <TableCell>{qcDatum.testName}</TableCell>
                  <TableCell>
                    <Status variant={qcDatum.status} />
                  </TableCell>
                  <TableCell>{qcDatum.testType}</TableCell>
                  <TableCell>
                    <Status variant={qcDatum.priority} />
                  </TableCell>
                  <TableCell>{formatTestDate(qcDatum.preferredAt)}</TableCell>
                  <TableCell>
                    <Status variant={qcDatum.resultStatus} />
                  </TableCell>
                  <TableCell>{formatTestDate(qcDatum.deadlineAt)}</TableCell>
                  <TableCell>{qcDatum.qcStatus && <Status variant={qcDatum.qcStatus} />}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <EllipsisVertical size={16} className="cursor-pointer text-neutral-400" />
                      </DropdownMenuTrigger>

                      <DropdownMenuContent className="">
                        <DropdownMenuGroup>
                          <DropdownMenuItem
                            onClick={() =>
                              router.push(
                                `${ROUTES.LAB_COORD_TEST_DETAILS.path.replaceAll(':id', qcDatum.id)}`
                              )
                            }
                          >
                            View Test
                          </DropdownMenuItem>
                          {(qcDatum.qcStatus && qcDatum.qcStatus === EnumResultStatus.PENDING) || (
                            <DropdownMenuItem
                              onClick={() =>
                                qcStatusMutate({
                                  status: EnumResultStatus.UNDER_REVIEW,
                                  testId: qcDatum.id
                                })
                              }
                            >
                              Start Review
                            </DropdownMenuItem>
                          )}
                          {qcDatum.qcStatus &&
                            qcDatum.qcStatus === EnumResultStatus.UNDER_REVIEW && (
                              <DropdownMenuItem
                                onClick={() => {
                                  // TODO: Open modal to pass or fail test.
                                }}
                              >
                                Review Test
                              </DropdownMenuItem>
                            )}
                          {qcDatum.qcStatus && qcDatum.qcStatus === EnumResultStatus.FAILED && (
                            <DropdownMenuItem
                              onClick={() =>
                                toggleModals({
                                  name: AppModals.AVAILABLE_TECHNICIANS,
                                  open: true,
                                  testId: qcDatum.id,
                                  isReassign: true
                                })
                              }
                            >
                              Reassign test
                            </DropdownMenuItem>
                          )}
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

      {isLoading ||
        (resultsData.requests.length === 0 && (
          <EmptyState title="No pending Quality control data" />
        ))}
    </div>
  );
};

export default observer(QCTable);
