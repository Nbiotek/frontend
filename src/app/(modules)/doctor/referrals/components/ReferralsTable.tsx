import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

import EmptyState from '@/components/EmptyState';
import TableLoader from '@/atoms/Loaders/TableLoader';

interface ReferralTableProps {
  loading: boolean;
  referPatientList: TPatientR[];
}

const ReferralTable = ({ loading, referPatientList }: ReferralTableProps) => {
  return (
    <div className="overflow-clip rounded-lg">
      <Table className="bg-white">
        <TableHeader>
          <TableRow>
            <TableHead>Patient Name </TableHead>
            <TableHead>Patient Email </TableHead>
            <TableHead>Total Appointment</TableHead>
            <TableHead>Test Booked</TableHead>
          </TableRow>
        </TableHeader>
        {loading ? (
          <TableLoader rows={4} columns={4} />
        ) : (
          referPatientList.length !== 0 && (
            <TableBody>
              {referPatientList.map((refP) => (
                <TableRow key={refP.id}>
                  <TableCell>{refP.patientName}</TableCell>
                  <TableCell>{refP.patientEmail}</TableCell>
                  <TableCell>{refP.totalAppointmentCreated}</TableCell>
                  <TableCell>{refP.totalTestBooked} </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )
        )}
      </Table>
      {loading || (referPatientList.length === 0 && <EmptyState title="No Test data" />)}
    </div>
  );
};

export default ReferralTable;
