'use client';
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
import Pagination from '@/atoms/pagination';
import Status from '@/atoms/Buttons/Status';
import { formatTestDate } from '@/utils/date';

interface IPatientsRegTableProps {
  isLoading: boolean;
  patient: TReceptAllPatientRes;
  limit: number;
  page: number;
  setLimit: (val: number) => void;
  setPage: (val: number) => void;
}

const PatientsRegTable = ({
  isLoading,
  patient,
  limit,
  page,
  setLimit,
  setPage
}: IPatientsRegTableProps) => {
  const pagination = patient.pagination;

  return (
    <div className="flex w-full flex-col space-y-6 overflow-clip rounded-lg bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone number</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Submitted on</TableHead>
            {/* <TableHead className='w-5'>Action</TableHead> */}
          </TableRow>
        </TableHeader>

        {isLoading ? (
          <TableLoader rows={20} columns={5} />
        ) : (
          patient.patients.length !== 0 && (
            <TableBody>
              {patient.patients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell className="whitespace-nowrap font-medium">
                    {patient.firstName} {patient.lastName}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">{patient.email}</TableCell>
                  <TableCell className="whitespace-nowrap font-medium">
                    {patient.phoneNumber}
                  </TableCell>
                  <TableCell>
                    <Status variant={patient.profileStatus} />
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {formatTestDate(patient.createdAt)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )
        )}
      </Table>

      {patient.patients.length == 0 && <EmptyState title="No Patient data available." />}

      <div className="p-4">
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
    </div>
  );
};

export default PatientsRegTable;
