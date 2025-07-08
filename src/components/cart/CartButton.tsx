import { observer } from 'mobx-react-lite';
import Button from '@/atoms/Buttons';
import { useStore } from '@/store';
import { useRouter } from 'next/navigation';
import { CartItemType } from '@/store/CartStore';

interface CartButtonProps {
  item: SingleTest | PackageTest;
  type: CartItemType;
}

export const CartButton = observer(({ item, type }: CartButtonProps) => {
  const {
    CartStore: {
      itemCount,
      addItem,
      clearCart,
      isInCart,
      getItemQuantity,
      updateQuantity,
      removeItem
    }
  } = useStore();

  const handleAddToCart = () => {
    addItem(item, type);
  };

  const handleUpdateQuantity = (newQuantity: number) => {
    updateQuantity(item.id, newQuantity);
  };

  const removeItemfromCart = () => {
    removeItem(item.id);
  };

  if (!isInCart) {
    return (
      <Button variant="filled" onClick={handleAddToCart}>
        Add to Cart
      </Button>
    );
  }

  return (
    <Button variant="danger" onClick={removeItemfromCart}>
      Remove Item
    </Button>
  );
});

export const RequestTestButton = observer(({ item, type }: CartButtonProps) => {
  const {
    CartStore: { addItem, clearCart }
  } = useStore();
  const router = useRouter();

  const handleRequestTest = () => {
    clearCart();
    router.push('/patient/appointment/booking');

    addItem(item, type);
  };

  return (
    <Button variant="filled" className="bg-green-400" onClick={handleRequestTest}>
      Request Test
    </Button>
  );
});
