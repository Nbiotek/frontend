'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { putUpdateOrderStatus } from '@/requests/ecommerce';
import { ECOMMERCE } from '@/constants/api';
import * as ToastLib from '@/atoms/Toast';
import { XModal } from '@/atoms/modal';
import { useStore } from '@/store';
import { observer } from 'mobx-react-lite';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { AppModals } from '@/store/AppConfig/appModalTypes';
import { Loader } from 'lucide-react';

const STATUS_OPTIONS: TOrderStatus[] = ['PENDING', 'PAID', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

const statusColors: Record<TOrderStatus, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  PAID: 'bg-green-100 text-green-800',
  SHIPPED: 'bg-blue-100 text-blue-800',
  DELIVERED: 'bg-emerald-100 text-emerald-800',
  CANCELLED: 'bg-red-100 text-red-800'
};

const ViewOrderModal = () => {
  const {
    AppConfigStore: { isOpen, toggleModals, orderModal }
  } = useStore();
  const order = orderModal.order;
  const queryClient = useQueryClient();

  const [selectedStatus, setSelectedStatus] = useState<TOrderStatus | ''>('');

  const mutation = useMutation({
    mutationFn: (status: TOrderStatus) => putUpdateOrderStatus(order!.id, status),
    onSuccess: () => {
      ToastLib.Toast.success('Order status updated');
      queryClient.invalidateQueries({ predicate: (q) => q.queryKey[0] === ECOMMERCE.ORDERS_ADMIN });
      toggleModals();
    },
    onError: () => ToastLib.Toast.error('Failed to update status')
  });

  const handleClose = () => {
    setSelectedStatus('');
    toggleModals();
  };

  return (
    <XModal
      closeModal={handleClose}
      bgClose
      isOpen={isOpen.ADMIN_VIEW_ORDER}
      title={`Order #${order?.id?.slice(0, 8).toUpperCase() ?? ''}…`}
    >
      {order ? (
        <div className="flex w-full flex-col space-y-4">
          {/* Header info */}
          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-sm">Status</span>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColors[order.status] ?? 'bg-gray-100 text-gray-700'}`}
            >
              {order.status}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-sm">Total</span>
            <span className="text-gray-900 font-semibold">
              ₦{order.totalAmount.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-sm">Date</span>
            <span className="text-gray-700 text-sm">
              {new Date(order.createdAt).toLocaleDateString('en-NG', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}
            </span>
          </div>

          {order.user && (
            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-sm">Customer</span>
              <div className="text-right">
                {(order.user.firstName || order.user.lastName) && (
                  <p className="text-gray-800 text-sm font-medium">
                    {`${order.user.firstName ?? ''} ${order.user.lastName ?? ''}`.trim()}
                  </p>
                )}
                <p className="text-gray-400 text-xs">{order.user.email}</p>
              </div>
            </div>
          )}

          {order.shippingAddress && (
            <>
              <Separator />
              <div>
                <p className="text-gray-400 mb-1 text-xs font-medium uppercase">Shipping Address</p>
                <p className="text-gray-700 text-sm">
                  {order.shippingAddress.street}, {order.shippingAddress.city},{' '}
                  {order.shippingAddress.state} {order.shippingAddress.zipCode}
                </p>
                {order.shippingAddress.phone && (
                  <p className="text-gray-500 mt-0.5 text-xs">{order.shippingAddress.phone}</p>
                )}
              </div>
            </>
          )}

          <Separator />

          {/* Items */}
          <div>
            <p className="text-gray-400 mb-2 text-xs font-medium uppercase">
              Items ({order.items.length})
            </p>
            <div className="flex flex-col space-y-2">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 flex items-center justify-between rounded-lg p-3"
                >
                  <div>
                    <p className="text-gray-800 text-sm font-medium">{item.name}</p>
                    {item.category && <p className="text-gray-400 text-xs">{item.category.name}</p>}
                    <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-gray-900 text-sm font-semibold">
                    ₦{(item.price * item.quantity).toLocaleString('en-NG')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Status update */}
          <div>
            <p className="text-gray-400 mb-2 text-xs font-medium uppercase">Update Status</p>
            <div className="flex gap-2">
              <Select
                value={selectedStatus || order.status}
                onValueChange={(v) => setSelectedStatus(v as TOrderStatus)}
              >
                <SelectTrigger className="flex-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((s) => (
                    <SelectItem key={s} value={s}>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-semibold ${statusColors[s]}`}
                      >
                        {s}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                className="hover:bg-blue-500 bg-blue-400"
                disabled={mutation.isPending || !selectedStatus || selectedStatus === order.status}
                onClick={() => selectedStatus && mutation.mutate(selectedStatus)}
              >
                {mutation.isPending ? <Loader className="h-4 w-4 animate-spin" /> : 'Save'}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-sm">No order data available.</p>
      )}
    </XModal>
  );
};

export default observer(ViewOrderModal);
