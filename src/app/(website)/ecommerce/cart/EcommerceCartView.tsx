'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, X, Package, ShoppingCart, Loader } from 'lucide-react';
import { useFetchCart } from '@/hooks/admin/useFetchCart';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { putUpdateCartItem, postCreateOrder } from '@/requests/ecommerce';
import { ECOMMERCE } from '@/constants/api';
import * as ToastLib from '@/atoms/Toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { useStore } from '@/store';
import { useRouter } from 'next/navigation';

const EcommerceCartView = () => {
  const { data: cart, isLoading, refetch } = useFetchCart();
  const queryClient = useQueryClient();
  const {
    AuthStore: { accessToken }
  } = useStore();
  const router = useRouter();

  const [checkingOut, setCheckingOut] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    phone: ''
  });

  const invalidateCart = () =>
    queryClient.invalidateQueries({ predicate: (q) => q.queryKey[0] === ECOMMERCE.CART });

  const updateMutation = useMutation({
    mutationFn: ({ productId, quantity }: { productId: string; quantity: number }) =>
      putUpdateCartItem(productId, quantity),
    onSuccess: () => invalidateCart(),
    onError: () => ToastLib.Toast.error('Failed to update cart')
  });

  const orderMutation = useMutation({
    mutationFn: postCreateOrder,
    onSuccess: (res) => {
      const paymentLink = res.data.data.paymentLink;
      invalidateCart();
      if (paymentLink) {
        ToastLib.Toast.success('Order placed! Redirecting to payment...');
        window.location.href = paymentLink;
      } else {
        ToastLib.Toast.success('Order placed successfully!');
        router.push('/ecommerce/orders');
      }
    },
    onError: () => ToastLib.Toast.error('Failed to place order')
  });

  if (!accessToken) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <ShoppingCart className="text-gray-300 h-12 w-12" />
        <p className="text-gray-700 text-lg font-medium">Sign in to view your cart</p>
        <Link href="/auth/login">
          <Button className="bg-blue-400">Sign In</Button>
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Skeleton className="mb-6 h-5 w-56" />
        <div className="flex gap-6">
          <div className="flex-1 space-y-3">
            <Skeleton className="h-10 w-full" />
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-20 w-full" />
            ))}
          </div>
          <Skeleton className="h-60 w-72 flex-shrink-0" />
        </div>
      </div>
    );
  }

  const items = cart?.items ?? [];
  const subtotal = cart?.total ?? 0;

  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <ShoppingCart className="text-gray-300 h-14 w-14" />
        <p className="text-lg font-semibold text-neutral-700">Your cart is empty</p>
        <Link href="/ecommerce/products">
          <Button className="bg-blue-400">Browse Products</Button>
        </Link>
      </div>
    );
  }

  const handleCheckout = (paymentMethod: 'ONLINE' | 'COD') => {
    const { street, city, state, zipCode, phone } = shippingAddress;
    if (!street || !city || !state || !zipCode || !phone) {
      ToastLib.Toast.error('Please fill in all fields including phone number');
      return;
    }
    orderMutation.mutate({
      items: items.map((item) => ({ productId: item.productId, quantity: item.quantity })),
      shippingAddress,
      paymentMethod
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-6xl">
        {/* Breadcrumb */}
        <nav className="text-gray-500 mb-6 flex items-center gap-1.5 text-sm">
          <Link href="/" className="hover:text-blue-500">
            Home
          </Link>
          <span>&gt;</span>
          <Link href="/ecommerce" className="hover:text-blue-500">
            E-Commerce
          </Link>
          <span>&gt;</span>
          <span className="text-blue-500 font-medium">Shopping Cart</span>
        </nav>

        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Cart table */}
          <div className="flex-1">
            <div className="border-gray-200 overflow-hidden rounded-lg border bg-white">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-gray-200 bg-gray-50 text-gray-500 border-b text-xs font-semibold uppercase tracking-wide">
                    <th className="px-4 py-3 text-left">Product</th>
                    <th className="px-4 py-3 text-center">Price</th>
                    <th className="px-4 py-3 text-center">Quantity</th>
                    <th className="px-4 py-3 text-center">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-gray-100 divide-y">
                  {items.map((item) => {
                    const outOfStock = (item.stock ?? 1) === 0;
                    const image = item.images?.[0];
                    return (
                      <tr key={item.productId} className={outOfStock ? 'opacity-70' : ''}>
                        {/* Product */}
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="border-gray-100 bg-gray-50 relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-md border">
                              {image ? (
                                <Image
                                  src={image}
                                  fill
                                  alt={item.name}
                                  className="object-contain p-1"
                                />
                              ) : (
                                <div className="text-gray-300 flex h-full items-center justify-center">
                                  <Package className="h-6 w-6" />
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-neutral-800">{item.name}</p>
                              {outOfStock && (
                                <span className="text-red-600 mt-0.5 inline-block rounded bg-red-100 px-2 py-0.5 text-[11px] font-medium">
                                  Out of Stock
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Price */}
                        <td className="px-4 py-4 text-center font-medium text-neutral-800">
                          ₦{item.price.toLocaleString()}
                        </td>

                        {/* Quantity */}
                        <td className="px-4 py-4 text-center">
                          {outOfStock ? (
                            <span className="bg-gray-100 text-gray-500 rounded px-3 py-1 text-xs font-medium">
                              Sold Out
                            </span>
                          ) : (
                            <div className="border-gray-200 inline-flex items-center rounded border">
                              <button
                                onClick={() =>
                                  updateMutation.mutate({
                                    productId: item.productId,
                                    quantity: item.quantity - 1
                                  })
                                }
                                disabled={updateMutation.isPending}
                                className="text-blue-500 flex h-8 w-8 items-center justify-center hover:bg-blue-50 disabled:opacity-40"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="w-8 text-center text-sm font-medium text-neutral-800">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateMutation.mutate({
                                    productId: item.productId,
                                    quantity: item.quantity + 1
                                  })
                                }
                                disabled={updateMutation.isPending}
                                className="text-blue-500 flex h-8 w-8 items-center justify-center hover:bg-blue-50 disabled:opacity-40"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                          )}
                        </td>

                        {/* Subtotal + remove */}
                        <td className="px-4 py-4 text-center">
                          <div className="flex items-center justify-center gap-3">
                            <span className="font-semibold text-neutral-900">
                              ₦{(item.price * item.quantity).toLocaleString()}
                            </span>
                            <button
                              onClick={() =>
                                updateMutation.mutate({ productId: item.productId, quantity: 0 })
                              }
                              disabled={updateMutation.isPending}
                              className="border-gray-300 text-gray-400 flex h-5 w-5 items-center justify-center rounded-full border hover:border-red-300 hover:text-red-400 disabled:opacity-40"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* Table footer */}
              <div className="border-gray-200 flex items-center justify-between border-t px-4 py-3">
                <Link href="/ecommerce/products">
                  <Button variant="outline" size="sm" className="text-sm">
                    Continue Shopping
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-sm"
                  onClick={() => {
                    refetch?.();
                    ToastLib.Toast.success('Cart updated');
                  }}
                >
                  Update Cart
                </Button>
              </div>
            </div>
          </div>

          {/* Cart total panel */}
          <div className="w-full flex-shrink-0 lg:w-72">
            <div className="border-gray-200 overflow-hidden rounded-lg border ">
              <div className="bg-blue-700 px-5 py-3">
                <h3 className="font-semibold ">Cart Total</h3>
              </div>
              <div className="px-5 py-4">
                <div className="border-gray-100 flex items-center justify-between border-b py-2.5 text-sm">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium text-neutral-900">₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="border-gray-100 flex items-center justify-between border-b py-2.5 text-sm">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex items-center justify-between py-2.5 text-sm">
                  <span className="font-semibold text-neutral-900">Total:</span>
                  <span className="font-bold text-neutral-900">₦{subtotal.toLocaleString()}</span>
                </div>

                {!checkingOut ? (
                  <Button
                    className="mt-4 w-full bg-blue-400 hover:bg-blue-400/20"
                    onClick={() => setCheckingOut(true)}
                  >
                    Proceed to checkout
                  </Button>
                ) : (
                  <div className="mt-4 flex flex-col gap-3">
                    <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide">
                      Shipping Details
                    </p>
                    <Input
                      placeholder="Phone number"
                      type="tel"
                      value={shippingAddress.phone}
                      onChange={(e) => setShippingAddress((p) => ({ ...p, phone: e.target.value }))}
                    />
                    <Input
                      placeholder="Street address"
                      value={shippingAddress.street}
                      onChange={(e) =>
                        setShippingAddress((p) => ({ ...p, street: e.target.value }))
                      }
                    />
                    <Input
                      placeholder="City"
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress((p) => ({ ...p, city: e.target.value }))}
                    />
                    <Input
                      placeholder="State"
                      value={shippingAddress.state}
                      onChange={(e) => setShippingAddress((p) => ({ ...p, state: e.target.value }))}
                    />
                    <Input
                      placeholder="ZIP / Postal code"
                      value={shippingAddress.zipCode}
                      onChange={(e) =>
                        setShippingAddress((p) => ({ ...p, zipCode: e.target.value }))
                      }
                    />
                    <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide">
                      Payment Method
                    </p>
                    <Button
                      className="hover:bg-blue-500 w-full bg-blue-400"
                      onClick={() => handleCheckout('ONLINE')}
                      disabled={orderMutation.isPending}
                    >
                      {orderMutation.isPending && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                      Pay Online — ₦{subtotal.toLocaleString()}
                    </Button>
                    <Button
                      variant="outline"
                      className="text-green-600 hover:bg-green-50 w-full border-green-400"
                      onClick={() => handleCheckout('COD')}
                      disabled={orderMutation.isPending}
                    >
                      {orderMutation.isPending && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                      Pay on Delivery
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setCheckingOut(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcommerceCartView;
