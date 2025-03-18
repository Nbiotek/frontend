'use client';
import { useState } from 'react';
import SearchInput from '@/atoms/fields/SearchInput';
import TestsTable from './components/TestsTable';
import { ArrowUpDown, ListFilter } from 'lucide-react';
import IconPod from '@/atoms/Icon/IconPod';
import { pagination } from '@/constants/data';

const TestsView = () => {
  const [results, setResults] = useState<TTestQuesRes>({
    requests: [],
    pagination
  });
  return (
    <div className="flex w-full flex-col space-y-4">
      <div className="flex w-full items-center justify-between space-x-2">
        <IconPod Icon={ListFilter} />
        <SearchInput className="!w-[calc(100%-80px)]" placeholder="Search for tests..." />
        <IconPod Icon={ArrowUpDown} />
      </div>
      <TestsTable isLoading={false} tests={results} />
    </div>
  );
};

export default TestsView;
