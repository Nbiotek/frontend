'use client';
import InputSearch from '@/atoms/fields/InputSearch';
import { format } from 'date-fns';

import { usePendingAppointment } from '@/hooks/patient/useAppoitment';
import AppointmentItem from '../component/AppointmentItem';
import { AppointmentFilterParams } from '@/requests/appointments';
import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import FilterComponent from '../../component/FilterCP';
import SortComponent from '../../component/SortCP';
import { AppointmentListSkeleton } from '@/atoms/Loaders/AppointmentLoader';
import EmptyState from '@/components/EmptyState';

const PendingAppointmentView = () => {
  // Default filter state
  const defaultFilters: AppointmentFilterParams = {
    sortOrder: 'DESC'
  };

  const [filters, setFilters] = useState<AppointmentFilterParams>(defaultFilters);

  // Get the query client for manual invalidation
  const queryClient = useQueryClient();

  // Use the updated hook with filter params
  const { data, isLoading, refetch } = usePendingAppointment(filters);

  // Debounce search to avoid too many requests
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (filters.search !== searchInput) {
        setFilters((prev) => ({
          ...prev,
          search: searchInput
        }));
      }
    }, 500); // 500ms debounce delay

    return () => clearTimeout(timer);
  }, [searchInput, filters.search]);

  // Calculate the number of active filters
  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.fromDate) count++;
    if (filters.toDate) count++;
    if (filters.sortBy) count++;
    return count;
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  // Handle filter changes (date range and sortBy)
  const handleFilterChange = (filterData: { fromDate?: Date; toDate?: Date; sortBy?: string }) => {
    // Format dates for API if they exist
    const formattedFilters: AppointmentFilterParams = {};

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
      ...formattedFilters
    }));
  };

  // Handle sort order change
  const handleSortChange = (sortOrder: 'ASC' | 'DESC') => {
    setFilters((prev) => ({
      ...prev,
      sortOrder
    }));
  };

  const handleClearFilters = () => {
    setFilters(defaultFilters);
    setSearchInput('');
  };

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['pending-appointment'] });
  }, [filters, queryClient]);

  console.log(data);

  return (
    <>
      <div className="mb-5 flex w-full items-center justify-between space-x-2">
        {/* Filter component with active filter count */}
        <FilterComponent
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          activeFilters={getActiveFilterCount()}
        />

        {/* Search component */}
        <InputSearch
          className="!w-[calc(100%-80px)]"
          placeholder="Search for appointments..."
          value={searchInput}
          onChange={handleSearchChange}
        />

        {/* Sort component */}
        <SortComponent onSortChange={handleSortChange} />
      </div>

      {/* Content area with skeleton loading */}
      <div className="flex flex-col space-y-[20px] bg-white p-5">
        {isLoading ? (
          <AppointmentListSkeleton />
        ) : data ? (
          <AppointmentItem type="pending" data={data.data} />
        ) : (
          <EmptyState />
        )}
      </div>
    </>
  );
};

export default PendingAppointmentView;
