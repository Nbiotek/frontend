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

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup
} from '@/components/ui/dropdown-menu';
import { DownloadCloudIcon } from 'lucide-react';
import { dateTimeUTC } from '@/utils/date';

const TransactionHistoryTable = ({ data }: BillingHistory) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-[#6226EF]/20 text-blue-400';
      case 'COMPLETED':
        return 'bg-green-200/30 text-green-500';
      case 'FAILED':
        return 'bg-red-200/30 text-red-500';
      default:
        return 'bg-gray-200/30 text-gray-500';
    }
  };

  return (
    <div className="w-full overflow-clip rounded-lg bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">Invoice No</TableHead>
            <TableHead>Payment Date</TableHead>
            <TableHead>Payment Method</TableHead>
            <TableHead>Amount Paid</TableHead>
            <TableHead>Payment Status</TableHead>
            <TableHead> </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.payments.map((test) => (
            <TableRow key={test.invoiceNo}>
              <TableCell>{test.invoiceNo}</TableCell>
              <TableCell>{dateTimeUTC(test.paymentDate)}</TableCell>
              <TableCell>{test.paymentMethod}</TableCell>
              <TableCell>{test.amountPaid}</TableCell>
              <TableCell>
                <span
                  className={`${getStatusColor(test.paymentStatus)} rounded-lg px-5 py-2 font-[500]`}
                >
                  {test.paymentStatus}
                </span>
              </TableCell>
              {/* download  */}
              <TableCell>
                <DownloadCloudIcon className="cursor-pointer" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionHistoryTable;
