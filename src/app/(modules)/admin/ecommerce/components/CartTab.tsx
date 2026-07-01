'use client';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useFetchCart } from '@/hooks/admin/useFetchCart';
import { postAddToCart, putUpdateCartItem } from '@/requests/ecommerce';
import { ECOMMERCE } from '@/constants/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import * as ToastLib from '@/atoms/Toast';

const CartTab = () => {
  const queryClient = useQueryClient();
  const { data: cart, isLoading } = useFetchCart();

  const invalidateCart = () =>
    queryClient.invalidateQueries({ predicate: (q) => q.queryKey[0] === ECOMMERCE.CART });

  const updateMutation = useMutation({
    mutationFn: ({ productId, quantity }: { productId: string; quantity: number }) =>
      putUpdateCartItem(productId, quantity),
    onSuccess: invalidateCart,
    onError: () => ToastLib.Toast.error('Failed to update cart')
  });

  const removeMutation = useMutation({
    mutationFn: (productId: string) => putUpdateCartItem(productId, 0),
    onSuccess: invalidateCart,
    onError: () => ToastLib.Toast.error('Failed to remove item')
  });

  const items = cart?.items ?? [];
  const total = cart?.total ?? items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (isLoading) {
    return (
      <div className="flex flex-col space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between rounded-lg border p-4">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-8 w-24" />
          </div>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <ShoppingCart className="text-gray-300 mb-4 h-12 w-12" />
        <p className="text-gray-500 text-sm font-medium">Cart is empty</p>
        <p className="text-gray-400 mt-1 text-xs">
          Add products from the Products tab to build a cart.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-3">
        {items.map((item) => (
          <div
            key={item.productId}
            className="border-gray-100 flex items-center justify-between rounded-lg border bg-white p-4 shadow-sm"
          >
            <div className="flex flex-col space-y-0.5">
              <p className="text-gray-800 text-sm font-semibold">{item.name}</p>
              <p className="text-gray-400 text-xs">₦{item.price.toLocaleString('en-NG')} each</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center rounded-md border">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  disabled={updateMutation.isPending || item.quantity <= 1}
                  onClick={() =>
                    updateMutation.mutate({
                      productId: item.productId,
                      quantity: item.quantity - 1
                    })
                  }
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  disabled={updateMutation.isPending}
                  onClick={() =>
                    updateMutation.mutate({
                      productId: item.productId,
                      quantity: item.quantity + 1
                    })
                  }
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>

              <span className="text-gray-900 w-24 text-right text-sm font-bold">
                ₦{(item.price * item.quantity).toLocaleString('en-NG')}
              </span>

              <Button
                variant="ghost"
                size="icon"
                className="hover:text-red-600 h-8 w-8 text-red-400"
                disabled={removeMutation.isPending}
                onClick={() => removeMutation.mutate(item.productId)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 flex items-center justify-between rounded-lg px-4 py-3">
        <span className="text-gray-700 text-sm font-medium">Total</span>
        <span className="text-gray-900 text-base font-bold">
          ₦{total.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
        </span>
      </div>
    </div>
  );
};

export default CartTab;
