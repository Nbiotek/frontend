'use client';

import SearchInput from '@/atoms/fields/SearchInput';
import IconPod from '@/atoms/Icon/IconPod';
import { ArrowUpDown, ListFilter, ClipboardList } from 'lucide-react';
import TestResultTable from './components/TestResultTable';
import { useTestResult } from '@/hooks/patient/useTestResult';
import { Skeleton } from '@/components/ui/skeleton';
import Button from '@/atoms/Buttons';

const TestResultView = () => {
  const { data, isLoading } = useTestResult();

  return (
    <div className="flex w-full flex-col space-y-4">
      <div className="flex w-full items-center justify-between space-x-2">
        <IconPod Icon={ListFilter} />
        <SearchInput className="!w-[calc(100%-80px)]" placeholder="Search for tests..." />
        <IconPod Icon={ArrowUpDown} />
      </div>

      {isLoading ? (
        // Loading state with skeleton table
        <div className="w-full overflow-clip rounded-lg bg-white p-4">
          <div className="mb-4 flex h-8 space-x-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-8 w-full" />
            ))}
          </div>
          {[1, 2, 3, 4].map((row) => (
            <div key={row} className="mb-4 flex space-x-4">
              {[1, 2, 3, 4, 5, 6, 7].map((col) => (
                <Skeleton key={col} className="h-12 w-full" />
              ))}
            </div>
          ))}
        </div>
      ) : !data || data.data.results.length === 0 ? (
        // No data state
        <div className="flex flex-col items-center justify-center rounded-lg bg-white py-16">
          <div className="bg-gray-100 mb-4 flex h-20 w-20 items-center justify-center rounded-full">
            <ClipboardList className="text-gray-400 h-10 w-10" />
          </div>
          <h3 className="mb-2 text-lg font-medium">No Test Results Found</h3>
          <p className="text-gray-500 mb-6 max-w-sm text-center">
            You don't have any test results yet. Results will appear here after your lab tests are
            processed.
          </p>
          <Button variant="filled" className="w-[40%]">
            Book a Test
          </Button>
        </div>
      ) : (
        // Data available state
        <TestResultTable data={data.data} />
      )}
    </div>
  );
};

export default TestResultView;
