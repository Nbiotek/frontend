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
import { formatTestDate } from '@/utils/date';

interface AppointmentTable {
  appointments: TPatient[];
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
            <TableHead>Email</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Appointment No</TableHead>
            <TableHead>Patient Type</TableHead>
            <TableHead>Last Appointment</TableHead>
            {/* <TableHead className="w-[20px]"></TableHead> */}
          </TableRow>
        </TableHeader>
        {loading ? (
          <TableLoader rows={6} columns={6} />
        ) : (
          <TableBody>
            {appointments.map((patient) => (
              <TableRow key={patient.id}>
                {/* <TableCell>{patient.id}</TableCell> */}
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.email}</TableCell>
                <TableCell>{patient.phoneNumber}</TableCell>
                <TableCell>{patient.appointmentCount}</TableCell>
                <TableCell>{patient.patientType}</TableCell>
                <TableCell>
                  {patient?.createdAt ? formatTestDate(patient.createdAt) : '-'}
                </TableCell>
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
