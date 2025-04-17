import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import Status from '@/atoms/Buttons/Status';
import { EllipsisVertical, PlayCircle, Upload, UploadCloud, UploadIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const FieldVisitTable = () => {
  const router = useRouter();
  return (
    <>
      <div className="overflow-clip rounded-lg">
        <Table className="bg-white">
          <TableHeader>
            <TableRow>
              <TableHead>Patient Name</TableHead>
              <TableHead>Test Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-20"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>John Doe</TableCell>
              <TableCell>Blood Pressure</TableCell>
              <TableCell>2023-10-01</TableCell>
              <TableCell>10:00 AM</TableCell>
              <TableCell>
                <Status variant="PENDING" />
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="w-8 px-0">
                      <EllipsisVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <span className="flex items-center ">
                        {' '}
                        Start Test <PlayCircle className="ml-2 w-4" color="#550000" />
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => router.push('/marketer/field-visits/22442432refeg')}
                    >
                      <span className="flex items-center ">
                        {' '}
                        Upload sample <UploadIcon className="ml-2 w-4" color="#008000" />
                      </span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default FieldVisitTable;
