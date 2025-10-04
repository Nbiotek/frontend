'use client';

import SearchInput from '@/atoms/fields/SearchInput';
import ReviewTestTable from './components/TestReviewTable';

import { useTestReview } from '@/hooks/doctor/useTestReview';
import FilterComponent from '../../patient/component/FilterCP';
import SortComponent from '../../patient/component/SortCP';
import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { FilterParams } from '@/requests/doctor';
import Pagination from '@/atoms/pagination';
import { format } from 'date-fns';
import Button from '@/atoms/Buttons';

const doctorFilterOptions = {
  showStatus: true, // Show status dropdown
  statusOptions: [
    { value: 'PENDING', label: 'Pending' },
    { value: 'IN_REVIEW', label: 'In Review' },
    { value: 'COMPLETED', label: 'Completed' }
  ],
  sortByOptions: [
    { value: 'createdAt', label: 'Date Created' },
    { value: 'testName', label: 'Test Name' }
    // { value: 'patientName', label: 'Patient Name' },
    // { value: 'status', label: 'Status' }
  ]
};

const ReviewTestView = () => {
  // Default state
  const defaultFilters: FilterParams = {
    page: 1,
    limit: 10,
    sortOrder: 'DESC',
    status: 'PENDING'
  };

  // Filter state
  const [filters, setFilters] = useState<FilterParams>(defaultFilters);

  const queryClient = useQueryClient();

  const { data, isLoading } = useTestReview(filters);

  const [searchInput, setSearchInput] = useState('');

  const tests = data?.data.tests || [];
  const total = data?.data.pagination?.total || 0;
  const currentPage = filters.page || 1;
  const totalPages = data?.data.pagination?.totalPages || 1;

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.fromDate) count++;
    if (filters.toDate) count++;
    if (filters.sortBy) count++;
    if (filters.status) count++;
    return count;
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  // Handle filter changes (date range, sortBy, and status)
  const handleFilterChange = (filterData: {
    fromDate?: Date;
    toDate?: Date;
    sortBy?: string;
    status?: string;
  }) => {
    // Format dates for API if they exist
    const formattedFilters: FilterParams = {};

    if (filterData.sortBy) {
      formattedFilters.sortBy = filterData.sortBy;
    }

    if (filterData.fromDate) {
      formattedFilters.fromDate = format(filterData.fromDate, 'yyyy-MM-dd');
    }

    if (filterData.toDate) {
      formattedFilters.toDate = format(filterData.toDate, 'yyyy-MM-dd');
    }

    if (filterData.status) {
      formattedFilters.status = filterData.status;
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

  // Handle clearing all filters
  const handleClearFilters = () => {
    setFilters({
      ...defaultFilters,
      page: filters.page,
      limit: filters.limit
    });
    setSearchInput('');
  };

  // Handle pagination
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

  // Handle status button clicks
  const handleStatusFilter = (status: 'PENDING' | 'COMPLETED') => {
    setFilters((prev) => ({
      ...prev,
      status: status,
      page: 1
    }));
  };

  // Search handler with debounce
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

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['doctor-review-test'] });
  }, [filters, queryClient]);

  return (
    <div className="flex-col space-y-[24px]">
      {/* Status Filter Buttons */}
      <div className="flex items-center gap-3 bg-white p-3">
        <div className="flex gap-2">
          <Button
            variant={filters.status === 'PENDING' ? 'filled' : 'outlined'}
            text="Pending"
            className="!h-[32px] !px-4 !text-xs"
            onClick={() => handleStatusFilter('PENDING')}
          />
          <Button
            variant={filters.status === 'COMPLETED' ? 'filled' : 'outlined'}
            text="Completed"
            className="!h-[32px] !px-4 !text-xs"
            onClick={() => handleStatusFilter('COMPLETED')}
          />
        </div>
      </div>

      <div className="flex flex-col space-x-2 sm:flex-row sm:items-center sm:justify-between">
        <FilterComponent
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          activeFilters={getActiveFilterCount()}
          options={doctorFilterOptions}
        />

        <SearchInput
          className="!w-[calc(100%-80px)]"
          placeholder="Search tests..."
          value={searchInput}
          onChange={handleSearchChange}
        />

        <SortComponent onSortChange={handleSortChange} />
      </div>

      <ReviewTestTable reviewTests={tests} loading={isLoading} />

      {!isLoading && tests.length > 0 && (
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

export default ReviewTestView;
