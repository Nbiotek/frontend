'use client';
import SearchInput from '@/atoms/fields/SearchInput';
import IconPod from '@/atoms/Icon/IconPod';
import React, { useState } from 'react';
import QCTable from './components/QCTable';
import { pagination } from '@/constants/data';
import { ArrowUpDown, ListFilter } from 'lucide-react';

const QualityControlView = () => {
  const params: Partial<TLabTechTestQuery> = {};
  const [result, setResult] = useState<TQCTestResp>({
    requests: [],
    pagination
  });

  return (
    <div className="flex w-full flex-col space-y-4">
      <fieldset disabled={false} className="flex w-full items-center justify-between space-x-2">
        <IconPod Icon={ListFilter} />
        <SearchInput className="!w-[calc(100%-80px)]" placeholder="Search for tests..." />
        <IconPod Icon={ArrowUpDown} />
      </fieldset>
      <QCTable isLoading={false} resultsData={result} />
    </div>
  );
};

export default QualityControlView;
