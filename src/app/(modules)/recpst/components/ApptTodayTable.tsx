import HyperLink from '@/atoms/Hyperlink';
import { SubTitle } from '@/atoms/typographys';
import ROUTES from '@/constants/routes';
import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import EmptyState from '@/components/EmptyState';

const ApptTodayTable = () => {
  return (
    <div className="flex w-full flex-col space-y-4 rounded-lg bg-white p-2">
      <div className="flex w-full items-center justify-between border-b pb-2">
        <SubTitle text="Appointments" />

        <div className="flex w-full justify-end">
          <HyperLink href={ROUTES.RECPTS_APOINTMENT.path} hrefText="See all" />
        </div>
      </div>

      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Time</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Test</TableHead>
              <TableHead>Technician</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
        </Table>

        <EmptyState title="No Appointments for today." />
      </div>
    </div>
  );
};

export default ApptTodayTable;
