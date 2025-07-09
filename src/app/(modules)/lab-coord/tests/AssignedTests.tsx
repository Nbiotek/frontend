'use client';
import { useState, useEffect } from 'react';
import SearchInput from '@/atoms/fields/SearchInput';
import TestsTable from './components/TestsTable';
import { ArrowUpDown } from 'lucide-react';
import IconPod from '@/atoms/Icon/IconPod';
import { pagination } from '@/constants/data';
import SearchFilter from '../../../../components/common/Filter';
import { useStore } from '@/store';
import { observer } from 'mobx-react-lite';
import { useFetchAssignedTests } from '@/hooks/labCoord/useFetchAssignedTests';
import { toJS } from 'mobx';
import { EnumLabCoordQueryType } from '@/store/LabCoordStore';

const AssignedTestView = () => {
  const [results, setResults] = useState<TTestQuesRes>({
    requests: [],
    pagination
  });
  const {
    LabCoordStore: { queries, applyQuery, resetQuery }
  } = useStore();
  const { data, isLoading } = useFetchAssignedTests(queries.ASSIGNED_TEST);

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
          applyQuery={(_query: Partial<TTestQuery>) =>
            applyQuery(_query, EnumLabCoordQueryType.ASSIGNED_TEST)
          }
          resetQuery={() => resetQuery(EnumLabCoordQueryType.ASSIGNED_TEST)}
        />
        <SearchInput className="!w-[calc(100%-80px)]" placeholder="Search for tests..." />
        <IconPod Icon={ArrowUpDown} />
      </fieldset>

      <TestsTable type="assigned" isLoading={isLoading} tests={results} />
    </div>
  );
};

export default observer(AssignedTestView);
