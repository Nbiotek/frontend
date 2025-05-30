import FieldVisitTable from './FieldVisitTable';
import InputSearch from '@/atoms/fields/InputSearch';
import SearchInput from '@/atoms/fields/SearchInput';
import IconPod from '@/atoms/Icon/IconPod';
import { ArrowUpDown, ListFilter } from 'lucide-react';
import { useAllFieldTasks } from '@/hooks/marketer/useFieldTask';
import { useEffect, useState } from 'react';

const FieldVisitPending = () => {
  const { data, isLoading } = useAllFieldTasks();

  const [fieldVisitData, setFieldVisitData] = useState<TFieldTestRespones>();
  useEffect(() => {
    if (!isLoading && data !== undefined) {
      setFieldVisitData(data);
    }
  }, [isLoading, data]);

  console.log('fieldVisitData', fieldVisitData);

  return (
    <div className="flex w-full flex-col space-y-4">
      <div className="flex w-full items-center justify-between space-x-2">
        <IconPod Icon={ListFilter} />
        <SearchInput className="!w-[calc(100%-80px)]" placeholder="Search for tests..." />

        <IconPod Icon={ArrowUpDown} />
      </div>

      <FieldVisitTable loading={isLoading} fieldTask={fieldVisitData?.data.requests || []} />
    </div>
  );
};

export default FieldVisitPending;
