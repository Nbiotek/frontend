'use client';
import { useEffect, useState } from 'react';
import SearchInput from '@/atoms/fields/SearchInput';
import QCTable from './QCTable';
import { ArrowUpDown } from 'lucide-react';
import IconPod from '@/atoms/Icon/IconPod';
import { pagination } from '@/constants/data';
import SearchFilter from '@/components/common/Filter';
import { useStore } from '@/store';
import { EnumLabTechQueryType } from '@/store/LabTechStore';
import { observer } from 'mobx-react-lite';
import { useFetchHistoryQC } from '@/hooks/qualityControl/useFetchHistoryQC';

const QCHistoryView = () => {
  const [result, setResult] = useState<TQCTestResp>({
    requests: [],
    pagination
  });
  const {
    LabTechStore: { queries, applyQuery, resetQuery }
  } = useStore();
  const { data, isLoading } = useFetchHistoryQC(queries.CONTROL_HISTORY);

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
          query={queries.CONTROL_HISTORY}
          applyQuery={(_query: Partial<TTestQuery>) =>
            applyQuery(_query, EnumLabTechQueryType.CONTROL_HISTORY)
          }
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
