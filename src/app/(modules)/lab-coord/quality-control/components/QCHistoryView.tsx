'use client';
import { useEffect, useState } from 'react';
import SearchInput from '@/atoms/fields/SearchInput';
import QCTable from './QCTable';
import { ArrowUpDown } from 'lucide-react';
import IconPod from '@/atoms/Icon/IconPod';
import { pagination } from '@/constants/data';
import SearchFilter from '@/app/(modules)/lab-tech/components/Filter';
import { useStore } from '@/store';
import { EnumLabCoordQueryType } from '@/store/LabCoord';
import { useFetchQCHistory } from '@/hooks/labCoord/useFetchQCHistory';

const QCHistoryView = () => {
  const params: Partial<TTestQuery> = {};
  const [result, setResult] = useState<TQCTestResp>({
    requests: [],
    pagination
  });
  const {
    LabCoordStore: { queries, applyQuery, resetQuery }
  } = useStore();

  const { data, isLoading } = useFetchQCHistory(queries.CONTROL_HISTORY);

  useEffect(() => {
    if (!isLoading && data != undefined) {
      setResult(data);
    }
  }, [data, isLoading]);

  return (
    <div className="flex w-full flex-col space-y-4">
      <fieldset disabled={false} className="flex w-full items-center justify-between space-x-2">
        <SearchFilter
          type="result"
          query={queries.CONTROL_HISTORY}
          applyQuery={(_query: Partial<TTestQuery>) =>
            applyQuery(_query, EnumLabCoordQueryType.CONTROL_HISTORY)
          }
          resetQuery={() => resetQuery(EnumLabCoordQueryType.CONTROL_HISTORY)}
        />
        <SearchInput className="!w-[calc(100%-80px)]" placeholder="Search for tests..." />
        <IconPod Icon={ArrowUpDown} />
      </fieldset>
      <QCTable isLoading={isLoading} resultsData={result} />
    </div>
  );
};

export default QCHistoryView;
