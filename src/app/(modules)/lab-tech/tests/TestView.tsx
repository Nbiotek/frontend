'use client';
import { useState, useEffect } from 'react';
import SearchInput from '@/atoms/fields/SearchInput';
import TestsTable from './TestsTable';
import { ArrowUpDown } from 'lucide-react';
import IconPod from '@/atoms/Icon/IconPod';
import { pagination } from '@/constants/data';
import { useFetchTests } from '@/hooks/labTech/useFetchTests';
import SearchFilter from '../components/Filter';
import { useStore } from '@/store';
import { observer } from 'mobx-react-lite';

const TestView = () => {
  const [results, setResults] = useState<TTestQuesRes>({
    requests: [],
    pagination
  });
  const {
    LabTechStore: { queries, applyQuery, resetQuery }
  } = useStore();
  const { data, isLoading } = useFetchTests(queries.TEST);

  useEffect(() => {
    if (!isLoading && data !== undefined) {
      setResults(data);
    }
  }, [isLoading, data]);
  return (
    <div className="flex w-full flex-col space-y-4">
      <fieldset disabled={isLoading} className="flex w-full items-center justify-between space-x-2">
        <SearchFilter
          type="test"
          query={queries.TEST}
          applyQuery={applyQuery}
          resetQuery={resetQuery}
        />
        <SearchInput className="!w-[calc(100%-80px)]" placeholder="Search for tests..." />
        <IconPod Icon={ArrowUpDown} />
      </fieldset>

      <TestsTable isLoading={isLoading} tests={results} />
    </div>
  );
};

export default observer(TestView);
