import HyperLink from '@/atoms/Hyperlink';
import { SubTitle } from '@/atoms/typographys';
import ROUTES from '@/constants/routes';
import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import EmptyState from '@/components/EmptyState';

const PatientsRegTable = () => {
  return (
    <div className="w-full overflow-clip rounded-lg bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Submitted on</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
      </Table>

      <EmptyState title="No Patient data available." />
    </div>
  );
};

export default PatientsRegTable;
