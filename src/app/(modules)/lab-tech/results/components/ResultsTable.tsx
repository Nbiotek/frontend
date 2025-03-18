import { Archive, ArchiveRestore, EllipsisVertical, Eye } from 'lucide-react';
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
import TableLoader from '@/atoms/Loaders/TableLoader';
import EmptyState from '@/components/EmptyState';
import { formatTestDate } from '@/utils/date';
import ROUTES from '@/constants/routes';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store';

interface IQCTableProps {
  type: 'recent' | 'archived';
  isLoading: boolean;
  resultsData: TRecentTestResults;
}

const ResultsTable = ({ type, isLoading, resultsData }: IQCTableProps) => {
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
            <TableHead>Date Submitted</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Deadline</TableHead>
            <TableHead>Result Status</TableHead>
            <TableHead className="w-[20px]"></TableHead>
          </TableRow>
        </TableHeader>

        {isLoading ? (
          <TableLoader rows={20} columns={8} />
        ) : (
          resultsData.results.length !== 0 && (
            <TableBody>
              {resultsData.results.map((resultDatum) => (
                <TableRow key={resultDatum.id}>
                  <TableCell className="font-medium">{resultDatum.patientName}</TableCell>
                  <TableCell>{resultDatum.testType}</TableCell>
                  <TableCell>
                    <Status variant={resultDatum.priority} />
                  </TableCell>
                  <TableCell>{formatTestDate(resultDatum.completedAt)}</TableCell>
                  <TableCell>
                    <Status variant={resultDatum.status} />
                  </TableCell>
                  <TableCell>{formatTestDate(resultDatum.deadlineAt)}</TableCell>
                  <TableCell>
                    <Status variant={resultDatum.resultStatus} />
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <EllipsisVertical size={16} className="cursor-pointer text-neutral-400" />
                      </DropdownMenuTrigger>

                      <DropdownMenuContent className="w-fit">
                        <DropdownMenuItem
                          onClick={() =>
                            router.push(
                              `${ROUTES.LAB_TECH_TEST_DETAILS.path.replaceAll(':id', resultDatum.id)}`
                            )
                          }
                        >
                          <Eye />
                          <p>View</p>
                        </DropdownMenuItem>

                        {type === 'recent' && (
                          <DropdownMenuItem onClick={() => {}}>
                            <Archive />
                            <p>Archive</p>
                          </DropdownMenuItem>
                        )}

                        {type === 'archived' && (
                          <DropdownMenuItem onClick={() => {}}>
                            <ArchiveRestore />
                            <p>Archive Restore</p>
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

      {isLoading || (resultsData.results.length === 0 && <EmptyState title="No Test data" />)}
    </div>
  );
};

export default ResultsTable;
