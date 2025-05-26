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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { EllipsisVertical } from 'lucide-react';
import { formatTestDate } from '@/utils/date';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/store';
import { AppModals } from '@/store/AppConfig/appModalTypes';

interface IApptTodayTableProps {
  isLoading: boolean;
  appointment: TAppointmentResp;
}

const ApptTodayTable = ({ isLoading, appointment }: IApptTodayTableProps) => {
  const pagination = appointment.pagination;
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(pagination.page);

  const {
    AppConfigStore: { toggleModals }
  } = useStore();

  return (
    <div className="w-full overflow-clip rounded-lg bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Patient</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Number of Tests</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-5"></TableHead>
          </TableRow>
        </TableHeader>

        {isLoading ? (
          <TableLoader rows={20} columns={8} />
        ) : (
          appointment.appointment.length !== 0 && (
            <TableBody>
              {appointment.appointment.map((appt) => (
                <TableRow key={appt.id}>
                  <TableCell className="whitespace-nowrap font-medium">
                    {formatTestDate(appt.appointmentDate)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">{appt.patientName}</TableCell>
                  <TableCell className="whitespace-nowrap">{appt.patientName}</TableCell>
                  <TableCell className="whitespace-nowrap">{appt.patientName}</TableCell>
                  <TableCell>{appt.tests.length}</TableCell>
                  <TableCell className="whitespace-nowrap">{appt.location?.type}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    <Status variant={appt.status} />
                  </TableCell>

                  <TableCell className="whitespace-nowrap">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <EllipsisVertical size={16} className="cursor-pointer text-neutral-400" />
                      </DropdownMenuTrigger>

                      <DropdownMenuContent className="">
                        <DropdownMenuItem
                          onClick={() =>
                            toggleModals({
                              name: AppModals.SINGLE_APPOINTMENT,
                              open: true,
                              id: appt.id
                            })
                          }
                        >
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            toggleModals({
                              name: AppModals.UPDATE_APPOINTMENT,
                              open: true,
                              id: appt.id
                            })
                          }
                        >
                          Edit
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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

export default observer(ApptTodayTable);
