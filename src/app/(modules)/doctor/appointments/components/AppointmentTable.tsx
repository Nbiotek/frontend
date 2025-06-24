import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

import TableLoader from '@/atoms/Loaders/TableLoader';
import EmptyState from '@/components/EmptyState';
import { dateTimeUTC, formatTestDate } from '@/utils/date';
import Status from '@/atoms/Buttons/Status';

interface AppointmentTable {
  appointments: DoCAppointment[];
  loading: boolean;
}

const AppointmentTable = ({ appointments, loading }: AppointmentTable) => {
  return (
    <div className="overflow-clip rounded-lg bg-white">
      <Table className="bg-white">
        <TableHeader>
          <TableRow>
            {/* <TableHead>ID</TableHead> */}
            <TableHead>Patient Name</TableHead>
            <TableHead>Test Name</TableHead>
            <TableHead>No Test</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Payment Status</TableHead>
            <TableHead>Test Location</TableHead>
            <TableHead>Created Date</TableHead>
            {/* <TableHead className="w-[20px]"></TableHead> */}
          </TableRow>
        </TableHeader>
        {loading ? (
          <TableLoader rows={7} columns={7} />
        ) : (
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                {/* <TableCell>{patient.id}</TableCell> */}
                <TableCell>{appointment.patientName}</TableCell>
                <TableCell>{appointment.title}</TableCell>
                <TableCell>{appointment.tests.length}</TableCell>
                <TableCell>{appointment.totalAmount}</TableCell>
                <TableCell>
                  <Status variant={appointment.paymentStatus} />
                </TableCell>
                <TableCell>
                  <span className="text-wrap">{appointment.location.address}</span>
                </TableCell>
                <TableCell>{dateTimeUTC(appointment.createdAt)}</TableCell>
                {/* <TableCell>
                  <EllipsisVertical className="cursor-pointer" />
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
      {loading || (appointments.length === 0 && <EmptyState title="No Test data" />)}
    </div>
  );
};

export default AppointmentTable;
