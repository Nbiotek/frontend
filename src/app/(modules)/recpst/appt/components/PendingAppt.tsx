import HyperLink from '@/atoms/Hyperlink';
import { SubTitle } from '@/atoms/typographys';
import ROUTES from '@/constants/routes';
import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import EmptyState from '@/components/EmptyState';

export default function PendingAppt() {
  return (
    <div className="flex w-full flex-col space-y-4 rounded-lg bg-white p-2">
      <div className="flex w-full items-center justify-between border-b pb-2">
        <SubTitle text="Pending Appointments" />
      </div>

      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Time</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Submitted on</TableHead>
              <TableHead className="w-5">status</TableHead>
            </TableRow>
          </TableHeader>
        </Table>

        <EmptyState title="No Pending Appointments." />
      </div>
    </div>
  );
}
