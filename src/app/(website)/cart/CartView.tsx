'use client';

import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/store';
import { FiTrash2 } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const CartView = observer(() => {
  const {
    CartStore: { removeItem, addItem, items, total }
  } = useStore();
  const router = useRouter();

  const totalAmount = total;

  const handleRemoveItem = (itemId: string) => {
    removeItem(itemId);
  };

  const handleCheckout = () => {
    router.push('/auth/register');
  };

  const handleContinueShopping = () => {
    router.push('/lab-test');
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-2xl font-bold">Your Cart</h1>
        <div className="rounded-lg bg-white p-6 text-center shadow">
          <p className="text-gray-600 mb-4">Your cart is empty</p>
          <button
            onClick={handleContinueShopping}
            className="bg-blue-800 hover:bg-blue-900 rounded px-4 py-2 text-white"
          >
            Browse Tests
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Your Cart</h1>

      <div className="mb-6 overflow-hidden rounded-lg bg-white shadow">
        <div className="bg-gray-100 grid grid-cols-12 gap-4 border-b px-6 py-4">
          <div className="col-span-6">Test</div>
          <div className="col-span-2 text-right">Price</div>
          <div className="col-span-2"></div>
        </div>

        <div className="divide-y">
          {items.map((item) => (
            <div key={item.id} className="grid grid-cols-12 items-center gap-4 px-6 py-4">
              <div className="col-span-6">
                <h3 className="font-semibold">{item.item.name}</h3>
                <p className="text-gray-600 text-sm">
                  {item.item.description?.substring(0, 60)}...
                </p>
              </div>
              <div className="col-span-2 text-right">
                ₦{item.item.discountedPrice ? item.item.discountedPrice : item.item.price}
              </div>
              <div className="col-span-2 text-right">
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="hover:text-red-700 text-red-500"
                >
                  <FiTrash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6 rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>
        <div className="mb-4 flex justify-between border-b pb-4">
          <span>Subtotal</span>
          <span>₦{totalAmount.toLocaleString()}</span>
        </div>
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>₦{totalAmount.toLocaleString()}</span>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-3 sm:flex-row">
        <button
          onClick={handleContinueShopping}
          className="text-gray-800 hover:bg-gray-300 rounded bg-neutral-200 px-6 py-3"
        >
          Continue Booking Test
        </button>
        <button
          onClick={handleCheckout}
          className="hover:bg-blue-900 rounded bg-blue-400 px-6 py-3 text-white"
        >
          Proceed to Book Test
        </button>
      </div>
    </div>
  );
});

export default CartView;
