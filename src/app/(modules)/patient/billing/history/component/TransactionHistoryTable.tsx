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
import Status, { EnumResultStatus } from '@/atoms/Buttons/Status';

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
                <Status variant={test.paymentStatus} />
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
