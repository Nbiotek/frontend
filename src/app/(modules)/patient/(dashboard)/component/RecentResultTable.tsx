import Status from '@/atoms/Buttons/Status';
import TableLoader from '@/atoms/Loaders/TableLoader';
import EmptyState from '@/components/EmptyState';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { dateTimeUTC } from '@/utils/date';
import { DownloadCloudIcon, EllipsisVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup
} from '@/components/ui/dropdown-menu';
import Router, { useRouter } from 'next/navigation';

interface RecentResultProps {
  data: TPatientRecentTest;
  loading: boolean;
}

const RecentResultTable = ({ data, loading }: RecentResultProps) => {
  const router = useRouter();

  const handleView = (id: string) => {
    router.push(`/patient/result/${id}`);
  };

  const handleTestSuit = (id: string) => {
    router.push(`/patient/result/test-suite/${id}`);
  };

  return (
    <>
      <div className="w-full rounded-lg">
        <Table>
          <TableHeader className="bg-neutral-50 text-black">
            <TableRow className="text-black">
              <TableHead className="text-black">ID</TableHead>
              <TableHead className="text-black">TEST NAME</TableHead>
              <TableHead className="text-black">DATE</TableHead>
              <TableHead className="text-black">TYPE</TableHead>
              <TableHead className="text-black">STATUS</TableHead>
              <TableHead className="w-[20px]"> </TableHead>
            </TableRow>
          </TableHeader>
          {loading ? (
            <TableLoader rows={6} columns={5} />
          ) : (
            data.data.length !== 0 && (
              <TableBody>
                {data.data.map((recentTest) => (
                  <TableRow key={recentTest.id}>
                    <TableCell>{recentTest.testResultId}</TableCell>
                    <TableCell>{recentTest.name}</TableCell>
                    <TableCell>{dateTimeUTC(recentTest.date, false)}</TableCell>
                    <TableCell>{recentTest.type}</TableCell>
                    <TableCell>
                      <Status variant={recentTest.status} />
                    </TableCell>
                    {/* download  */}
                    <TableCell>
                      {recentTest.resultStatus !== 'IN_PROGRESS' ? (
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <EllipsisVertical className="cursor-pointer" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuGroup>
                              <DropdownMenuItem onClick={() => handleView(recentTest.id)}>
                                View
                              </DropdownMenuItem>
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
            )
          )}
        </Table>
        {loading || (data.data.length === 0 && <EmptyState title="No Test data" />)}
      </div>
    </>
  );
};

export default RecentResultTable;
