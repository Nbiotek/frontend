import { ColumnDef } from '@tanstack/react-table';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import LongText from '@/components/common/longText';
import { callTypes, userTypes } from './data/data';
import { User } from './data/schema';
import { DataTableColumnHeader } from './TableHeader';
import DataTableRowActions from './DataTableRowActions';
import { toTitleCase } from '@/utils';
import { EnumUserStatus } from '@/constants/mangle';
import Status from '@/atoms/Buttons/Status';

export const columns: ColumnDef<TAdminUsersItem>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableHiding: false
  },
  {
    id: 'username',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Username" />,
    cell: ({ row }) => {
      return <LongText className="max-w-36">{row.original.username}</LongText>;
    },
    meta: { className: 'w-36' }
  },
  {
    id: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => {
      const fullName = `${row.original.firstName} ${row.original.lastName}`;
      return <LongText className="max-w-36">{fullName}</LongText>;
    },
    meta: { className: 'w-36' }
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
    cell: ({ row }) => <div className="w-fit text-nowrap">{row.getValue('email')}</div>
  },
  {
    accessorKey: 'phoneNumber',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Phone Number" />,
    cell: ({ row }) => <div>{row.original.phoneNumber}</div>,
    enableSorting: false
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const { status } = row.original;
      return <Status variant={status} />;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false
  },
  {
    accessorKey: 'role',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Role" />,
    cell: ({ row }) => {
      const { role } = row.original;
      const userType = userTypes.find(({ value }) => value === role);

      if (!userType) {
        return null;
      }

      return (
        <div className="flex items-center gap-x-2">
          {userType.icon && <userType.icon size={16} className="text-muted-foreground" />}
          <span className="text-sm capitalize">{toTitleCase(row.getValue('role'))}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableHiding: false
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />
  }
];
