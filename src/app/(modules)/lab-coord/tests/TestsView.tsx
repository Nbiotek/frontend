'use client';
import { useEffect, useState } from 'react';
import SearchInput from '@/atoms/fields/SearchInput';
import TestsTable from './components/TestsTable';
import { ArrowUpDown } from 'lucide-react';
import IconPod from '@/atoms/Icon/IconPod';
import { pagination } from '@/constants/data';
import { useFetchTestReqs } from '@/hooks/labCoord/useFetchTestReqs';
import { useStore } from '@/store';
import SearchFilter from '@/app/(modules)/lab-tech/components/Filter';
import { observer } from 'mobx-react-lite';

const TestsView = () => {
  const [results, setResults] = useState<TTestQuesRes>({
    requests: [],
    pagination
  });

  const {
    LabCoordStore: { testQuery, applyTestQuery, resetTestQuery }
  } = useStore();
  const { data, isLoading } = useFetchTestReqs(testQuery);

  useEffect(() => {
    if (!isLoading && data !== undefined) {
      setResults(data);
    }
  }, [isLoading, data]);

  console.log(testQuery);

  return (
    <div className="flex w-full flex-col space-y-4">
      <fieldset disabled={isLoading} className="flex w-full items-center justify-between space-x-2">
        <SearchFilter
          type="test"
          query={testQuery}
          applyQuery={applyTestQuery}
          resetQuery={resetTestQuery}
        />
        <SearchInput className="!w-[calc(100%-80px)]" placeholder="Search for tests..." />
        <IconPod Icon={ArrowUpDown} />
      </fieldset>
      <TestsTable isLoading={isLoading} tests={results} />
    </div>
  );
};

export default observer(TestsView);
