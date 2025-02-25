import { useState } from 'react';
import SearchInput from '@/atoms/fields/SearchInput';
import ResultTable from '../components/ResultsTable';
import { ArrowUpDown, ListFilter } from 'lucide-react';
import IconPod from '@/atoms/Icon/IconPod';
import { pagination, testResults } from '@/constants/data';

const ArchivedView = () => {
  const [recentResult, setRecentResult] = useState<TRecentTestResults>({
    results: [],
    pagination
  });
  return (
    <div className="flex w-full flex-col space-y-4">
      <div className="flex w-full items-center justify-between space-x-2">
        <IconPod Icon={ListFilter} />
        <SearchInput className="!w-[calc(100%-80px)]" placeholder="Search tests results..." />
        <IconPod Icon={ArrowUpDown} />
      </div>
      <ResultTable isLoading={false} resultsData={recentResult} />
    </div>
  );
};

export default ArchivedView;
