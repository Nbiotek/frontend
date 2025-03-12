'use client';

import SearchInput from '@/atoms/fields/SearchInput';
import IconPod from '@/atoms/Icon/IconPod';
import { Text } from '@/lib/utils/Text';
import { ArrowUpDown, ListFilter, ClipboardList, Receipt, Calendar } from 'lucide-react';
import TransactionHistoryTable from './component/TransactionHistoryTable';
import { useBillingHistory } from '@/hooks/patient/useBilling';
import { Skeleton } from '@/components/ui/skeleton';
import Button from '@/atoms/Buttons';

const TransactionHistoryView = () => {
  const { data, isLoading } = useBillingHistory();

  return (
    <div className="flex w-full flex-col space-y-6">
      <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center">
          <Receipt className="text-blue-500 mr-2 h-5 w-5" />
          <Text variant="title" weight="semibold">
            Transaction History
          </Text>
        </div>
        <div className="flex w-full items-center justify-end space-x-2 sm:w-[60%]">
          <SearchInput className="!w-[calc(100%-80px)]" placeholder="Search transactions..." />
          <IconPod Icon={ListFilter} />
          <IconPod Icon={ArrowUpDown} />
        </div>
      </div>

      {isLoading ? (
        // Loading state
        <div className="rounded-lg bg-white p-4">
          <div className="mb-4 flex items-center space-x-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-8 w-full" />
            ))}
          </div>
          {[1, 2, 3, 4].map((row) => (
            <div key={row} className="mb-4 flex items-center space-x-4">
              {[1, 2, 3, 4, 5].map((col) => (
                <Skeleton key={col} className="h-12 w-full" />
              ))}
            </div>
          ))}
        </div>
      ) : !data || !data.data || data.data.payments.length === 0 ? (
        // Empty state
        <div className="flex flex-col items-center justify-center rounded-lg bg-white p-12">
          <div className="bg-gray-100 mb-4 flex h-16 w-16 items-center justify-center rounded-full">
            <Receipt className="text-gray-400 h-8 w-8" />
          </div>
          <Text variant="title" weight="medium" className="mb-2">
            No transactions yet
          </Text>
          <Text variant="body" className="text-gray-500 mb-6 max-w-md text-center">
            Your payment history will appear here once you&apos;ve made a transaction.
          </Text>
          <Button variant="filled">Book a Test</Button>
        </div>
      ) : (
        // Data available state
        <TransactionHistoryTable data={data.data} />
      )}
    </div>
  );
};

export default TransactionHistoryView;
