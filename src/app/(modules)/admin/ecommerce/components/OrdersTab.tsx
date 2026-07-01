'use client';

import { useState } from 'react';
import { useStore } from '@/store';
import { AppModals } from '@/store/AppConfig/appModalTypes';
import { useFetchAllOrders } from '@/hooks/admin/useFetchAllOrders';
import OrdersLoader from './OrdersLoader';
import EmptyOrders from './EmptyOrders';
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

const STATUS_FILTERS: { label: string; value: TOrderStatus | 'ALL' }[] = [
  { label: 'All', value: 'ALL' },
  { label: 'Pending', value: 'PENDING' },
  { label: 'Paid', value: 'PAID' },
  { label: 'Shipped', value: 'SHIPPED' },
  { label: 'Delivered', value: 'DELIVERED' },
  { label: 'Cancelled', value: 'CANCELLED' }
];

const statusColors: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-400',
  PAID: 'bg-green-100 text-green-400',
  SHIPPED: 'bg-blue-100 text-blue-400',
  DELIVERED: 'bg-emerald-100 text-emerald-400',
  CANCELLED: 'bg-red-100 text-red-400'
};

const OrdersTab = () => {
  const {
    AppConfigStore: { toggleModals }
  } = useStore();
  const { data: orders, isLoading } = useFetchAllOrders();
  const [activeFilter, setActiveFilter] = useState<TOrderStatus | 'ALL'>('ALL');

  const filtered = (orders ?? []).filter(
    (o) => activeFilter === 'ALL' || o.status === activeFilter
  );

  return (
    <div className="flex flex-col space-y-4">
      {/* Status filter pills */}
      <div className="flex flex-wrap gap-2">
        {STATUS_FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setActiveFilter(f.value)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              activeFilter === f.value
                ? 'bg-blue-400 text-white'
                : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
            }`}
          >
            {f.label}
            {f.value !== 'ALL' && orders && (
              <span className="ml-1 opacity-70">
                ({orders.filter((o) => o.status === f.value).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {isLoading && <OrdersLoader />}

      {!isLoading && (
        <>
          {filtered.length > 0 ? (
            <div className="border-gray-100 overflow-hidden rounded-lg border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-gray-100 bg-gray-50 text-gray-500 border-b text-xs font-semibold uppercase tracking-wide">
                    <th className="px-4 py-3 text-left">Order</th>
                    <th className="px-4 py-3 text-left">Customer</th>
                    <th className="px-4 py-3 text-center">Items</th>
                    <th className="px-4 py-3 text-right">Total</th>
                    <th className="px-4 py-3 text-center">Status</th>
                    <th className="px-4 py-3 text-center">Date</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-gray-50 divide-y">
                  {filtered.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="text-gray-600 px-4 py-3 font-mono text-xs">
                        #{order.id.slice(0, 8).toUpperCase()}
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-xs font-medium text-neutral-800">
                          {order.user?.firstName
                            ? `${order.user.firstName} ${order.user.lastName ?? ''}`.trim()
                            : (order.user?.email ?? '—')}
                        </p>
                        {order.user?.firstName && (
                          <p className="text-gray-400 text-[11px]">{order.user.email}</p>
                        )}
                      </td>
                      <td className="text-gray-600 px-4 py-3 text-center text-xs">
                        {order.items.length}
                      </td>
                      <td className="px-4 py-3 text-right text-sm font-semibold text-neutral-900">
                        ₦{order.totalAmount.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${statusColors[order.status] ?? 'bg-gray-100 text-gray-500'}`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="text-gray-500 px-4 py-3 text-center text-xs">
                        {new Date(order.createdAt).toLocaleDateString('en-NG', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-500 h-7 px-2 text-xs"
                          onClick={() =>
                            toggleModals({
                              name: AppModals.ADMIN_VIEW_ORDER,
                              open: true,
                              id: order.id,
                              order
                            })
                          }
                        >
                          <Eye className="mr-1 h-3 w-3" />
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyOrders />
          )}
        </>
      )}
    </div>
  );
};

export default OrdersTab;
