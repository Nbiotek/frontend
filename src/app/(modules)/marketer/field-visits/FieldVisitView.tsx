'use client';
import InputSearch from '@/atoms/fields/InputSearch';
import SearchInput from '@/atoms/fields/SearchInput';
import IconPod from '@/atoms/Icon/IconPod';
import { ArrowUpDown, ListFilter } from 'lucide-react';
import { useEffect } from 'react';
import FieldVisitTable from './components/FieldVisitTable';

const FiedVisitView = () => {
  return (
    <div className="flex w-full flex-col space-y-4">
      <div className="flex w-full items-center justify-between space-x-2">
        <IconPod Icon={ListFilter} />
        <SearchInput className="!w-[calc(100%-80px)]" placeholder="Search for tests..." />

        <IconPod Icon={ArrowUpDown} />
      </div>
      <FieldVisitTable />
    </div>
  );
};

export default FiedVisitView;
