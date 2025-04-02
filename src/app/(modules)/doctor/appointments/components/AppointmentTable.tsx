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
import { EllipsisVertical } from 'lucide-react';
import Status from '@/atoms/Buttons/Status';
import TableLoader from '@/atoms/Loaders/TableLoader';
import EmptyState from '@/components/EmptyState';

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
            <TableHead>ID</TableHead>
            <TableHead>Patient Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Appointment No</TableHead>
            <TableHead>Patient Type</TableHead>
            <TableHead>Last Appointment</TableHead>
            <TableHead className="w-[20px]"></TableHead>
          </TableRow>
        </TableHeader>
        {loading ? (
          <TableLoader rows={8} columns={8} />
        ) : (
          <TableBody>
            {appointments.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell>{patient.id}</TableCell>
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.email}</TableCell>
                <TableCell>{patient.phoneNumber}</TableCell>
                <TableCell>{patient.patientType}</TableCell>
                <TableCell>{patient.lastAppointment}</TableCell>
                <TableCell>{patient.createdAt}</TableCell>
                <TableCell>
                  <EllipsisVertical className="cursor-pointer" />
                </TableCell>
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
