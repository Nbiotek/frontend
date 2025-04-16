'use client';
import { EllipsisVertical } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import Status from '@/atoms/Buttons/Status';
import TableLoader from '@/atoms/Loaders/TableLoader';
import EmptyState from '@/components/EmptyState';
import { formatTestDate } from '@/utils/date';

interface IQCTableProps {
  isLoading: boolean;
  resultsData: TStaffShiftsRes;
}

const ShiftTable = ({ isLoading, resultsData }: IQCTableProps) => {
  return (
    <div className="w-full overflow-clip rounded-lg bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Shift Type</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Due date</TableHead>
            <TableHead className="w-[80px]">Status</TableHead>
            <TableHead className="w-[20px]"></TableHead>
          </TableRow>
        </TableHeader>

        {isLoading ? (
          <TableLoader rows={20} columns={6} />
        ) : (
          resultsData.shifts.length !== 0 && (
            <TableBody>
              {resultsData.shifts.map((shift) => (
                <TableRow key={shift.id}>
                  <TableCell className="font-medium">
                    {shift.staff.firstName}
                    {shift.staff.lastName}
                  </TableCell>
                  <TableCell>{shift.staff.role}</TableCell>
                  <TableCell>{shift.shiftType}</TableCell>
                  <TableCell>
                    {shift.startTime} - {shift.endTime}
                  </TableCell>
                  <TableCell>{formatTestDate(shift.dueDate)}</TableCell>
                  <TableCell>
                    <Status variant="active" />
                  </TableCell>
                  <TableCell>
                    <EllipsisVertical size={16} className="cursor-pointer text-neutral-400" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )
        )}
      </Table>

      {isLoading || (resultsData.shifts.length === 0 && <EmptyState title="No staff shift data" />)}
    </div>
  );
};

export default ShiftTable;
