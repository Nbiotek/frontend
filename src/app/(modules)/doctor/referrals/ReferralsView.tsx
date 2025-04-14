'use client';

import { useState, useEffect } from 'react';
import SearchInput from '@/atoms/fields/SearchInput';
import IconPod from '@/atoms/Icon/IconPod';
import { ArrowUpDown, ListFilter } from 'lucide-react';
import ReferralTable from './components/ReferralsTable';
import { useDoctorReferral } from '@/hooks/doctor/useReferrals';
import FilterComponent from '../../patient/component/FilterCP';
import SortComponent from '../../patient/component/SortCP';
import { FilterParams } from '@/requests/doctor';
import { format } from 'date-fns';
import { useQueryClient } from '@tanstack/react-query';
import Pagination from '@/atoms/pagination';

// Custom options for referrals
const referralFilterOptions = {
  showStatus: true,
  statusOptions: [
    { value: 'PENDING', label: 'Pending' },
    { value: 'ACCEPTED', label: 'Accepted' },
    { value: 'DECLINED', label: 'Declined' },
    { value: 'COMPLETED', label: 'Completed' }
  ],
  sortByOptions: [
    { value: 'createdAt', label: 'Date Created' },
    { value: 'patientName', label: 'Patient Name' },
    { value: 'referredTo', label: 'Referred To' },
    { value: 'status', label: 'Status' }
  ]
};

const ReferralsView = () => {
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
  const { data: referPatientsList, isLoading } = useDoctorReferral(filters);

  // Debounce search to avoid too many requests
  const [searchInput, setSearchInput] = useState('');

  // Calculate the number of active filters
  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.fromDate) count++;
    if (filters.toDate) count++;
    if (filters.sortBy) count++;
    if (filters.status) count++;
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
    queryClient.invalidateQueries({ queryKey: ['doctor-referrals'] });
  }, [filters, queryClient]);

  // Calculate pagination values for the pagination component
  const referPatients = referPatientsList?.data.patients || [];
  const total = referPatientsList?.data.pagination?.total || 0;
  const currentPage = filters.page || 1;
  const totalPages = referPatientsList?.data.pagination?.totalPages || 1;

  return (
    <div className="flex-col space-y-[24px]">
      <div className="flex flex-col space-x-2 sm:flex-row sm:items-center sm:justify-between">
        {/* Enhanced Filter Component with status options */}
        <FilterComponent
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          activeFilters={getActiveFilterCount()}
          options={referralFilterOptions}
        />

        {/* Search component */}
        <SearchInput
          className="!w-[calc(100%-80px)]"
          placeholder="Search referrals..."
          value={searchInput}
          onChange={handleSearchChange}
        />

        {/* Sort component */}
        <SortComponent onSortChange={handleSortChange} />
      </div>

      {/* Referral Table */}
      <ReferralTable referPatientList={referPatients} loading={isLoading} />

      {/* Pagination - only show if we have data */}
      {!isLoading && referPatients.length > 0 && (
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

export default ReferralsView;
