'use client';

import InputSearch from '@/atoms/fields/InputSearch';
import IconPod from '@/atoms/Icon/IconPod';
import { ArrowUpDown, ListFilter, ClipboardList } from 'lucide-react';
import TestResultTable from './components/TestResultTable';
import { useTestResult } from '@/hooks/patient/useTestResult';
import { Skeleton } from '@/components/ui/skeleton';
import Button from '@/atoms/Buttons';
import { useState, useEffect } from 'react';

const TestResultView = () => {
  const { data, isLoading } = useTestResult();

  // State for filtered results
  const [filteredResults, setFilteredResults] = useState<Test[] | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState('');

  // Update filtered results when data changes or search term changes
  useEffect(() => {
    if (!data || !data.data.results) {
      setFilteredResults(undefined);
      return;
    }

    if (!searchTerm) {
      setFilteredResults(data.data.results);
      return;
    }

    const term = searchTerm.toLowerCase().trim();
    const filtered = data.data.results.filter(
      (result) =>
        result.testName?.toLowerCase().includes(term) ||
        result.testId?.toLowerCase().includes(term) ||
        result.status?.toLowerCase().includes(term) ||
        result.resultStatus?.toLowerCase().includes(term) ||
        // Search in test parameters if available
        result.results?.some(
          (r) => r.parameter?.toLowerCase().includes(term) || r.range?.toLowerCase().includes(term)
        )
    );

    setFilteredResults(filtered);
  }, [data, searchTerm]);

  // Handle search from InputSearch component
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className="flex w-full flex-col space-y-4">
      <div className="flex w-full items-center justify-between space-x-2">
        <IconPod Icon={ListFilter} />
        <InputSearch
          className="!w-[calc(100%-80px)]"
          placeholder="Search for tests..."
          onSearch={handleSearch}
          value={searchTerm}
        />
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
      ) : !data || (!filteredResults?.length && searchTerm) ? (
        // No results after search
        <div className="flex flex-col items-center justify-center rounded-lg bg-white py-16">
          <div className="bg-gray-100 mb-4 flex h-20 w-20 items-center justify-center rounded-full">
            <ClipboardList className="text-gray-400 h-10 w-10" />
          </div>
          <h3 className="mb-2 text-lg font-medium">
            {searchTerm ? `No results for "${searchTerm}"` : 'No Test Results Found'}
          </h3>
          <p className="text-gray-500 mb-6 max-w-sm text-center">
            {searchTerm
              ? 'Try searching with different terms or check all your test results below.'
              : "You don't have any test results yet. Results will appear here after your lab tests are processed."}
          </p>
          {searchTerm ? (
            <Button
              variant="outlined"
              onClick={() => setSearchTerm('')}
              className="w-[40%]"
              type="button"
            >
              View All Results
            </Button>
          ) : (
            <Button variant="filled" className="w-[40%]">
              Book a Test
            </Button>
          )}
        </div>
      ) : !filteredResults?.length && !searchTerm ? (
        // No data at all
        <div className="flex flex-col items-center justify-center rounded-lg bg-white py-16">
          <div className="bg-gray-100 mb-4 flex h-20 w-20 items-center justify-center rounded-full">
            <ClipboardList className="text-gray-400 h-10 w-10" />
          </div>
          <h3 className="mb-2 text-lg font-medium">No Test Results Found</h3>
          <p className="text-gray-500 mb-6 max-w-sm text-center">
            You don&apos;t have any test results yet. Results will appear here after your lab tests
            are processed.
          </p>
          <Button variant="filled" className="w-[40%]">
            Book a Test
          </Button>
        </div>
      ) : (
        // Data available state - with filtered results
        <TestResultTable data={{ ...data.data, results: filteredResults || [] }} />
      )}
    </div>
  );
};

export default TestResultView;
