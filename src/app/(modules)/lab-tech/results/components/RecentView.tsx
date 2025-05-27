'use client';
import { useEffect, useState } from 'react';
import SearchInput from '@/atoms/fields/SearchInput';
import ResultTable from './ResultsTable';
import { ArrowUpDown } from 'lucide-react';
import IconPod from '@/atoms/Icon/IconPod';
import { pagination } from '@/constants/data';
import { useQuery } from '@tanstack/react-query';
import { LAB_TECH } from '@/constants/api';
import { getRecentResult } from '@/requests/lab-tech';
import SearchFilter from '../../../../../components/common/Filter';
import { useStore } from '@/store';
import { observer } from 'mobx-react-lite';
import { EnumLabTechQueryType } from '@/store/LabTechStore';

const ResultsView = () => {
  const params: Partial<TTestQuery> = {};
  const [recentResult, setRecentResult] = useState<TRecentTestResults>({
    results: [],
    pagination
  });
  const {
    LabTechStore: { queries, applyQuery, resetQuery }
  } = useStore();
  const { data, isLoading } = useQuery({
    queryKey: [LAB_TECH.RECENT_RESULTS, queries.RESULT],
    queryFn: () => getRecentResult(queries.RESULT),
    select: (data) => data.data.data
  });

  useEffect(() => {
    if (!isLoading && data !== undefined) {
      setRecentResult(data);
    }
  }, [isLoading, data]);

  return (
    <div className="flex w-full flex-col space-y-4">
      <fieldset disabled={isLoading} className="flex w-full items-center justify-between space-x-2">
        <SearchFilter
          type="result"
          query={queries.RESULT}
          applyQuery={(_query: Partial<TTestQuery>) =>
            applyQuery(_query, EnumLabTechQueryType.RESULT)
          }
          resetQuery={() => resetQuery(EnumLabTechQueryType.RESULT)}
        />
        <SearchInput className="!w-[calc(100%-80px)]" placeholder="Search for tests..." />
        <IconPod Icon={ArrowUpDown} />
      </fieldset>
      <ResultTable type="recent" isLoading={isLoading} resultsData={recentResult} />
    </div>
  );
};

export default observer(ResultsView);
