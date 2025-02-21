import { observer } from 'mobx-react-lite';
import Button from '@/atoms/Buttons';
import { CartItemType, cartStore } from '@/store/Cart';
import { SingleTest, PackageTest } from '@/types/test';

interface CartButtonProps {
  item: SingleTest | PackageTest;
  type: CartItemType;
}

export const CartButton = observer(({ item, type }: CartButtonProps) => {
  const isInCart = cartStore.isInCart(item.id);
  const quantity = cartStore.getItemQuantity(item.id);

  const handleAddToCart = () => {
    cartStore.addItem(item, type);
  };

  const handleUpdateQuantity = (newQuantity: number) => {
    cartStore.updateQuantity(item.id, newQuantity);
  };

  const removeItemfromCart = () => {
    cartStore.removeItem(item.id);
    console.log('removed');
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
