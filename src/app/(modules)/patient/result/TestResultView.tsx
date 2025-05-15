'use client';

import { useState, useEffect } from 'react';
import InputSearch from '@/atoms/fields/InputSearch';
import IconPod from '@/atoms/Icon/IconPod';
import { ArrowUpDown, ListFilter } from 'lucide-react';
import TestResultTable from './components/TestResultTable';
import { useTestResult } from '@/hooks/patient/useTestResult';
import { TestResultFilterParams } from '@/requests/testResult';
import FilterComponent from '../component/FilterCP';
import SortComponent from '../component/SortCP';
import { format } from 'date-fns';
import { useQueryClient } from '@tanstack/react-query';
import Pagination from '@/atoms/pagination';

const TestResultView = () => {
  const defaultFilters: TestResultFilterParams = {
    page: 1,
    limit: 10,
    sortOrder: 'DESC'
  };

  const [filters, setFilters] = useState<TestResultFilterParams>(defaultFilters);

  const queryClient = useQueryClient();

  const { data, isLoading } = useTestResult(filters);

  const [searchInput, setSearchInput] = useState('');

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.fromDate) count++;
    if (filters.toDate) count++;
    if (filters.sortBy) count++;
    return count;
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({
      ...prev,
      page
    }));
  };

  const handleLimitChange = (limit: number) => {
    setFilters((prev) => ({
      ...prev,
      limit,
      page: 1
    }));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (filters.search !== searchInput) {
        setFilters((prev) => ({
          ...prev,
          search: searchInput,
          page: 1
        }));
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput, filters.search]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleFilterChange = (filterData: { fromDate?: Date; toDate?: Date; sortBy?: string }) => {
    // Format dates for API if they exist
    const formattedFilters: TestResultFilterParams = {};

    if (filterData.sortBy) {
      formattedFilters.sortBy = filterData.sortBy;
    }

    if (filterData.fromDate) {
      formattedFilters.fromDate = format(filterData.fromDate, 'yyyy-MM-dd');
    }

    if (filterData.toDate) {
      formattedFilters.toDate = format(filterData.toDate, 'yyyy-MM-dd');
    }

    setFilters((prev) => ({
      ...prev,
      ...formattedFilters,
      page: 1
    }));
  };

  const handleSortChange = (sortOrder: 'ASC' | 'DESC') => {
    setFilters((prev) => ({
      ...prev,
      sortOrder
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      ...defaultFilters,
      page: filters.page,
      limit: filters.limit
    });
    setSearchInput('');
  };

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['test-result'] });
  }, [filters, queryClient]);

  const total = data?.data.pagination?.total || 0;
  const currentPage = filters.page || 1;
  const totalPages = data?.data.pagination?.totalPages || 1;

  return (
    <div className="flex w-full flex-col space-y-4">
      <div className="flex w-full items-center justify-between space-x-2">
        {/* Filter component with active filter count */}
        <FilterComponent
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          activeFilters={getActiveFilterCount()}
        />

        <InputSearch
          className="!w-[calc(100%-80px)]"
          placeholder="Search for tests..."
          value={searchInput}
          onChange={handleSearchChange}
        />

        <SortComponent onSortChange={handleSortChange} />
      </div>

      <TestResultTable data={data?.data.results || []} loading={isLoading} />

      {!isLoading && data?.data.results && data.data.results.length > 0 && (
        <Pagination
          total={total}
          siblingCount={1}
          currentPage={currentPage}
          setPage={handlePageChange}
          limit={filters.limit || 10}
          setLimit={handleLimitChange}
          totalPages={totalPages}
        />
      )}
    </div>
  );
};

export default TestResultView;
