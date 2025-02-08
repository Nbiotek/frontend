import SearchInput from '@/atoms/fields/SearchInput';
import ResultTable from '../components/ResultsTable';
import { ArrowUpDown, ListFilter } from 'lucide-react';
import IconPod from '@/atoms/Icon/IconPod';
import { testResults } from '@/constants/data';

const RecentView = () => {
  return (
    <div className="flex w-full flex-col space-y-4">
      <div className="flex w-full items-center justify-between space-x-2">
        <IconPod Icon={ListFilter} />
        <SearchInput className="!w-[calc(100%-80px)]" placeholder="Search for tests..." />
        <IconPod Icon={ArrowUpDown} />
      </div>
      <ResultTable resultsData={testResults} />
    </div>
  );
};

export default RecentView;
