'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import TableLoader from '@/atoms/Loaders/TableLoader';
import EmptyState from '@/components/EmptyState';
import { formatTestDate } from '@/utils/date';

interface IInventoryTableProps {
  isLoading: boolean;
  inventory?: Array<TInventoryItem>;
}

const InventoryTable = ({ isLoading, inventory }: IInventoryTableProps) => {
  return (
    <div className="flex h-full w-full flex-col justify-end space-y-4">
      <div className="h-full w-full  overflow-clip rounded-lg bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">Name</TableHead>
              <TableHead className="">Category</TableHead>
              <TableHead className="">Qty</TableHead>
              <TableHead className="">Units</TableHead>
              <TableHead className="">Reorder level</TableHead>
              <TableHead className="">Supplier</TableHead>
              <TableHead className="">Last order date</TableHead>
              <TableHead className="w-[20px]">action</TableHead>
            </TableRow>
          </TableHeader>

          {isLoading ? (
            <TableLoader rows={20} columns={7} />
          ) : (
            inventory &&
            inventory?.length !== 0 && (
              <TableBody>
                {inventory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="whitespace-nowrap font-medium">{item.name}</TableCell>
                    <TableCell className="whitespace-nowrap">{item.category}</TableCell>
                    <TableCell className="whitespace-nowrap">{item.stockQuantity}</TableCell>
                    <TableCell className="whitespace-nowrap">{item.unit}</TableCell>
                    <TableCell className="whitespace-nowrap">{item.reorderLevel}</TableCell>
                    <TableCell className="whitespace-nowrap">{item.supplierName}</TableCell>
                    <TableCell className="whitespace-nowrap">
                      {formatTestDate(item.lastOrderDate)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )
          )}
        </Table>

        {isLoading || (inventory?.length === 0 && <EmptyState title="No Test data" />)}
      </div>
    </div>
  );
};

export default InventoryTable;
