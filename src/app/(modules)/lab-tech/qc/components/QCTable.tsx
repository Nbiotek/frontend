import { EllipsisVertical, Eye, FlaskConical } from 'lucide-react';
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
  DropdownMenuContent
} from '@/components/ui/dropdown-menu';
import TableLoader from '@/atoms/Loaders/TableLoader';
import EmptyState from '@/components/EmptyState';
import { formatTestDate } from '@/utils/date';
import ROUTES from '@/constants/routes';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store';

interface IQCTableProps {
  isLoading: boolean;
  resultsData: TQCTestResp;
}

const QCTable = ({ isLoading, resultsData }: IQCTableProps) => {
  const router = useRouter();
  const {
    AppConfigStore: { toggleModals }
  } = useStore();
  return (
    <div className="w-full overflow-clip rounded-lg bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient Name</TableHead>
            <TableHead>Test type</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Date Requested</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Deadline</TableHead>
            <TableHead>Date submitted</TableHead>
            <TableHead>Result</TableHead>
            <TableHead className="w-[20px]"></TableHead>
          </TableRow>
        </TableHeader>

        {isLoading ? (
          <TableLoader rows={20} columns={9} />
        ) : (
          resultsData.requests.length !== 0 && (
            <TableBody>
              {resultsData.requests.map((qcDatum) => (
                <TableRow key={qcDatum.id}>
                  <TableCell className="font-medium">{qcDatum.patientName}</TableCell>
                  <TableCell>{qcDatum.testType}</TableCell>
                  <TableCell>
                    <Status variant={qcDatum.priority} />
                  </TableCell>
                  <TableCell>{formatTestDate(qcDatum.preferredAt)}</TableCell>
                  <TableCell>
                    <Status variant={qcDatum.status} />
                  </TableCell>
                  <TableCell>{formatTestDate(qcDatum.deadlineAt)}</TableCell>
                  <TableCell>{formatTestDate(qcDatum.completedAt)}</TableCell>
                  <TableCell>
                    <Status variant={qcDatum.resultStatus} />
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
                              `${ROUTES.LAB_TECH_TEST_DETAILS.path.replaceAll(':id', qcDatum.id)}`
                            )
                          }
                        >
                          <Eye />
                          <p>View Test</p>
                        </DropdownMenuItem>
                        {qcDatum.resultStatus == EnumResultStatus.PENDING.toString() && (
                          <DropdownMenuItem onClick={() => {}}>
                            <FlaskConical />
                            <p>Request Control</p>
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

      {isLoading || (resultsData.requests.length === 0 && <EmptyState title="No Test data" />)}
    </div>
  );
};

export default QCTable;
