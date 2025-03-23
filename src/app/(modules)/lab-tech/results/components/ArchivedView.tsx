'use client';
import { useEffect, useState } from 'react';
import SearchInput from '@/atoms/fields/SearchInput';
import ResultTable from './ResultsTable';
import { ArrowUpDown, ListFilter } from 'lucide-react';
import IconPod from '@/atoms/Icon/IconPod';
import { pagination } from '@/constants/data';
import { useQuery } from '@tanstack/react-query';
import { LAB_TECH } from '@/constants/api';
import { getArchivedResult } from '@/requests/lab-tech';
import SearchFilter from '../../components/Filter';
import { useStore } from '@/store';
import { observer } from 'mobx-react-lite';
import { EnumLabTechQueryType } from '@/store/LabTech';

const ArchivedView = () => {
  const [recentResult, setRecentResult] = useState<TRecentTestResults>({
    results: [],
    pagination
  });
  const {
    LabTechStore: { archivedResQuery, applyArchivedResQuery, resetQuery }
  } = useStore();
  const { data, isLoading } = useQuery({
    queryKey: [LAB_TECH.ARCHIVED_RESULTS, archivedResQuery],
    queryFn: () => getArchivedResult(archivedResQuery),
    select: (data) => data.data.data
  });

  const handleResetQuery = () => resetQuery(EnumLabTechQueryType.ARCHIVED);

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
          query={archivedResQuery}
          applyQuery={applyArchivedResQuery}
          resetQuery={handleResetQuery}
        />
        <SearchInput className="!w-[calc(100%-80px)]" placeholder="Search for tests..." />
        <IconPod Icon={ArrowUpDown} />
      </fieldset>
      <ResultTable type="archived" isLoading={isLoading} resultsData={recentResult} />
    </div>
  );
};

export default observer(ArchivedView);
