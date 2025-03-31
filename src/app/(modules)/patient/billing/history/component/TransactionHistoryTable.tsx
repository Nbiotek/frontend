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
import Link from 'next/link';

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
  console.log(data);
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
          {data?.payments.map((payDetails) => (
            <TableRow key={payDetails.invoiceNo}>
              <TableCell>{payDetails.invoiceNo}</TableCell>
              <TableCell>{dateTimeUTC(payDetails.paymentDate)}</TableCell>
              <TableCell>{payDetails.paymentMethod}</TableCell>
              <TableCell>{payDetails.amountPaid}</TableCell>
              <TableCell>
                <Status variant={payDetails.paymentStatus} />
              </TableCell>
              {/* download  */}
              <TableCell>
                <Link
                  href={payDetails.paymentReceiptLink}
                  target="_blank"
                  className="cursor-pointer hover:text-blue-100"
                >
                  <DownloadCloudIcon />{' '}
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionHistoryTable;
