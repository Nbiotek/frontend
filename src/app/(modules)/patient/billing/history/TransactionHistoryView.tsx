import SearchInput from '@/atoms/fields/SearchInput';
import IconPod from '@/atoms/Icon/IconPod';
import { Text } from '@/lib/utils/Text';
import { ArrowUpDown, ListFilter, ClipboardList } from 'lucide-react';

const TransactionHistoryView = () => {
  return (
    <div className="flex w-full flex-col space-y-4">
      <div className="flex w-full items-center justify-between space-x-2">
        <p className="border-2">Transaction History</p>
        <div className="flex w-[80%] justify-end space-x-2 border">
          <SearchInput className="!w-[calc(100%-50%)]" placeholder="Search for tests..." />
          <IconPod Icon={ListFilter} />
        </div>
      </div>
    </div>
  );
};

export default TransactionHistoryView;
