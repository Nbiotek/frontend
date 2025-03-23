'use client';
import { useEffect, useState } from 'react';
import SearchInput from '@/atoms/fields/SearchInput';
import QCTable from './QCTable';
import { ArrowUpDown, ListFilter } from 'lucide-react';
import IconPod from '@/atoms/Icon/IconPod';
import { pagination } from '@/constants/data';
import { useQuery } from '@tanstack/react-query';
import { LAB_TECH } from '@/constants/api';
import { getHistoryQC } from '@/requests/lab-tech';
import SearchFilter from '../../components/Filter';
import { useStore } from '@/store';
import { EnumLabTechQueryType } from '@/store/LabTech';
import { observer } from 'mobx-react-lite';

const QCHistoryView = () => {
  const [result, setResult] = useState<TQCTestResp>({
    requests: [],
    pagination
  });
  const {
    LabTechStore: { qcHistoryQuery, applyQcHistoryQuery, resetQuery }
  } = useStore();
  const { data, isLoading } = useQuery({
    queryKey: [LAB_TECH.HISTORY_QC, qcHistoryQuery],
    queryFn: () => getHistoryQC(qcHistoryQuery),
    select: (data) => data.data.data
  });

  useEffect(() => {
    if (!isLoading) {
      if (data !== undefined) setResult(data);
    }
  }, [isLoading, data]);

  return (
    <div className="flex w-full flex-col space-y-4">
      <fieldset disabled={isLoading} className="flex w-full items-center justify-between space-x-2">
        <SearchFilter
          type="result"
          query={qcHistoryQuery}
          applyQuery={applyQcHistoryQuery}
          resetQuery={() => resetQuery(EnumLabTechQueryType.CONTROL_HISTORY)}
        />
        <SearchInput className="!w-[calc(100%-80px)]" placeholder="Search for tests..." />
        <IconPod Icon={ArrowUpDown} />
      </fieldset>
      <QCTable type="history" isLoading={isLoading} resultsData={result} />
    </div>
  );
};

export default observer(QCHistoryView);
