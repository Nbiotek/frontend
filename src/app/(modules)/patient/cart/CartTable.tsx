'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { observer } from 'mobx-react-lite';
import Button from '@/atoms/Buttons';
import { X } from 'lucide-react';
import { useStore } from '@/store';

const CartTable = observer(() => {
  const {
    CartStore: { items, removeItem, total }
  } = useStore();

  const calculateItemTotal = (price: number, quantity: number) => {
    return price * quantity;
  };

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
      <div className="flex-1 rounded-lg bg-white">
        <Table className="overflow-x-auto">
          <TableHeader>
            <TableRow>
              {/* <TableHead>Product</TableHead> */}
              <TableHead>TEST NAME</TableHead>
              <TableHead>PRICE</TableHead>
              <TableHead>QUANTITY</TableHead>
              <TableHead>SUBTOTAL</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((cartItem) => (
              <TableRow key={cartItem.id}>
                <TableCell className="font-medium">{cartItem.item.name}</TableCell>
                <TableCell>
                  ₦
                  {calculateItemTotal(
                    cartItem.item.discountedPrice && cartItem.item.discountedPrice !== 0
                      ? cartItem.item.discountedPrice
                      : cartItem.item.price,
                    cartItem.quantity
                  ).toLocaleString()}
                </TableCell>
                <TableCell>{cartItem.quantity}</TableCell>
                <TableCell>
                  ₦
                  {calculateItemTotal(
                    cartItem.item.discountedPrice && cartItem.item.discountedPrice !== 0
                      ? cartItem.item.discountedPrice
                      : cartItem.item.price,
                    cartItem.quantity
                  ).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    className="h-10 w-10 rounded-full p-2"
                    onClick={() => removeItem(cartItem.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="border-t">
          <div className="flex justify-end space-x-6 p-3">
            <span className="w-[200px] rounded-lg border-2 border-blue-400 px-4 py-3 text-center text-base">
              Total
            </span>
            <span className="w-[200px] rounded-lg border-2 border-blue-400 px-4 py-3 text-center text-base">
              ₦{total.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default CartTable;
