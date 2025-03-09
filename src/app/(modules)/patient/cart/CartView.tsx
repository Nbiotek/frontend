import Image from 'next/image';
import { Minus, Plus, X } from 'lucide-react';
import Button from '@/atoms/Buttons';
import CartTable from './CartTable';

export const CartPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Cart Content */}
      <div className="">
        {/* Product List */}
        <CartTable />

        <div className="bg-white"></div>
      </div>
    </div>
  );
};

export default CartPage;
