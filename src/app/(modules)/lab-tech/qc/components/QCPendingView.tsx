'use client';
import { useEffect, useState } from 'react';
import SearchInput from '@/atoms/fields/SearchInput';
import QCTable from './QCTable';
import { ArrowUpDown, ListFilter } from 'lucide-react';
import IconPod from '@/atoms/Icon/IconPod';
import { pagination } from '@/constants/data';
import { useQuery } from '@tanstack/react-query';
import { LAB_TECH } from '@/constants/api';
import { getPendingQC } from '@/requests/lab-tech';
import SearchFilter from '../../components/Filter';
import { useStore } from '@/store';

const QCPendingView = () => {
  const params: Partial<TTestQuery> = {};
  const [result, setResult] = useState<TQCTestResp>({
    requests: [],
    pagination
  });
  const {
    LabTechStore: { qcPendingQuery, applyQcPendingQuery }
  } = useStore();
  const { data, isLoading } = useQuery({
    queryKey: [LAB_TECH.PENDING_QC, params],
    queryFn: () => getPendingQC(params),
    select: (data) => data.data.data
  });

  useEffect(() => {
    if (!isLoading && data !== undefined) {
      setResult(data);
    }
  }, [isLoading, data]);

  console.log(result);

  return (
    <div className="flex w-full flex-col space-y-4">
      <fieldset disabled={isLoading} className="flex w-full items-center justify-between space-x-2">
        <SearchFilter type="result" query={qcPendingQuery} applyQuery={applyQcPendingQuery} />
        <SearchInput className="!w-[calc(100%-80px)]" placeholder="Search for tests..." />
        <IconPod Icon={ArrowUpDown} />
      </fieldset>
      <QCTable isLoading={isLoading} resultsData={result} />
    </div>
  );
};

export default QCPendingView;
