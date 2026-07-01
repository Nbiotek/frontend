'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Package, ShoppingBag } from 'lucide-react';
import { useFetchAdminOrders } from '@/hooks/admin/useFetchAdminOrders';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store';

const STATUS_STYLES: Record<TOrderStatus, { label: string; className: string }> = {
  PENDING: { label: 'Pending', className: 'bg-yellow-100 text-yellow-700' },
  PAID: { label: 'Paid', className: 'bg-green-100 text-green-700' },
  SHIPPED: { label: 'Shipped', className: 'bg-blue-100 text-blue-600' },
  DELIVERED: { label: 'Delivered', className: 'bg-purple-100 text-purple-700' },
  CANCELLED: { label: 'Cancelled', className: 'bg-red-100 text-red-600' }
};

const EcommerceOrdersView = () => {
  const {
    AuthStore: { accessToken }
  } = useStore();
  const { data: orders, isLoading } = useFetchAdminOrders();

  if (!accessToken) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <ShoppingBag className="text-gray-300 h-12 w-12" />
        <p className="text-gray-700 text-lg font-medium">Sign in to view your orders</p>
        <Link href="/auth/login">
          <Button className="bg-blue-400">Sign In</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-4xl">
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
          <span className="text-blue-500 font-medium">My Orders</span>
        </nav>

        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-neutral-900">My Orders</h1>
          <Link href="/ecommerce/products">
            <Button variant="outline" size="sm">
              Continue Shopping
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-36 w-full rounded-xl" />
            ))}
          </div>
        ) : !orders?.length ? (
          <div className="flex flex-col items-center justify-center rounded-xl bg-white py-20 text-center shadow-sm">
            <ShoppingBag className="text-gray-200 mb-3 h-14 w-14" />
            <p className="text-lg font-semibold text-neutral-700">No orders yet</p>
            <p className="text-gray-500 mt-1 text-sm">Products you order will appear here</p>
            <Link href="/ecommerce/products" className="mt-5">
              <Button className="bg-blue-400">Shop Now</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const style = STATUS_STYLES[order.status] ?? STATUS_STYLES.PENDING;
              return (
                <div
                  key={order.id}
                  className="border-gray-200 overflow-hidden rounded-xl border bg-white shadow-sm"
                >
                  {/* Order header */}
                  <div className="border-gray-100 bg-gray-50 flex flex-wrap items-center justify-between gap-3 border-b px-5 py-3">
                    <div className="flex flex-col gap-0.5">
                      <p className="text-gray-400 text-xs">Order ID</p>
                      <p className="font-mono text-xs font-medium text-neutral-700">
                        #{order.id.slice(0, 8).toUpperCase()}
                      </p>
                    </div>
                    <div className="flex flex-col gap-0.5 text-right">
                      <p className="text-gray-400 text-xs">Date</p>
                      <p className="text-xs text-neutral-700">
                        {new Date(order.createdAt).toLocaleDateString('en-NG', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className="flex flex-col gap-0.5 text-right">
                      <p className="text-gray-400 text-xs">Total</p>
                      <p className="text-sm font-bold text-neutral-900">
                        ₦{order.totalAmount.toLocaleString()}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${style.className}`}
                    >
                      {style.label}
                    </span>
                  </div>

                  {/* Order items */}
                  <div className="divide-gray-50 divide-y px-5">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4 py-3">
                        <div className="border-gray-100 bg-gray-50 relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border">
                          {item.image ? (
                            <Image
                              src={item.image}
                              fill
                              alt={item.name}
                              className="object-contain p-1"
                            />
                          ) : (
                            <div className="text-gray-200 flex h-full items-center justify-center">
                              <Package className="h-5 w-5" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-neutral-800">
                            {item.name}
                          </p>
                          {item.category && (
                            <p className="text-gray-400 text-xs">{item.category.name}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-neutral-900">
                            ₦{(item.price * item.quantity).toLocaleString()}
                          </p>
                          <p className="text-gray-400 text-xs">Qty: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Shipping address */}
                  {order.shippingAddress && (
                    <div className="border-gray-100 border-t px-5 py-3">
                      <p className="text-gray-400 text-xs">
                        Deliver to:{' '}
                        <span className="text-neutral-700">
                          {order.shippingAddress.street}, {order.shippingAddress.city},{' '}
                          {order.shippingAddress.state}
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default EcommerceOrdersView;
