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

// Custom options for doctor view
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
    sortOrder: 'DESC'
  };

  // Filter state
  const [filters, setFilters] = useState<FilterParams>(defaultFilters);

  // Get the query client for manual invalidation
  const queryClient = useQueryClient();

  // Use the updated hook with filter params
  const { data, isLoading } = useTestReview(filters);

  // Debounce search to avoid too many requests
  const [searchInput, setSearchInput] = useState('');

  // Calculate the number of active filters
  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.fromDate) count++;
    if (filters.toDate) count++;
    if (filters.sortBy) count++;
    if (filters.status) count++; // Count status as an active filter
    return count;
  };

  // Search handler with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (filters.search !== searchInput) {
        setFilters((prev) => ({
          ...prev,
          search: searchInput,
          page: 1 // Reset to first page when searching
        }));
      }
    }, 500); // 500ms debounce delay

    return () => clearTimeout(timer);
  }, [searchInput, filters.search]);

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

    // Include status if provided
    if (filterData.status) {
      formattedFilters.status = filterData.status;
    }

    setFilters((prev) => ({
      ...prev,
      ...formattedFilters,
      page: 1 // Reset to first page when changing filters
    }));
  };

  // Handle sort order change
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
      page: filters.page, // Keep current page
      limit: filters.limit // Keep current limit
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
      page: 1 // Reset to first page when changing limit
    }));
  };

  // Effect to refetch data when filters change
  useEffect(() => {
    // Invalidate and refetch when filters change
    queryClient.invalidateQueries({ queryKey: ['doctor-review-test'] });
  }, [filters, queryClient]);

  // Calculate pagination values for the pagination component
  const tests = data?.data.tests || [];
  const total = data?.data.pagination?.total || 0;
  const currentPage = filters.page || 1;
  const totalPages = data?.data.pagination?.totalPages || 1;

  return (
    <div className="flex-col space-y-[24px]">
      <div className="flex flex-col space-x-2 sm:flex-row sm:items-center sm:justify-between">
        {/* Enhanced Filter Component with status options */}
        <FilterComponent
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          activeFilters={getActiveFilterCount()}
          options={doctorFilterOptions}
        />

        {/* Search component */}
        <SearchInput
          className="!w-[calc(100%-80px)]"
          placeholder="Search tests..."
          value={searchInput}
          onChange={handleSearchChange}
        />

        {/* Sort component */}
        <SortComponent onSortChange={handleSortChange} />
      </div>

      {/* Test Review Table */}
      <ReviewTestTable reviewTests={tests} loading={isLoading} />

      {/* Pagination - only show if we have data */}
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
