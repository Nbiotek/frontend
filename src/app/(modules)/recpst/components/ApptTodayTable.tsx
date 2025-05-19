'use client';
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import EmptyState from '@/components/EmptyState';
import Pagination from '@/atoms/pagination';
import TableLoader from '@/atoms/Loaders/TableLoader';
import Status from '@/atoms/Buttons/Status';
import { formatTestDate } from '@/utils/date';

interface IApptTodayTableProps {
  isLoading: boolean;
  appointment: TAppointmentResp;
}

const ApptTodayTable = ({ isLoading, appointment }: IApptTodayTableProps) => {
  const pagination = appointment.pagination;
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(pagination.page);

  return (
    <div className="w-full overflow-clip rounded-lg bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Patient</TableHead>
            <TableHead>Number of Tests</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        {isLoading ? (
          <TableLoader rows={20} columns={6} />
        ) : (
          appointment.appointment.length !== 0 && (
            <TableBody>
              {appointment.appointment.map((appt) => (
                <TableRow key={appt.id}>
                  <TableCell className="whitespace-nowrap font-medium">
                    {formatTestDate(appt.appointmentDate)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">{appt.patientName}</TableCell>
                  <TableCell>{appt.tests.length}</TableCell>
                  <TableCell className="whitespace-nowrap">{appt.location?.type}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    <Status variant={appt.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )
        )}
      </Table>

      {appointment.appointment.length === 0 && <EmptyState title="No Pending Appointments." />}

      {isLoading || (
        <Pagination
          limit={pagination.limit}
          setLimit={setLimit}
          currentPage={pagination.page}
          setPage={setPage}
          total={pagination.total}
          totalPages={pagination.totalPages}
          siblingCount={1}
        />
      )}
    </div>
  );
};

export default ApptTodayTable;
