'use client';

import { useState, useEffect } from 'react';
import { ShoppingCart, X, ChevronUp, ChevronDown } from 'lucide-react';
import Button from '@/atoms/Buttons';
import { useStore } from '@/store';
import { observer } from 'mobx-react-lite';

const ToggleCart = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { CartStore } = useStore();

  if (!CartStore.items.length) return null;

  const totalItems = CartStore.items.length;
  const totalPrice = CartStore.total;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex  px-4 pb-4">
      <div className="border-gray-200 w-full max-w-3xl rounded-lg border bg-white shadow-lg">
        <div
          className="flex cursor-pointer items-center justify-between p-4"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <ShoppingCart className="text-blue-500 h-6 w-6" />
              <span className="bg-blue-500 absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold text-white">
                {totalItems}
              </span>
            </div>
            <div>
              <p className="text-gray-900 font-medium">Your Cart</p>
              <p className="text-gray-600 text-sm">
                {totalItems} item{totalItems !== 1 ? 's' : ''} | ₦{totalPrice.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="filled"
              className="px-4 py-2 text-sm"
              onClick={(e) => {
                e.stopPropagation();
                window.location.href = '/cart';
              }}
            >
              Checkout
            </Button>

            {isExpanded ? (
              <ChevronDown className="text-gray-500 h-5 w-5" />
            ) : (
              <ChevronUp className="text-gray-500 h-5 w-5" />
            )}
          </div>
        </div>

        {isExpanded && (
          <div className="border-gray-100 max-h-60 overflow-y-auto border-t p-4">
            {CartStore.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div>
                    <p className="text-gray-900 font-medium">{item.item.name}</p>
                    <p className="text-gray-600 text-sm">₦{item.item.price.toLocaleString()}</p>
                  </div>
                </div>

                <button
                  className="hover:bg-gray-100 rounded-full p-1"
                  onClick={() => CartStore.removeItem(item.id)}
                >
                  <X className="text-gray-500 h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default observer(ToggleCart);
