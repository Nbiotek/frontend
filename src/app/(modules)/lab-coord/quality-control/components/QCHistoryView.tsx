'use client';
import { useState } from 'react';
import SearchInput from '@/atoms/fields/SearchInput';
import QCTable from './QCTable';
import { ArrowUpDown } from 'lucide-react';
import IconPod from '@/atoms/Icon/IconPod';
import { pagination } from '@/constants/data';
import SearchFilter from '@/app/(modules)/lab-tech/components/Filter';
import { useStore } from '@/store';

const QCHistoryView = () => {
  const params: Partial<TTestQuery> = {};
  const [result, setResult] = useState<TQCTestResp>({
    requests: [],
    pagination
  });
  const {
    LabCoordStore: { qcHistoryQuery, applyQcHistoryQuery }
  } = useStore();

  return (
    <div className="flex w-full flex-col space-y-4">
      <fieldset disabled={false} className="flex w-full items-center justify-between space-x-2">
        <SearchFilter type="result" query={qcHistoryQuery} applyQuery={applyQcHistoryQuery} />
        <SearchInput className="!w-[calc(100%-80px)]" placeholder="Search for tests..." />
        <IconPod Icon={ArrowUpDown} />
      </fieldset>
      <QCTable isLoading={false} resultsData={result} />
    </div>
  );
};

export default QCHistoryView;
