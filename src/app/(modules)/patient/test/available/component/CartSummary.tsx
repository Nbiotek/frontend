'use client';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { CartItem } from '@/store/CartStore';
import { useStore } from '@/store';

interface CartSummaryProps {
  onClose: () => void;
  onRemoveItem: (id: string, name: string) => void;
  confirmButtonText?: string;
}

const CartSummary = observer(
  ({ onClose, onRemoveItem, confirmButtonText = 'Confirm Selection' }: CartSummaryProps) => {
    const {
      CartStore: { items, total, itemCount, clearCart }
    } = useStore();

    if (itemCount === 0) return null;

    return (
      <div className="border-t bg-white shadow-lg ">
        <div className="max-h-100 overflow-y-auto p-2">
          {items.map((item) => (
            <CartItemRow
              key={item.id}
              item={item}
              onRemove={() => onRemoveItem(item.id, item.item.name)}
            />
          ))}
        </div>
        <CartSummaryFooter
          itemCount={itemCount}
          totalPrice={total}
          onClose={onClose}
          confirmButtonText={confirmButtonText}
        />
      </div>
    );
  }
);

const CartItemRow = ({ item, onRemove }: { item: CartItem; onRemove: () => void }) => (
  <div className="flex items-center justify-between border-b py-2 last:border-0">
    <div className="min-w-0 flex-1">
      <p className="truncate font-medium">{item.item.name}</p>
      <p className="text-gray-600 text-sm">₦{item.item.price.toLocaleString()}</p>
    </div>
    <Button
      variant="ghost"
      size="sm"
      className="hover:text-red-700 hover:bg-red-50 ml-2 h-auto p-1 text-red-500"
      onClick={onRemove}
    >
      <Trash2 size={16} />
    </Button>
  </div>
);

// Component for the cart summary footer
const CartSummaryFooter = ({
  itemCount,
  totalPrice,
  onClose,
  confirmButtonText
}: {
  itemCount: number;
  totalPrice: number;
  onClose: () => void;
  confirmButtonText: string;
}) => (
  <div className="flex items-center justify-between p-4">
    <div>
      <span className="text-gray-600 text-sm font-medium">
        {itemCount} {itemCount === 1 ? 'test' : 'tests'} selected
      </span>
      <div className="text-lg font-semibold">₦{totalPrice.toLocaleString()}</div>
    </div>
    <Button onClick={onClose}>{confirmButtonText}</Button>
  </div>
);

export default CartSummary;
