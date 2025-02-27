'use client';
import { useEffect, useState } from 'react';
import SearchInput from '@/atoms/fields/SearchInput';
import QCTable from '../components/QCTable';
import { ArrowUpDown, ListFilter } from 'lucide-react';
import IconPod from '@/atoms/Icon/IconPod';
import { pagination } from '@/constants/data';
import { useQuery } from '@tanstack/react-query';
import { LAB_TECH } from '@/constants/api';
import { getHistoryQC } from '@/requests/lab-tech';

const QCHistoryView = () => {
  const params: Partial<TRecentResultQuery> = {};
  const [result, setResult] = useState<TQCTestResp>({
    requests: [],
    pagination
  });
  const { data, isLoading } = useQuery({
    queryKey: [LAB_TECH.HISTORY_QC, params],
    queryFn: () => getHistoryQC(params),
    select: (data) => data.data.data
  });

  useEffect(() => {
    if (!isLoading) {
      if (data !== undefined) setResult(data);
    }
  }, [isLoading, data]);

  console.log(result);

  return (
    <div className="flex w-full flex-col space-y-4">
      <fieldset disabled={isLoading} className="flex w-full items-center justify-between space-x-2">
        <IconPod Icon={ListFilter} />
        <SearchInput className="!w-[calc(100%-80px)]" placeholder="Search for tests..." />
        <IconPod Icon={ArrowUpDown} />
      </fieldset>
      <QCTable isLoading={isLoading} resultsData={result} />
    </div>
  );
};

export default QCHistoryView;
