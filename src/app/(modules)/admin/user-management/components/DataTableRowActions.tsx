import { Row } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { EllipsisVerticalIcon, ShieldBan, ShieldCheck, TrashIcon } from 'lucide-react';
import { useStore } from '@/store';
import { AppModals } from '@/store/AppConfig/appModalTypes';
import { observer } from 'mobx-react-lite';
import { EnumRole, EnumUserStatus } from '@/constants/mangle';

interface DataTableRowActionsProps {
  row: Row<TAdminUsersItem>;
}

const DataTableRowActions = ({ row }: DataTableRowActionsProps) => {
  const {
    AppConfigStore: { toggleModals }
  } = useStore();
  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
            <EllipsisVerticalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem
            onClick={() =>
              toggleModals({ name: AppModals.ADMIN_SUSPEND_USER, open: true, id: row.original.id })
            }
          >
            Suspend
            <DropdownMenuShortcut>
              <ShieldBan size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() =>
              toggleModals({ name: AppModals.ADMIN_DELETE_USER, open: true, id: row.original.id })
            }
            className="text-red-500!"
          >
            Delete
            <DropdownMenuShortcut>
              <TrashIcon size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
        {row.original.role !== EnumRole.SUPER_ADMIN && (
          <DropdownMenuContent align="end" className="w-[160px]">
            {row.original.status !== EnumUserStatus.SUSPENDED && (
              <>
                <DropdownMenuItem
                  onClick={() =>
                    toggleModals({
                      name: AppModals.ADMIN_SUSPEND_USER,
                      open: true,
                      id: row.original.id
                    })
                  }
                >
                  Suspend
                  <DropdownMenuShortcut>
                    <ShieldBan size={16} />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </>
            )}
            {row.original.status === EnumUserStatus.SUSPENDED && (
              <>
                <DropdownMenuItem
                  onClick={() =>
                    toggleModals({
                      name: AppModals.ADMIN_UNSUSPEND_USER,
                      open: true,
                      id: row.original.id
                    })
                  }
                >
                  Reinstate
                  <DropdownMenuShortcut>
                    <ShieldCheck size={16} />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </>
            )}
            <DropdownMenuItem
              onClick={() =>
                toggleModals({ name: AppModals.ADMIN_DELETE_USER, open: true, id: row.original.id })
              }
              className="text-red-500!"
            >
              Delete
              <DropdownMenuShortcut>
                <TrashIcon size={16} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </>
  );
};

export default observer(DataTableRowActions);
